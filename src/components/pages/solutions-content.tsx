"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import {
  Zap,
  ShieldCheck,
  Wallet,
  Repeat,
  Smartphone,
  PiggyBank,
  Dices,
  Video,
  TrendingUp,
  Clock
} from "lucide-react";

export function SolutionsContent() {
  const t = useTranslations('Solutions');

  const industries = [
    {
      id: "gaming",
      badge: t('gamingBadge'),
      icon: <Dices className="w-3.5 h-3.5 mr-2" />,
      badgeColor: "from-orange-500/20 to-red-500/20 text-orange-400 border-orange-500/30",
      bgColor: "bg-[#0a111a]",
      titleGradient: "from-white via-white/90 to-orange-400/90",
      glowColor: "rgba(0,180,216,0.15)",
      title: t('gamingTitle'),
      description: t('gamingDescription'),
      image: "/images/solutions/gaming.png",
      features: [
        {
          icon: <Wallet className="w-5 h-5" />,
          title: t('largeDeposits'),
          desc: t('gamingLargeDepositsDesc')
        },
        {
          icon: <Zap className="w-5 h-5" />,
          title: t('highConcurrency'),
          desc: t('gamingHighConcurrencyDesc')
        },
        {
          icon: <ShieldCheck className="w-5 h-5" />,
          title: t('antiFraud'),
          desc: t('gamingAntiFraudDesc')
        }
      ],
      metrics: [
        { label: t('depositSuccess'), value: "98.4%", icon: <TrendingUp className="w-4 h-4 text-emerald-400" /> },
        { label: t('latency'), value: "140ms", icon: <Clock className="w-4 h-4 text-blue-400" /> }
      ]
    },
    {
      id: "streaming",
      badge: t('streamingBadge'),
      icon: <Video className="w-3.5 h-3.5 mr-2" />,
      badgeColor: "from-cyan-500/20 to-emerald-500/20 text-cyan-400 border-cyan-500/30",
      bgColor: "bg-[#0b1c2e]",
      titleGradient: "from-white via-white/90 to-cyan-400/90",
      glowColor: "rgba(16,185,129,0.12)",
      title: t('streamingTitle'),
      description: t('streamingDescription'),
      image: "/images/solutions/streaming.png",
      features: [
        {
          icon: <Repeat className="w-5 h-5" />,
          title: t('microPayments'),
          desc: t('streamingMicroPaymentsDesc')
        },
        {
          icon: <PiggyBank className="w-5 h-5" />,
          title: t('virtualGifts'),
          desc: t('streamingVirtualGiftsDesc')
        },
        {
          icon: <Smartphone className="w-5 h-5" />,
          title: t('creatorPayouts'),
          desc: t('streamingCreatorPayoutsDesc')
        }
      ]
    }
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-12">
      <div className="pb-24">
        {industries.map((ind, idx) => (
          <section
            key={ind.id}
            id={ind.id}
            className={`relative scroll-mt-20 py-16 ${ind.bgColor} overflow-hidden`}
          >
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none z-10" />
            <div
              className="absolute inset-0 z-0"
              style={{
                background: `radial-gradient(circle at ${idx % 2 === 0 ? '70%' : '30%'} 50%, ${ind.glowColor}, transparent 70%)`
              }}
            />
            <div className="container mx-auto px-4 relative z-20">
              <div className={`flex flex-col lg:flex-row items-center gap-16 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="flex-1 space-y-10">
                  <motion.div
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className={`inline-flex items-center px-4 py-1.5 rounded-lg border text-[10px] font-bold tracking-widest bg-gradient-to-r ${ind.badgeColor}`}>
                      {ind.icon} {ind.badge}
                    </div>
                    <h2 className={`text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] font-outfit max-w-2xl bg-clip-text text-transparent bg-gradient-to-r ${ind.titleGradient}`}>
                      {ind.title}
                    </h2>
                    <p className="text-lg text-slate-400 leading-relaxed font-medium max-w-xl">
                      {ind.description}
                    </p>
                  </motion.div>

                  <div className="space-y-8">
                    {ind.features.map((feature, fIdx) => (
                      <motion.div
                        key={fIdx}
                        initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: fIdx * 0.1 }}
                        className="flex gap-5 group"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 transition-all">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white mb-1">{feature.title}</h4>
                          <p className="text-slate-400 text-sm leading-relaxed max-w-md">{feature.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex-1 relative">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="relative rounded-3xl overflow-hidden border border-white/10 aspect-video lg:aspect-square bg-[#0f111a] group shadow-2xl"
                  >
                    <Image
                      src={ind.image}
                      alt={ind.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover opacity-60 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                  </motion.div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-10" />
          </section>
        ))}
      </div>
    </div>
  );
}
