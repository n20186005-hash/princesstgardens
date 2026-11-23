import type { MetadataRoute } from 'next';
import { SITE_URL, guideAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import { nearby } from '@/content/nearby';
import { TOPIC_SLUGS } from '@/content/topics';

// Only indexable, canonical content. Utility/legal pages (privacy, terms,
// cookies) are excluded and marked noindex in their own metadata.
const HOME_PATHS = [''];
const GUIDE_PATHS = TOPIC_SLUGS.map((s) => `/${s}`);

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of HOME_PATHS) {
    const languages: Record<string, string> = {};
    for (const locale of routing.locales) {
      languages[locale] = `${SITE_URL}/${locale}${path}`;
    }
    languages['x-default'] = `${SITE_URL}/${routing.defaultLocale}${path}`;
    entries.push({
      url: `${SITE_URL}/en${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: { languages },
    });
  }

  const translatedPaths = [
    ...GUIDE_PATHS,
    '/nearby',
    ...nearby.map(({ slug }) => `/nearby/${slug}`),
  ];
  for (const path of translatedPaths) {
    const languages = guideAlternates(path);
    for (const locale of routing.locales) {
      entries.push({ url: languages[locale], alternates: { languages } });
    }
  }

  return entries;
}
