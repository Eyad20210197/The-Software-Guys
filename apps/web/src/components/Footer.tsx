'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useI18n } from './I18nProvider';
import { Github, Twitter, Linkedin, Youtube, Send, Check } from 'lucide-react';

export default function Footer() {
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Simulate API integration (Phase 6 will connect this live)
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setSubscribed(true);
    setEmail('');
  };

  const socialLinks = [
    { icon: <Github size={20} />, href: 'https://github.', label: 'GitHub' },
    { icon: <Twitter size={20} />, href: 'https://twitter.', label: 'Twitter' },
    { icon: <Linkedin size={20} />, href: 'https://linkedin.', label: 'LinkedIn' },
    { icon: <Youtube size={20} />, href: 'https://youtube.', label: 'YouTube' },
  ];

  return (
    <footer className="w-full bg-brand-surface border-t-[4px] border-brand-dark pt-16 pb-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* BRAND COLUMN */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-brand-primary text-white border-[3px] border-brand-dark px-3 py-1 font-black text-xl tracking-tighter uppercase shadow-[3px_3px_0px_0px_#1A1C1C]">
              TSG
            </div>
            <span className="font-black text-lg md:text-xl tracking-tighter text-brand-dark uppercase">
              THE SOFTWARE GUYS
            </span>
          </Link>
          <p className="text-brand-dark font-medium leading-relaxed max-w-md">
            {t('footer.description')}
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 border-[3px] border-brand-dark bg-brand-bg text-brand-dark hover:bg-brand-secondaryAlt transition-all shadow-[3px_3px_0px_0px_#1A1C1C] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#1A1C1C]"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="flex flex-col gap-6">
          <h3 className="font-black uppercase text-lg tracking-tighter text-brand-dark border-b-[3px] border-brand-dark pb-2">
            {t('footer.quickLinks')}
          </h3>
          <ul className="flex flex-col gap-3 font-bold text-sm uppercase">
            <li>
              <Link href="/" className="hover:text-brand-primary transition-colors">
                {t('common.home')}
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-brand-primary transition-colors">
                {t('common.services')}
              </Link>
            </li>
            <li>
              <Link href="/showcases" className="hover:text-brand-primary transition-colors">
                {t('common.showcase')}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-brand-primary transition-colors">
                {t('common.contact')}
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-brand-primary transition-colors">
                {t('common.admin')}
              </Link>
            </li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div className="flex flex-col gap-6">
          <h3 className="font-black uppercase text-lg tracking-tighter text-brand-dark border-b-[3px] border-brand-dark pb-2">
            {t('footer.newsletter')}
          </h3>
          <p className="text-sm font-semibold text-brand-dark">
            Get architectural updates and deep-dives into modern SaaS pipelines.
          </p>

          {subscribed ? (
            <div className="flex items-center gap-2 border-[3px] border-brand-dark bg-brand-success-bg text-brand-success-text px-4 py-3 font-bold text-sm uppercase">
              <Check size={18} />
              {t('common.success')}
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder={t('footer.newsletterPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-[3px] border-brand-dark bg-brand-bg font-bold text-sm text-brand-dark placeholder-brand-dark/40 shadow-brutal-sm focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_0px_#003EC7] transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 font-black uppercase text-sm border-[3px] border-brand-dark bg-brand-primary text-white py-3 shadow-brutal-sm hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_0px_#1A1C1C] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#1A1C1C] transition-all duration-100"
              >
                {loading ? t('common.loading') : t('footer.subscribe')}
                <Send size={14} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="max-w-7xl mx-auto border-t-[3px] border-brand-dark/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs font-bold text-brand-dark/60 text-center sm:text-start">
          {t('footer.copyright')}
        </p>
        <div className="flex items-center gap-6 text-xs font-black uppercase tracking-wider text-brand-dark/60">
          <Link href="/privacy" className="hover:text-brand-primary">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-brand-primary">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
