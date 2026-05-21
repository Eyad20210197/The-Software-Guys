'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, translations } from '../lib/translations';

type I18nContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('tsg-locale') as Locale;
    if (saved === 'en' || saved === 'ar') {
      setLocaleState(saved);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'ar') {
        setLocaleState('ar');
      }
    }
  }, []);

  // Update HTML tag attributes on locale change
  useEffect(() => {
    const dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = locale;
    localStorage.setItem('tsg-locale', locale);
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
  };

  // Translation helper function that resolves path strings like 'home.title'
  const t = (keyStr: string): string => {
    const keys = keyStr.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let current: any = translations[locale];

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        // Fallback to English if not found
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let enFallback: any = translations['en'];
        for (const enKey of keys) {
          if (enFallback && typeof enFallback === 'object' && enKey in enFallback) {
            enFallback = enFallback[enKey];
          } else {
            return keyStr;
          }
        }
        return typeof enFallback === 'string' ? enFallback : keyStr;
      }
    }

    return typeof current === 'string' ? current : keyStr;
  };

  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, dir }}>
      <div className={dir === 'rtl' ? 'rtl-layout' : 'ltr-layout'}>
        {children}
      </div>
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
