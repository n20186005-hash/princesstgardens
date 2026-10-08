import type { Locale } from '@/i18n/routing';

export const SITE_URL = 'https://www.princesstgardens.com';

export type FaqItem = { question: string; answer: string };

// Encode spaces in the static gallery asset path for a valid absolute URL.
const HERO_IMAGE = `${SITE_URL}/gallery/princes-street-gardens%20(8).jpg`;

// Seasonal closing times published by the City of Edinburgh Council
// (Edinburgh Outdoors), checked 8 October 2026.
// Each entry: [validFrom, validThrough, closes, westGate, eastGate]
const SEASONAL_HOURS: Array<[string, string, string, string, string]> = [
  ['2026-01-01', '2026-03-29', '18:00', '17:00', '17:15'],
  ['2026-03-30', '2026-04-26', '19:00', '18:00', '18:15'],
  ['2026-04-27', '2026-05-31', '20:00', '19:00', '19:15'],
  ['2026-06-01', '2026-08-30', '22:00', '21:00', '21:15'],
  ['2026-08-31', '2026-09-27', '20:00', '19:00', '19:15'],
  ['2026-09-28', '2026-10-25', '19:00', '18:00', '18:15'],
  ['2026-10-26', '2026-12-31', '18:00', '17:00', '17:15'],
];

function buildOpeningHours() {
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  return SEASONAL_HOURS.map(([from, to, closes]) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: days,
    opens: '07:00',
    closes,
    validFrom: from,
    validThrough: to,
  }));
}

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
      latitude: 55.9501,
      longitude: -3.1991,
    },
    openingHoursSpecification: buildOpeningHours(),
    hasMap: 'https://maps.app.goo.gl/d4fuHbdFk3VPCpse7',
    sameAs: [
      'https://www.edinburgh.gov.uk',
      'https://www.edinburghoutdoors.org.uk/directory-record/112/princes-street-gardens',
      'https://en.wikipedia.org/wiki/Princes_Street_Gardens',
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
