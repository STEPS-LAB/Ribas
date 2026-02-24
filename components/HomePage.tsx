"use client";

import { useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Locale } from "@/lib/content";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Rooms } from "@/components/sections/Rooms";
import { Amenities } from "@/components/sections/Amenities";
import { WhyUs } from "@/components/sections/WhyUs";
import { Footer } from "@/components/sections/Footer";

const AIAssistantWidget = dynamic(
  () => import("@/components/features/AIAssistantWidget").then((m) => ({ default: m.AIAssistantWidget })),
  { ssr: true }
);

const BookingModal = dynamic(
  () => import("@/components/features/BookingModal").then((m) => ({ default: m.BookingModal })),
  { ssr: true }
);

const MobileStickyBookingBar = dynamic(
  () => import("@/components/features/MobileStickyBookingBar").then((m) => ({ default: m.MobileStickyBookingBar })),
  { ssr: true }
);

export function HomePage() {
  const [locale, setLocale] = useState<Locale>("ua");
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { amount: 0, once: false });
  const showStickyBar = !isHeroInView;
  const showChat = !isHeroInView;

  useEffect(() => {
    document.documentElement.lang = locale === "ua" ? "uk" : "en";
  }, [locale]);

  return (
    <div className="page-with-sticky-bar min-h-screen bg-white">
      <Header
        locale={locale}
        onLocaleChange={setLocale}
        onBookClick={() => setBookingModalOpen(true)}
      />
      <main>
        <div ref={heroRef}>
          <Hero locale={locale} />
        </div>
        <About locale={locale} />
        <Rooms locale={locale} />
        <Amenities locale={locale} />
        <WhyUs locale={locale} />
      </main>
      <Footer locale={locale} />
      <AIAssistantWidget locale={locale} visible={showChat} />
      <MobileStickyBookingBar
        showBar={showStickyBar}
        locale={locale}
        onBookClick={() => setBookingModalOpen(true)}
      />
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        locale={locale}
      />
    </div>
  );
}
