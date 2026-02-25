"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { CalendarDays, LoaderCircle, Minus, Plus, Users } from "lucide-react";
import { FormEvent, ChangeEvent, useCallback, useEffect, useId, useRef, useState } from "react";
import { Locale, localized, BOOKING_MODAL_MAX_GUESTS } from "@/lib/content";
import { useIsMobile } from "@/hooks/useIsMobile";
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

const MOBILE_BREAKPOINT = 768;
const HERO_POSTER_DESKTOP = "/images/hero-poster%20desktop.webp";
const HERO_POSTER_MOBILE = "/images/hero-poster%20mobile.webp";

export function Hero({ locale }: HeroProps) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchDone, setSearchDone] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [posterSrc, setPosterSrc] = useState<string>(HERO_POSTER_MOBILE);
  const [videoReady, setVideoReady] = useState(false);
  const [disableParallax, setDisableParallax] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dateDropdownRef = useRef<HTMLDivElement>(null);
  const guestsGroupId = useId();
  const copy = localized[locale];
  const isMobile = useIsMobile();
  const closeCalendar = useCallback(() => setShowCalendar(false), []);

  const ctaTapProps = isMobile
    ? { whileTap: { scale: 0.95 }, transition: { type: "spring" as const, stiffness: 400, damping: 17 } }
    : {};

  useOnClickOutside(dateDropdownRef, closeCalendar);

  useEffect(() => {
    const { checkIn: defIn, checkOut: defOut } = getDefaultCheckInCheckOut();
    setCheckIn((prev: string) => prev || defIn);
    setCheckOut((prev: string) => prev || defOut);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Disable parallax on mobile for simpler scrolling.
  useEffect(() => {
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isSmallScreen = window.innerWidth <= MOBILE_BREAKPOINT;
    setDisableParallax(isIOS || isSmallScreen);
  }, []);

  useEffect(() => {
    const posterMq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const updatePoster = () => {
      const mobile = posterMq.matches;
      setPosterSrc(mobile ? HERO_POSTER_MOBILE : HERO_POSTER_DESKTOP);
    };
    updatePoster();
    posterMq.addEventListener("change", updatePoster);
    return () => posterMq.removeEventListener("change", updatePoster);
  }, []);

  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 600], [0, 90]);

  const minCheckIn = todayISO();
  const minCheckOut = checkIn || minCheckIn;
  const datesPlaceholder = copy.searchDates;
  const datesDisplayFull =
    checkIn && checkOut
      ? `${formatISOToDDMMYYYY(checkIn)} — ${formatISOToDDMMYYYY(checkOut)}`
      : datesPlaceholder;
  const datesDisplayShort =
    checkIn && checkOut
      ? `${formatISOToDDMM(checkIn)} - ${formatISOToDDMM(checkOut)}`
      : datesPlaceholder;

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
      <motion.div
        className="absolute inset-0 z-0"
        style={reducedMotion || disableParallax ? undefined : { y: parallaxY }}
      >
        {/* Hero background: video with poster that fades out when video is ready. */}
        <video
          ref={videoRef}
          src="/video/hero-video.mp4"
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 z-[1] h-full w-full object-cover object-center"
          onPlaying={() => setVideoReady(true)}
          aria-hidden
        />
        <motion.div
          className="absolute inset-0 z-[2] overflow-hidden pointer-events-none"
          initial={false}
          animate={{ opacity: videoReady ? 0 : 1 }}
          transition={{ duration: 1, ease: [0.22, 0.61, 0.36, 1] }}
          role="img"
          aria-hidden
        >
          <img
            src={posterSrc}
            alt=""
            className="h-full w-full object-cover object-center"
            fetchPriority="high"
          />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 z-[3] bg-black/45" />
      <div className="absolute inset-x-0 top-0 z-[3] h-60 bg-gradient-to-b from-black/55 via-black/20 to-transparent" />

      <div className="relative z-[30] mx-auto flex min-h-screen max-w-6xl flex-col justify-end px-6 pb-24 pt-36 sm:px-8 md:px-12 md:pb-28 md:pt-40">
        <motion.p
          initial={{ opacity: 1, y: 0 }}
          className="mb-5 text-xs uppercase tracking-[0.22em] text-[#C5A059]"
        >
          {copy.heroTag}
        </motion.p>
        <motion.h1
          initial={{ opacity: 1, y: 0 }}
          className="max-w-3xl text-4xl font-semibold tracking-[0.08em] text-white sm:text-6xl md:text-7xl"
        >
          {copy.heroTitle}
        </motion.h1>
        <motion.p
          initial={{ opacity: 1, y: 0 }}
          className="mt-5 max-w-xl text-base font-light text-white/90 sm:text-xl"
        >
          {copy.heroSubtitle}
        </motion.p>

        <motion.form
          id="booking"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.24, ease: [0.22, 0.61, 0.36, 1] }}
          onSubmit={onSubmit}
          className="relative mt-12 grid gap-3 rounded-sm border border-white/20 bg-white/93 p-4 text-black shadow-[0_18px_50px_rgba(0,0,0,0.24)] [--search-button-height:3rem] sm:grid-cols-[1.3fr_1fr_auto] sm:items-center"
        >
          <div ref={dateDropdownRef} className="relative">
            <button
              onClick={() => setShowCalendar((value: boolean) => !value)}
              className="booking-input flex h-[var(--search-button-height)] w-full items-center justify-between rounded-sm border border-black/15 bg-white px-3 text-left text-sm transition-[border-color,background-color] duration-150 md:hover:border-black/25 md:hover:bg-black/[0.02]"
              type="button"
            >
              <span className="flex items-center gap-2 text-[#4A4A4A]">
                <CalendarDays className="h-4 w-4 shrink-0" />
                {copy.searchDates}
              </span>
              <span className="date-range min-w-0 text-right text-[14px] font-medium text-[#1A1A1B] md:text-left">
                <span className="md:hidden">{datesDisplayShort}</span>
                <span className="hidden md:inline">{datesDisplayFull}</span>
              </span>
            </button>

            <motion.div
              initial={false}
              animate={
                showCalendar
                  ? { opacity: 1, y: 8, pointerEvents: "auto" }
                  : { opacity: 0, y: 0, pointerEvents: "none" }
              }
              transition={{ duration: 0.2 }}
              className="date-picker-dropdown md:pb-dropdown absolute left-0 right-0 z-[100] mt-2 mb-4 max-h-[80vh] max-w-full overflow-y-auto overflow-x-hidden rounded-sm border border-black/10 bg-white p-4 shadow-xl max-md:top-[calc(100%+10px)] max-md:mt-0 max-md:border-t-0 max-md:shadow-[0_8px_24px_rgba(0,0,0,0.08)] md:left-auto md:right-auto md:min-w-[280px]"
              style={{ transform: "translateZ(0)" }}
            >
              <p className="mb-3 text-xs uppercase tracking-[0.16em] text-[#4A4A4A]">
                {copy.calendarLabel}
              </p>
              <div className="flex min-w-0 flex-col gap-4 md:grid md:grid-cols-2 md:gap-x-4 md:gap-y-3">
                <div className="flex min-w-0 flex-col gap-1.5">
                  <span className="text-sm text-[#4A4A4A]">{copy.dateCheckInLabel}</span>
                  <input
                    type="date"
                    min={minCheckIn}
                    value={checkIn}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const v = e.target.value;
                      setCheckIn(v);
                      if (checkOut && v >= checkOut) setCheckOut("");
                    }}
                    className="date-input-ios box-border h-10 w-full min-w-0 rounded border border-black/15 bg-white px-3 py-2 text-base text-[#1A1A1B] outline-none transition focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-1.5">
                  <span className="text-sm text-[#4A4A4A]">{copy.dateCheckOutLabel}</span>
                  <input
                    type="date"
                    min={minCheckOut}
                    value={checkOut}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setCheckOut(e.target.value)}
                    className="date-input-ios box-border h-10 w-full min-w-0 rounded border border-black/15 bg-white px-3 py-2 text-base text-[#1A1A1B] outline-none transition focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          <div
            role="group"
            aria-labelledby={guestsGroupId}
            className="booking-input flex h-[var(--search-button-height)] w-full items-center justify-between rounded-sm border border-black/15 bg-white px-3 text-sm transition-[border-color,background-color] duration-150 md:hover:border-black/25 md:hover:bg-black/[0.02]"
          >
            <span id={guestsGroupId} className="flex items-center gap-2 text-[#4A4A4A]">
              <Users className="h-4 w-4 shrink-0" />
              {copy.searchGuests}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                disabled={guests <= 1}
                className="touch-target flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded p-1.5 text-[#4A4A4A] transition hover:bg-black/5 disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:ring-offset-2"
                aria-label={locale === "ua" ? "Зменшити кількість гостей" : "Decrease guests"}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-[2rem] text-center text-[14px] font-medium text-[#1A1A1B]" aria-live="polite">
                {guests}
              </span>
              <button
                type="button"
                onClick={() => setGuests((g) => Math.min(BOOKING_MODAL_MAX_GUESTS, g + 1))}
                disabled={guests >= BOOKING_MODAL_MAX_GUESTS}
                className="touch-target flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded p-1.5 text-[#4A4A4A] transition hover:bg-black/5 disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:ring-offset-2"
                aria-label={locale === "ua" ? "Збільшити кількість гостей" : "Increase guests"}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            {...ctaTapProps}
            className="flex h-[var(--search-button-height)] items-center justify-center rounded-sm bg-[#C5A059] px-6 text-sm font-medium uppercase tracking-[0.16em] text-[#1A1A1B] shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:brightness-110"
          >
            {copy.searchButton}
          </motion.button>

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
