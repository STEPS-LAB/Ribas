"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { CalendarDays, LoaderCircle, Users } from "lucide-react";
import { FormEvent, ChangeEvent, useCallback, useEffect, useId, useRef, useState } from "react";
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
  const guestsSelectId = useId();
  const copy = localized[locale];
  const closeCalendar = useCallback(() => setShowCalendar(false), []);

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

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-end px-6 pb-24 pt-36 sm:px-8 md:px-12 md:pb-28 md:pt-40">
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
          className="relative mt-12 grid gap-3 rounded-sm border border-white/20 bg-white/93 p-4 text-black shadow-[0_18px_50px_rgba(0,0,0,0.24)] sm:grid-cols-[1.3fr_1fr_auto] sm:items-center"
        >
          <div ref={dateDropdownRef} className="relative">
            <button
              onClick={() => setShowCalendar((value: boolean) => !value)}
              className="flex w-full items-center justify-between rounded-sm border border-black/15 bg-white px-3 py-3 text-left text-sm"
              type="button"
            >
              <span className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-[#4A4A4A]" />
                {copy.searchDates}
              </span>
              <span className="text-xs text-[#4A4A4A]">{datesDisplay}</span>
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
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setCheckOut(e.target.value)}
                    className="box-border h-10 w-full min-w-0 rounded border border-black/15 bg-white px-3 py-2 text-sm text-[#1A1A1B] outline-none transition focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          <label
            htmlFor={guestsSelectId}
            className="flex w-full cursor-pointer items-center gap-2 rounded-sm border border-black/15 bg-white px-3 py-3 text-sm transition-colors duration-200 hover:bg-black/[0.02]"
          >
            <Users className="h-4 w-4 shrink-0 text-[#4A4A4A]" />
            {copy.searchGuests}
            <select
              id={guestsSelectId}
              className="ml-auto min-h-[1.5rem] w-full cursor-pointer bg-transparent text-sm outline-none"
              value={guests}
              onChange={(event: ChangeEvent<HTMLSelectElement>) => setGuests(Number(event.target.value))}
              aria-label={copy.searchGuests}
            >
              {guestOptions.map((value: number) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>

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
