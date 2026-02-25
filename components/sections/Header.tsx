"use client";

import clsx from "clsx";
import { Locale, localized } from "@/lib/content";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const HEADER_HEIGHT_CLASS = "h-18 min-h-[4.5rem]";

const NAV_LINKS = [
  { key: "navRooms" as const, href: "#rooms" },
  { key: "navSpa" as const, href: "#amenities" },
  { key: "navRestaurant" as const, href: "#amenities" },
  { key: "navContacts" as const, href: "#contacts" },
] as const;

type HeaderProps = {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  onBookClick: () => void;
};

export function Header({ locale, onLocaleChange, onBookClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleEsc = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [menuOpen]);

  const copy = localized[locale];
  const isLightHeader = isScrolled;
  const burgerColor = isLightHeader ? "bg-[#1A1A1B]" : "bg-white";

  return (
    <>
      <header
        ref={headerRef}
        className={clsx(
          "fixed inset-x-0 top-0 z-50 border-b transition-all duration-500",
          HEADER_HEIGHT_CLASS,
          isScrolled
            ? "border-black/10 bg-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl"
            : "border-transparent bg-white/10 backdrop-blur-xl"
        )}
      >
        <div className={clsx("mx-auto flex max-w-6xl items-center justify-between px-6 md:px-10", HEADER_HEIGHT_CLASS)}>
          <a href="#" className={clsx("text-sm tracking-[0.28em]", isLightHeader ? "text-black" : "text-white")}>
            RIBAS KARPATY
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            {NAV_LINKS.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                className={clsx(
                  "text-sm font-light tracking-[0.06em] transition hover:opacity-80",
                  isLightHeader ? "text-[#1A1A1B]" : "text-white"
                )}
              >
                {copy[key]}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-sm border border-white/30 bg-black/15 p-1 backdrop-blur md:gap-3">
              {(["ua", "en"] as const).map((code) => (
                <button
                  key={code}
                  className={clsx(
                    "rounded-sm px-3 py-1.5 text-xs uppercase tracking-[0.14em] transition",
                    locale === code
                      ? "bg-[#C5A059] text-black"
                      : "text-white/85 hover:bg-white/15"
                  )}
                  onClick={() => onLocaleChange(code)}
                  type="button"
                >
                  {code}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={onBookClick}
              className={clsx(
                "hidden rounded-sm px-4 py-2.5 text-xs font-medium uppercase tracking-[0.14em] transition-all duration-300 md:inline-flex",
                "bg-[#C5A059] text-[#1A1A1B] shadow-md hover:shadow-lg hover:brightness-110"
              )}
              aria-label={copy.navBook}
            >
              {copy.navBook}
            </button>

            {/* Burger (mobile) */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex flex-col justify-center gap-1.5 rounded p-2 md:hidden"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span className={clsx("h-[1.5px] w-5 rounded-full transition", burgerColor)} style={{ fontWeight: 300 }} />
              <span className={clsx("h-[1.5px] w-5 rounded-full transition", burgerColor)} style={{ fontWeight: 300 }} />
              <span className={clsx("h-[1.5px] w-5 rounded-full transition", burgerColor)} style={{ fontWeight: 300 }} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-md md:hidden"
              aria-hidden="true"
              onClick={() => setMenuOpen(false)}
            />
            <motion.button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="fixed right-6 top-[max(0.875rem,env(safe-area-inset-top))] z-[62] flex min-h-[44px] min-w-[44px] items-center justify-center rounded text-[#1A1A1B] outline-none transition-opacity duration-200 active:opacity-70 md:hidden"
              aria-label="Close menu"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <span className="relative flex h-5 w-5 shrink-0 items-center justify-center" aria-hidden>
                <span
                  className="absolute h-[1.5px] w-5 rounded-full bg-[#1A1A1B]"
                  style={{ transform: "rotate(45deg)" }}
                />
                <span
                  className="absolute h-[1.5px] w-5 rounded-full bg-[#1A1A1B]"
                  style={{ transform: "rotate(-45deg)" }}
                />
              </span>
            </motion.button>
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-[61] w-[min(88vw,320px)] bg-white shadow-2xl md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
            >
              <nav className="flex flex-col gap-1 pt-24 pb-8 pl-8 pr-6" aria-label="Mobile">
                {NAV_LINKS.map(({ key, href }, i) => (
                  <motion.a
                    key={key}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 + i * 0.05, duration: 0.3, ease: "easeOut" }}
                    className="font-light leading-[2.2] text-[#1A1A1B] tracking-[0.04em] hover:opacity-70"
                    style={{ fontWeight: 300, fontSize: "1.05rem" }}
                  >
                    {copy[key]}
                  </motion.a>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
