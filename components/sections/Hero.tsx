"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { CalendarDays, LoaderCircle, Users } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Locale, localized } from "@/lib/content";

type HeroProps = {
  locale: Locale;
};

const guestOptions = [1, 2, 3, 4, 5, 6];
const defaultCheckIn = "2026-03-14";
const defaultCheckOut = "2026-03-17";

function formatISOToDDMMYYYY(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

const PREVIEW_TRANSITION_DURATION = 0.6;
const PREVIEW_EASING: [number, number, number, number] = [0.4, 0, 0.2, 1];

const MOBILE_BREAKPOINT = 768;
const HERO_VIDEO_DESKTOP = "/videos/hero.webm";
const HERO_VIDEO_MOBILE = "/videos/hero-mobile.webm";
const HERO_POSTER_DESKTOP = "/images/hero-poster%20desktop.webp";
const HERO_POSTER_MOBILE = "/images/hero-poster%20mobile.webp";

export function Hero({ locale }: HeroProps) {
  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [guests, setGuests] = useState(2);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchDone, setSearchDone] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [posterSrc, setPosterSrc] = useState<string>(HERO_POSTER_MOBILE);
  const videoRef = useRef<HTMLVideoElement>(null);
  const copy = localized[locale];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let fallbackTried = false;
    const isMobile = () => window.innerWidth <= MOBILE_BREAKPOINT;

    const setSource = () => {
      fallbackTried = false;
      const mobile = isMobile();
      const src = mobile ? HERO_VIDEO_MOBILE : HERO_VIDEO_DESKTOP;
      video.poster = mobile ? HERO_POSTER_MOBILE : HERO_POSTER_DESKTOP;
      video.pause();
      video.removeAttribute("src");
      video.load();
      video.src = src;
      video.load();
      video.play().catch(() => {});
    };

    const onError = () => {
      if (fallbackTried) return;
      fallbackTried = true;
      video.src = HERO_VIDEO_DESKTOP;
      video.load();
      video.play().catch(() => {});
    };

    video.addEventListener("error", onError);
    setSource();
    const onResize = () => setSource();
    window.addEventListener("resize", onResize);
    return () => {
      video.removeEventListener("error", onError);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 600], [0, 90]);

  const onCanPlay = () => setVideoReady(true);

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
        className="absolute inset-0"
        style={reducedMotion ? undefined : { y: parallaxY }}
      >
        {/* Poster: shown immediately for LCP; fades out when video is ready. Responsive: mobile vs desktop. */}
        <motion.div
          className="absolute inset-0 z-[1] overflow-hidden"
          initial={false}
          animate={{
            opacity: reducedMotion || !videoReady ? 1 : 0,
            pointerEvents: videoReady ? "none" : "auto",
          }}
          transition={{
            duration: PREVIEW_TRANSITION_DURATION,
            ease: PREVIEW_EASING,
          }}
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
        {/* Local video from /videos; src set in useEffect (mobile vs desktop), then play() */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={posterSrc}
          onCanPlay={onCanPlay}
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-x-0 top-0 h-60 bg-gradient-to-b from-black/55 via-black/20 to-transparent" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-end px-6 pb-24 pt-36 sm:px-8 md:px-12 md:pb-28 md:pt-40">
        <motion.p
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          className="mb-5 text-xs uppercase tracking-[0.22em] text-[#C5A059]"
        >
          {copy.heroTag}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 0.61, 0.36, 1] }}
          className="max-w-3xl text-4xl font-semibold tracking-[0.08em] text-white sm:text-6xl md:text-7xl"
        >
          {copy.heroTitle}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.16, ease: [0.22, 0.61, 0.36, 1] }}
          className="mt-5 max-w-xl text-base font-light text-white/90 sm:text-xl"
        >
          {copy.heroSubtitle}
        </motion.p>

        <motion.form
          id="booking"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.24, ease: [0.22, 0.61, 0.36, 1] }}
          onSubmit={onSubmit}
          className="relative mt-12 grid gap-3 rounded-sm border border-white/20 bg-white/93 p-4 text-black shadow-[0_18px_50px_rgba(0,0,0,0.24)] sm:grid-cols-[1.3fr_1fr_auto] sm:items-center"
        >
          <div className="relative">
            <button
              onClick={() => setShowCalendar((value) => !value)}
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

          <label className="flex items-center gap-2 rounded-sm border border-black/15 bg-white px-3 py-3 text-sm">
            <Users className="h-4 w-4 text-[#4A4A4A]" />
            {copy.searchGuests}
            <select
              className="ml-auto bg-transparent text-sm outline-none"
              value={guests}
              onChange={(event) => setGuests(Number(event.target.value))}
            >
              {guestOptions.map((value) => (
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
