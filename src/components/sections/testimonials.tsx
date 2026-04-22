"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from 'next-intl';

export function Testimonials() {
  const t = useTranslations('Testimonials');

  const testimonials = [
    {
      quote: t('t1.quote'),
      name: t('t1.name'),
      role: t('t1.role'),
      image: "/t1.png"
    },
    {
      quote: t('t2.quote'),
      name: t('t2.name'),
      role: t('t2.role'),
      image: "/t2.png"
    },
    {
      quote: t('t3.quote'),
      name: t('t3.name'),
      role: t('t3.role'),
      image: "/t3.png"
    }
  ];

  return (
    <section className="py-24 bg-[#0a0c10] relative z-10 overflow-hidden">
      {/* Circuit board background overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v119h119v1H0zM10 10h1v10h10v-11h-11zM30 30h1v20h20v-21h-21zM70 70h1v30h30v-31h-31z' fill='%23ffffff' fill-opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px'
        }} />

      {/* Subtle ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(45,212,191,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative">
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-[44px] font-bold text-white tracking-tight font-outfit"
          >
            {t('title')}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.7, ease: [0.21, 0.45, 0.32, 0.9] }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="p-8 rounded-2xl bg-[#12161f]/80 backdrop-blur-sm border border-white/5 border-t-[3px] border-t-teal-500 relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:border-teal-500/30 transition-all font-inter"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/10 bg-slate-800 shrink-0 relative transition-all duration-500 group-hover:scale-110 group-hover:border-teal-500/50">
                  <Image
                    src={test.image}
                    alt={test.name}
                    fill
                    sizes="56px"
                    className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                  />
                </div>
                <div>
                  <div className="text-white font-bold text-base tracking-tight">{test.name}</div>
                  <div className="text-teal-400 text-xs font-bold uppercase tracking-wider mt-0.5">{test.role}</div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -top-4 -left-2 text-6xl text-white/5 font-serif select-none">&quot;</div>
                <p className="text-slate-300 font-medium italic leading-relaxed text-[16px] relative z-10">
                  {test.quote}
                </p>
                <div className="absolute -bottom-8 -right-2 text-6xl text-white/5 font-serif select-none rotate-180">&quot;</div>
              </div>

              {/* Highlight flash on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
