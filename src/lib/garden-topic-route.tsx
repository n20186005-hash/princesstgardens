import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import TopicPage from '@/components/TopicPage';
import { guideTopics } from '@/content/guide-localization';
import { routing } from '@/i18n/routing';
import { guideAlternates, SITE_URL } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export function gardenTopicRoute(slug: string) {
  async function resolve({ params }: Props) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) notFound();
    return { locale, topic: guideTopics(locale)[slug] };
  }

  return {
    generateStaticParams() {
      return routing.locales.map((locale) => ({ locale }));
    },
    async generateMetadata(props: Props): Promise<Metadata> {
      const { locale, topic } = await resolve(props);
      const canonical = `${SITE_URL}/${locale}/${slug}`;
      return {
        title: topic.title,
        description: topic.description,
        alternates: { canonical, languages: guideAlternates(`/${slug}`) },
        openGraph: {
          title: topic.title,
          description: topic.description,
          url: canonical,
          type: 'article',
          siteName: 'Princes Street Gardens',
        },
      };
    },
    async Page(props: Props) {
      const { locale, topic } = await resolve(props);
      setRequestLocale(locale);
      return <TopicPage topic={topic} locale={locale} />;
    },
  };
}
