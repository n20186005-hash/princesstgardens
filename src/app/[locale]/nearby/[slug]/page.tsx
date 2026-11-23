import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { nearby, placeMaps } from '@/content/nearby';
import { SITE_URL } from '@/lib/seo';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return nearby.map(({ slug }) => ({ locale: 'en', slug }));
}

async function getPlace({ params }: Props) {
  const { locale, slug } = await params;
  const place = nearby.find((candidate) => candidate.slug === slug);
  if (locale !== 'en' || !place) notFound();
  return place;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const place = await getPlace(props);
  const canonical = `${SITE_URL}/en/nearby/${place.slug}`;
  const title = `${place.name} | Edinburgh Visitor Guide`;
  const image = (place.slug !== 'ross-fountain' && place.extraPhoto?.path) || `/nearby/${place.slug}.jpg`;
  return {
    title,
    description: place.history,
    alternates: { canonical, languages: {} },
    openGraph: { title, description: place.history, url: canonical, images: [`${SITE_URL}${image}`] },
    twitter: { card: 'summary_large_image', title, description: place.history, images: [`${SITE_URL}${image}`] },
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
      <div className="space-y-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{children}</div>
    </section>
  );
}

export default async function Page(props: Props) {
  const place = await getPlace(props);
  setRequestLocale('en');
  const maps = placeMaps(place);
  const { detail, visit } = place;
  const related = nearby.filter((candidate) => candidate.area === place.area && candidate.slug !== place.slug).slice(0, 4);
  const photos = [{ ...place.photo, path: `/nearby/${place.slug}.jpg`, caption: '' }];
  if (place.extraPhoto) {
    if (place.slug === 'ross-fountain') photos.push(place.extraPhoto);
    else photos.unshift(place.extraPhoto);
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
        name: place.name,
        description: place.history,
        image: photos.map(({ path }) => `${SITE_URL}${path}`),
        address: `${place.address}, Edinburgh`,
        hasMap: maps.search,
      }} />
      <Header solid englishGuide />
      <main className="pt-16">
        <section className="relative isolate flex min-h-[28rem] items-end overflow-hidden bg-stone-900 sm:min-h-[35rem]">
          <img src={heroImage} alt={place.name} fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="mx-auto w-full max-w-6xl px-5 py-10 text-white sm:px-8">
            <nav aria-label="Breadcrumb" className="mb-4 text-sm">
              <a href="/en" className="underline">Princes Street Gardens</a>
              <span aria-hidden="true"> / </span>
              <a href="/en/nearby" className="underline">Nearby attractions</a>
            </nav>
            <h1 className="max-w-4xl font-display text-4xl font-semibold sm:text-6xl">{place.name}</h1>
            <p className="mt-3 text-xl">{detail.tagline}</p>
            <p className="mt-2 text-sm text-white/90">{place.address}, Edinburgh</p>
            <p className="mt-2 max-w-2xl text-sm text-white/90">
              <a href="#hours" className="underline">Opening hours</a>{' · '}{visit.hours.split('. ')[0]}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={maps.search} className="rounded-full bg-white px-5 py-2.5 font-medium text-stone-900">View on Google Maps</a>
              <a href="#reviews" className="rounded-full border border-white/70 px-5 py-2.5 font-medium">Ratings and reviews</a>
            </div>
          </div>
        </section>

        <div className="section-padding mx-auto max-w-6xl">
          <div className="mb-8 max-w-4xl space-y-7">
            <GuideSection id="explore" title={`Explore ${place.name}`}>
              <p>{visit.experience}</p>
            </GuideSection>
            <GuideSection id="visit-tips" title="Visiting tips">
              <p>{detail.advice}</p>
            </GuideSection>
            <GuideSection id="features" title="Highlights">
              <p>{detail.details}</p>
            </GuideSection>
          </div>
          <section id="about" className="scroll-mt-24 rounded-2xl border p-6 sm:p-9"
            style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
            <h2 className="mb-4 font-display text-2xl font-semibold sm:text-3xl">About {place.name}</h2>
            <p className="font-medium">Managed by {place.operator}.</p>
            <p className="mt-3 max-w-4xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{detail.background}</p>
            <a href={place.source} className="mt-4 inline-block underline" style={{ color: 'var(--accent)' }}>Visitor information</a>
          </section>

          <nav aria-label="On this page" className="my-8 flex flex-wrap gap-2">
            {anchorLinks.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="rounded-full px-3 py-2 text-sm font-medium hover:underline"
                style={{ background: 'var(--tag-bg)', color: 'var(--tag-text)' }}>{label}</a>
            ))}
          </nav>

          <div className="space-y-10">
            <div id="plan" className="scroll-mt-24 rounded-xl border p-5 sm:p-7"
              style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              <h2 className="mb-4 font-display text-2xl font-semibold sm:text-3xl">Basic information</h2>
              <dl className="divide-y divide-[var(--border-color)]">
                {[
                  ['Attraction', place.name],
                  ['Type', visit.kind],
                  ['Area', place.area],
                  ['Address', `${place.address}, Edinburgh`],
                  ['Managed by', place.operator],
                  ['Suggested visit', visit.duration],
                  ['Visitor access', place.access],
                ].map(([label, value]) => (
                  <div key={label} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
                    <dt className="font-semibold">{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border p-5 sm:p-7" style={{ borderColor: 'var(--border-color)' }}>
                <GuideSection id="hours" title="Opening hours">
                  <p>{visit.hours}</p>
                  <p><a href={visit.hoursUrl ?? place.source} className="underline" style={{ color: 'var(--accent)' }}>Check visitor hours and closures</a></p>
                </GuideSection>
              </div>
              <div className="rounded-xl border p-5 sm:p-7" style={{ borderColor: 'var(--border-color)' }}>
                <GuideSection id="tickets" title="Admission and tickets">
                  <p>{visit.admission}</p>
                  <p><a href={visit.ticketsUrl ?? visit.hoursUrl ?? place.source} className="underline" style={{ color: 'var(--accent)' }}>Check admission and booking</a></p>
                </GuideSection>
              </div>
            </div>

            <GuideSection id="transport" title="Getting there">
              <p>{detail.transport}</p>
              <p><a href={maps.transit} className="underline" style={{ color: 'var(--accent)' }}>Plan a public transport journey</a></p>
            </GuideSection>

            <GuideSection id="highlights" title="History, architecture and culture">
              <p>{place.history}</p>
            </GuideSection>

            <GuideSection id="walking" title="Suggested walking route">
              <p>{place.route}</p>
              <ol className="list-decimal space-y-3 pl-5">
                <li className="pl-2">{detail.firstStop}</li>
                <li className="pl-2">{detail.finalStop}</li>
              </ol>
            </GuideSection>

            <GuideSection id="visitor-notes" title="Before you go">
              <p>{visit.access}</p>
            </GuideSection>

            <GuideSection id="photography" title="Photography">
              <p>{place.photoTip}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {photos.map((photo) => (
                  <figure key={photo.path} className="overflow-hidden rounded-xl border"
                    style={{ borderColor: 'var(--border-color)', background: 'var(--bg-secondary)' }}>
                    <img src={photo.path} alt={photo.caption || `Photograph from ${place.name}`} loading="lazy" className="max-h-[30rem] w-full object-contain" />
                    <figcaption className="p-4 text-sm">
                      {photo.caption && <p className="mb-1 font-medium">{photo.caption}</p>}
                      Photograph by <a href={photo.source} className="underline">{photo.author}</a>
                      {' · '}<a href={photo.licenseUrl} className="underline">{photo.license}</a>{' · Resized'}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </GuideSection>

            <GuideSection id="faq" title="Frequently asked questions">
              <details className="rounded-xl border p-4" style={{ borderColor: 'var(--border-color)' }}>
                <summary className="cursor-pointer font-medium">{detail.question}</summary>
                <p className="mt-3">{detail.answer}</p>
              </details>
              <details className="rounded-xl border p-4" style={{ borderColor: 'var(--border-color)' }}>
                <summary className="cursor-pointer font-medium">How do I get there by public transport?</summary>
                <p className="mt-3">{detail.transport}</p>
              </details>
            </GuideSection>

            <GuideSection id="staying" title="Where to stay">
              <p>{lodgingByArea[place.area]}</p>
            </GuideSection>

            <GuideSection id="reviews" title="Visitor reviews">
              <p><a className="underline" href={maps.search} style={{ color: 'var(--accent)' }}>See the current rating and visitor reviews on Google Maps</a></p>
            </GuideSection>

            <div className="rounded-2xl border p-5 sm:p-7" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              <GuideSection id="directions" title="Address and map">
                <address className="not-italic">{place.name}<br />{place.address}, Edinburgh, Scotland</address>
                <div className="flex flex-wrap gap-x-5 gap-y-2" style={{ color: 'var(--accent)' }}>
                  <a href={maps.search} className="underline">View location on Google Maps</a>
                  <a href={maps.transit} className="underline">Public transport directions</a>
                </div>
              </GuideSection>
            </div>

            <GuideSection id="more-nearby" title="More nearby guides">
              {related.length > 0 && (
                <ul className="grid gap-3 sm:grid-cols-2">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <a href={`/en/nearby/${item.slug}`} className="block rounded-lg border p-3 font-medium hover:underline"
                        style={{ borderColor: 'var(--border-color)', color: 'var(--accent)' }}>{item.name}</a>
                    </li>
                  ))}
                </ul>
              )}
              <a href="/en/nearby" className="inline-block font-medium underline" style={{ color: 'var(--accent)' }}>Browse all nearby attractions</a>
            </GuideSection>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
