'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from './I18nProvider';
import { Menu, X, Lock, Globe, ArrowRight } from 'lucide-react';

export default function Header() {
  const { locale, setLocale, t, dir } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleLangToggle = () => {
    setLocale(locale === 'en' ? 'ar' : 'en');
  };

  const navLinks = [
    { name: t('common.home'), href: '/' },
    { name: t('common.services'), href: '/services' },
    { name: t('common.showcase'), href: '/showcases' },
    { name: t('common.contact'), href: '/contact' },
  ];

  // Helper to check active state
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-bg border-b-[4px] border-brand-dark px-4 md:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="bg-brand-primary text-white border-[3px] border-brand-dark px-3 py-1 font-black text-xl tracking-tighter uppercase shadow-[3px_3px_0px_0px_#1A1C1C] transition-all group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-[2px_2px_0px_0px_#1A1C1C]">
            TSG
          </div>
          <span className="font-black text-lg md:text-xl tracking-tighter text-brand-dark uppercase">
            THE SOFTWARE GUYS
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-extrabold uppercase text-sm tracking-wide transition-all border-b-[3px] py-1 ${
                isActive(link.href)
                  ? 'border-brand-primary text-brand-primary'
                  : 'border-transparent text-brand-dark hover:border-brand-dark hover:text-brand-dark'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA & LANG SWITCHER */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/admin"
            className="flex items-center justify-center p-2.5 border-[3px] border-brand-dark bg-brand-surface text-brand-dark hover:bg-white transition-all shadow-[3px_3px_0px_0px_#1A1C1C] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[2px_2px_0px_0px_#1A1C1C]"
            title={t('common.admin')}
          >
            <Lock size={16} className="font-bold" />
          </Link>

          <button
            onClick={handleLangToggle}
            className="flex items-center gap-2 font-black uppercase text-xs tracking-wider border-[3px] border-brand-dark px-3 py-2 bg-brand-secondaryAlt hover:bg-brand-secondary transition-all shadow-[3px_3px_0px_0px_#1A1C1C] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[2px_2px_0px_0px_#1A1C1C]"
          >
            <Globe size={14} />
            {t('header.toggleLang')}
          </button>

          <Link
            href="/contact"
            className="group flex items-center gap-2 font-black uppercase text-sm tracking-wider border-[3px] border-brand-dark bg-brand-primary text-white px-5 py-2.5 shadow-brutal-sm hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_0px_#1A1C1C] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#1A1C1C] transition-all duration-100"
          >
            {t('header.cta')}
            <ArrowRight size={16} className={`transition-transform ${dir === 'rtl' ? 'rotate-180' : 'group-hover:translate-x-1'}`} />
          </Link>
        </div>

        {/* MOBILE ACTIONS */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={handleLangToggle}
            className="flex items-center justify-center p-2.5 border-[3px] border-brand-dark bg-brand-secondaryAlt text-brand-dark text-xs font-black shadow-[3px_3px_0px_0px_#1A1C1C]"
            title={t('header.toggleLang')}
          >
            <Globe size={16} />
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 border-[3px] border-brand-dark bg-brand-surface text-brand-dark shadow-[3px_3px_0px_0px_#1A1C1C] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_0px_#1A1C1C]"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE NAV DRAWER */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-[76px] z-40 bg-brand-bg/95 backdrop-blur-md border-t-[4px] border-brand-dark animate-fade-in flex flex-col p-6 gap-6">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`font-black uppercase text-2xl tracking-tighter border-b-[3px] pb-2 ${
                  isActive(link.href)
                    ? 'border-brand-primary text-brand-primary'
                    : 'border-brand-dark/20 text-brand-dark'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-4 mt-auto">
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 font-bold uppercase border-[3px] border-brand-dark py-3 bg-brand-surface text-brand-dark shadow-brutal-sm"
            >
              <Lock size={18} />
              {t('common.admin')}
            </Link>

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 font-black uppercase border-[3px] border-brand-dark py-4 bg-brand-primary text-white shadow-brutal-sm"
            >
              {t('header.cta')}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
