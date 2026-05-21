'use client';

import React from 'react';
import { useI18n } from '../../components/I18nProvider';
import { motion } from 'framer-motion';
import { Cpu, ShieldAlert, CheckCircle2, LayoutTemplate, Send, Zap } from 'lucide-react';

export default function Services() {
  const { t } = useI18n();

  const phases = [
    {
      title: t('services.phases.0.title'),
      desc: t('services.phases.0.desc'),
      badge: t('services.phases.0.badge'),
      icon: <ShieldAlert size={24} className="text-brand-dark" />,
      color: 'bg-brand-secondaryAlt',
    },
    {
      title: t('services.phases.1.title'),
      desc: t('services.phases.1.desc'),
      badge: t('services.phases.1.badge'),
      icon: <Cpu size={24} className="text-brand-dark" />,
      color: 'bg-blue-100',
    },
    {
      title: t('services.phases.2.title'),
      desc: t('services.phases.2.desc'),
      badge: t('services.phases.2.badge'),
      icon: <Zap size={24} className="text-brand-dark" />,
      color: 'bg-indigo-100',
    },
    {
      title: t('services.phases.3.title'),
      desc: t('services.phases.3.desc'),
      badge: t('services.phases.3.badge'),
      icon: <LayoutTemplate size={24} className="text-brand-dark" />,
      color: 'bg-brand-secondaryAlt',
    },
    {
      title: t('services.phases.4.title'),
      desc: t('services.phases.4.desc'),
      badge: t('services.phases.4.badge'),
      icon: <CheckCircle2 size={24} className="text-brand-dark" />,
      color: 'bg-green-100',
    },
  ];

  return (
    <div className="w-full bg-brand-bg py-16 md:py-24">
      {/* PAGE HEADER */}
      <section className="w-full max-w-4xl mx-auto px-4 text-center mb-16 md:mb-24">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-brand-dark mb-6 leading-none">
          {t('services.title')}
        </h1>
        <div className="inline-block px-4 py-2 border-[3px] border-brand-dark bg-brand-primary text-white font-black text-sm uppercase shadow-brutal-sm -rotate-1 mb-8">
          {t('services.subtitle')}
        </div>
        <p className="text-lg md:text-xl font-bold text-brand-darkAlt leading-relaxed">
          {t('services.desc')}
        </p>
      </section>

      {/* TIMELINE SECTION */}
      <section className="w-full max-w-5xl mx-auto px-4 md:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-brand-dark mb-2">
            {t('services.timelineTitle')}
          </h2>
          <p className="text-sm md:text-base font-bold text-brand-dark/60">
            {t('services.timelineSubtitle')}
          </p>
        </div>

        {/* The Timeline Line */}
        <div className="absolute top-[200px] bottom-16 w-[4px] bg-brand-dark left-1/2 -translate-x-1/2 hidden md:block" />

        <div className="flex flex-col gap-12 md:gap-24 relative">
          {phases.map((phase, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={idx}
                className={`flex flex-col md:flex-row items-center w-full relative ${
                  isEven ? 'md:justify-start' : 'md:justify-end'
                }`}
              >
                {/* Timeline center node */}
                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 hidden md:flex w-12 h-12 rounded-full border-[3px] border-brand-dark bg-brand-secondaryAlt items-center justify-center font-black text-lg shadow-[2px_2px_0px_0px_#1A1C1C] z-10">
                  {idx + 1}
                </div>

                {/* Timeline Card */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6 }}
                  className={`w-full md:w-[45%] bg-white border-[3px] border-brand-dark p-6 md:p-8 shadow-brutal neo-hover-translate text-start flex flex-col gap-4 relative`}
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-3 py-1 bg-brand-dark text-white font-black text-xs uppercase">
                      {phase.badge}
                    </span>
                    <div className={`p-2 border-[3px] border-brand-dark shadow-[2px_2px_0px_0px_#1A1C1C] ${phase.color}`}>
                      {phase.icon}
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-brand-dark leading-none">
                    {phase.title}
                  </h3>

                  <p className="text-sm md:text-base font-semibold text-brand-dark/70 leading-relaxed">
                    {phase.desc}
                  </p>

                  <div className="border-t-[3px] border-brand-dark/10 pt-4 flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-brand-primary">
                      STEP 0{idx + 1} / 05
                    </span>
                    <span className="font-black text-xs text-brand-dark uppercase">
                      READY TO SHIELD
                    </span>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="w-full max-w-4xl mx-auto px-4 text-center mt-24">
        <div className="bg-brand-secondaryAlt border-[3px] border-brand-dark p-8 md:p-12 shadow-brutal flex flex-col items-center gap-6">
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-brand-dark">
            WANT AN AUTOMATED SECURE PIPELINE?
          </h2>
          <p className="text-sm md:text-base font-bold text-brand-dark/80 max-w-xl">
            Let's construct your serverless database branch, map out your relational entities, and scaffold NestJS guard controllers for absolute protection.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 font-black uppercase border-[3px] border-brand-dark bg-brand-primary text-white px-8 py-4 shadow-brutal hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[8px_8px_0px_0px_#1A1C1C] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#1A1C1C] transition-all duration-100"
          >
            START CONSTRUCTING
            <Send size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}
