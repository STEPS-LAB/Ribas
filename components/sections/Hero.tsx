"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { CalendarDays, ChevronDown, LoaderCircle, Users } from "lucide-react";
import Image from "next/image";
import { FormEvent, memo, useCallback, useEffect, useRef, useState } from "react";
import { Locale, localized } from "@/lib/content";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import {
  formatISOToDDMMYYYY,
  getDefaultCheckInCheckOut,
  todayISO,
} from "@/lib/dates";

type HeroProps = {
  locale: Locale;
};

const guestOptions = [1, 2, 3, 4, 5, 6];

const PREVIEW_TRANSITION_DURATION = 0.6;
const PREVIEW_EASING: [number, number, number, number] = [0.4, 0, 0.2, 1];

/** lg breakpoint: desktop from 1024px, mobile below. */
const DESKTOP_BREAKPOINT = 1024;
const HERO_VIDEO_DESKTOP = "/videos/hero.webm";
const HERO_VIDEO_MOBILE = "/videos/hero-mobile.webm";
const HERO_POSTER_DESKTOP = "/images/hero-poster%20desktop.webp";
const HERO_POSTER_MOBILE = "/images/hero-poster%20mobile.webp";

/** Single background: one video (all viewports), poster overlay fades out when video plays. */
const HeroBackground = memo(function HeroBackground({
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const desktopPosterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let fallbackTried = false;
    const applySource = (mobile: boolean) => {
      fallbackTried = false;
      video.poster = mobile ? "" : HERO_POSTER_DESKTOP;
      video.src = mobile ? HERO_VIDEO_MOBILE : HERO_VIDEO_DESKTOP;
      video.load();
      video.play().catch(() => {});
      const el = desktopPosterRef.current;
      if (!mobile && el) el.style.backgroundImage = `url(${HERO_POSTER_DESKTOP})`;
    };

    const onError = () => {
      if (fallbackTried) return;
      fallbackTried = true;
      video.src = HERO_VIDEO_DESKTOP;
      video.load();
      video.play().catch(() => {});
    };

    video.addEventListener("error", onError);
    applySource(isMobile);

    const onResize = () => {
      const mobile = window.innerWidth < DESKTOP_BREAKPOINT;
      applySource(mobile);
      if (!mobile && desktopPosterRef.current) {
        desktopPosterRef.current.style.backgroundImage = `url(${HERO_POSTER_DESKTOP})`;
      }
    };
    window.addEventListener("resize", onResize);
    return () => {
      video.removeEventListener("error", onError);
      window.removeEventListener("resize", onResize);
    };
  }, [isMobile]);

  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 600], [0, 90]);

  return (
    <motion.div
      className="absolute inset-0"
      style={reducedMotion ? undefined : { y: parallaxY }}
    >
      {/* Poster overlay: fades out when video is ready; mobile/desktop split via CSS. */}
      <motion.div
        className="absolute inset-0 z-[1] overflow-hidden"
        initial={false}
        animate={{
          opacity: reducedMotion || !videoReady ? 1 : 0,
          pointerEvents: videoReady ? "none" : "auto",
        }}
        transition={{ duration: PREVIEW_TRANSITION_DURATION, ease: PREVIEW_EASING }}
        role="img"
        aria-hidden
      >
        {/* Mobile: Next/Image, hidden on desktop (lg+) to avoid loading on desktop. */}
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
        {/* Desktop: poster set via JS only, hidden on mobile. */}
        {!isMobile && (
          <div
            ref={desktopPosterRef}
            className="hidden lg:block h-full w-full bg-cover bg-center bg-no-repeat"
          />
        )}
      </motion.div>
      {/* Single video: no hidden classes, works on all viewports. */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onCanPlay={onCanPlay}
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
      />
    </motion.div>
  );
});

function HeroInner({ locale }: HeroProps) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchDone, setSearchDone] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const dateDropdownRef = useRef<HTMLDivElement>(null);
  const guestsDropdownRef = useRef<HTMLDivElement>(null);
  const copy = localized[locale];
  const closeCalendar = useCallback(() => setShowCalendar(false), []);
  const closeGuestsDropdown = useCallback(() => setShowGuestsDropdown(false), []);
  const onCanPlay = useCallback(() => setVideoReady(true), []);

  useOnClickOutside(dateDropdownRef, closeCalendar);
  useOnClickOutside(guestsDropdownRef, closeGuestsDropdown);

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
  const datesDisplay = checkIn && checkOut
    ? `${formatISOToDDMMYYYY(checkIn)} — ${formatISOToDDMMYYYY(checkOut)}`
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
    <section className="relative min-h-screen overflow-hidden">
      <HeroBackground
        isMobile={isMobile}
        reducedMotion={reducedMotion}
        videoReady={videoReady}
        onCanPlay={onCanPlay}
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-x-0 top-0 h-60 bg-gradient-to-b from-black/55 via-black/20 to-transparent" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-end px-6 pb-24 pt-36 sm:px-8 md:px-12 md:pb-28 md:pt-40">
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
          className="relative mt-12 grid gap-3 rounded-sm border border-white/20 bg-white/93 p-4 text-black shadow-[0_18px_50px_rgba(0,0,0,0.24)] sm:grid-cols-[1.3fr_1fr_auto] sm:items-center"
        >
          <div ref={dateDropdownRef} className="relative">
            <button
              onClick={() => setShowCalendar((value) => !value)}
              className="flex w-full cursor-pointer items-center justify-between rounded-sm border border-black/15 bg-white px-3 py-3 text-left text-sm transition-all duration-300 ease hover:bg-black/[0.02]"
              type="button"
            >
              <span className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-[#4A4A4A]" />
                {copy.searchDates}
              </span>
              <span className="text-xs text-[#4A4A4A] tracking-[0.02em]">{datesDisplay}</span>
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
                  <input
                    type="date"
                    min={minCheckIn}
                    value={checkIn}
                    onChange={(e) => {
                      const v = e.target.value;
                      setCheckIn(v);
                      if (checkOut && v >= checkOut) setCheckOut("");
                    }}
                    className="box-border h-10 w-full min-w-0 rounded border border-black/15 bg-white px-3 py-2 text-sm text-[#1A1A1B] outline-none transition focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm text-[#4A4A4A]">{copy.dateCheckOutLabel}</span>
                  <input
                    type="date"
                    min={minCheckOut}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="box-border h-10 w-full min-w-0 rounded border border-black/15 bg-white px-3 py-2 text-sm text-[#1A1A1B] outline-none transition focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          <div ref={guestsDropdownRef} className="relative min-w-0">
            <button
              type="button"
              onClick={() => setShowGuestsDropdown((v) => !v)}
              className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-sm border border-black/15 bg-white px-3 py-3 text-left text-sm transition-all duration-300 ease hover:bg-black/[0.02]"
              aria-label={copy.searchGuests}
              aria-expanded={showGuestsDropdown}
              aria-haspopup="listbox"
            >
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4 shrink-0 text-[#4A4A4A]" />
                {copy.searchGuests}
              </span>
              <span className="flex items-center gap-1 text-sm text-[#1A1A1B] tracking-[0.02em]">
                {guests}
                <motion.span
                  animate={{ rotate: showGuestsDropdown ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="inline-block shrink-0"
                >
                  <ChevronDown className="h-4 w-4 text-[#4A4A4A]" aria-hidden />
                </motion.span>
              </span>
            </button>

            <AnimatePresence>
              {showGuestsDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute left-0 right-0 z-20 mt-2 min-w-40 overflow-hidden rounded-sm bg-[#FFFFFF] py-1 shadow-xl"
                  role="listbox"
                  aria-label={copy.searchGuests}
                >
                  {guestOptions.map((value) => (
                    <button
                      key={value}
                      type="button"
                      role="option"
                      aria-selected={guests === value}
                      onClick={() => {
                        setGuests(value);
                        setShowGuestsDropdown(false);
                      }}
                      className="flex w-full cursor-pointer items-center justify-center px-4 py-3 text-sm text-[#1A1A1B] tracking-[0.02em] transition-colors duration-200 hover:text-[#C5A059] focus:outline-none focus-visible:bg-black/[0.03] focus-visible:text-[#C5A059]"
                    >
                      {value}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="submit"
            className="rounded-sm bg-[#C5A059] px-6 py-3 text-sm font-medium uppercase tracking-[0.16em] text-[#1A1A1B] shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:brightness-110"
          >
            {copy.searchButton}
          </button>

          {(isSearching || searchDone) && (
            <div className="sm:col-span-3">
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
