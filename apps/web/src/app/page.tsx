'use client';

import React from 'react';
import Link from 'next/link';
import { useI18n } from '../components/I18nProvider';
import { motion } from 'framer-motion';
import { Sparkles, Cpu, ShieldCheck, Star, Code2, Heart, Award, ArrowUpRight } from 'lucide-react';

export default function Home() {
  const { t } = useI18n();

  const stats = [
    { number: '12+', title: t('home.stats.projectsTitle'), desc: t('home.stats.projectsDesc'), icon: <Award className="text-brand-primary" size={24} /> },
    { number: '8+', title: t('home.stats.clientsTitle'), desc: t('home.stats.clientsDesc'), icon: <Heart className="text-brand-primary" size={24} /> },
    { number: '99.9%', title: t('home.stats.uptimeTitle'), desc: t('home.stats.uptimeDesc'), icon: <Sparkles className="text-brand-primary" size={24} /> },
    { number: '4', title: t('home.stats.developersTitle'), desc: t('home.stats.developersDesc'), icon: <Code2 className="text-brand-primary" size={24} /> },
  ];

  const testimonials = [
    {
      name: 'Sarah Jenkins',
      role: 'CEO, Nexus Analytics',
      quote: 'The Software Guys built our entire reporting system in six weeks. It handles millions of events a day with zero lag, and the admin dashboard is incredibly easy to use. Their modular monolith architecture saved us months of development time.',
      stars: 5,
    },
    {
      name: 'Yousef Al-Mansoori',
      role: 'Founder, Riyadh Logistics',
      quote: 'عمل احترافي غير مسبوق! الواجهات تدعم اللغة العربية والإنجليزية بشكل مذهل ومنظم. سرعة الاستجابة خيالية بفضل استخدام قواعد بيانات Neon Postgres. أنصح بالعمل معهم بشدة.',
      stars: 5,
    },
  ];

  return (
    <div className="w-full bg-brand-bg pb-24">
      {/* HERO SECTION */}
      <section className="relative w-full max-w-7xl mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-16 flex flex-col items-center text-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 border-[3px] border-brand-dark bg-brand-secondaryAlt font-black text-xs md:text-sm uppercase tracking-wider shadow-brutal-sm -rotate-1 mb-8"
        >
          <Sparkles size={16} className="text-brand-dark animate-pulse" />
          {t('home.badge')}
        </motion.div>

        {/* Catchy Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-5xl text-4xl md:text-7xl font-black uppercase tracking-tighter text-brand-dark leading-[0.95] md:leading-[0.9] mb-8"
        >
          {t('home.headlinePrefix')}
          <span className="inline-block px-4 py-2 md:py-3 bg-brand-primary text-white border-[4px] border-brand-dark shadow-[4px_4px_0px_0px_#1A1C1C] rotate-1 my-2">
            {t('home.headlineHighlight')}
          </span>
          {t('home.headlineSuffix')}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl text-lg md:text-2xl font-bold text-brand-darkAlt leading-relaxed mb-12"
        >
          {t('home.subheadline')}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-md mx-auto"
        >
          <Link
            href="/showcases"
            className="flex items-center justify-center gap-2 font-black uppercase text-base border-[3px] border-brand-dark bg-brand-primary text-white px-8 py-4 shadow-brutal hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[8px_8px_0px_0px_#1A1C1C] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#1A1C1C] transition-all duration-100"
          >
            {t('home.ctaPrimary')}
            <ArrowUpRight size={18} />
          </Link>
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 font-black uppercase text-base border-[3px] border-brand-dark bg-transparent text-brand-dark px-8 py-4 shadow-brutal hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[8px_8px_0px_0px_#1A1C1C] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#1A1C1C] transition-all duration-100"
          >
            {t('home.ctaSecondary')}
          </Link>
        </motion.div>
      </section>

      {/* STATS SECTION */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-brand-surface border-[3px] border-brand-dark p-6 shadow-brutal neo-hover-translate flex flex-col gap-4 text-start"
            >
              <div className="flex items-center justify-between">
                <span className="font-black text-5xl tracking-tighter text-brand-primary">
                  {stat.number}
                </span>
                <div className="p-2 border-[3px] border-brand-dark bg-white shadow-[2px_2px_0px_0px_#1A1C1C]">
                  {stat.icon}
                </div>
              </div>
              <div>
                <h3 className="font-black uppercase text-sm tracking-wide text-brand-dark mb-1">
                  {stat.title}
                </h3>
                <p className="text-xs font-semibold text-brand-dark/70">
                  {stat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BENTO GRID HOW WE WORK */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-brand-dark mb-4">
            {t('home.bentoTitle')}
          </h2>
          <p className="text-lg font-bold text-brand-dark/70 max-w-2xl mx-auto">
            {t('home.bentoSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 bg-brand-secondaryAlt border-[3px] border-brand-dark p-8 md:p-12 shadow-brutal flex flex-col justify-between gap-8 text-start"
          >
            <div className="flex flex-col gap-4">
              <span className="inline-block self-start px-3 py-1 bg-brand-primary text-white border-[3px] border-brand-dark font-black text-xs uppercase shadow-[2px_2px_0px_0px_#1A1C1C]">
                UI / UX SYSTEM
              </span>
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-brand-dark leading-none">
                {t('home.bento1Title')}
              </h3>
              <p className="text-base font-bold text-brand-dark/80 leading-relaxed max-w-xl">
                {t('home.bento1Desc')}
              </p>
            </div>
            <div className="border-[3px] border-brand-dark bg-white p-4 font-mono text-xs shadow-brutal-sm">
              <span className="text-brand-primary">const</span> theme = {'{'}
              <br />
              &nbsp;&nbsp;colors: {'{'} primary: <span className="text-brand-primary">"#003EC7"</span>, secondary: <span className="text-amber-600">"#F3E576"</span> {'}'},
              <br />
              &nbsp;&nbsp;borders: <span className="text-brand-primary">"3px solid #1A1C1C"</span>
              <br />
              {'}'};
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-brand-surface border-[3px] border-brand-dark p-8 shadow-brutal flex flex-col justify-between gap-8 text-start"
          >
            <div className="flex flex-col gap-4">
              <span className="inline-block self-start px-3 py-1 bg-green-200 text-green-800 border-[3px] border-brand-dark font-black text-xs uppercase shadow-[2px_2px_0px_0px_#1A1C1C]">
                DATABASE
              </span>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-brand-dark leading-none">
                {t('home.bento2Title')}
              </h3>
              <p className="text-sm font-semibold text-brand-dark/70 leading-relaxed">
                {t('home.bento2Desc')}
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm font-black uppercase border-t-[3px] border-brand-dark/10 pt-4">
              <Cpu className="text-brand-primary" size={24} />
              <span>Neon Postgres Branch Active</span>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 bg-white border-[3px] border-brand-dark p-8 md:p-12 shadow-brutal flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 text-start"
          >
            <div className="flex flex-col gap-4 max-w-2xl">
              <span className="inline-block self-start px-3 py-1 bg-indigo-100 text-indigo-800 border-[3px] border-brand-dark font-black text-xs uppercase shadow-[2px_2px_0px_0px_#1A1C1C]">
                ARCHITECTURE
              </span>
              <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-brand-dark leading-none">
                {t('home.bento3Title')}
              </h3>
              <p className="text-base font-bold text-brand-dark/70 leading-relaxed">
                {t('home.bento3Desc')}
              </p>
            </div>
            <div className="flex items-center gap-4 p-4 border-[3px] border-brand-dark bg-brand-surface shadow-brutal-sm shrink-0">
              <ShieldCheck className="text-brand-primary" size={32} />
              <div className="font-black uppercase text-xs">
                <div>STRIDE Secured</div>
                <div className="text-brand-primary">Rate Limited & Whitelisted</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16 border-t-[3px] border-brand-dark/10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-brand-dark mb-4">
            {t('home.testimonialsTitle')}
          </h2>
          <p className="text-lg font-bold text-brand-dark/70 max-w-2xl mx-auto">
            {t('home.testimonialsSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((tItem, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-brand-surface border-[3px] border-brand-dark p-8 shadow-brutal flex flex-col justify-between gap-6 text-start"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(tItem.stars)].map((_, sIdx) => (
                    <Star key={sIdx} size={18} fill="#1A1C1C" className="text-brand-secondary" />
                  ))}
                </div>
                <p className="text-base font-bold text-brand-dark leading-relaxed italic">
                  "{tItem.quote}"
                </p>
              </div>
              <div className="border-t-[3px] border-brand-dark/10 pt-4 flex items-center gap-3">
                <div className="w-10 h-10 border-[3px] border-brand-dark bg-brand-primary text-white flex items-center justify-center font-black text-sm shadow-[2px_2px_0px_0px_#1A1C1C]">
                  {tItem.name[0]}
                </div>
                <div>
                  <h4 className="font-black uppercase text-sm text-brand-dark">{tItem.name}</h4>
                  <p className="text-xs font-semibold text-brand-dark/60">{tItem.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
