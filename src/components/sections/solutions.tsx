"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Gamepad2, RadioTower } from "lucide-react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from 'next-intl';

export function Solutions() {
  const pathname = usePathname();
  const t = useTranslations('Solutions');

  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    if (pathname === "/solutions" && href.startsWith("/solutions")) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <section className="pt-4 pb-24 relative z-20 bg-[#12141c]">
      {/* Seamless deep background transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#12141c] via-[#0d1017] to-[#0a0b0e] pointer-events-none -z-10" />

      <div className="container mx-auto px-4">
        <div className="mb-16 text-center max-w-4xl mx-auto flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight font-outfit"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-slate-400 font-medium max-w-2xl leading-relaxed"
          >
            {t('description')}
          </motion.p>
        </div>

        {/* 2-Column Grid Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1: Gaming */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative w-full h-[500px] md:h-[680px] rounded-[2rem] border border-white/5 bg-[#0a0b0e] overflow-hidden flex flex-col justify-end"
          >
            {/* Background Image & Gradient */}
            <div className="absolute inset-0 w-full h-[70%] top-0">
              <Image
                src="/images/solutions/gaming.png"
                alt="Gaming"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700 origin-bottom"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0b0e]/80 to-[#0a0b0e]" />
            </div>

            <div className="relative z-10 p-6 md:p-10 flex flex-col justify-end pt-32">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">{t('gamingTitle')}</h3>
              <p className="text-xs md:text-sm text-slate-400 font-medium leading-relaxed mb-6 md:mb-8 xl:pr-10">
                {t('gamingDescription')}
              </p>
              <div className="flex flex-wrap gap-2 mb-6 md:mb-8 font-inter">
                <div className="flex-shrink-0 flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[11px] font-bold text-slate-300 whitespace-nowrap">
                  <Gamepad2 className="w-3.5 h-3.5 text-emerald-500 mr-2" /> {t('antiFraud')}
                </div>
                <div className="flex-shrink-0 flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[11px] font-bold text-slate-300 whitespace-nowrap">
                  <ArrowRight className="w-3.5 h-3.5 text-blue-500 mr-2" /> {t('highConcurrency')}
                </div>
                <div className="flex-shrink-0 flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[11px] font-bold text-slate-300 whitespace-nowrap">
                  <RadioTower className="w-3.5 h-3.5 text-purple-500 mr-2" /> {t('largeDeposits')}
                </div>
              </div>
              <Link href="/solutions#gaming" onClick={handleNavClick("/solutions#gaming")} className="inline-flex items-center text-cyan-500 hover:text-cyan-400 font-bold transition-colors text-sm cursor-pointer">
                {t('exploreGaming')} <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>
          </motion.div>

          {/* Card 2: Live Streaming */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group relative w-full h-[500px] md:h-[680px] rounded-[2rem] border border-white/5 bg-[#0a0b0e] overflow-hidden flex flex-col justify-end"
          >
            {/* Background Image & Gradient */}
            <div className="absolute inset-0 w-full h-[70%] top-0">
              <Image
                src="/images/solutions/streaming.png"
                alt="Live Streaming"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700 origin-bottom"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0b0e]/80 to-[#0a0b0e]" />
            </div>

            <div className="relative z-10 p-6 md:p-10 flex flex-col justify-end pt-32">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">{t('streamingTitle')}</h3>
              <p className="text-xs md:text-sm text-slate-400 font-medium leading-relaxed mb-6 md:mb-8 xl:pr-10">
                {t('streamingDescription')}
              </p>
              <div className="flex flex-wrap gap-2 mb-6 md:mb-8 font-inter">
                <div className="flex-shrink-0 flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[11px] font-bold text-slate-300 whitespace-nowrap">
                  <ArrowRight className="w-3.5 h-3.5 text-pink-500 mr-2" /> {t('microPayments')}
                </div>
                <div className="flex-shrink-0 flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[11px] font-bold text-slate-300 whitespace-nowrap">
                  <RadioTower className="w-3.5 h-3.5 text-yellow-500 mr-2" /> {t('virtualGifts')}
                </div>
                <div className="flex-shrink-0 flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[11px] font-bold text-slate-300 whitespace-nowrap">
                  <Gamepad2 className="w-3.5 h-3.5 text-cyan-500 mr-2" /> {t('creatorPayouts')}
                </div>
              </div>
              <Link href="/solutions#streaming" onClick={handleNavClick("/solutions#streaming")} className="inline-flex items-center text-orange-500 hover:text-orange-400 font-bold transition-colors text-sm cursor-pointer">
                {t('exploreStreaming')} <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
