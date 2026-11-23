import type { Locale } from '@/i18n/routing';
import type { Topic } from './topics';
import { topics } from './topics';
import zh from './guide-locales/zh.json';
import pl from './guide-locales/pl.json';
import de from './guide-locales/de.json';
import it from './guide-locales/it.json';
import es from './guide-locales/es.json';
import fr from './guide-locales/fr.json';

type LocaleGuide = {
  places: Record<string, {
    name: string;
    area: string;
    operator: string;
    history: string;
    access: string;
    route: string;
    photoTip: string;
    caption?: string;
    detail: {
      tagline: string;
      background: string;
      details: string;
      firstStop: string;
      finalStop: string;
      transport: string;
      advice: string;
      question: string;
      answer: string;
    };
    visit: {
      kind: string;
      duration: string;
      hours: string;
      admission: string;
      access: string;
      experience: string;
    };
  }>;
  topics: Record<string, Topic>;
  lodging: Record<string, string>;
  ui: Record<string, string>;
};

const localized: Record<Exclude<Locale, 'en'>, LocaleGuide> = { zh, pl, de, it, es, fr };

export function guideText(locale: Locale) {
  return (english: string) => locale === 'en' ? english : localized[locale].ui[english] ?? english;
}

export function guidePlace(locale: Locale, slug: string) {
  return locale === 'en' ? undefined : localized[locale].places[slug];
}

export function guideLodging(locale: Locale, area: string, english: string) {
  return locale === 'en' ? english : localized[locale].lodging[area];
}

export function guideTopics(locale: Locale) {
  return locale === 'en' ? topics : localized[locale].topics;
}
