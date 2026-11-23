import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { nearby, placeMap } from '@/content/nearby';
import { SITE_URL } from '@/lib/seo';

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

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
  return {
    title, description: place.history, alternates: { canonical, languages: {} },
    openGraph: { title, description: place.history, url: canonical, images: [`${SITE_URL}/nearby/${place.slug}.jpg`] },
    twitter: { card: 'summary_large_image', title, description: place.history, images: [`${SITE_URL}/nearby/${place.slug}.jpg`] },
  };
}

export default async function Page(props: Props) {
  const place = await getPlace(props);
  setRequestLocale('en');
  const map = placeMap(place.name, place.address);
  const related = nearby.filter((candidate) => candidate.area === place.area && candidate.slug !== place.slug).slice(0, 4);
  const directions = `https://www.google.com/maps/dir/?api=1&travelmode=transit&destination=${encodeURIComponent(`${place.name}, ${place.address}, Edinburgh, Scotland`)}`;
  const image = `/nearby/${place.slug}.jpg`;
  const sections = [
    ['What to look for', place.history],
    ['Walking route', place.route],
    ['Photography', place.photoTip],
  ];

  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'TouristAttraction', name: place.name,
        description: place.history, image: `${SITE_URL}${image}`, address: `${place.address}, Edinburgh`, hasMap: map }} />
      <Header solid englishGuide />
      <main className="pt-16">
        <section className="relative isolate flex min-h-[26rem] items-end overflow-hidden bg-stone-900 sm:min-h-[34rem]">
          <img src={image} alt={place.name} fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/45 to-transparent" />
          <div className="mx-auto w-full max-w-6xl px-5 py-10 text-white sm:px-8">
            <nav aria-label="Breadcrumb" className="mb-4 text-sm">
              <a href="/en" className="underline">Princes Street Gardens</a>
              <span aria-hidden="true"> / </span>
              <a href="/en/nearby" className="underline">Nearby attractions</a>
            </nav>
            <h1 className="font-display text-4xl font-semibold sm:text-6xl">{place.name}</h1>
            <p className="mt-3 text-lg">{place.area}</p>
            <a href={map} className="mt-5 inline-flex rounded-full bg-white px-5 py-2.5 font-medium text-stone-900">View on Google Maps</a>
          </div>
        </section>
        <div className="section-padding mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className="space-y-9">
            <section>
              <h2 className="mb-3 font-display text-2xl font-semibold">About {place.name}</h2>
              <p>Managed by {place.operator}.</p>
            </section>
            {sections.map(([heading, body]) => (
              <section key={heading}>
                <h2 className="mb-3 font-display text-2xl font-semibold">{heading}</h2>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{body}</p>
              </section>
            ))}
            <section id="reviews">
              <h2 className="mb-3 font-display text-2xl font-semibold">Visitor reviews</h2>
              <a className="underline" href={map} style={{ color: 'var(--accent)' }}>See current rating and visitor reviews on Google Maps</a>
            </section>
            <figure className="overflow-hidden rounded-xl border" style={{ borderColor: 'var(--border-color)' }}>
              <img src={image} alt={`Photograph from ${place.name}`} loading="lazy" className="max-h-[34rem] w-full object-contain" style={{ background: 'var(--bg-secondary)' }} />
              <figcaption className="p-4 text-sm" style={{ color: 'var(--text-muted)' }}>
              Photograph <a href={place.photo.source} className="underline">{place.photo.author}</a>
              {' · '}<a href={place.photo.licenseUrl} className="underline">{place.photo.license}</a>{' · Resized'}
              </figcaption>
            </figure>
          </div>
          <aside className="space-y-6">
            <section className="rounded-xl border p-5 sm:p-7" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              <h2 className="mb-4 font-display text-2xl font-semibold">Plan your visit</h2>
              <dl className="space-y-4">
                <div><dt className="font-semibold">Address</dt><dd>{place.address}, Edinburgh</dd></div>
                <div><dt className="font-semibold">Opening and admission</dt><dd>{place.access}</dd></div>
              </dl>
              <p className="mt-5"><a href={place.source} className="underline" style={{ color: 'var(--accent)' }}>Visitor information</a></p>
              <p className="mt-3"><a href={directions} className="underline" style={{ color: 'var(--accent)' }}>Plan a public transport journey</a></p>
            </section>
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
      </main>
      <Footer />
    </>
  );
}
