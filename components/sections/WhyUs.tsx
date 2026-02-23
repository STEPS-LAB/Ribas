import { MotionReveal } from "@/components/ui/MotionReveal";
import { Locale, localized, whyItems } from "@/lib/content";
import { Gem, MapPin, Mountain, Sparkles } from "lucide-react";

type WhyUsProps = {
  locale: Locale;
};

const icons = [MapPin, Mountain, Sparkles, Gem];

export function WhyUs({ locale }: WhyUsProps) {
  const copy = localized[locale];

  return (
    <section id="why-us" className="bg-[#1A1A1B] py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <MotionReveal>
          <p className="text-xs uppercase tracking-[0.2em] text-[#C5A059]">{copy.whyLabel}</p>
          <h2 className="mt-4 text-3xl font-semibold text-white md:text-5xl">{copy.whyTitle}</h2>
          <p className="mt-5 max-w-3xl font-light text-white/70">{copy.whySubtitle}</p>
        </MotionReveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {whyItems[locale].map((item, index) => {
            const Icon = icons[index];

            return (
              <MotionReveal key={item.id} delay={index * 0.08}>
                <article className="rounded-sm border border-white/15 bg-white/[0.03] p-6">
                  <Icon className="h-5 w-5 text-[#C5A059]" />
                  <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{item.description}</p>
                </article>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
