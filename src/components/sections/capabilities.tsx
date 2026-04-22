"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Network, BarChart3, Clock, TrendingUp, Shield, Lock, Globe2, CreditCard, Wallet } from "lucide-react";
import { useTranslations } from 'next-intl';

export function Capabilities() {
  const [activeTab, setActiveTab] = useState("routing");
  const t = useTranslations('Capabilities');

  const tabs = [
    { id: "routing", label: t('tabs.routing') },
    { id: "settlement", label: t('tabs.settlement') },
    { id: "risk", label: t('tabs.risk') },
    { id: "channel", label: t('tabs.channel') },
  ];

  return (
    <section className="pt-8 pb-24 relative z-10 overflow-hidden" id="capabilities">
      {/* Seamless deep background transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0b0e] via-[#0d1017] to-[#12141c] pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none -z-10" />

      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight font-outfit"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm sm:text-base text-slate-400 font-medium max-w-2xl leading-relaxed px-4 md:px-0"
          >
            {t('description')}
          </motion.p>
        </div>

        {/* Dynamic Tab Switcher */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-16 relative z-20">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative flex items-center px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-300 pointer-events-auto cursor-pointer border border-transparent",
                activeTab === tab.id
                  ? "text-white shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                  : "text-slate-400 hover:text-white bg-white/5 border-white/5 hover:bg-white/10"
              )}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="universeTab"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 pointer-events-none z-0"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area - Twin Cards Layout */}
        <div className="max-w-6xl mx-auto relative min-h-[500px]">
          <AnimatePresence mode="wait">

            {/* === TAB: SMART ROUTING === */}
            {activeTab === "routing" && (
              <motion.div
                key="routing"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full"
              >
                {/* Left Card: Intelligent Routing */}
                <div className="bg-[#13161f] border border-white/5 rounded-[2rem] p-8 md:p-12 flex flex-col hover:border-white/10 transition-colors group overflow-hidden relative min-h-[400px] md:min-h-[450px]">
                  <div className="flex-1 flex items-center justify-center relative w-full h-[250px] mb-8">
                    {/* Custom Routing Visualization */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center z-10 relative">
                        <Network className="w-6 h-6 text-slate-300" />
                        <motion.div className="absolute inset-0 rounded-full border border-orange-500/50" animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
                      </div>

                      {/* Nodes */}
                      <div className="absolute -top-6 -right-2 flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)]">99%</div>
                        <div className="h-16 w-px bg-dashed border-l border-dashed border-emerald-500/30" />
                      </div>

                      <div className="absolute top-1/2 -right-12 -translate-y-1/2 flex items-center">
                        <div className="w-16 border-t border-dashed border-red-500/30" />
                        <div className="w-8 h-8 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-[10px] font-bold flex items-center justify-center">80%</div>
                      </div>

                      <div className="absolute -bottom-8 left-12 flex flex-col items-center">
                        <div className="h-16 w-px border-l border-dashed border-orange-500/30" />
                        <div className="w-8 h-8 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-[10px] font-bold flex items-center justify-center">95%</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6">
                      <Network className="w-5 h-5 text-orange-400" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">{t('routing.title')}</h3>
                    <p className="text-sm md:text-base text-slate-400 font-medium leading-relaxed">
                      {t('routing.description')}
                    </p>
                  </div>
                </div>

                {/* Right Card: Real-Time Analytics */}
                <div className="bg-[#13161f] border border-white/5 rounded-[2rem] p-8 md:p-12 flex flex-col hover:border-white/10 transition-colors group overflow-hidden relative min-h-[400px] md:min-h-[450px]">
                  <div className="flex-1 relative w-full h-[250px] mb-8">
                    {/* Header mock */}
                    <div className="flex justify-between items-start mb-8 font-inter">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">{t('routing.successRate')}</div>
                        <div className="flex items-center gap-2">
                          <div className="text-3xl font-bold text-slate-200">95.6%</div>
                          <div className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">{t('routing.stable')}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">{t('routing.volume')}</div>
                        <div className="text-xl font-bold text-emerald-500/80">$2.4M</div>
                      </div>
                    </div>

                    {/* Chart Mock */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-between gap-2 px-2">
                      {[40, 55, 45, 70, 50, 60, 90].map((h, i) => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-emerald-500/20 to-emerald-500/5 rounded-t-sm" style={{ height: `${h}%` }} />
                      ))}
                      {/* Spline Curve Overlay via SVG */}
                      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                        <path
                          d="M0,80 Q50,40 100,60 T200,30 T300,50 T400,10"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="2"
                          className="drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-auto relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                      <BarChart3 className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">{t('routing.analyticsTitle')}</h3>
                    <p className="text-sm md:text-base text-slate-400 font-medium leading-relaxed">
                      {t('routing.analyticsDescription')}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* === TAB: INSTANT SETTLEMENT === */}
            {activeTab === "settlement" && (
              <motion.div
                key="settlement"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full"
              >
                {/* Left Card: Flexible Settlement */}
                <div className="bg-[#13161f] border border-white/5 rounded-[2rem] p-8 md:p-12 flex flex-col hover:border-white/10 transition-colors group overflow-hidden relative min-h-[450px]">
                  <div className="flex-1 flex items-center justify-center relative w-full h-[250px] mb-8 font-inter">
                    <div className="relative w-40 h-40 rounded-full border-2 border-white/5 flex flex-col items-center justify-center view-ring">
                      <motion.svg className="absolute inset-0 w-full h-full -rotate-90 text-emerald-500" viewBox="0 0 100 100">
                        <motion.circle
                          cx="50" cy="50" r="48"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray="301.59"
                          animate={{ strokeDashoffset: [301.59, 100] }}
                          transition={{ duration: 2, ease: "easeOut" }}
                        />
                      </motion.svg>
                      <div className="text-3xl font-black text-slate-200">T+0</div>
                      <div className="text-[10px] font-bold text-slate-500 tracking-widest mt-1">{t('settlement.instant')}</div>

                      <div className="absolute -top-3 right-0 bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full text-[10px] font-bold border border-emerald-500/30">
                        {t('settlement.ready')}
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                      <Clock className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">{t('settlement.title')}</h3>
                    <p className="text-sm md:text-base text-slate-400 font-medium leading-relaxed">
                      {t('settlement.description')}
                    </p>
                  </div>
                </div>

                {/* Right Card: Cash Flow Efficiency */}
                <div className="bg-[#13161f] border border-white/5 rounded-[2rem] p-8 md:p-12 flex flex-col hover:border-white/10 transition-colors group overflow-hidden relative min-h-[450px]">
                  <div className="flex-1 relative w-full h-[250px] mb-8 flex items-end justify-between gap-1 pb-4">
                    {/* Animated step chart */}
                    {[15, 25, 30, 45, 60, 80, 100].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col justify-end h-full gap-1">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${h * 0.2}%` }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          className="w-full bg-blue-500/10 rounded-sm"
                        />
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${h * 0.8}%` }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          className="w-full bg-blue-500/40 rounded-sm"
                        />
                      </div>
                    ))}
                    {/* Floating dashed arrow */}
                    <svg className="absolute inset-0 w-full h-full opacity-50" preserveAspectRatio="none">
                      <path d="M10,150 Q100,140 150,110 T300,50" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="4 4" />
                    </svg>
                  </div>
                  <div className="mt-auto relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
                      <TrendingUp className="w-5 h-5 text-blue-400" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">{t('settlement.efficiencyTitle')}</h3>
                    <p className="text-sm md:text-base text-slate-400 font-medium leading-relaxed">
                      {t('settlement.efficiencyDescription')}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* === TAB: RISK CONTROL === */}
            {activeTab === "risk" && (
              <motion.div
                key="risk"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full"
              >
                {/* Left Card: Fraud Prevention */}
                <div className="bg-[#13161f] border border-white/5 rounded-[2rem] p-8 md:p-12 flex flex-col hover:border-white/10 transition-colors group overflow-hidden relative min-h-[450px]">
                  <div className="flex-1 flex items-center justify-center relative w-full h-[250px] mb-8 font-inter">
                    <div className="relative w-48 h-48 flex items-center justify-center">
                      <motion.div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.2)_0%,transparent_70%)]" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity }} />
                      <div className="w-16 h-16 bg-[#0a0b0e] border border-red-500/20 rounded-2xl flex items-center justify-center z-10 shadow-[0_0_30px_rgba(239,68,68,0.15)] relative">
                        <Shield className="w-6 h-6 text-red-500" />
                      </div>

                      {/* Blocked indicator */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="absolute -bottom-2 right-4 px-2 py-1 rounded bg-red-950/80 border border-red-900/50 text-[9px] font-bold text-red-500 z-20"
                      >
                        {t('risk.threatBlocked')}
                      </motion.div>
                    </div>
                  </div>
                  <div className="mt-auto relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
                      <Shield className="w-5 h-5 text-red-400" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">{t('risk.title')}</h3>
                    <p className="text-sm md:text-base text-slate-400 font-medium leading-relaxed">
                      {t('risk.description')}
                    </p>
                  </div>
                </div>

                {/* Right Card: Account Security */}
                <div className="bg-[#13161f] border border-white/5 rounded-[2rem] p-8 md:p-12 flex flex-col hover:border-white/10 transition-colors group overflow-hidden relative min-h-[450px]">
                  <div className="flex-1 flex items-center justify-center relative w-full h-[250px] mb-8 font-inter">
                    {/* Fake Login Window */}
                    <div className="w-64 bg-[#0d1017] border border-white/10 rounded-xl overflow-hidden shadow-2xl relative">
                      <div className="h-8 border-b border-white/5 flex items-center px-4 gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                      </div>
                      <div className="p-5 flex flex-col gap-3">
                        <div className="h-8 bg-white/5 rounded flex items-center px-3 border border-white/5">
                          <Lock className="w-3 h-3 text-slate-500 mr-2" />
                          <div className="h-1.5 w-16 bg-slate-600 rounded-full" />
                        </div>
                        <div className="h-8 bg-white/5 rounded flex items-center px-3 border border-white/5">
                          <div className="w-3 h-3 rounded-full bg-slate-500 mr-2 flex items-center justify-center text-[6px]">🔑</div>
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                          </div>
                        </div>
                        <div className="mt-2 h-8 bg-emerald-900/40 border border-emerald-500/30 rounded flex items-center justify-center text-[10px] font-bold text-emerald-500 tracking-tighter">
                          {t('risk.loginSecure')}
                        </div>
                      </div>

                      {/* Floating 2FA Badge */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, type: "spring" }}
                        className="absolute -top-3 -right-3 px-2 py-1 bg-yellow-500 text-black text-[10px] font-black rounded shadow-lg rotate-3"
                      >
                        {t('risk.twoFactorActive')}
                      </motion.div>
                    </div>
                  </div>
                  <div className="mt-auto relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-6">
                      <Shield className="w-5 h-5 text-yellow-400" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">{t('risk.securityTitle')}</h3>
                    <p className="text-sm md:text-base text-slate-400 font-medium leading-relaxed">
                      {t('risk.securityDescription')}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* === TAB: MULTI-CHANNEL === */}
            {activeTab === "channel" && (
              <motion.div
                key="channel"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full"
              >
                {/* Left Card: Global Coverage */}
                <div className="bg-[#13161f] border border-white/5 rounded-[2rem] p-8 md:p-12 flex flex-col hover:border-white/10 transition-colors group overflow-hidden relative min-h-[450px]">
                  <div className="flex-1 flex items-center justify-center relative w-full h-[250px] mb-8 font-inter">
                    <div className="w-32 h-32 rounded-full border border-white/5 bg-[#0a0b0e] flex items-center justify-center relative">
                      <Globe2 className="w-6 h-6 text-slate-600" />
                      {/* Floating Currencies */}
                      <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-4 -right-4 px-2 py-1 rounded bg-[#161b22] border border-white/10 text-[10px] font-bold text-slate-400">MYR</motion.div>
                      <motion.div animate={{ y: [5, -5, 5] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-2 right-12 px-2 py-1 rounded bg-[#161b22] border border-white/10 text-[10px] font-bold text-slate-400">IDN</motion.div>
                      <motion.div animate={{ y: [-3, 6, -3] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-12 top-8 px-2 py-1 rounded bg-emerald-950/50 border border-emerald-900 text-[10px] font-bold text-emerald-500">USDT</motion.div>
                      <motion.div animate={{ y: [4, -4, 4] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-8 -left-4 px-2 py-1 rounded bg-[#161b22] border border-white/10 text-[10px] font-bold text-slate-400 text-opacity-50 scale-75">NGA</motion.div>
                    </div>
                  </div>
                  <div className="mt-auto relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-6">
                      <Globe2 className="w-5 h-5 text-violet-400" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">{t('channel.title')}</h3>
                    <p className="text-sm md:text-base text-slate-400 font-medium leading-relaxed">
                      {t('channel.description')}
                    </p>
                  </div>
                </div>

                {/* Right Card: User Habits */}
                <div className="bg-[#13161f] border border-white/5 rounded-[2rem] p-8 md:p-12 flex flex-col hover:border-white/10 transition-colors group overflow-hidden relative min-h-[450px]">
                  <div className="flex-1 flex items-center justify-center relative w-full h-[250px] mb-8 font-inter">
                    {/* Mock Checkout List */}
                    <div className="w-72 bg-[#0d1017] border border-white/5 rounded-t-xl rounded-b-md overflow-hidden flex flex-col">
                      <div className="text-[9px] font-bold text-slate-600 uppercase tracking-widest px-4 pt-4 pb-2">{t('channel.checkout')}</div>

                      <div className="px-4 py-3 border-b border-white/5 flex items-center gap-3">
                        <CreditCard className="w-4 h-4 text-slate-500" />
                        <span className="text-sm font-medium text-slate-300">{t('channel.applePay')}</span>
                      </div>

                      <div className="px-4 py-3 border-b border-white/5 flex items-center gap-3 bg-white/[0.02]">
                        <Wallet className="w-4 h-4 text-pink-500" />
                        <span className="text-sm font-medium text-slate-300">{t('channel.localWallet')}</span>
                      </div>

                      <div className="px-4 py-3 border-b border-zinc-800 flex items-center gap-3 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent pointer-events-none" />
                        <Globe2 className="w-4 h-4 text-emerald-500 z-10" />
                        <span className="text-sm font-medium text-slate-300 z-10">{t('channel.cryptoUsdt')}</span>
                      </div>

                      <div className="bg-[#701a45] py-3 text-center text-[10px] font-bold text-pink-200 uppercase tracking-widest mt-auto opacity-80">
                        {t('channel.payNow')}
                      </div>

                      {/* Pink Like thumb floating icon */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1, type: "spring" }}
                        className="absolute bottom-8 left-6 w-8 h-8 rounded-lg bg-[#2d1123] border border-pink-500 flex items-center justify-center transform -rotate-12"
                      >
                        <span className="text-pink-500 text-sm">👍</span>
                      </motion.div>
                    </div>
                  </div>
                  <div className="mt-auto relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-6">
                      <CreditCard className="w-5 h-5 text-pink-400" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">{t('channel.userHabitsTitle')}</h3>
                    <p className="text-sm md:text-base text-slate-400 font-medium leading-relaxed">
                      {t('channel.userHabitsDescription')}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
