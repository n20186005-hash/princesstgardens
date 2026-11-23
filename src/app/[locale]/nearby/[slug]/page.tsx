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
  const { detail } = place;
  const related = nearby.filter((candidate) => candidate.area === place.area && candidate.slug !== place.slug).slice(0, 4);
  const photos = [{ ...place.photo, path: `/nearby/${place.slug}.jpg`, caption: '' }];
  if (place.extraPhoto) {
    if (place.slug === 'ross-fountain') photos.push(place.extraPhoto);
    else photos.unshift(place.extraPhoto);
  }
  const heroImage = photos[0].path;
  const anchorLinks = [
    ['about', 'About'],
    ['plan', 'Visit information'],
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
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={maps.search} className="rounded-full bg-white px-5 py-2.5 font-medium text-stone-900">View on Google Maps</a>
              <a href="#reviews" className="rounded-full border border-white/70 px-5 py-2.5 font-medium">Visitor reviews</a>
            </div>
          </div>
        </section>

        <div className="section-padding mx-auto max-w-6xl">
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

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
            <div className="space-y-10">
              <GuideSection id="visit-tips" title="Visiting tips">
                <p>{detail.advice}</p>
              </GuideSection>

              <GuideSection id="highlights" title="History, architecture and what to look for">
                <p>{place.history}</p>
                <p>{detail.details}</p>
              </GuideSection>

              <GuideSection id="walking" title="Suggested walking route">
                <p>{place.route}</p>
                <ol className="list-decimal space-y-3 pl-5">
                  <li className="pl-2">{detail.firstStop}</li>
                  <li className="pl-2">{detail.finalStop}</li>
                </ol>
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

              <GuideSection id="reviews" title="Visitor reviews">
                <p><a className="underline" href={maps.search} style={{ color: 'var(--accent)' }}>See the current rating and visitor reviews on Google Maps</a></p>
              </GuideSection>
            </div>

            <aside className="order-first space-y-8 lg:order-last">
              <div id="plan" className="scroll-mt-24 rounded-xl border p-5 sm:p-7"
                style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                <h2 className="mb-4 font-display text-2xl font-semibold">Plan your visit</h2>
                <dl className="space-y-4">
                  <div><dt className="font-semibold">Address</dt><dd>{place.address}, Edinburgh</dd></div>
                  <div><dt className="font-semibold">Opening and admission</dt><dd>{place.access}</dd></div>
                  <div><dt className="font-semibold">Getting there</dt><dd>{detail.transport}</dd></div>
                </dl>
                <div className="mt-5 space-y-2" style={{ color: 'var(--accent)' }}>
                  <p><a href={place.source} className="underline">Check opening and ticket details</a></p>
                  <p><a href={maps.search} className="underline">View location on Google Maps</a></p>
                  <p><a href={maps.transit} className="underline">Plan a public transport journey</a></p>
                </div>
              </div>
              {related.length > 0 && (
                <section>
                  <h2 className="mb-3 font-display text-xl font-semibold">More in {place.area}</h2>
                  <ul className="space-y-2">
                    {related.map((item) => <li key={item.slug}><a href={`/en/nearby/${item.slug}`} className="underline" style={{ color: 'var(--accent)' }}>{item.name}</a></li>)}
                  </ul>
                </section>
              )}
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
