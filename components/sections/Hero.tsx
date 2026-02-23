"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { CalendarDays, LoaderCircle, Users } from "lucide-react";
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Locale, localized } from "@/lib/content";

type HeroProps = {
  locale: Locale;
};

const guestOptions = [1, 2, 3, 4, 5, 6];
const startDate = "2026-03-14";
const endDate = "2026-03-17";
const heroVideoId = "ODR5b6kcyis";
const heroVideoEmbedUrl = `https://www.youtube-nocookie.com/embed/${heroVideoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${heroVideoId}&playsinline=1&modestbranding=1&rel=0&iv_load_policy=3&fs=0&showinfo=0`;

const PREVIEW_TRANSITION_DURATION = 0.8;
const PREVIEW_EASING: [number, number, number, number] = [0.4, 0, 0.2, 1];
const VIDEO_READY_DELAY_MS = 1400;

export function Hero({ locale }: HeroProps) {
  const [dates, setDates] = useState(`${startDate} - ${endDate}`);
  const [guests, setGuests] = useState(2);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchDone, setSearchDone] = useState(false);
  const [mountHeroVideo, setMountHeroVideo] = useState(false);
  const [videoRevealed, setVideoRevealed] = useState(false);
  const [posterTransitionDone, setPosterTransitionDone] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const revealTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copy = localized[locale];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 600], [0, 90]);

  useEffect(() => {
    if (reducedMotion) return;
    const mountTimer = setTimeout(() => setMountHeroVideo(true), 100);
    return () => clearTimeout(mountTimer);
  }, [reducedMotion]);

  const onIframeLoad = useCallback(() => {
    if (reducedMotion) return;
    revealTimeoutRef.current = setTimeout(
      () => setVideoRevealed(true),
      VIDEO_READY_DELAY_MS
    );
  }, [reducedMotion]);


  useEffect(() => {
    return () => {
      if (revealTimeoutRef.current) clearTimeout(revealTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!videoRevealed) return;
    const t = setTimeout(
      () => setPosterTransitionDone(true),
      (PREVIEW_TRANSITION_DURATION + 0.05) * 1000
    );
    return () => clearTimeout(t);
  }, [videoRevealed]);

  const datePresets = useMemo(
    () => [
      `${startDate} - ${endDate}`,
      "2026-04-02 - 2026-04-06",
      "2026-04-18 - 2026-04-21",
    ],
    []
  );

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
        {mountHeroVideo && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: reducedMotion ? 1 : videoRevealed ? 1 : 0 }}
            transition={{
              duration: PREVIEW_TRANSITION_DURATION,
              ease: PREVIEW_EASING,
            }}
          >
            <iframe
              className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
              src={heroVideoEmbedUrl}
              title="Ribas Karpaty Hero Video"
              allow="autoplay; encrypted-media; picture-in-picture"
              loading="lazy"
              onLoad={onIframeLoad}
            />
          </motion.div>
        )}
        {!posterTransitionDone && (
          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={false}
            animate={{
              opacity: reducedMotion || !videoRevealed ? 1 : 0,
              pointerEvents: videoRevealed ? "none" : "auto",
            }}
            transition={{
              duration: PREVIEW_TRANSITION_DURATION,
              ease: PREVIEW_EASING,
            }}
          >
            <div
              className="hero-poster-bg absolute inset-0 min-h-full min-w-full bg-cover bg-center bg-no-repeat"
              role="img"
              aria-label="Карпати — стоп-кадр з відео, гори без тексту"
            />
          </motion.div>
        )}
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
              <span className="text-xs text-[#4A4A4A]">{dates}</span>
            </button>

            <motion.div
              initial={false}
              animate={
                showCalendar
                  ? { opacity: 1, y: 8, pointerEvents: "auto" }
                  : { opacity: 0, y: 0, pointerEvents: "none" }
              }
              transition={{ duration: 0.2 }}
              className="absolute z-20 mt-2 w-full rounded-sm border border-black/10 bg-white p-3 shadow-xl"
            >
              <p className="mb-2 text-xs uppercase tracking-[0.16em] text-[#4A4A4A]">
                {copy.calendarLabel}
              </p>
              <div className="space-y-1">
                {datePresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      setDates(preset);
                      setShowCalendar(false);
                    }}
                    className="w-full rounded-sm px-2 py-2 text-left text-sm transition hover:bg-[#F9F9F9]"
                  >
                    {preset}
                  </button>
                ))}
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
