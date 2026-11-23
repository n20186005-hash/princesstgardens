'use client';

import { useTranslations, useLocale } from 'next-intl';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import { useState, useEffect } from 'react';

export default function Header({ solid = false, englishGuide = false }: { solid?: boolean; englishGuide?: boolean }) {
  const t = useTranslations('header');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const locale = useLocale();
  const logoHref = `/${locale}`;
  const opaque = solid || scrolled;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: opaque ? 'var(--bg-secondary)' : 'transparent',
        borderBottom: opaque ? '1px solid var(--border-color)' : 'none',
        backdropFilter: opaque ? 'blur(12px)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
        <a href={logoHref} className="font-display text-base font-semibold leading-tight tracking-tight sm:text-lg" style={{ color: opaque ? 'var(--text-primary)' : '#fff' }}>
          Princes Street Gardens
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {(['gallery', 'reviews', 'map'] as const).map((section) => (
            <a
              key={section}
              href={`/${locale}#${section}`}
              className="text-sm font-medium transition-colors"
              style={{ color: opaque ? 'var(--text-secondary)' : 'rgba(255,255,255,0.85)' }}
            >
              {t(section)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={`/${locale}/nearby`} className="text-xs font-medium underline sm:text-sm" style={{ color: opaque ? 'var(--text-secondary)' : '#fff' }}>
            {t('nearby')}
          </a>
          <ThemeToggle />
          <LanguageToggle directoryFallback={englishGuide} />
        </div>
      </div>
    </header>
  );
}
