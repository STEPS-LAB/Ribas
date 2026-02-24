"use client";

import { MotionImageReveal } from "@/components/ui/MotionImageReveal";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { Skeleton } from "@/components/ui/Skeleton";
import { Locale, localized, rooms } from "@/lib/content";
import { motion } from "framer-motion";
import { useState } from "react";

type RoomsProps = {
  locale: Locale;
};

function RoomImageWithSkeleton({
  srcDesktop,
  srcMobile,
  alt,
}: {
  srcDesktop: string;
  srcMobile: string;
  alt: string;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <picture className="absolute inset-0 block h-full w-full">
        <source media="(max-width: 768px)" srcSet={srcMobile} />
        <img
          src={srcDesktop}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          onLoad={() => setLoaded(true)}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </picture>
      {!loaded && (
        <Skeleton className="absolute inset-0 rounded-none" aria-hidden />
      )}
    </>
  );
}

export function Rooms({ locale }: RoomsProps) {
  const copy = localized[locale];

  return (
    <section id="rooms" className="bg-[#F9F9F9] py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <MotionReveal>
          <p className="text-xs uppercase tracking-[0.2em] text-[#C5A059]">{copy.roomsLabel}</p>
          <h2 className="mt-4 text-3xl font-semibold text-[#1A1A1B] md:text-5xl">
            {copy.roomsTitle}
          </h2>
          <p className="mt-5 max-w-2xl font-light text-[#4A4A4A]">{copy.roomsSubtitle}</p>
        </MotionReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {rooms[locale].map((room, index) => (
            <MotionReveal key={room.id} delay={index * 0.12}>
              <article className="group overflow-hidden rounded-sm border border-black/8 bg-white shadow-[0_16px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
                <MotionImageReveal delay={index * 0.1} className="relative aspect-[4/3] overflow-hidden">
                  <RoomImageWithSkeleton srcDesktop={room.image} srcMobile={room.imageMobile} alt={room.title} />
                </MotionImageReveal>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl font-semibold text-[#1A1A1B]">{room.title}</h3>
                    <p className="text-base font-semibold text-[#C5A059] md:text-lg">
                      {room.price}
                    </p>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[#4A4A4A]">{room.details}</p>
                  <motion.button
                    type="button"
                    whileHover={{ x: 4 }}
                    className="mt-6 inline-flex items-center text-sm uppercase tracking-[0.16em] text-[#1A1A1B]"
                  >
                    {copy.exploreButton}
                    <span className="ml-3 h-px w-10 bg-[#C5A059] transition-all duration-300 group-hover:w-16" />
                  </motion.button>
                </div>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
