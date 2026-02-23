"use client";

import { PREMIUM_REVEAL } from "@/lib/motion";
import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function MotionReveal({
  children,
  className,
  delay = 0,
  y = 30,
}: MotionRevealProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <motion.div
      className={className}
      initial={
        reducedMotion
          ? { opacity: 0 }
          : { opacity: PREMIUM_REVEAL.hidden.opacity, y: y ?? PREMIUM_REVEAL.hidden.y, scale: PREMIUM_REVEAL.hidden.scale }
      }
      whileInView={
        reducedMotion
          ? { opacity: 1 }
          : { opacity: PREMIUM_REVEAL.visible.opacity, y: PREMIUM_REVEAL.visible.y, scale: PREMIUM_REVEAL.visible.scale }
      }
      viewport={PREMIUM_REVEAL.viewport}
      transition={
        reducedMotion
          ? { duration: 0.2 }
          : PREMIUM_REVEAL.transitionWithDelay(delay)
      }
    >
      {children}
    </motion.div>
  );
}
