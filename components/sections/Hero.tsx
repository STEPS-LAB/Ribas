"use client";

import { motion } from "framer-motion";
import { CalendarDays, LoaderCircle, Minus, Plus, Users } from "lucide-react";
import Image from "next/image";
import { FormEvent, memo, useCallback, useEffect, useRef, useState } from "react";
import { Locale, localized } from "@/lib/content";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import {
  formatISOToDDMM,
  formatISOToDDMMYYYY,
  getDefaultCheckInCheckOut,
  todayISO,
} from "@/lib/dates";

type HeroProps = {
  locale: Locale;
};

const GUESTS_MIN = 1;
const GUESTS_MAX = 12;

const PREVIEW_TRANSITION_DURATION = 0.6;
const PREVIEW_EASING: [number, number, number, number] = [0.4, 0, 0.2, 1];

/** lg breakpoint: desktop from 1024px, mobile below. */
const DESKTOP_BREAKPOINT = 1024;
const HERO_VIDEO_DESKTOP = "/videos/hero.webm";
const HERO_VIDEO_MOBILE = "/videos/hero-mobile.webm";
const HERO_POSTER_DESKTOP = "/images/hero-poster%20desktop.webp";
const HERO_POSTER_MOBILE = "/images/hero-poster%20mobile.webp";

/**
 * Hero video + poster. Memoized so it only re-renders when props change; video sources are
 * stable (desktop/mobile via CSS). Manual play() on mount and onCanPlay bypasses mobile autoplay issues.
 */
const HeroVideo = memo(function HeroVideo({
  isMobile,
  reducedMotion,
  videoReady,
  onCanPlay,
}: {
  isMobile: boolean;
  reducedMotion: boolean;
  videoReady: boolean;
  onCanPlay: () => void;
}) {
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const desktopPosterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    desktopVideoRef.current?.play().catch(() => {});
    mobileVideoRef.current?.play().catch(() => {});
  }, []);

  const handleCanPlay = useCallback(
    (ref: React.RefObject<HTMLVideoElement | null>) => {
      ref.current?.play().catch(() => {});
      onCanPlay();
    },
    [onCanPlay]
  );

  return (
    <>
      <div className="absolute inset-0 h-full overflow-hidden z-[-1]">
        <video
          key="hero-video-desktop"
          ref={desktopVideoRef}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          poster={HERO_POSTER_DESKTOP}
          src={HERO_VIDEO_DESKTOP}
          className="absolute inset-0 object-cover w-full h-full pointer-events-none hidden lg:block"
          onCanPlay={() => handleCanPlay(desktopVideoRef)}
          aria-hidden
        />
        <video
          key="hero-video-mobile"
          ref={mobileVideoRef}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          src={HERO_VIDEO_MOBILE}
          className="absolute inset-0 object-cover w-full h-full pointer-events-none block lg:hidden"
          onCanPlay={() => handleCanPlay(mobileVideoRef)}
          aria-hidden
        />
      </div>
      <div className="absolute inset-0 z-[1] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{
            opacity: reducedMotion || !videoReady ? 1 : 0,
            pointerEvents: videoReady ? "none" : "auto",
          }}
          transition={{ duration: PREVIEW_TRANSITION_DURATION, ease: PREVIEW_EASING }}
          role="img"
          aria-hidden
        >
          {isMobile && (
            <div className="block lg:hidden absolute inset-0">
              <Image
                src={HERO_POSTER_MOBILE}
                alt=""
                fill
                priority
                fetchPriority="high"
                loading="eager"
                className="object-cover object-center"
                sizes="100vw"
              />
            </div>
          )}
          {!isMobile && (
            <div
              ref={desktopPosterRef}
              className="hidden lg:block h-full w-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${HERO_POSTER_DESKTOP})` }}
            />
          )}
        </motion.div>
      </div>
    </>
  );
});

function HeroInner({ locale }: HeroProps) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchDone, setSearchDone] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const dateDropdownRef = useRef<HTMLDivElement>(null);
  const guestsStepperRef = useRef<HTMLDivElement>(null);
  const copy = localized[locale];
  const closeCalendar = useCallback(() => setShowCalendar(false), []);
  const onCanPlay = useCallback(() => setVideoReady(true), []);

  useOnClickOutside(dateDropdownRef, closeCalendar);

  useEffect(() => {
    const { checkIn: defIn, checkOut: defOut } = getDefaultCheckInCheckOut();
    setCheckIn((prev) => prev || defIn);
    setCheckOut((prev) => prev || defOut);
  }, []);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < DESKTOP_BREAKPOINT);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const minCheckIn = todayISO();
  const minCheckOut = checkIn || minCheckIn;
  const formatDateRange = isMobile ? (a: string, b: string) => `${formatISOToDDMM(a)} — ${formatISOToDDMM(b)}` : (a: string, b: string) => `${formatISOToDDMMYYYY(a)} — ${formatISOToDDMMYYYY(b)}`;
  const datesDisplay = checkIn && checkOut
    ? formatDateRange(checkIn, checkOut)
    : copy.searchDates;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchDone(false);
    setIsSearching(true);

    setTimeout(() => {
      setIsSearching(false);
      setSearchDone(true);
    }, 1700);
  };

  return (
    <section className="relative min-h-[100vh] overflow-hidden">
      <HeroVideo
        isMobile={isMobile}
        reducedMotion={reducedMotion}
        videoReady={videoReady}
        onCanPlay={onCanPlay}
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-black/45" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-60 bg-gradient-to-b from-black/55 via-black/20 to-transparent" aria-hidden />

      <div className="relative z-40 mx-auto flex min-h-screen max-w-6xl flex-col justify-end px-6 pb-24 pt-36 sm:px-8 md:px-12 md:pb-28 md:pt-40">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mb-5 text-xs uppercase tracking-[0.22em] text-[#C5A059]"
        >
          {copy.heroTag}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28, ease: "easeOut" }}
          className="max-w-3xl text-4xl font-semibold tracking-[0.08em] text-white sm:text-6xl md:text-7xl"
        >
          {copy.heroTitle}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.36, ease: "easeOut" }}
          className="mt-5 max-w-xl text-base font-light text-white/90 sm:text-xl"
        >
          {copy.heroSubtitle}
        </motion.p>

        <motion.form
          id="booking"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.44, ease: "easeOut" }}
          onSubmit={onSubmit}
          className="relative z-40 mt-12 flex flex-col gap-2 rounded-sm border border-white/20 bg-white/93 p-4 text-black shadow-[0_18px_50px_rgba(0,0,0,0.24)] sm:flex-row sm:items-stretch sm:gap-3 [pointer-events:auto]"
        >
          <div ref={dateDropdownRef} className="relative z-0 min-w-0 sm:flex-[1.35] [pointer-events:auto]">
            <button
              onClick={() => setShowCalendar((value) => !value)}
              className="flex h-[60px] w-full cursor-pointer items-center justify-between gap-2 rounded-sm border border-black/15 bg-white px-4 text-left transition-all duration-300 ease hover:bg-neutral-50 min-w-0 [pointer-events:auto]"
              type="button"
            >
              <span className="flex min-w-0 items-center gap-2 overflow-hidden">
                <CalendarDays className="h-4 w-4 shrink-0 text-[#4A4A4A]" />
                <span className="truncate text-sm">{copy.searchDates}</span>
              </span>
              <span className="shrink-0 truncate text-lg font-medium text-[#1A1A1B] tracking-[0.02em] max-w-[110px] sm:max-w-none">{datesDisplay}</span>
            </button>

            <motion.div
              initial={false}
              animate={
                showCalendar
                  ? { opacity: 1, y: 8, pointerEvents: "auto" }
                  : { opacity: 0, y: 0, pointerEvents: "none" }
              }
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 z-20 mt-2 max-w-full overflow-hidden rounded-sm border border-black/10 bg-white p-4 shadow-xl md:left-auto md:right-auto md:min-w-[280px]"
            >
              <p className="mb-3 text-xs uppercase tracking-[0.16em] text-[#4A4A4A]">
                {copy.calendarLabel}
              </p>
              <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-x-4 md:gap-y-3">
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm text-[#4A4A4A]">{copy.dateCheckInLabel}</span>
                  <div className="relative">
                    <input
                      type="date"
                      min={minCheckIn}
                      value={checkIn}
                      onChange={(e) => {
                        const v = e.target.value;
                        setCheckIn(v);
                        if (checkOut && v >= checkOut) setCheckOut("");
                      }}
                      className="input-date-premium relative min-w-0"
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4A4A4A]" aria-hidden>
                      <CalendarDays className="h-4 w-4" />
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm text-[#4A4A4A]">{copy.dateCheckOutLabel}</span>
                  <div className="relative">
                    <input
                      type="date"
                      min={minCheckOut}
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="input-date-premium relative min-w-0"
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4A4A4A]" aria-hidden>
                      <CalendarDays className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex h-[60px] min-w-0 cursor-pointer items-center rounded-sm border border-black/15 bg-white transition-all duration-300 ease hover:bg-neutral-50 sm:flex-1 [pointer-events:auto]">
            <button
              type="button"
              onClick={() => guestsStepperRef.current?.focus()}
              className="flex shrink-0 cursor-pointer items-center gap-2 px-3 py-3 text-sm text-[#4A4A4A] focus:outline-none [pointer-events:auto]"
            >
              <Users className="h-4 w-4 shrink-0 text-[#4A4A4A]" />
              <span className="truncate">{copy.searchGuests}:</span>
            </button>
            <div
              ref={guestsStepperRef}
              tabIndex={-1}
              className="relative z-10 flex flex-1 items-center justify-end gap-2 pr-2 sm:gap-3 sm:pr-3 [pointer-events:auto]"
              aria-label={copy.searchGuests}
            >
              <motion.button
                type="button"
                onClick={() => setGuests((n) => Math.max(GUESTS_MIN, n - 1))}
                disabled={guests <= GUESTS_MIN}
                whileTap={{ scale: 0.92 }}
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-sm text-[#1A1A1B] outline-none transition-opacity disabled:cursor-not-allowed disabled:opacity-30 hover:bg-black/[0.04] focus-visible:ring-1 focus-visible:ring-[#C5A059] [pointer-events:auto]"
                aria-label="-"
              >
                <Minus className="h-4 w-4" />
              </motion.button>
              <span className="min-w-[1.75rem] text-center text-lg font-medium text-[#1A1A1B] tracking-[0.02em] sm:min-w-[2.25rem]">
                {guests}
              </span>
              <motion.button
                type="button"
                onClick={() => setGuests((n) => Math.min(GUESTS_MAX, n + 1))}
                disabled={guests >= GUESTS_MAX}
                whileTap={{ scale: 0.92 }}
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-sm text-[#1A1A1B] outline-none transition-opacity disabled:cursor-not-allowed disabled:opacity-30 hover:bg-black/[0.04] focus-visible:ring-1 focus-visible:ring-[#C5A059] [pointer-events:auto]"
                aria-label="+"
              >
                <Plus className="h-4 w-4" />
              </motion.button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 flex h-[60px] w-full cursor-pointer items-center justify-center rounded-sm bg-[#C5A059] px-6 text-sm font-medium uppercase tracking-[0.16em] text-[#1A1A1B] shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:brightness-110 sm:mt-0 sm:w-auto [pointer-events:auto]"
          >
            {copy.searchButton}
          </button>

          {(isSearching || searchDone) && (
            <div className="col-span-2 sm:col-span-3">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 flex items-center gap-2 rounded-sm bg-[#F4F1EA] px-3 py-2 text-sm text-[#1A1A1B]"
              >
                {isSearching ? (
                  <LoaderCircle className="h-4 w-4 animate-spin text-[#C5A059]" />
                ) : (
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                )}
                {isSearching ? copy.searchAiText : copy.searchSuccessMessage}
              </motion.div>
            </div>
          )}
        </motion.form>
      </div>
    </section>
  );
}

export const Hero = memo(HeroInner);
