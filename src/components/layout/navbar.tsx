"use client";

import { Link, usePathname, useRouter } from "@/i18n/routing";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Globe, Menu, ChevronDown, ArrowRight } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from 'next-intl';
import { type AppLocale } from "@/i18n/routing";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isPending, startRouteTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const nextScrolled = window.scrollY > 20;
      setScrolled((current) => (current === nextScrolled ? current : nextScrolled));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, {passive: true});
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = previousOverflow;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    if (pathname === href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const switchLocale = (newLocale: AppLocale) => {
    if (newLocale === locale) {
      return;
    }

    startRouteTransition(() => {
      router.replace(pathname, { locale: newLocale, scroll: false });
    });
  };

  return (
    <>
      <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        scrolled 
          ? "bg-[#050505]/95 backdrop-blur-2xl border-white/10 py-5 lg:py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]" 
          : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          
          {/* Left Navigation (Desktop) */}
          <div className="hidden lg:flex items-center gap-12 w-1/3">
            <Link 
              href="/" 
              onClick={handleNavClick("/")}
              className="text-sm font-semibold text-slate-300 hover:text-white transition-colors"
            >
              {t('home')}
            </Link>
            <Link 
              href="/solutions" 
              onClick={handleNavClick("/solutions")}
              className="text-sm font-semibold text-slate-300 hover:text-white transition-colors"
            >
              {t('solutions')}
            </Link>
            <Link 
              href="/developers" 
              onClick={handleNavClick("/developers")}
              className="text-sm font-semibold text-slate-300 hover:text-white transition-colors"
            >
              {t('developers')}
            </Link>
            <Link 
              href="/about-us" 
              onClick={handleNavClick("/about-us")}
              className="text-sm font-semibold text-slate-300 hover:text-white transition-colors"
            >
              {t('about')}
            </Link>
          </div>

          {/* Center Logo */}
          <div className="flex w-1/3 justify-start lg:justify-center items-center">
            <Link 
              href="/" 
              onClick={handleNavClick("/")}
              className="relative flex items-center transition-all hover:scale-105 active:scale-95 group"
            >
              <div className="absolute inset-0 bg-cyan-400/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 duration-500" />
              <Image 
                src="/epay-logo.png" 
                alt="Epay Logo" 
                width={250} 
                height={80} 
                className="relative z-10 h-[50px] md:h-[80px] w-auto object-contain scale-125 origin-center md:origin-center"
                priority
              />
            </Link>
          </div>

          {/* Right Navigation & CTAs (Desktop) */}
          <div className="hidden lg:flex items-center gap-6 justify-end w-1/3">
            <div className="relative group cursor-pointer inline-block">
              <button className="flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-white transition-colors pb-4 -mb-4 cursor-pointer">
                <Globe className="w-4 h-4" />
                <span>{locale === 'en' ? 'English' : '中文'}</span>
                <ChevronDown className="w-3 h-3 ml-0.5 transition-transform duration-300 group-hover:rotate-180" />
              </button>
              
              {/* Language Dropdown */}
              <div className="absolute top-full right-0 mt-4 w-32 bg-[#09090b]/95 border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 backdrop-blur-xl overflow-hidden translate-y-2 group-hover:translate-y-0">
                <div className="p-1.5 flex flex-col gap-1">
                  <button 
                    onClick={() => switchLocale('en')}
                    aria-busy={isPending && locale !== 'en'}
                    className={cn(
                      "cursor-pointer text-left px-3 py-2 text-sm rounded-lg flex items-center justify-between transition-all group/item",
                      locale === 'en' ? "text-white bg-white/5 font-semibold" : "text-slate-400 hover:text-white hover:bg-white/10"
                    )}
                  >
                    <span>English</span>
                    {locale === 'en' && <div className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />}
                  </button>
                  <button 
                    onClick={() => switchLocale('zh')}
                    aria-busy={isPending && locale !== 'zh'}
                    className={cn(
                      "cursor-pointer text-left px-3 py-2 text-sm rounded-lg flex items-center justify-between transition-all group/item",
                      locale === 'zh' ? "text-white bg-white/5 font-semibold" : "text-slate-400 hover:text-white hover:bg-white/10"
                    )}
                  >
                    <span>中文</span>
                    {locale === 'zh' && <div className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="h-5 w-px bg-white/10" />
            
            <Link 
              href="https://www.epay2.com" 
              target="_blank" 
              rel="noopener noreferrer"
              prefetch={false}
              className="cursor-pointer whitespace-nowrap text-xs font-bold tracking-widest text-slate-300 hover:text-white px-5 py-2.5 rounded-full uppercase transition-all hover:bg-white/5 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-white/20 hover:border-white/40"
            >
              {t('merchantLogin')}
            </Link>
            
            <div className="relative group cursor-pointer inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-emerald-500 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-500" />
              <Link href="/contact-us" onClick={handleNavClick("/contact-us")} className="cursor-pointer">
                <Button size="sm" className="relative cursor-pointer hidden xl:flex items-center gap-1.5 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs uppercase tracking-wider px-6 h-10 rounded-full shadow-[inset_0_1px_rgba(255,255,255,0.4)] transition-all group-hover:scale-105 border border-white/20 overflow-hidden">
                  <span className="relative z-10 flex items-center">{t('contact')} <ArrowRight className="ml-1.5 w-3.5 h-3.5" /></span>
                  
                  {/* Synced Shimmer Effect */}
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 1 }}
                    className="absolute inset-0 z-0 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[20deg]"
                  />
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle & Right CTA (Mobile) */}
          <div className="lg:hidden flex items-center gap-4 w-1/3 justify-end">
             <div className="flex lg:hidden items-center gap-2">
                <button 
                  onClick={() => switchLocale(locale === 'en' ? 'zh' : 'en')}
                  className="p-2 text-slate-400 hover:text-white transition-colors text-xs font-bold"
                >
                  {locale === 'en' ? 'ZH' : 'EN'}
                </button>
             </div>
             <button 
               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
               className="p-2 text-slate-300 hover:text-white transition-colors"
               aria-label="Toggle Menu"
             >
               <Menu className="w-6 h-6" />
             </button>
          </div>

        </div>
      </div>

    </nav>
    {/* Mobile Menu Overlay */}
    <AnimatePresence>
      {mobileMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-[#050505]/80 backdrop-blur-md z-[60]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm bg-[#050505] z-[70] shadow-[-10px_0_30px_rgba(0,0,0,0.5)] border-l border-white/10 p-8 flex flex-col backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between mb-12">
              <span className="text-sm font-black text-cyan-400 uppercase tracking-[0.3em]">{t('menu')}</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-slate-400 hover:text-white transition-colors"
              >
                <ArrowRight className="w-6 h-6 rotate-180" />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {[
                { name: t('home'), href: "/" },
                { name: t('solutions'), href: "/solutions" },
                { name: t('developers'), href: "/developers" },
                { name: t('about'), href: "/about-us" },
                { name: t('contact'), href: "/contact-us" },
              ].map((item, idx) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (pathname === item.href) window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={cn(
                      "text-3xl font-bold transition-all block",
                      pathname === item.href ? "text-cyan-400" : "text-slate-300 hover:text-white"
                    )}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto flex flex-col gap-4">
              <div className="h-px bg-white/10 w-full mb-4" />
              <Link
                href="https://www.epay2.com"
                target="_blank"
                rel="noopener noreferrer"
                prefetch={false}
                className="w-full py-4 text-center rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('merchantLogin')}
              </Link>
              <Link
                href="/contact-us"
                className="w-full py-4 text-center rounded-xl bg-cyan-500 text-black font-black uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('contact')}
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  </>
);
}
