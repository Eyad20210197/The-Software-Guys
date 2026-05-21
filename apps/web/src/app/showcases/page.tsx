'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useI18n } from '../../components/I18nProvider';
import { mockShowcases } from '../../lib/mockData';
import { getShowcases } from '../../lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FolderOpen, ArrowRight } from 'lucide-react';

export default function Showcases() {
  const { t, dir } = useI18n();
  const [showcaseList, setShowcaseList] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getShowcases()
      .then((data) => {
        setShowcaseList(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('API Offline, falling back to static mock data:', err);
        setShowcaseList(mockShowcases);
        setIsLoading(false);
      });
  }, []);

  const categories = [
    { id: 'all', label: t('showcases.categories.all') },
    { id: 'saas', label: t('showcases.categories.saas') },
    { id: 'mobile', label: t('showcases.categories.mobile') },
    { id: 'design', label: t('showcases.categories.design') },
    { id: 'dev', label: t('showcases.categories.dev') },
  ];

  // Filtering logic
  const filteredShowcases = useMemo(() => {
    return showcaseList.filter((showcase) => {
      const matchesCategory = selectedCategory === 'all' || showcase.category === selectedCategory;
      const matchesSearch =
        showcase.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (showcase.technologies && (
          Array.isArray(showcase.technologies)
            ? showcase.technologies.some((tech: any) => (tech.name || tech).toLowerCase().includes(searchQuery.toLowerCase()))
            : false
        )) ||
        (showcase.categoryLabel || showcase.category).toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [showcaseList, selectedCategory, searchQuery]);

  return (
    <div className="w-full bg-brand-bg py-16 md:py-24">
      {/* HEADER SECTION */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-16 text-center lg:text-start flex flex-col lg:flex-row items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-brand-dark mb-4 leading-none">
            {t('showcases.title')}
          </h1>
          <div className="inline-block px-4 py-1.5 border-[3px] border-brand-dark bg-brand-secondaryAlt font-black text-sm uppercase tracking-wider shadow-brutal-sm -rotate-1">
            {t('showcases.subtitle')}
          </div>
        </div>

        {/* Search Input Box */}
        <div className="w-full max-w-md relative">
          <input
            type="text"
            placeholder={t('showcases.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-4 border-[3px] border-brand-dark bg-white font-bold text-sm text-brand-dark placeholder-brand-dark/40 shadow-brutal focus:outline-none focus:shadow-[8px_8px_0px_0px_#003EC7] transition-all"
          />
          <Search className={`absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'left-5' : 'right-5'} text-brand-dark/60`} size={20} />
        </div>
      </section>

      {/* FILTER CATEGORIES TABS */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-12">
        <div className="flex flex-wrap gap-3 pb-2 border-b-[3px] border-brand-dark/10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`font-black uppercase text-xs md:text-sm tracking-wider px-5 py-3 border-[3px] border-brand-dark transition-all duration-75 shadow-brutal-sm hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[2px_2px_0px_0px_#1A1C1C] ${
                selectedCategory === cat.id
                  ? 'bg-brand-primary text-white'
                  : 'bg-white text-brand-dark'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* PORTFOLIO GRID */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8">
        {isLoading ? (
          <div className="w-full flex flex-col items-center justify-center py-20 border-[3px] border-brand-dark bg-white shadow-brutal text-brand-dark font-black uppercase text-sm gap-3">
            <span className="animate-spin h-6 w-6 border-2 border-brand-dark border-t-transparent rounded-full" />
            SYNCHRONIZING SYSTEM DATA WITH NEON DB...
          </div>
        ) : (
          <>
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredShowcases.map((showcase) => (
                  <motion.div
                    layout
                    key={showcase.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white border-[3px] border-brand-dark shadow-brutal flex flex-col justify-between overflow-hidden"
                  >
                    {/* Image Wrap */}
                    <div className="relative w-full h-64 md:h-72 border-b-[3px] border-brand-dark overflow-hidden group">
                      <img
                        src={showcase.mainImage}
                        alt={showcase.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className={`absolute top-4 ${dir === 'rtl' ? 'right-4' : 'left-4'} px-3.5 py-1.5 border-[3px] border-brand-dark bg-brand-secondaryAlt font-black text-xs uppercase shadow-[3px_3px_0px_0px_#1A1C1C]`}>
                        {showcase.categoryLabel || (
                          showcase.category === 'saas' ? 'Custom SaaS Platform' :
                          showcase.category === 'mobile' ? 'Mobile Application' :
                          showcase.category === 'design' ? 'Design System & UX' : 'Developer Tooling'
                        )}
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 md:p-8 flex-grow flex flex-col justify-between gap-6 text-start">
                      <div className="flex flex-col gap-3">
                        <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-brand-dark leading-none">
                          {showcase.title}
                        </h3>
                        <p className="text-sm md:text-base font-bold text-brand-dark/70">
                          {showcase.subtitle}
                        </p>
                        <p className="text-sm font-semibold text-brand-dark/60 leading-relaxed line-clamp-2">
                          {showcase.description}
                        </p>
                      </div>

                      {/* Technology badging */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {showcase.technologies && showcase.technologies.slice(0, 4).map((tech: any, tIdx: number) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 border-[2px] border-brand-dark bg-brand-surface font-mono text-[10px] font-bold text-brand-dark"
                          >
                            {tech.name || tech}
                          </span>
                        ))}
                        {showcase.technologies && showcase.technologies.length > 4 && (
                          <span className="px-2.5 py-1 border-[2px] border-brand-dark bg-brand-surface font-mono text-[10px] font-bold text-brand-dark">
                            +{showcase.technologies.length - 4} MORE
                          </span>
                        )}
                      </div>

                      {/* Detail link */}
                      <div className="border-t-[3px] border-brand-dark/10 pt-6 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="font-mono text-[10px] font-bold text-brand-dark/50">CLIENT</span>
                          <span className="font-black text-xs text-brand-dark uppercase">{showcase.clientName}</span>
                        </div>

                        <Link
                          href={`/showcases/${showcase.slug}`}
                          className="group flex items-center gap-2 font-black uppercase text-xs border-[3px] border-brand-dark bg-brand-primary text-white px-5 py-3 shadow-[3px_3px_0px_0px_#1A1C1C] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#1A1C1C] transition-all"
                        >
                          EXPLORE DETAILS
                          <ArrowRight size={14} className={`transition-transform ${dir === 'rtl' ? 'rotate-180' : 'group-hover:translate-x-1'}`} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredShowcases.length === 0 && (
              <div className="text-center py-24 border-[3px] border-dashed border-brand-dark bg-brand-surface max-w-xl mx-auto shadow-brutal-sm">
                <FolderOpen className="mx-auto text-brand-dark mb-4" size={48} />
                <h3 className="font-black uppercase text-lg text-brand-dark">NO SHOWCASES FOUND</h3>
                <p className="text-xs font-bold text-brand-dark/60 mt-1">Try refining your search terms or selecting another system category.</p>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
