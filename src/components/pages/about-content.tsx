"use client";

import { motion } from "framer-motion";
import { Link, usePathname } from "@/i18n/routing";
import { useRef } from "react";
import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AboutContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const t = useTranslations('About');

  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    if (pathname === href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-12 pb-0 relative overflow-hidden" ref={containerRef}>
      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes breathe {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        @keyframes logo-flare {
          0%, 35%, 65%, 100% { filter: brightness(1) drop-shadow(0 0 10px rgba(34,211,238,0.2)); }
          50% { filter: brightness(2.5) drop-shadow(0 0 40px rgba(34,211,238,0.8)); }
        }
        @keyframes scan {
          0% { transform: translateY(-120%) translateZ(20px); opacity: 0; }
          40%, 60% { opacity: 0.6; }
          100% { transform: translateY(120%) translateZ(20px); opacity: 0; }
        }
        @keyframes flow-move {
          0% { transform: translateZ(-300px) translateX(-200px) translateY(200px); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateZ(300px) translateX(200px) translateY(-200px); opacity: 0; }
        }
      `}</style>

      {/* Global Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[1200px] h-[1200px] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08)_0%,transparent_70%)] blur-[120px] animate-[breathe_10s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-0 w-[1000px] h-[1000px] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)] blur-[100px] animate-[breathe_15s_ease-in-out_infinite_reverse]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* HERO SECTION */}
        <section className="min-h-[90vh] flex flex-col lg:flex-row items-center gap-16 py-20 relative">
          <div className="flex-1 space-y-10 relative z-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">{t('badge')}</span>
              </div>

              <h1 className="text-5xl md:text-[80px] font-bold tracking-tight font-outfit leading-[1.05]">
                {t('title1')} <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400">{t('title2')}</span>
              </h1>

              <div className="max-w-xl space-y-6">
                <p className="text-slate-400 text-lg leading-relaxed font-medium">
                  {t('desc1')}
                </p>
                <p className="text-slate-500 text-lg leading-relaxed font-medium">
                  {t('desc2')}
                </p>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="flex items-center gap-16">
              {[
                { label: t('stats.founded'), value: "2018" },
                { label: t('stats.dailyVolume'), value: "$10M+" },
                { label: t('stats.regionalReach'), value: "50+" }
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-1 text-center"
                >
                  <div className="text-3xl font-bold font-outfit tracking-tight">{stat.value}</div>
                  <div className="text-[9px] font-black text-slate-600 uppercase tracking-[0.25em]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 3D Visualization Placeholder or Animation */}
          <div className="flex-1 w-full flex items-center justify-center relative min-h-[500px] perspective-[1200px] z-10">
            <motion.div
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateX: [15, 18, 15], rotateY: [-10, -8, -10] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <div className="relative animate-[logo-flare_6s_linear_infinite]" style={{ transformStyle: "preserve-3d" }}>
                 <div className="text-8xl lg:text-[10rem] font-bold font-outfit tracking-tighter text-white drop-shadow-[0_0_30px_rgba(34,211,238,0.4)]">
                   Epay
                 </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* JOURNEY SECTION */}
        <section className="py-24 relative border-t border-white/5 overflow-hidden">
          <div className="text-center mb-24 relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-outfit">{t('journey')}</h2>
          </div>

          <div className="relative max-w-4xl mx-auto space-y-20">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />
            
            {[
              { year: "2018", key: "m1", color: "text-cyan-400", side: "left" },
              { year: "2020", key: "m2", color: "text-white", side: "right" },
              { year: "2022", key: "m3", color: "text-white", side: "left" },
              { year: "2026", key: "m4", color: "text-emerald-400", side: "right" }
            ].map((m, idx) => (
              <div key={idx} className={cn("relative flex flex-col md:flex-row items-center gap-8", m.side === 'right' ? 'md:flex-row-reverse' : '')}>
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-500 z-20 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                <motion.div 
                  initial={{ opacity: 0, x: m.side === 'left' ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className={cn("w-full md:w-[45%]", m.side === 'left' ? 'md:text-right' : 'md:text-left')}
                >
                  <div className={cn("text-xl font-bold mb-1", m.color)}>{m.year}</div>
                  <h3 className="text-2xl font-bold mb-3 font-outfit">{t(`milestones.${m.key}.title`)}</h3>
                  <p className="text-slate-500 text-base leading-relaxed">{t(`milestones.${m.key}.desc`)}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-28 text-center relative border-t border-white/5">
          <div className="absolute inset-0 bg-cyan-500/5 blur-[120px] pointer-events-none" />
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="space-y-8 relative z-10">
            <h2 className="text-5xl md:text-6xl font-bold font-outfit">{t('cta.title')}</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">{t('cta.description')}</p>
            <div className="flex justify-center">
              <div className="relative group cursor-pointer inline-block">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-emerald-500 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-500" />
                <Link href="/contact-us" onClick={handleNavClick("/contact-us")} className="relative block cursor-pointer">
                  <Button size="lg" className="relative h-16 px-12 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold uppercase tracking-widest rounded-full shadow-[inset_0_1px_rgba(255,255,255,0.4)] transition-all group-hover:scale-105 border border-white/20 overflow-hidden cursor-pointer">
                    <span className="relative z-10">{t('cta.button')}</span>
                    
                    {/* Synchronized Glint Effect */}
                    <motion.div
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 1 }}
                      className="absolute inset-0 z-0 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[20deg]"
                    />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  );
}
