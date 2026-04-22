"use client";

import { motion } from "framer-motion";
import { Link, usePathname } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Rocket, Code, Activity, ShieldCheck, Zap } from "lucide-react";
import { useTranslations } from 'next-intl';

export function Hero() {
  const pathname = usePathname();
  const t = useTranslations('Hero');

  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    if (pathname === href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[100svh] md:min-h-[100vh] pb-20 overflow-hidden bg-transparent pt-32 md:pt-48 w-full flex items-center">

      {/* 3D Floating Fintech HUD Overlays */}
      <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none z-10 hidden xl:block" style={{ perspective: '1200px' }}>

        {/* Left Side: Real-time Routing HUD */}
        <motion.div
          animate={{ y: [-15, 15, -15], rotateX: [15, 10, 15], rotateY: [25, 30, 25] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[3%] top-[35%] w-64 rounded-2xl bg-gradient-to-b from-white/5 to-[#000000]/40 backdrop-blur-md border border-white/10 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 tracking-wider font-inter">{t('successRate')}</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-black text-white">95.6%</span>
            <span className="text-xs text-emerald-400 font-medium mb-1">+0.54% ↑</span>
          </div>
          {/* Mock Graph */}
          <div className="w-full h-12 flex items-end gap-1.5 opacity-60">
            {[30, 45, 25, 60, 40, 75, 55, 90, 65, 80].map((h, i) => (
              <motion.div
                key={`graph-${i}`}
                initial={{ height: "10%" }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 2 + i * 0.1, repeat: Infinity, repeatType: "mirror" }}
                className="flex-1 bg-cyan-400 rounded-t-sm"
              />
            ))}
          </div>
        </motion.div>

        {/* Right Side: Security & Settlement HUD */}
        <motion.div
          animate={{ y: [15, -15, 15], rotateX: [10, 15, 10], rotateY: [-25, -30, -25] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute right-[3%] top-[25%] w-72 rounded-2xl bg-gradient-to-b from-white/5 to-[#000000]/40 backdrop-blur-md border border-white/10 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-5"
        >
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">{t('fraudShield')}</div>
              <div className="text-xs text-slate-400 font-inter">{t('enterpriseGrade')}</div>
            </div>
          </div>

          <div className="flex items-center justify-between blur-[0.5px]">
            <div className="text-xs text-slate-400 font-inter">{t('settlementStatus')}</div>
            <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded text-[10px] text-white">
              <Zap className="w-3 h-3 text-emerald-400" fill="currentColor" /> {t('instant')}
            </div>
          </div>

          {/* Moving Processing Lines */}
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden relative">
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
            />
          </div>
        </motion.div>


      </div>

      <div className="container relative z-10 mx-auto px-4 mt-12 flex flex-col items-center">

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-center max-w-5xl mb-8 tracking-tight leading-[1.15] md:leading-[1.05]"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400/80 inline-block">{t('titlePrefix')}</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-400 to-blue-400 drop-shadow-[0_0_12px_rgba(6,182,212,0.3)] inline-block">{t('titleHighlight')}</span> <br className="hidden sm:block md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-slate-500 inline-block">{t('titleSuffix')}</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base md:text-lg text-slate-400 text-center max-w-3xl px-6 md:px-12 mb-10 md:mb-14 leading-relaxed font-light tracking-wide"
        >
          <span className="text-cyan-400 font-medium mr-1">{t('descriptionHighlight')}</span>
          {t('description', { d0: 'D0' })}
        </motion.p>

        {/* High-Conversion CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-5 mb-24 w-full sm:w-auto"
        >
          {/* Primary CTA */}
          <Link href="/solutions" onClick={handleNavClick("/solutions")} className="w-full sm:w-auto px-4 sm:px-0">
            <div className="relative group overflow-hidden rounded-xl">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-emerald-500 rounded-xl blur opacity-30 group-hover:opacity-75 transition duration-500" />
              <Button size="lg" className="cursor-pointer relative h-12 md:h-14 px-8 w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm md:text-base transition-all rounded-xl shadow-[inset_0_1px_rgba(255,255,255,0.4)] group-hover:scale-[1.02] overflow-hidden">
                <span className="relative z-10 flex items-center">{t('exploreSolutions')} <Rocket className="ml-2 w-4 h-4" /></span>

                {/* Shimmer Effect */}
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 1 }}
                  className="absolute inset-0 z-0 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[20deg]"
                />
              </Button>
            </div>
          </Link>

          {/* Secondary CTA */}
          <Link href="/developers" onClick={handleNavClick("/developers")} className="w-full sm:w-auto px-4 sm:px-0">
            <div className="relative group overflow-hidden rounded-xl">
              <Button size="lg" variant="outline" className="cursor-pointer h-12 md:h-14 px-8 w-full sm:w-auto border-white/20 hover:border-white/60 hover:bg-white/10 hover:text-white font-semibold text-slate-300 text-sm md:text-base bg-[#0a0a0c]/80 backdrop-blur-md rounded-xl transition-all shadow-none hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] group-hover:scale-[1.02]">
                <span className="relative z-10 flex items-center">{t('apiReference')} <Code className="ml-2 w-4 h-4 text-slate-400 group-hover:text-white transition-colors" /></span>
              </Button>
            </div>
          </Link>
        </motion.div>
      </div>

    </section>
  );
}
