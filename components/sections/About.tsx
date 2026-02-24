"use client";

import { MotionReveal } from "@/components/ui/MotionReveal";
import { Locale, localized } from "@/lib/content";
import { motion } from "framer-motion";

type AboutProps = {
  locale: Locale;
};

const ABOUT_IMAGE_DESKTOP = "/images/about%20desktop.webp";
const ABOUT_IMAGE_MOBILE = "/images/about%20mobile.webp";

export function About({ locale }: AboutProps) {
  const copy = localized[locale];

  return (
    <section id="about" className="bg-white py-28 md:py-36" aria-labelledby="about-heading">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-14 md:px-10">
        <MotionReveal className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-[#C5A059]">{copy.aboutLabel}</p>
          <h2 id="about-heading" className="mt-4 text-3xl font-semibold text-[#1A1A1B] md:text-5xl">
            {copy.aboutTitle}
          </h2>
          <p className="mt-8 text-base font-light leading-relaxed text-[#4A4A4A] md:text-lg">
            {copy.aboutBody}
          </p>
        </MotionReveal>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative aspect-[4/5] overflow-hidden rounded-sm border border-black/8"
        >
          <picture className="absolute inset-0 block h-full w-full">
            <source media="(max-width: 768px)" srcSet={ABOUT_IMAGE_MOBILE} />
            <img
              src={ABOUT_IMAGE_DESKTOP}
              alt="Ribas Karpaty panoramic terrace"
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </picture>
        </motion.div>
      </div>
    </section>
  );
}
