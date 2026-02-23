"use client";

import { Locale, localized } from "@/lib/content";
import { AnimatePresence, motion } from "framer-motion";

type MobileStickyBookingBarProps = {
  showBar: boolean;
  locale: Locale;
  onBookClick: () => void;
};

const barTransition = {
  type: "tween",
  duration: 0.4,
  ease: "easeInOut",
} as const;

export function MobileStickyBookingBar({
  showBar,
  locale,
  onBookClick,
}: MobileStickyBookingBarProps) {
  const copy = localized[locale];

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 md:hidden"
      aria-hidden={!showBar}
    >
      <AnimatePresence mode="wait">
        {showBar && (
          <motion.div
            key="sticky-booking-bar"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={barTransition}
            className="pointer-events-auto flex min-h-[56px] flex-col items-center justify-center border-t border-black/[0.06] bg-[#FFFFFF] px-4 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] pt-2.5 shadow-[0_-2px_12px_rgba(0,0,0,0.04)]"
          >
            <button
              type="button"
              onClick={onBookClick}
              className="w-[90%] shrink-0 rounded-[2px] bg-[#C5A059] py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-[#1A1A1B] shadow-md transition-all duration-300 active:scale-[0.98] hover:brightness-110"
              aria-label={copy.stickyBook}
            >
              {copy.stickyBook}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
