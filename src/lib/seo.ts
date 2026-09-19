import type { Locale } from '@/i18n/routing';

export const SITE_URL = 'https://princesstgardens.com';

export type FaqItem = { question: string; answer: string };

// Encode spaces in the static gallery asset path for a valid absolute URL.
const HERO_IMAGE = `${SITE_URL}/gallery/princes-street-gardens%20(8).jpg`;

export function buildAttractionJsonLd(locale: Locale, description: string) {
  const isZh = locale === 'zh';
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${SITE_URL}/${locale}#attraction`,
    name: 'Princes Street Gardens',
    alternateName: isZh ? '王子街花园' : 'Princes Street Gardens, Edinburgh',
    description,
    url: `${SITE_URL}/${locale}`,
    image: [HERO_IMAGE],
    isAccessibleForFree: true,
    publicAccess: true,
    telephone: '+441315297921',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Princes St',
      addressLocality: 'Edinburgh',
      postalCode: 'EH2 2HG',
      addressCountry: 'GB',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 55.9521,
      longitude: -3.1999,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '07:00',
      closes: '22:00',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      reviewCount: '26933',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [
      'https://www.edinburgh.gov.uk',
      'https://www.visitscotland.com',
    ],
    containedInPlace: {
      '@type': 'City',
      name: 'Edinburgh',
    },
  };
}

export function buildFaqJsonLd(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: it.answer,
      },
    })),
  };
}
