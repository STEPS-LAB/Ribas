"use client";

import { MotionReveal } from "@/components/ui/MotionReveal";
import { Locale, localized } from "@/lib/content";
import { motion } from "framer-motion";
import Image from "next/image";

type AboutProps = {
  locale: Locale;
};

const aboutImage =
  "https://ribaskarpaty.com/wp-content/uploads/2023/09/terrace_ribas_040-1.jpg";

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
          <Image
            src={aboutImage}
            alt="Ribas Karpaty panoramic terrace"
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
