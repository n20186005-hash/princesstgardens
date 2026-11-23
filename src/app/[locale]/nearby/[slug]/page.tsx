import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { guideText, guidePlace, guideLodging } from '@/content/guide-localization';
import { guideAlternates } from '@/lib/seo';
import { setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { nearby, placeMaps } from '@/content/nearby';
import { SITE_URL } from '@/lib/seo';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => nearby.map(({ slug }) => ({ locale, slug })));
}

async function getPlace({ params }: Props) {
  const { locale, slug } = await params;
  const place = nearby.find((candidate) => candidate.slug === slug);
  if (!hasLocale(routing.locales, locale) || !place) notFound();
  return { place, locale, copy: guidePlace(locale, slug), t: guideText(locale) };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { place, locale, copy, t } = await getPlace(props);
  const canonical = `${SITE_URL}/${locale}/nearby/${place.slug}`;
  const title = `${copy?.name ?? place.name} | ${t('Edinburgh Visitor Guide')}`;
  const description = copy?.history ?? place.history;
  const image = (place.slug !== 'ross-fountain' && place.extraPhoto?.path) || `/nearby/${place.slug}.jpg`;
  return {
    title,
    description,
    alternates: { canonical, languages: guideAlternates(`/nearby/${place.slug}`) },
    openGraph: { title, description, url: canonical, images: [`${SITE_URL}${image}`] },
    twitter: { card: 'summary_large_image', title, description, images: [`${SITE_URL}${image}`] },
  };
}

const lodgingByArea: Record<string, string> = {
  'Princes Street Gardens': 'Choose the Princes Street or Princes Street Gardens edge for quick access to the gardens, galleries and trams. Waverley is convenient with luggage, but check which side of the station your accommodation is on before choosing a walking route.',
  'New Town': 'George Street and Queen Street offer a New Town base for galleries, squares and shopping. St Andrew Square is useful for tram connections, while the west end of George Street makes Charlotte Square an easier first stop.',
  'Calton Hill': 'St Andrew Square and Picardy Place put you within an uphill walk of Calton Hill and close to tram stops. The east end of Princes Street also works well if you are arriving by rail at Waverley.',
  'Old Town': 'High Street and the Lawnmarket make sense for walking between Old Town attractions. If you are choosing between Market Street and the Royal Mile with luggage, compare the elevation of the approach as well as the distance.',
  'West End & Water of Leith': 'The West End or Haymarket offers rail and tram connections with a walk down to the Water of Leith. Stockbridge gives you a neighbourhood base by the river, with a longer uphill walk back towards the main New Town streets.',
  'Canongate & Holyrood': 'Lower Canongate works well for the museums, palace and Parliament. Choose the central Royal Mile instead if the castle and upper Old Town are a priority, and allow time for the slope between the two ends.',
};

function GuideSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="mb-4 font-display text-2xl font-semibold sm:text-3xl">{title}</h2>
      <div className="mb-5 h-0.5 w-12" style={{ background: 'var(--accent)' }} aria-hidden="true" />
      <div className="space-y-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{children}</div>
    </section>
  );
}

export default async function Page(props: Props) {
  const { place, locale, copy, t } = await getPlace(props);
  setRequestLocale(locale);
  const maps = placeMaps(place);
  const { detail, visit } = copy ?? place;
  const name = copy?.name ?? place.name;
  const address = `${place.address}, ${t('Edinburgh')}`;
  const area = copy?.area ?? place.area;
  const operator = copy?.operator ?? place.operator;
  const related = nearby.filter((candidate) => candidate.area === place.area && candidate.slug !== place.slug).slice(0, 4);
  const photos = [{ ...place.photo, path: `/nearby/${place.slug}.jpg`, caption: '' }];
  if (place.extraPhoto) {
    if (place.slug === 'ross-fountain') photos.push({ ...place.extraPhoto, caption: copy?.caption ?? place.extraPhoto.caption });
    else photos.unshift({ ...place.extraPhoto, caption: copy?.caption ?? place.extraPhoto.caption });
  }
  const heroImage = photos[0].path;
  const anchorLinks = [
    ['about', 'About'],
    ['plan', 'Basic information'],
    ['hours', 'Opening hours'],
    ['tickets', 'Tickets'],
    ['transport', 'Transport'],
    ['highlights', 'What to look for'],
    ['walking', 'Walking route'],
    ['photography', 'Photography'],
    ['faq', 'FAQ'],
  ];

  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'TouristAttraction',
        name,
        description: copy?.history ?? place.history,
        image: photos.map(({ path }) => `${SITE_URL}${path}`),
        address,
        hasMap: maps.search,
      }} />
      <Header />
      <main>
        <section className="relative isolate flex min-h-[31rem] items-end overflow-hidden bg-stone-900 sm:min-h-[37rem]">
          <img src={heroImage} alt={name} fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10" style={{ background: 'var(--hero-overlay)' }} />
          <div className="mx-auto w-full max-w-6xl px-5 pb-12 pt-28 text-white sm:px-8 sm:pb-16">
            <nav aria-label={t('Breadcrumb')} className="mb-4 text-sm">
              <a href={`/${locale}`} className="underline">{t('Princes Street Gardens')}</a>
              <span aria-hidden="true"> / </span>
              <a href={`/${locale}/nearby`} className="underline">{t('Nearby attractions')}</a>
            </nav>
            <h1 className="max-w-4xl font-display text-4xl font-bold sm:text-6xl">{name}</h1>
            <p className="mt-3 text-xl">{detail.tagline}</p>
            <p className="mt-2 text-sm text-white/90">{address}</p>
            <p className="mt-2 max-w-2xl text-sm text-white/90">
              <a href="#hours" className="underline">{t('Opening hours')}</a>{' · '}{visit.hours.split('. ')[0]}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={maps.search} className="rounded-full bg-white px-5 py-2.5 font-medium text-stone-900">{t('View on Google Maps')}</a>
              <a href="#reviews" className="rounded-full border border-white/70 px-5 py-2.5 font-medium">{t('Ratings and reviews')}</a>
            </div>
          </div>
        </section>

        <div className="section-padding mx-auto max-w-6xl">
          <div className="mb-8 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl p-5 sm:p-7" style={{ background: 'var(--bg-secondary)' }}>
              <GuideSection id="explore" title={`${t('Explore')} · ${name}`}>
                <p>{visit.experience}</p>
              </GuideSection>
            </div>
            <div className="rounded-2xl p-5 sm:p-7" style={{ background: 'var(--bg-secondary)' }}>
              <GuideSection id="visit-tips" title={t('Visiting tips')}>
                <p>{detail.advice}</p>
              </GuideSection>
            </div>
            <div className="rounded-2xl p-5 sm:p-7" style={{ background: 'var(--bg-secondary)' }}>
              <GuideSection id="features" title={t('Highlights')}>
                <p>{detail.details}</p>
              </GuideSection>
            </div>
          </div>
          <section id="about" className="scroll-mt-24 rounded-2xl border p-6 sm:p-9"
            style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
            <h2 className="mb-4 font-display text-2xl font-semibold sm:text-3xl">{t('About')} · {name}</h2>
            <p className="font-medium">{t('Managed by')} · {operator}</p>
            <p className="mt-3 max-w-4xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{detail.background}</p>
            <a href={place.source} className="mt-4 inline-block underline" style={{ color: 'var(--accent)' }}>{t('Visitor information')}</a>
          </section>

          <nav aria-label={t('On this page')} className="my-8 flex flex-wrap gap-2">
            {anchorLinks.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="rounded-full px-3 py-2 text-sm font-medium hover:underline"
                style={{ background: 'var(--tag-bg)', color: 'var(--tag-text)' }}>{t(label)}</a>
            ))}
          </nav>

          <div className="space-y-10">
            <div id="plan" className="scroll-mt-24 rounded-xl border p-5 sm:p-7"
              style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              <h2 className="mb-4 font-display text-2xl font-semibold sm:text-3xl">{t('Basic information')}</h2>
              <dl className="divide-y divide-[var(--border-color)]">
                {[
                  ['Attraction', name],
                  ['Type', visit.kind],
                  ['Area', area],
                  ['Address', address],
                  ['Managed by', operator],
                  ['Suggested visit', visit.duration],
                  ['Visitor access', copy?.access ?? place.access],
                ].map(([label, value]) => (
                  <div key={label} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
                    <dt className="font-semibold">{t(label)}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border p-5 sm:p-7" style={{ borderColor: 'var(--border-color)' }}>
                <GuideSection id="hours" title={t('Opening hours')}>
                  <p>{visit.hours}</p>
                  <p><a href={place.visit.hoursUrl ?? place.source} className="underline" style={{ color: 'var(--accent)' }}>{t('Check visitor hours and closures')}</a></p>
                </GuideSection>
              </div>
              <div className="rounded-xl border p-5 sm:p-7" style={{ borderColor: 'var(--border-color)' }}>
                <GuideSection id="tickets" title={t('Admission and tickets')}>
                  <p>{visit.admission}</p>
                  <p><a href={place.visit.ticketsUrl ?? place.visit.hoursUrl ?? place.source} className="underline" style={{ color: 'var(--accent)' }}>{t('Check admission and booking')}</a></p>
                </GuideSection>
              </div>
            </div>

            <GuideSection id="transport" title={t('Getting there')}>
              <p>{detail.transport}</p>
              <p><a href={maps.transit} className="underline" style={{ color: 'var(--accent)' }}>{t('Plan a public transport journey')}</a></p>
            </GuideSection>

            <GuideSection id="highlights" title={t('History, architecture and culture')}>
              <p>{copy?.history ?? place.history}</p>
            </GuideSection>

            <GuideSection id="walking" title={t('Suggested walking route')}>
              <p>{copy?.route ?? place.route}</p>
              <ol className="list-decimal space-y-3 pl-5">
                <li className="pl-2">{detail.firstStop}</li>
                <li className="pl-2">{detail.finalStop}</li>
              </ol>
            </GuideSection>

            <GuideSection id="visitor-notes" title={t('Before you go')}>
              <p>{visit.access}</p>
            </GuideSection>

            <GuideSection id="photography" title={t('Photography')}>
              <p>{copy?.photoTip ?? place.photoTip}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {photos.map((photo) => (
                  <figure key={photo.path} className="overflow-hidden rounded-xl border"
                    style={{ borderColor: 'var(--border-color)', background: 'var(--bg-secondary)' }}>
                    <img src={photo.path} alt={photo.caption || `${t('Photograph from')} · ${name}`} loading="lazy" className="max-h-[30rem] w-full object-contain" />
                    <figcaption className="p-4 text-sm">
                      {photo.caption && <p className="mb-1 font-medium">{photo.caption}</p>}
                      {t('Photograph by')}{' '}<a href={photo.source} className="underline">{photo.author}</a>
                      {' · '}<a href={photo.licenseUrl} className="underline">{photo.license}</a>{' · '}{t('Resized')}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </GuideSection>

            <GuideSection id="faq" title={t('Frequently asked questions')}>
              <details className="rounded-xl border p-4" style={{ borderColor: 'var(--border-color)' }}>
                <summary className="cursor-pointer font-medium">{detail.question}</summary>
                <p className="mt-3">{detail.answer}</p>
              </details>
              <details className="rounded-xl border p-4" style={{ borderColor: 'var(--border-color)' }}>
                <summary className="cursor-pointer font-medium">{t('How do I get there by public transport?')}</summary>
                <p className="mt-3">{detail.transport}</p>
              </details>
            </GuideSection>

            <GuideSection id="staying" title={t('Where to stay')}>
              <p>{guideLodging(locale, place.area, lodgingByArea[place.area])}</p>
            </GuideSection>

            <GuideSection id="reviews" title={t('Visitor reviews')}>
              <p><a className="underline" href={maps.search} style={{ color: 'var(--accent)' }}>{t('See the current rating and visitor reviews on Google Maps')}</a></p>
            </GuideSection>

            <div className="rounded-2xl border p-5 sm:p-7" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              <GuideSection id="directions" title={t('Address and map')}>
                <address className="not-italic">{name}<br />{address}, {t('Scotland')}</address>
                <div className="flex flex-wrap gap-x-5 gap-y-2" style={{ color: 'var(--accent)' }}>
                  <a href={maps.search} className="underline">{t('View location on Google Maps')}</a>
                  <a href={maps.transit} className="underline">{t('Public transport directions')}</a>
                </div>
              </GuideSection>
            </div>

            <GuideSection id="more-nearby" title={t('More nearby guides')}>
              {related.length > 0 && (
                <ul className="grid gap-3 sm:grid-cols-2">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <a href={`/${locale}/nearby/${item.slug}`} className="block rounded-lg border p-3 font-medium hover:underline"
                        style={{ borderColor: 'var(--border-color)', color: 'var(--accent)' }}>{guidePlace(locale, item.slug)?.name ?? item.name}</a>
                    </li>
                  ))}
                </ul>
              )}
              <a href={`/${locale}/nearby`} className="inline-block font-medium underline" style={{ color: 'var(--accent)' }}>{t('Browse all nearby attractions')}</a>
            </GuideSection>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
