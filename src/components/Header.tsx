'use client';

import { useTranslations, useLocale } from 'next-intl';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import { useState, useEffect } from 'react';

export default function Header({ solid = false }: { solid?: boolean }) {
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
  const navigation = [
    { key: 'gallery', href: `${logoHref}#gallery` },
    { key: 'reviews', href: `${logoHref}#reviews` },
    { key: 'map', href: `${logoHref}#map` },
    { key: 'nearby', href: `${logoHref}/nearby` },
  ];

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
          {t('siteName')}
        </a>

        <nav aria-label={t('navigation')} className="hidden items-center gap-5 lg:flex xl:gap-6">
          {navigation.map(({ key, href }) => (
            <a key={key} href={href} className="inline-flex h-10 items-center whitespace-nowrap text-sm font-medium hover:underline"
              style={{ color: opaque ? 'var(--text-secondary)' : '#fff' }}>
              {t(key)}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <details className="relative lg:hidden">
            <summary aria-label={t('navigation')} className="flex cursor-pointer list-none items-center justify-center rounded-md p-2 [&::-webkit-details-marker]:hidden"
              style={{ background: 'var(--tag-bg)', color: 'var(--tag-text)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </summary>
            <nav aria-label={t('navigation')} className="absolute right-0 mt-2 grid min-w-40 rounded-lg border p-2 shadow-lg"
              style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
              {navigation.map(({ key, href }) => (
                <a key={key} href={href} className="whitespace-nowrap rounded px-3 py-2 text-sm font-medium hover:underline"
                  onClick={(event) => event.currentTarget.closest('details')?.removeAttribute('open')}>
                  {t(key)}
                </a>
              ))}
            </nav>
          </details>
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
