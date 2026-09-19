import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import CookieSettingsClient from './CookieSettingsClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const localeUrls = Object.fromEntries(
    routing.locales.map((l) => [l, `${SITE_URL}/${l}/cookie-settings`])
  );
  const selfUrl = localeUrls[locale] ?? localeUrls[routing.defaultLocale];

  return {
    alternates: {
      canonical: selfUrl,
      languages: {
        ...localeUrls,
        'x-default': localeUrls[routing.defaultLocale],
      },
    },
  };
}

export default async function CookiePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CookieSettingsClient />;
}
