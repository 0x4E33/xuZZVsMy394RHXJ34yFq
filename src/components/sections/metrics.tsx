"use client";

import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';

export function Metrics() {
  const t = useTranslations('Metrics');

  const metrics = [
    { 
      value: "10M+",
      label: t('dailyTransactions'),
      description: t('dailyTransactionsDesc'),
      color: "from-cyan-400 via-cyan-300 to-teal-400"
    },
    { 
      value: "< 200ms",
      label: t('responseTime'),
      description: t('responseTimeDesc'),
      color: "from-orange-400 via-orange-300 to-amber-500"
    },
    { 
      value: "99.99%",
      label: t('systemStability'),
      description: t('systemStabilityDesc'),
      color: "from-emerald-400 via-emerald-300 to-green-500"
    },
    { 
      value: "50+",
      label: t('typesSupported'),
      description: t('typesSupportedDesc'),
      color: "from-purple-400 via-purple-300 to-violet-500"
    }
  ];

  return (
    <section className="py-24 bg-[#0d1017] relative z-10 border-t border-white/10">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-7xl relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 lg:gap-20 xl:gap-24 uppercase">
          {metrics.map((metric, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex flex-col items-center text-center group"
            >
              <div
                className={`font-bold bg-clip-text text-transparent bg-gradient-to-r ${metric.color} mb-2 md:mb-4 tracking-tighter whitespace-nowrap font-inter`}
                style={{ fontSize: "clamp(32px, 5vw, 60px)", lineHeight: "1.1", paddingBottom: "4px" }}
              >
                {metric.value}
              </div>
              <div className="text-sm md:text-xl font-bold text-white mb-2 tracking-tight group-hover:text-cyan-400 transition-colors duration-300 font-outfit">
                {metric.label}
              </div>
              <div className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed max-w-[220px] mx-auto font-inter">
                {metric.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
