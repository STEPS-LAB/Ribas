import { Locale, localized } from "@/lib/content";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

type FooterProps = {
  locale: Locale;
};

export function Footer({ locale }: FooterProps) {
  const copy = localized[locale];

  return (
    <footer
      id="contacts"
      className="bg-[#111111] pb-[calc(72px+env(safe-area-inset-bottom))] pt-20 text-white md:pb-10"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="text-sm uppercase tracking-[0.18em] text-[#C5A059]">{copy.contactHeading}</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/80">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#C5A059]" />
                {copy.footerAddress}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-[#C5A059]" />
                <a href="tel:+380670000000" className="hover:text-[#C5A059] transition-colors">
                  +38 (067) 000 00 00
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#C5A059]" />
                welcome@ribaskarpaty.com
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.18em] text-[#C5A059]">{copy.socialHeading}</h3>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-white/20 px-4 py-2 text-sm text-white/80 transition hover:border-[#C5A059] hover:text-[#C5A059]"
              >
                <Instagram className="h-4 w-4" /> {copy.footerInstagram}
              </a>
              <a
                href="https://www.facebook.com/Ribas.karpaty/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-white/20 px-4 py-2 text-sm text-white/80 transition hover:border-[#C5A059] hover:text-[#C5A059]"
              >
                <Facebook className="h-4 w-4" /> {copy.footerFacebook}
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.18em] text-[#C5A059]">
              {copy.footerNewsletter}
            </h3>
            <form className="mt-5 flex gap-2">
              <input
                type="email"
                placeholder={copy.emailPlaceholder}
                className="w-full rounded-sm border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/45 focus:outline-none"
              />
              <button
                type="button"
                className="rounded-sm bg-[#C5A059] px-4 py-2 text-xs uppercase tracking-[0.14em] text-black"
              >
                {copy.footerSubscribe}
              </button>
            </form>
          </div>
        </div>

        <p className="mt-12 border-t border-white/10 pt-6 text-center text-sm font-light tracking-[0.16em] text-white/60">
          {copy.footerCredits.split("STEPS LAB")[0]}
          <a
            href="https://stepslab.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C5A059] transition-colors duration-300 hover:opacity-80"
          >
            STEPS LAB
          </a>
          {copy.footerCredits.split("STEPS LAB")[1]}
        </p>
      </div>
    </footer>
  );
}
