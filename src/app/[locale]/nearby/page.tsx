import { setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/lib/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NearbyGuides, { nearbyLabels } from '@/components/NearbyGuides';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return {
    title: `${nearbyLabels[locale]} | Princes Street Gardens`,
    alternates: {
      canonical: `${SITE_URL}/${locale}/nearby`,
      languages: Object.fromEntries([...routing.locales, 'x-default'].map((lang) => [
        lang, `${SITE_URL}/${lang === 'x-default' ? 'en' : lang}/nearby`,
      ])),
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <><Header solid /><main className="pt-16"><NearbyGuides locale={locale} /></main><Footer /></>;
}
