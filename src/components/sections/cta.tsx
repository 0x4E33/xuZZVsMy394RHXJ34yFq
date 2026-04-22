"use client";

import { motion } from "framer-motion";
import { Link, usePathname } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code } from "lucide-react";
import { useTranslations } from 'next-intl';

export function CTA() {
  const pathname = usePathname();
  const t = useTranslations('CTA');

  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    if (pathname === href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <section className="relative py-32 bg-[#0d1017] overflow-hidden border-t border-white/5">
      <style jsx global>{`
        @keyframes shimmer-fast {
          0% { transform: translateX(-100%) skewX(-20deg); }
          100% { transform: translateX(200%) skewX(-20deg); }
        }
        @keyframes breathe-ultra {
          0%, 100% { opacity: 0.25; transform: scale(1) translate(-50%, 0); }
          50% { opacity: 0.6; transform: scale(1.15) translate(-48%, -5%); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
      `}</style>

      {/* Intensified Breathing Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-full bg-[radial-gradient(circle,rgba(34,211,238,0.2),transparent_70%)] blur-[120px] pointer-events-none animate-[breathe-ultra_8s_ease-in-out_infinite]" />
      <div className="absolute -bottom-1/2 -right-1/4 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(20,184,166,0.15),transparent_70%)] blur-[100px] pointer-events-none animate-[breathe-ultra_12s_ease-in-out_infinite_reverse]" />
      <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(56,189,248,0.1),transparent_70%)] blur-[120px] pointer-events-none animate-[breathe-ultra_10s_ease-in-out_infinite]" />

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative inline-block mb-12">
            {/* Focal Breathing Micro-Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(34,211,238,0.3),transparent_70%)] blur-[60px] animate-[pulse-glow_4s_ease-in-out_infinite] pointer-events-none" />
            
              <h2 className="text-4xl md:text-[64px] font-bold text-white mb-2 leading-tight tracking-tight relative z-10 font-outfit">
                {t('title1')}
              </h2>
              <h2 className="text-4xl md:text-[64px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400 leading-tight tracking-tight relative z-10 font-outfit">
                {t('title2')}
              </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 px-6">
            <div className="relative group w-full sm:w-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-emerald-500 rounded-xl blur opacity-30 group-hover:opacity-75 transition duration-500" />
              <Link href="/contact-us" onClick={handleNavClick("/contact-us")} className="relative block">
                <Button size="lg" className="relative h-12 md:h-14 px-10 w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm md:text-base transition-all rounded-xl shadow-[inset_0_1px_rgba(255,255,255,0.4)] group-hover:scale-[1.02] overflow-hidden cursor-pointer">
                  <span className="relative z-10 flex items-center">{t('contactSales')} <ArrowRight className="ml-2 w-4 h-4" /></span>

                  {/* Synced Shimmer Effect */}
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 1 }}
                    className="absolute inset-0 z-0 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[20deg]"
                  />
                </Button>
              </Link>
            </div>

            <Link href="/developers" onClick={handleNavClick("/developers")} className="relative group w-full sm:w-auto">
              <Button size="lg" variant="outline" className="cursor-pointer h-12 md:h-14 px-10 w-full sm:w-auto border-white/20 hover:border-white/60 hover:bg-white/10 hover:text-white font-semibold text-slate-300 text-sm md:text-base bg-[#0a0a0c]/80 backdrop-blur-md rounded-xl transition-all shadow-none hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] group-hover:scale-[1.02] overflow-hidden">
                <span className="relative z-10 flex items-center">{t('apiReference')} <Code className="ml-2 w-4 h-4 text-slate-400 group-hover:text-white transition-colors" /></span>
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
