"use client";

import { PREMIUM_REVEAL } from "@/lib/motion";
import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

type MotionImageRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Час анімації в секундах — більше = плавніша поява */
  duration?: number;
  /** Частина елемента у viewport (0–1) для старту анімації — менше = анімація починається раніше і виглядає м’якше */
  viewportAmount?: number;
};

/**
 * Wraps image containers with premium reveal animation.
 * Use around next/image with reserved space (fill + aspect-ratio or width/height) to avoid CLS.
 */
export function MotionImageReveal({
  children,
  className,
  delay = 0,
  duration,
  viewportAmount,
}: MotionImageRevealProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const viewport = viewportAmount !== undefined
    ? { ...PREMIUM_REVEAL.viewport, amount: viewportAmount }
    : PREMIUM_REVEAL.viewport;

  const transition = reducedMotion
    ? { duration: 0.2 }
    : {
        duration: duration ?? PREMIUM_REVEAL.transition.duration,
        ease: PREMIUM_REVEAL.transition.ease,
        delay,
      };

  return (
    <motion.div
      className={className}
      initial={
        reducedMotion
          ? { opacity: 0 }
          : {
              opacity: PREMIUM_REVEAL.hidden.opacity,
              y: PREMIUM_REVEAL.hidden.y,
              scale: PREMIUM_REVEAL.hidden.scale,
            }
      }
      whileInView={
        reducedMotion
          ? { opacity: 1 }
          : {
              opacity: PREMIUM_REVEAL.visible.opacity,
              y: PREMIUM_REVEAL.visible.y,
              scale: PREMIUM_REVEAL.visible.scale,
            }
      }
      viewport={viewport}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
