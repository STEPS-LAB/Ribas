"use client";

import { Locale, localized } from "@/lib/content";
import { MessageCircle, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const syncTransition = { type: "tween" as const, duration: 0.4, ease: "easeInOut" };

type AIAssistantWidgetProps = {
  locale: Locale;
  visible?: boolean;
};

export function AIAssistantWidget({ locale, visible = true }: AIAssistantWidgetProps) {
  const [open, setOpen] = useState(false);
  const copy = localized[locale];

  return (
    <motion.div
      aria-hidden={!visible}
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 16,
        pointerEvents: visible ? "auto" : "none",
      }}
      transition={syncTransition}
      className="fixed bottom-24 right-4 z-40 md:bottom-8 md:right-8"
    >
      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen((value) => !value)}
        type="button"
        className="inline-flex items-center gap-2 rounded-sm border border-[#C5A059]/50 bg-[#1A1A1B] px-4 py-3 text-xs uppercase tracking-[0.12em] text-white shadow-xl [&_svg]:transition [&_svg]:hover:opacity-80 [&_svg]:focus:opacity-80"
      >
        {open ? <X className="h-5 w-5 shrink-0 text-[#C5A059]" aria-hidden /> : <MessageCircle className="h-5 w-5 shrink-0 text-[#C5A059]" aria-hidden />}
        <span className="hidden sm:inline">{copy.chatCta}</span>
      </motion.button>

      <motion.div
        initial={false}
        animate={
          open
            ? { opacity: 1, y: 0, pointerEvents: "auto" }
            : { opacity: 0, y: 20, pointerEvents: "none" }
        }
        transition={{ duration: 0.22 }}
        className="fixed left-4 right-4 bottom-40 z-40 mx-auto w-full max-w-[min(92vw,440px)] rounded-sm border border-black/10 bg-white p-7 shadow-[0_18px_60px_rgba(0,0,0,0.2)] md:left-auto md:right-8 md:bottom-24 md:w-[440px] md:min-h-[200px]"
      >
        <p className="text-xs uppercase tracking-[0.16em] text-[#C5A059]">AI Concierge</p>
        <p className="mt-4 text-base leading-[1.65] text-[#1A1A1B]">{copy.chatGreeting}</p>
        <div className="mt-5 rounded-sm border border-black/10 bg-[#F9F9F9] px-4 py-3.5 text-sm leading-relaxed text-[#4A4A4A]">
          Demo mode: інтеграція з real AI/API може бути підключена окремим етапом.
        </div>
      </motion.div>
    </motion.div>
  );
}
