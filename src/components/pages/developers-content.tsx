"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';
import { useState, useEffect } from "react";
import {
  ShieldCheck,
  Key,
  Code2,
  Rocket,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SUBTLE_NOISE_DATA_URL = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.28'/%3E%3C/svg%3E";

function createAvatarFallback(label: string, accent: string) {
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#111827" />
          <stop offset="100%" stop-color="${accent}" />
        </linearGradient>
      </defs>
      <rect width="96" height="96" rx="48" fill="url(#bg)" />
      <text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif" font-size="34" font-weight="700" fill="#ffffff">${label}</text>
    </svg>`
  )}`;
}

export function DevelopersContent() {
  const t = useTranslations('Developers');
  const [activeStep, setActiveStep] = useState(0);
  const [avatarFallbacks, setAvatarFallbacks] = useState<Record<number, boolean>>({});

  const steps = [
    {
      id: 1,
      title: t('steps.step1'),
      desc: t('steps.step1Desc'),
      icon: <ShieldCheck className="w-8 h-8" />
    },
    {
      id: 2,
      title: t('steps.step2'),
      desc: t('steps.step2Desc'),
      icon: <Key className="w-8 h-8" />
    },
    {
      id: 3,
      title: t('steps.step3'),
      desc: t('steps.step3Desc'),
      icon: <Code2 className="w-8 h-8" />
    },
    {
      id: 4,
      title: t('steps.step4'),
      desc: t('steps.step4Desc'),
      icon: <Rocket className="w-8 h-8" />
    }
  ];

  const totalSteps = steps.length;

  // Sequential Step Animation Logic (1 -> 2 -> 3 -> 4)
  useEffect(() => {
    if (activeStep >= totalSteps) {
      return;
    }

    const timer = window.setTimeout(() => {
      setActiveStep((prev) => Math.min(prev + 1, totalSteps));
    }, 400);

    return () => window.clearTimeout(timer);
  }, [activeStep, totalSteps]);

  const avatars = [
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Aria",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Jack",
  ];
  const avatarFallbackImages = [
    createAvatarFallback("F", "#06b6d4"),
    createAvatarFallback("A", "#10b981"),
    createAvatarFallback("J", "#22c55e"),
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans overflow-x-hidden">
      {/* Global Background Atmosphere - Subtle Grain */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
        <div
          className="absolute inset-0 mix-blend-overlay"
          style={{backgroundImage: `url("${SUBTLE_NOISE_DATA_URL}")`}}
        />
      </div>

      {/* 1. Steps Section */}
      <div className="pt-40 pb-20 relative z-10">
        <div className="container mx-auto px-4 text-center mb-24">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-32 font-outfit"
          >
            <span className="text-white">
              {t('title').includes('4 Steps') ? (
                <>
                  {t('title').split('in 4 Steps')[0]}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                    in 4 Steps
                  </span>
                </>
              ) : t('title').includes('4步') ? (
                <>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                    4步
                  </span>
                  {t('title').split('4步')[1]}
                </>
              ) : (
                t('title')
              )}
            </span>
          </motion.h1>

          <div className="relative max-w-6xl mx-auto">
            {/* Immersive Breathing Background Glow behind Steps */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] z-0">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.15, 0.3, 0.15]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15)_0%,transparent_70%)] blur-[100px]"
              />
            </div>

            {/* Straight Connector Line Path */}
            <div className="hidden lg:block absolute top-[60px] left-[15%] right-[15%] h-[2px] z-0">
              <div className="w-full h-full bg-white/[0.03] relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/40 to-emerald-500/0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
              {steps.map((step, idx) => {
                const isActive = activeStep > idx;
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.15 }}
                    className="flex flex-col items-center group"
                  >
                    <div className="relative mb-10">
                      {/* Individual Breathing Glow behind Step Icon */}
                      <motion.div
                        animate={isActive ? {
                          opacity: [0.3, 0.6, 0.3],
                          scale: [1, 1.2, 1]
                        } : { opacity: 0 }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-[-40px] bg-emerald-500/20 blur-[50px] rounded-full -z-10"
                      />

                      <div className={cn(
                        "w-[120px] h-[120px] rounded-[2rem] bg-[#0a111a] border flex items-center justify-center shadow-2xl relative transition-all duration-400",
                        isActive
                          ? "border-emerald-500/50 text-white shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                          : "border-white/10 text-slate-500"
                      )}>
                        {/* Step Number Badge */}
                        <div className={cn(
                          "absolute -top-1 -right-1 w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold shadow-lg z-20 transition-all duration-700",
                          isActive
                            ? "bg-emerald-500 border-white/20 text-black"
                            : "bg-[#1e293b] border-white/5 text-slate-400"
                        )}>
                          {step.id}
                        </div>
                        {step.icon}
                      </div>
                    </div>

                    <h3 className={cn(
                      "text-xl font-bold mb-3 transition-colors duration-700",
                      isActive ? "text-white" : "text-slate-400"
                    )}>{step.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-[240px] text-center font-medium">
                      {step.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Support Section - CTA Inspired Background (#0d1017) */}
      <section className="relative bg-[#0d1017] py-16 md:py-20 overflow-hidden">
        {/* Soft Transition Overlay to blend with previous section */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#050505] to-transparent z-0 pointer-events-none" />
        <style jsx global>{`
          @keyframes breathe-ultra {
            0%, 100% { opacity: 0.25; transform: scale(1) translate(-50%, 0); }
            50% { opacity: 0.6; transform: scale(1.15) translate(-48%, -5%); }
          }
        `}</style>
        
        {/* Intensified Breathing Background Orbs from CTA Section */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-full bg-[radial-gradient(circle,rgba(34,211,238,0.2),transparent_70%)] blur-[120px] pointer-events-none animate-[breathe-ultra_8s_ease-in-out_infinite]" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Dev-to-Dev Support Badge - Preserving all existing elements as per request */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-6 px-6 py-3 rounded-full bg-[#0a111a] border border-white/10 mb-8 shadow-2xl relative group mx-auto"
            >
              <div className="absolute inset-0 bg-emerald-500/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex -space-x-3 relative z-10">
                {avatars.map((url, i) => (
                  <div key={i} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#0a111a] overflow-hidden bg-slate-800 shadow-xl">
                    <Image
                      src={avatarFallbacks[i] ? avatarFallbackImages[i] : url}
                      alt={`dev-${i}`}
                      width={48}
                      height={48}
                      sizes="48px"
                      className="object-cover w-full h-full"
                      unoptimized
                      onError={() => {
                        setAvatarFallbacks((current) => (
                          current[i] ? current : {...current, [i]: true}
                        ));
                      }}
                    />
                  </div>
                ))}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#0a111a] bg-emerald-500 flex items-center justify-center text-[10px] font-bold text-black uppercase shadow-xl relative z-10">
                  +2k
                </div>
              </div>
              <div className="text-left pr-4 relative z-10 border-l border-white/10 pl-6">
                <div className="text-[13px] font-bold text-white leading-tight mb-0.5">Dev-to-Dev Support</div>
                <div className="text-[10px] font-medium text-emerald-500/80 tracking-wide uppercase">Community Hub</div>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 font-outfit text-white"
            >
              {t('support.title')}
            </motion.h2>
            <p className="text-slate-400 text-base md:text-lg mb-10 mx-auto font-medium leading-relaxed max-w-2xl px-4">
              {t('support.description')}
            </p>

            <div className="flex justify-center">
              <div className="relative group cursor-pointer inline-block">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-emerald-500 rounded-full blur opacity-25 group-hover:opacity-60 transition duration-500" />

                <Link href="/contact-us" className="relative block cursor-pointer">
                  <Button size="lg" className="relative h-14 md:h-16 px-10 md:px-12 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-sm md:text-base uppercase tracking-widest rounded-full shadow-2xl transition-all group-hover:scale-105 border border-white/20 overflow-hidden cursor-pointer">
                    <span className="relative z-10 flex items-center gap-3">
                      <Send className="w-5 h-5 mb-1 rotate-45" /> CONTACT OUR TEAM
                    </span>

                    <motion.div
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 1 }}
                      className="absolute inset-0 z-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[20deg]"
                    />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
