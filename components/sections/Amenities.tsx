"use client";

import { MotionImageReveal } from "@/components/ui/MotionImageReveal";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { amenities, Locale, localized } from "@/lib/content";
import Image from "next/image";

type AmenitiesProps = {
  locale: Locale;
};

export function Amenities({ locale }: AmenitiesProps) {
  const copy = localized[locale];

  return (
    <section id="amenities" className="bg-white py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <MotionReveal>
          <p className="text-xs uppercase tracking-[0.2em] text-[#C5A059]">{copy.amenitiesLabel}</p>
          <h2 className="mt-4 text-3xl font-semibold text-[#1A1A1B] md:text-5xl">
            {copy.amenitiesTitle}
          </h2>
          <p className="mt-5 max-w-3xl font-light text-[#4A4A4A]">{copy.amenitiesSubtitle}</p>
        </MotionReveal>

        <div className="mt-14 space-y-7">
          {amenities[locale].map((item, index) => (
            <MotionReveal key={item.id} delay={index * 0.12}>
              <article className="grid overflow-hidden rounded-sm border border-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.06)] md:grid-cols-2">
                <MotionImageReveal
                  delay={index * 0.1}
                  className={`relative overflow-hidden ${index % 2 === 1 ? "md:order-2" : ""}`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={900}
                    height={620}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="h-full w-full object-cover"
                  />
                </MotionImageReveal>
                <div className="flex items-center bg-[#F9F9F9] p-8 md:p-14">
                  <div>
                    <h3 className="text-2xl font-semibold text-[#1A1A1B]">{item.title}</h3>
                    <p className="mt-4 text-[#4A4A4A]">{item.description}</p>
                  </div>
                </div>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
