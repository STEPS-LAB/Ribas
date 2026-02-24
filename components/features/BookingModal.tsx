"use client";

import { Locale, localized, BOOKING_MODAL_MAX_GUESTS } from "@/lib/content";
import { getDefaultCheckInCheckOut, todayISO } from "@/lib/dates";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Minus, Plus, Users, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState, FormEvent } from "react";

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
};

export function BookingModal({ isOpen, onClose, locale }: BookingModalProps) {
  const copy = localized[locale];
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveRef = useRef<HTMLElement | null>(null);
  const checkInId = useId();
  const checkOutId = useId();
  const guestsId = useId();

  const minCheckIn = todayISO();
  const minCheckOut = checkIn || minCheckIn;

  useEffect(() => {
    if (!isOpen || checkIn) return;
    const { checkIn: defIn, checkOut: defOut } = getDefaultCheckInCheckOut();
    setCheckIn(defIn);
    setCheckOut(defOut);
  }, [isOpen, checkIn]);

  const lockScroll = useCallback(() => {
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    previousActiveRef.current = document.activeElement as HTMLElement | null;
    lockScroll();
    return () => {
      unlockScroll();
      previousActiveRef.current?.focus();
    };
  }, [isOpen, lockScroll, unlockScroll]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;
    const dialog = dialogRef.current;
    const focusables = dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    first?.focus();

    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    dialog.addEventListener("keydown", handleKeyDown);
    return () => dialog.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleOverlayClick}
        >
          <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" aria-hidden="true" />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            aria-label={copy.bookingModalTitle}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
            className="relative w-full max-w-md rounded-lg border border-black/10 bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-black/10 px-4 py-3 sm:px-5">
              <h2 id="booking-modal-title" className="text-lg font-semibold tracking-tight text-[#1A1A1B]">
                {copy.bookingModalTitle}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded p-1.5 text-[#4A4A4A] transition hover:opacity-80 hover:bg-black/[0.04] focus:outline-none focus:opacity-80 focus:bg-black/[0.04]"
                aria-label={copy.modalClose}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-5">
              <div className="space-y-4">
                <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-3">
                  <label htmlFor={checkInId} className="flex flex-col gap-1.5 text-sm">
                    <span className="flex items-center gap-2 text-[#4A4A4A]">
                      <CalendarDays className="h-4 w-4" />
                      {copy.checkIn}
                    </span>
                    <div className="relative">
                      <input
                        id={checkInId}
                        type="date"
                        required
                        min={minCheckIn}
                        value={checkIn}
                        onChange={(e) => {
                          setCheckIn(e.target.value);
                          if (checkOut && e.target.value >= checkOut) setCheckOut("");
                        }}
                        className={`input-date-premium relative min-w-0 ${!checkIn ? "text-transparent md:text-[#1A1A1B]" : "text-[#1A1A1B]"}`}
                      />
                      <span className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4A4A4A]" aria-hidden>
                        <CalendarDays className="h-4 w-4" />
                      </span>
                      {!checkIn && (
                        <span
                          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#4A4A4A] md:hidden"
                          aria-hidden
                        >
                          {copy.datePlaceholder}
                        </span>
                      )}
                    </div>
                  </label>
                  <label htmlFor={checkOutId} className="flex flex-col gap-1.5 text-sm">
                    <span className="flex items-center gap-2 text-[#4A4A4A]">
                      <CalendarDays className="h-4 w-4" />
                      {copy.checkOut}
                    </span>
                    <div className="relative">
                      <input
                        id={checkOutId}
                        type="date"
                        required
                        min={minCheckOut}
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className={`input-date-premium relative min-w-0 ${!checkOut ? "text-transparent md:text-[#1A1A1B]" : "text-[#1A1A1B]"}`}
                      />
                      <span className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4A4A4A]" aria-hidden>
                        <CalendarDays className="h-4 w-4" />
                      </span>
                      {!checkOut && (
                        <span
                          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#4A4A4A] md:hidden"
                          aria-hidden
                        >
                          {copy.datePlaceholder}
                        </span>
                      )}
                    </div>
                  </label>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span id={guestsId} className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                    <Users className="h-4 w-4" />
                    {copy.guestsLabel}
                  </span>
                  <div
                    role="group"
                    aria-labelledby={guestsId}
                    className="flex items-center justify-between rounded border border-black/15 bg-white px-3 py-2"
                  >
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      disabled={guests <= 1}
                      className="rounded p-1.5 text-[#4A4A4A] transition hover:bg-black/5 disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:ring-offset-2"
                      aria-label={locale === "ua" ? "Зменшити кількість гостей" : "Decrease guests"}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-[2rem] text-center font-medium text-[#1A1A1B]">
                      {guests}
                    </span>
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.min(BOOKING_MODAL_MAX_GUESTS, g + 1))}
                      disabled={guests >= BOOKING_MODAL_MAX_GUESTS}
                      className="rounded p-1.5 text-[#4A4A4A] transition hover:bg-black/5 disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:ring-offset-2"
                      aria-label={locale === "ua" ? "Збільшити кількість гостей" : "Increase guests"}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-sm bg-[#C5A059] px-4 py-3 text-sm font-medium uppercase tracking-[0.14em] text-[#1A1A1B] shadow-md transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:ring-offset-2"
              >
                {copy.pickRoomButton}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
