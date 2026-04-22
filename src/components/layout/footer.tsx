"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from 'next-intl';

export function Footer() {
  const pathname = usePathname();
  const t = useTranslations('Footer');

  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    if (pathname === href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <footer className="bg-[#0e1117] border-t border-white/[0.06] pt-16 pb-10">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Top section: Brand + Nav columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" onClick={handleNavClick("/")} className="inline-block mb-6">
              <span className="text-white font-black text-2xl tracking-widest uppercase">EPAY</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs font-medium tracking-tight">
              {t('brandDescription')}
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white/90 font-semibold text-xs tracking-[0.15em] uppercase mb-6">{t('company')}</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/about-us" onClick={handleNavClick("/about-us")} className="text-slate-500 hover:text-white text-sm transition-colors duration-200">
                  {t('aboutUs')}
                </Link>
              </li>
              <li>
                <Link href="/contact-us" onClick={handleNavClick("/contact-us")} className="text-slate-500 hover:text-white text-sm transition-colors duration-200">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Developers */}
          <div>
            <h4 className="text-white/90 font-semibold text-xs tracking-[0.15em] uppercase mb-6">{t('developers')}</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/developers" onClick={handleNavClick("/developers")} className="text-slate-500 hover:text-white text-sm transition-colors duration-200">
                  {t('apiReference')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.06]" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-slate-600 text-xs">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
          <div className="flex items-center gap-7">
            <Link href="/privacy-policy" onClick={handleNavClick("/privacy-policy")} className="text-slate-600 hover:text-slate-400 text-xs transition-colors duration-200">
              {t('privacyPolicy')}
            </Link>
            <Link href="/terms-of-service" onClick={handleNavClick("/terms-of-service")} className="text-slate-600 hover:text-slate-400 text-xs transition-colors duration-200">
              {t('termsOfService')}
            </Link>
            <Link href="/cookie-policy" onClick={handleNavClick("/cookie-policy")} className="text-slate-600 hover:text-slate-400 text-xs transition-colors duration-200">
              {t('cookieSettings')}
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
