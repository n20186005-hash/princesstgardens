import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo';
import { topics } from '@/content/topics';
import TopicPage from '@/components/TopicPage';

const SLUG = 'events';
const topic = topics[SLUG];

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: 'en' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: topic.title,
    description: topic.description,
    alternates: { canonical: `${SITE_URL}/${locale}/${SLUG}` },
    openGraph: {
      title: topic.title,
      description: topic.description,
      url: `${SITE_URL}/${locale}/${SLUG}`,
      type: 'article',
      siteName: 'Princes Street Gardens',
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'en') notFound();
  setRequestLocale(locale);
  return <TopicPage topic={topic} locale={locale} />;
}
