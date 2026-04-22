"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';

interface Section {
  id: string;
  title: string;
}

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  sections: Section[];
  children: React.ReactNode;
}

export function LegalLayout({ title, lastUpdated, sections, children }: LegalLayoutProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "");
  const t = useTranslations('Legal');

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      rootMargin: "-100px 0px -70% 0px",
      threshold: [0, 0.5, 1.0],
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Account for fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1017] pt-32 pb-24">
      {/* Background Decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl relative">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6 font-inter"
          >
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Compliance Documentation</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight font-outfit px-4"
          >
            {title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 font-medium font-inter"
          >
            {t('lastUpdated', { date: lastUpdated })}
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar */}
          <aside className="lg:w-80 shrink-0">
            <div className="sticky top-32">
              <div className="mb-4 lg:mb-8 pl-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] font-inter">{t('contents')}</h3>
              </div>
              
              <nav className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible no-scrollbar gap-1 font-inter pb-4 lg:pb-0">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "w-auto lg:w-full flex items-center gap-3 px-4 py-2.5 md:py-3 rounded-xl text-left transition-all duration-300 group relative cursor-pointer whitespace-nowrap lg:whitespace-normal shrink-0",
                      activeSection === section.id
                        ? "bg-cyan-500/10 text-cyan-400"
                        : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]"
                    )}
                  >
                    {activeSection === section.id && (
                      <motion.div
                        layoutId="active-indicator"
                        className="absolute left-0 w-1 h-6 bg-cyan-500 rounded-r-full hidden lg:block"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className={cn(
                      "text-xs md:text-sm font-semibold transition-colors",
                      activeSection === section.id ? "translate-x-0 lg:translate-x-1" : "group-hover:translate-x-0 lg:group-hover:translate-x-1"
                    )}>
                      {section.title}
                    </span>
                    <ChevronRight className={cn(
                      "w-3 h-3 md:w-4 md:h-4 ml-auto opacity-0 -translate-x-2 transition-all hidden lg:block",
                      activeSection === section.id ? "opacity-100 translate-x-0" : "group-hover:opacity-40"
                    )} />
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="bg-[#12161f]/50 backdrop-blur-sm border border-white/5 rounded-3xl p-6 md:p-12 shadow-2xl overflow-hidden">
              <div className="
                [&_h2]:text-[24px] md:[&_h2]:text-[32px] [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-12 md:[&_h2]:mt-20 [&_h2]:mb-6 md:[&_h2]:mb-8 [&_h2]:border-b [&_h2]:border-white/10 [&_h2]:pb-6 [&_h2]:tracking-tight [&_h2]:font-outfit
                [&_h3]:text-[18px] md:[&_h3]:text-[20px] [&_h3]:font-bold [&_h3]:text-white [&_h3]:mt-10 md:[&_h3]:mt-12 [&_h3]:mb-4 md:[&_h3]:mb-6 [&_h3]:font-outfit
                [&_p]:text-[14px] md:[&_p]:text-[16px] [&_p]:text-slate-400 [&_p]:leading-[1.8] [&_p]:mb-6 [&_p]:font-inter
                [&_ul]:list-none [&_ul]:pl-0 [&_ul]:mb-8 [&_ul]:font-inter
                [&_li]:text-[14px] md:[&_li]:text-slate-400 [&_li]:mb-4 [&_li]:pl-6 [&_li]:relative [&_li]:leading-relaxed
                [&_li]:before:content-[''] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.65em] [&_li]:before:w-1.5 [&_li]:before:h-1.5 [&_li]:before:bg-cyan-400 [&_li]:before:rounded-full
                [&_strong]:text-white [&_strong]:font-bold
                [&_a]:text-white [&_a]:font-bold [&_a]:no-underline hover:[&_a]:text-cyan-400 [&_a]:transition-colors
                [&_hr]:border-white/10 [&_hr]:my-10 md:[&_hr]:my-16
              ">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
