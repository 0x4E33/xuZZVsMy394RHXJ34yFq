"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';
import { Send, Copy, Check, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const SUBTLE_NOISE_DATA_URL = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.28'/%3E%3C/svg%3E";

export function ContactContent() {
  const t = useTranslations('Contact');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const contacts = [
    {
      title: t('salesTitle'),
      desc: t('salesDesc'),
      id: "@Epay_02",
      href: "https://t.me/Epay_02",
      buttonText: t('buttonSales')
    },
    {
      title: t('techTitle'),
      desc: t('techDesc'),
      id: "@Epay_3",
      href: "https://t.me/Epay_3",
      buttonText: t('buttonTech')
    }
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-40 pb-20 relative overflow-hidden">
      <style jsx global>{`
        @keyframes breathe-ultra {
          0%, 100% { opacity: 0.3; transform: scale(1) translate(-50%, 0); filter: blur(120px); }
          50% { opacity: 0.7; transform: scale(1.2) translate(-48%, -2%); filter: blur(100px); }
        }
        .bg-grain {
          background-image: url("${SUBTLE_NOISE_DATA_URL}");
          filter: contrast(150%) brightness(100%);
        }
      `}</style>

      {/* Global Grain Overlay */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-grain mix-blend-overlay" />

      {/* Intensified Atmospheric Breathing Background Glows */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1600px] h-[900px] bg-[radial-gradient(circle,rgba(34,211,238,0.2),transparent_75%)] pointer-events-none animate-[breathe-ultra_12s_ease-in-out_infinite]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-[radial-gradient(circle,rgba(16,185,129,0.15),transparent_75%)] pointer-events-none animate-[breathe-ultra_18s_ease-in-out_infinite_reverse]" />
      <div className="absolute top-1/2 left-[10%] -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(34,211,238,0.1),transparent_70%)] pointer-events-none animate-[breathe-ultra_15s_ease-in-out_infinite] opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-extrabold mb-8 font-outfit leading-[1.1] pb-2"
            >
              {t('title').includes('our Infrastructure Experts') ? (
                <>
                  <span className="text-white">Connect with </span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
                    our Infrastructure Experts
                  </span>
                </>
              ) : t('title').includes('我们的基础设施专家') ? (
                <>
                  <span className="text-white">与我们的</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
                    基础设施专家
                  </span>
                  <span className="text-white">交谈</span>
                </>
              ) : (
                t('title')
              )}
            </motion.h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contacts.map((contact, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/[0.03] border border-white/5 rounded-3xl p-10 backdrop-blur-3xl group text-center"
              >
                <h3 className="text-2xl font-bold mb-4">{contact.title}</h3>
                <p className="text-slate-500 mb-8 leading-relaxed h-20">{contact.desc}</p>

                <div className="flex items-center justify-center gap-4 mb-12 p-5 bg-[#0a111a] rounded-2xl border border-white/5 group/id hover:border-cyan-500/30 transition-all duration-300 relative">
                  <span className="text-slate-600 font-mono text-sm tracking-wider uppercase">ID:</span>
                  <span className="text-cyan-400 font-bold text-xl tracking-tight">{contact.id}</span>
                  <button
                    onClick={() => copyToClipboard(contact.id.replace('@', ''), contact.id)}
                    className="p-1.5 text-slate-500 hover:text-white transition-all active:scale-90 relative"
                  >
                    <div className="relative">
                      {copiedId === contact.id ? (
                        <Check className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Copy className="w-5 h-5 opacity-40 hover:opacity-100" />
                      )}
                      
                      {/* Floating Tooltip */}
                      {copiedId === contact.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, x: "-50%" }}
                          animate={{ opacity: 1, y: 0, x: "-50%" }}
                          className="absolute -top-10 left-1/2 bg-emerald-500 text-black text-[10px] font-black uppercase px-2 py-1 rounded shadow-2xl whitespace-nowrap z-50"
                        >
                          {t('copied')}
                        </motion.div>
                      )}
                    </div>
                  </button>
                </div>

                <Link href={contact.href} target="_blank" rel="noopener noreferrer" className="relative block group/button">
                  {/* Persistent Background Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-emerald-500 rounded-2xl blur opacity-30 group-hover/button:opacity-80 transition duration-500" />

                  <Button className="w-full h-14 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold rounded-2xl transition-all group-hover/button:scale-[1.02] overflow-hidden relative active:scale-95 cursor-pointer">
                    <span className="relative z-10 flex items-center justify-center gap-3 uppercase tracking-wider">
                      <Send className="w-5 h-5 mb-1 rotate-45" /> {contact.buttonText}
                    </span>

                    {/* High-speed Global Glint */}
                    <motion.div
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 1 }}
                      className="absolute inset-0 z-0 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[20deg]"
                    />
                  </Button>
                </Link>
                {copiedId === contact.id && (
                  <p className="text-center text-xs text-emerald-400 mt-4 animate-pulse">{t('copied')}</p>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-24 flex justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-amber-500/5 border border-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.05)]"
            >
              <ShieldCheck className="w-5 h-5 text-amber-500" />
              <p className="text-sm font-medium text-amber-500/90 tracking-wide">
                {t('verification')}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
