import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import { TOPIC_SLUGS } from '@/content/topics';

// Only indexable, canonical content. Utility/legal pages (privacy, terms,
// cookies) are excluded and marked noindex in their own metadata.
const HOME_PATHS = [''];
const GUIDE_PATHS = TOPIC_SLUGS.map((s) => `/${s}`); // English-only guides

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

  for (const path of GUIDE_PATHS) {
    entries.push({
      url: `${SITE_URL}/en${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  return entries;
}
