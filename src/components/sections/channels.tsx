"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CreditCard, Bitcoin } from "lucide-react";
import { useTranslations } from 'next-intl';

// ==========================================
// REGION & CHANNEL DATA
// ==========================================
type ChannelItem = string;

type CountryConfig = {
  id: string;
  nameKey: string;
  code?: string;
  icon?: "card" | "crypto";
  payinLabel?: string;
  payin: ChannelItem[];
  hasPayout?: boolean;
};

type RegionConfig = {
  id: string;
  nameKey: string;
  countries: CountryConfig[];
};

const regions: RegionConfig[] = [
  {
    id: "global",
    nameKey: "global",
    countries: [
      {
        id: "global-fiat",
        nameKey: "globalFiat",
        icon: "card",
        payinLabel: "internationalAcquiring",
        payin: ["globalFiatDesc"],
        hasPayout: false,
      },
      {
        id: "global-usdt",
        nameKey: "globalUsdt",
        icon: "crypto",
        payinLabel: "nativeCryptoProcessing",
        payin: ["globalUsdtDesc"],
        hasPayout: false,
      }
    ]
  },
  {
    id: "sea",
    nameKey: "sea",
    countries: [
      {
        id: "my",
        nameKey: "countries.malaysia",
        code: "my",
        payin: ["FPX", "DuitNow QR", "Native DuitNow QR", "Native TNG", "Native FPX"],
        hasPayout: true,
      },
      {
        id: "th",
        nameKey: "countries.thailand",
        code: "th",
        payin: ["PromptPay"],
        hasPayout: true,
      },
      {
        id: "ph",
        nameKey: "countries.philippines",
        code: "ph",
        payin: ["Native GCash"],
        hasPayout: true,
      },
      {
        id: "id",
        nameKey: "countries.indonesia",
        code: "id",
        payin: ["QRIS", "VA"],
        hasPayout: true,
      }
    ]
  },
  {
    id: "africa",
    nameKey: "africa",
    countries: [
      {
        id: "za",
        nameKey: "countries.southAfrica",
        code: "za",
        payin: ["ZARduct", "South Africa Cards", "Mobile Money", "BankTransferZA", "CapitecPay", "Credit Card"],
        hasPayout: true,
      },
      { id: "ng", nameKey: "countries.nigeria", code: "ng", payin: ["Local Bank Transfer"], hasPayout: true },
      { id: "ke", nameKey: "countries.kenya", code: "ke", payin: ["Local Bank Transfer"], hasPayout: true },
      { id: "ug", nameKey: "countries.uganda", code: "ug", payin: ["Local Bank Transfer"], hasPayout: true },
      { id: "tz", nameKey: "countries.tanzania", code: "tz", payin: ["Local Bank Transfer"], hasPayout: true },
      { id: "cm", nameKey: "countries.cameroon", code: "cm", payin: ["Local Bank Transfer"], hasPayout: true },
      { id: "eg", nameKey: "countries.egypt", code: "eg", payin: ["Local Bank Transfer"], hasPayout: true },
    ]
  },
  {
    id: "latam",
    nameKey: "latam",
    countries: [
      { id: "co", nameKey: "countries.colombia", code: "co", payin: ["Local Bank Transfer"], hasPayout: true },
      { id: "mx", nameKey: "countries.mexico", code: "mx", payin: ["Local Bank Transfer"], hasPayout: true },
      { id: "br", nameKey: "countries.brazil", code: "br", payin: ["PIX"], hasPayout: true },
    ]
  },
  {
    id: "southasia",
    nameKey: "southasia",
    countries: [
      { id: "bd", nameKey: "countries.bangladesh", code: "bd", payin: ["Local Bank Transfer"], hasPayout: true },
    ]
  }
];

export function Channels() {
  const [activeRegion, setActiveRegion] = useState("sea");
  const [brokenFlags, setBrokenFlags] = useState<Record<string, boolean>>({});
  const t = useTranslations('Channels');
  const activeData = regions.find(r => r.id === activeRegion)!;

  return (
    <section className="py-24 relative z-20 overflow-hidden">
      {/* Seamless transition background from Hero */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#08090b] to-[#0a0b0e] pointer-events-none -z-10" />

      {/* Very subtle mesh/noise for texture */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none -z-10 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />

      <div className="container mx-auto px-4 relative">

        {/* Header Section */}
        <div className="mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight font-outfit"
          >
            {t('title')}
          </motion.h2>
        </div>

        {/* Main Dashboard UI */}
        <div className="bg-[#0f1115] border border-white/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row md:h-[700px] md:max-h-[85vh]">

          {/* Left Sidebar - Regions */}
          <div className="w-full md:w-64 flex-shrink-0 bg-[#0a0a0c] p-4 flex flex-col gap-2 relative border-b md:border-b-0 md:border-r border-white/5 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest px-4 pb-2 pt-2 font-inter">{t('regions')}</div>
            <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible no-scrollbar gap-2 pb-2 md:pb-0">
              {regions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setActiveRegion(region.id)}
                  className={cn(
                    "text-left px-4 py-2.5 md:py-3 rounded-xl transition-all duration-300 text-xs md:text-sm font-medium relative group cursor-pointer whitespace-nowrap md:whitespace-normal shrink-0 md:shrink",
                    activeRegion === region.id
                      ? "bg-[#161b22] text-cyan-400 shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  )}
                >
                  {activeRegion === region.id && (
                    <motion.div
                      layoutId="activeRegionBg"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-transparent pointer-events-none"
                    />
                  )}
                  <span className="relative z-10">{t(region.nameKey)}</span>
                </button>
              ))}
            </div>

            {/* Systems Operational - anchored in sidebar */}
            <div className="mt-auto pt-4 border-t border-white/5 hidden md:block">
              <div className="flex items-center gap-2 px-4 py-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_#10b981]" />
                <span className="text-[10px] font-medium text-slate-500 font-inter">{t('operational')}</span>
              </div>
            </div>
          </div>

          {/* Right Content Area - Channels Viewer */}
          <div className="flex-1 p-6 md:p-10 relative overflow-y-auto">
            {/* Subtle Inner Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeRegion}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10 pb-8"
              >
                {activeData.countries.map((country, idx) => (
                  <motion.div
                    key={country.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="bg-[#14151a] rounded-2xl border border-[#22242a] p-5 flex flex-col hover:border-[#30333a] transition-colors"
                  >

                    {/* Card Header */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        {country.code ? (
                          <div className="w-8 h-6 rounded-sm overflow-hidden border border-white/10 shadow-sm flex items-center justify-center bg-[#1a1b21] shrink-0">
                            {brokenFlags[country.code] ? (
                              <span className="text-[9px] font-bold uppercase text-slate-300">
                                {country.code}
                              </span>
                            ) : (
                              <Image
                                src={`https://flagcdn.com/w40/${country.code}.png`}
                                alt="flag"
                                width={32}
                                height={24}
                                className="w-full h-full object-cover"
                                sizes="32px"
                                unoptimized
                                onError={() => {
                                  setBrokenFlags((current) => (
                                    current[country.code!] ? current : { ...current, [country.code!]: true }
                                  ));
                                }}
                              />
                            )}
                          </div>
                        ) : country.icon === 'card' ? (
                          <div className="w-8 h-8 rounded-md bg-[#1a1b21] border border-white/10 flex items-center justify-center">
                            <CreditCard className="w-4 h-4 text-cyan-400" />
                          </div>
                        ) : country.icon === 'crypto' ? (
                          <div className="w-8 h-8 rounded-md bg-[#1a1b21] border border-white/10 flex items-center justify-center">
                            <Bitcoin className="w-5 h-5 text-orange-400" />
                          </div>
                        ) : null}
                        <h3 className="text-base font-bold text-white tracking-wide">{t(country.nameKey)}</h3>
                      </div>
                    </div>

                    {/* Payin Section */}
                    <div className="flex-1 flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <div className={cn("w-1 h-1 rounded-full", activeRegion === 'global' ? (country.icon === 'crypto' ? 'bg-orange-500' : 'bg-cyan-500') : 'bg-blue-500')} />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-inter">
                          {country.payinLabel ? t(country.payinLabel) : t('payin')}
                        </span>
                      </div>

                      {/* Tags / Text Container */}
                      <div className={cn("flex flex-wrap items-start content-start gap-1.5 mb-4", activeRegion === "global" ? "" : "min-h-[50px]")}>
                        {activeRegion === "global" ? (
                          // Global simple text
                          <p className="text-sm text-slate-400 font-medium pl-3 border-l-[1.5px] border-white/10 leading-relaxed font-inter">{t(country.payin[0])}</p>
                        ) : (
                          // Normal tags
                          country.payin.map(method => (
                            <div key={method} className="px-2.5 py-1 rounded-md bg-[#1d1f26] border border-[#2b2e38] text-[11px] font-medium text-slate-300 whitespace-nowrap font-inter">
                              {method}
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Payout Section */}
                    {country.hasPayout ? (
                      <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-inter">{t('payout')}</span>
                      </div>
                    ) : (
                      // Global USDT Settlement Footer
                      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-950/40 border border-emerald-900/50">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_#10b981]" />
                          <span className="text-[10px] font-bold text-emerald-400 font-inter">{t('usdtSettlement')}</span>
                        </div>
                      </div>
                    )}

                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

          </div>
        </div>
      </div>
    </section>
  );
}
