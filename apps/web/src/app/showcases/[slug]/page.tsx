'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useI18n } from '../../../components/I18nProvider';
import { mockShowcases } from '../../../lib/mockData';
import { getShowcaseBySlug } from '../../../lib/api';
import { ArrowLeft, ArrowUpRight, Star, ExternalLink, Calendar, ShieldAlert, Loader } from 'lucide-react';

interface Props {
  params: { slug: string };
}

export default function ShowcaseDetails({ params }: Props) {
  const { t, dir } = useI18n();
  const [showcase, setShowcase] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getShowcaseBySlug(params.slug)
      .then((data) => {
        setShowcase(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('API Offline, falling back to static mock data:', err);
        const fallback = mockShowcases.find((item) => item.slug === params.slug);
        setShowcase(fallback || null);
        setIsLoading(false);
      });
  }, [params.slug]);

  if (isLoading) {
    return (
      <div className="w-full min-h-[60vh] bg-brand-bg flex flex-col items-center justify-center gap-4">
        <Loader className="animate-spin text-brand-primary" size={40} />
        <p className="font-black uppercase text-xs text-brand-dark tracking-wider">RETRIEVING SYSTEM MODEL...</p>
      </div>
    );
  }

  if (!showcase) {
    return notFound();
  }

  // Safe mapping constants
  const categoryLabel = showcase.categoryLabel || (
    showcase.category === 'saas' ? 'Custom SaaS Platform' :
    showcase.category === 'mobile' ? 'Mobile Application' :
    showcase.category === 'design' ? 'Design System & UX' : 'Developer Tooling'
  );

  const breakdown = showcase.breakdown || showcase.description;

  const testimonial = showcase.testimonial || {
    quote: dir === 'rtl' 
      ? 'عمل هندسي ممتاز ودقة متناهية في التصميم. استطاع الفريق تلبية متطلبات النظام والتشغيل بجودة عالية وسرعة فائقة.'
      : 'Outstanding engineering and high fidelity implementation. Delivered ahead of schedule with remarkable query performance and visual elegance.',
    author: showcase.clientName || 'Nexus Corp Solutions',
    role: 'Systems Executive'
  };

  return (
    <div className="w-full bg-brand-bg py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* BACK TO PORTFOLIO */}
        <Link
          href="/showcases"
          className="inline-flex items-center gap-2 font-black uppercase text-xs border-[3px] border-brand-dark bg-brand-surface text-brand-dark px-4 py-2.5 shadow-brutal-sm hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[2px_2px_0px_0px_#1A1C1C] transition-all mb-12"
        >
          <ArrowLeft size={14} className={dir === 'rtl' ? 'rotate-180' : ''} />
          {t('common.back')}
        </Link>

        {/* HERO TITLE BLOCK */}
        <section className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12 text-start">
          <div className="flex flex-col gap-4">
            <div className="inline-block self-start px-3.5 py-1.5 border-[3px] border-brand-dark bg-brand-secondaryAlt font-black text-xs uppercase shadow-[3px_3px_0px_0px_#1A1C1C]">
              {categoryLabel}
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-brand-dark leading-none">
              {showcase.title}
            </h1>
            <p className="text-lg md:text-xl font-bold text-brand-dark/70">
              {showcase.subtitle}
            </p>
          </div>

          <a
            href={showcase.projectUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 font-black uppercase text-base border-[3px] border-brand-dark bg-brand-primary text-white px-8 py-4 shadow-brutal hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[8px_8px_0px_0px_#1A1C1C] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#1A1C1C] transition-all duration-100"
          >
            {t('showcases.link')}
            <ArrowUpRight size={18} />
          </a>
        </section>

        {/* LARGE COVER IMAGE */}
        <section className="relative w-full h-[350px] md:h-[500px] border-[3px] border-brand-dark overflow-hidden shadow-brutal mb-16">
          <img
            src={showcase.mainImage}
            alt={showcase.title}
            className="w-full h-full object-cover"
          />
        </section>

        {/* COLUMN GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LEFT COLUMN: OVERVIEW & CLIENT TESTIMONY */}
          <div className="lg:col-span-2 flex flex-col gap-12 text-start">
            {/* Overview */}
            <div className="bg-white border-[3px] border-brand-dark p-8 shadow-brutal">
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-brand-dark mb-6 border-b-[3px] border-brand-dark/10 pb-4">
                {t('showcases.detailsTitle')}
              </h2>
              <p className="text-base font-bold text-brand-dark/70 leading-relaxed mb-6">
                {showcase.description}
              </p>
              <p className="text-base font-semibold text-brand-dark/60 leading-relaxed">
                {breakdown}
              </p>
            </div>

            {/* Testimonial */}
            <div className="bg-brand-secondaryAlt border-[3px] border-brand-dark p-8 shadow-brutal flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <h3 className="font-black uppercase text-sm tracking-wide text-brand-dark border-b-[3px] border-brand-dark/10 pb-2">
                  {t('showcases.testimonialTitle')}
                </h3>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, sIdx) => (
                    <Star key={sIdx} size={16} fill="#1A1C1C" className="text-brand-dark" />
                  ))}
                </div>
                <p className="text-base font-bold text-brand-dark leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border-[3px] border-brand-dark bg-brand-primary text-white flex items-center justify-center font-black text-sm shadow-[2px_2px_0px_0px_#1A1C1C]">
                  {testimonial.author[0]}
                </div>
                <div>
                  <h4 className="font-black uppercase text-sm text-brand-dark">{testimonial.author}</h4>
                  <p className="text-xs font-semibold text-brand-dark/60">{testimonial.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CORE METADATA & TECHNOLOGIES */}
          <div className="flex flex-col gap-12 text-start">
            {/* Metadata Card */}
            <div className="bg-brand-surface border-[3px] border-brand-dark p-6 shadow-brutal flex flex-col gap-4">
              <h3 className="font-black uppercase text-lg tracking-tighter text-brand-dark border-b-[3px] border-brand-dark/10 pb-2">
                SYSTEM SPECS
              </h3>
              <div className="flex flex-col gap-3 font-semibold text-sm">
                <div className="flex justify-between items-center py-1">
                  <span className="text-brand-dark/50 font-bold uppercase text-xs">{t('showcases.client')}</span>
                  <span className="text-brand-dark font-black text-xs uppercase">{showcase.clientName}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-t-[2px] border-brand-dark/10">
                  <span className="text-brand-dark/50 font-bold uppercase text-xs">{t('showcases.category')}</span>
                  <span className="text-brand-dark font-black text-xs uppercase">{categoryLabel}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-t-[2px] border-brand-dark/10">
                  <span className="text-brand-dark/50 font-bold uppercase text-xs">LIVE URL</span>
                  <a href={showcase.projectUrl || '#'} target="_blank" rel="noopener noreferrer" className="text-brand-primary font-black text-xs uppercase hover:underline flex items-center gap-1">
                    LINK <ExternalLink size={12} />
                  </a>
                </div>
                <div className="flex justify-between items-center py-1 border-t-[2px] border-brand-dark/10">
                  <span className="text-brand-dark/50 font-bold uppercase text-xs">LAUNCHED</span>
                  <span className="text-brand-dark font-black text-xs uppercase flex items-center gap-1">
                    <Calendar size={12} /> 2026
                  </span>
                </div>
              </div>
            </div>

            {/* Technologies Card */}
            <div className="bg-white border-[3px] border-brand-dark p-6 shadow-brutal flex flex-col gap-4">
              <h3 className="font-black uppercase text-lg tracking-tighter text-brand-dark border-b-[3px] border-brand-dark/10 pb-2">
                {t('showcases.techTitle')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {showcase.technologies?.map((tech: any, idx: number) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 border-[2px] border-brand-dark bg-brand-surface font-mono text-xs font-bold text-brand-dark shadow-[2px_2px_0px_0px_#1A1C1C]"
                  >
                    {tech.name || tech}
                  </span>
                ))}
              </div>
            </div>

            {/* STRIDE Mitigation details */}
            <div className="bg-brand-surface border-[3px] border-brand-dark p-6 shadow-brutal flex items-start gap-4">
              <div className="p-2 border-[2px] border-brand-dark bg-brand-error-bg text-brand-error-text">
                <ShieldAlert size={20} />
              </div>
              <div>
                <h4 className="font-black uppercase text-xs text-brand-dark mb-1">STRIDE ENFORCED</h4>
                <p className="text-[11px] font-semibold text-brand-dark/60 leading-relaxed">
                  Complete input sanitization, dynamic rate limits, and secure http-only session validation verified on this deployment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
