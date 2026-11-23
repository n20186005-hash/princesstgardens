import { nearby } from '@/content/nearby';

export const nearbyLabels: Record<string, string> = {
  zh: '周边景点', en: 'Nearby attractions', pl: 'Atrakcje w pobliżu',
  de: 'Sehenswürdigkeiten in der Nähe', it: 'Attrazioni nelle vicinanze',
  es: 'Atracciones cercanas', fr: 'Sites à proximité',
};

export default function NearbyGuides({ locale, compact = false }: { locale: string; compact?: boolean }) {
  const title = nearbyLabels[locale];
  const previewSlugs = ['scott-monument', 'ross-fountain', 'national-gallery', 'edinburgh-castle', 'calton-hill', 'national-museum'];
  const places = compact ? nearby.filter((place) => previewSlugs.includes(place.slug)) : nearby;
  const groups = compact ? [''] : [...new Set(places.map((place) => place.area))];

  return (
    <section id="nearby" className="section-padding scroll-mt-20" style={{ background: 'var(--bg-secondary)' }}>
      <div className="mx-auto max-w-6xl">
        {compact ? (
          <h2 className="mb-6 font-display text-3xl font-semibold">{title}</h2>
        ) : (
          <h1 className="mb-8 font-display text-4xl font-semibold">{title}</h1>
        )}
        {groups.map((group) => (
          <div key={group} className={group ? 'mb-12' : undefined}>
            {group && <h2 lang="en" className="mb-4 font-display text-2xl font-semibold">{group}</h2>}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {places.filter((place) => !group || place.area === group).map((place) => (
                <a key={place.slug} href={`/en/nearby/${place.slug}`} hrefLang="en" lang="en"
                  className="overflow-hidden rounded-xl border transition-shadow hover:shadow-lg"
                  style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
                  <img src={`/nearby/${place.slug}.jpg`} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover" />
                  <div className="flex items-baseline justify-between gap-3 p-4">
                    <span className="font-display text-xl font-semibold">{place.name}</span>
                    {locale !== 'en' && <span className="text-xs" aria-label="English">EN</span>}
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
        {compact && (
          <a href={`/${locale}/nearby`} className="mt-6 inline-block font-medium underline" style={{ color: 'var(--accent)' }}>
            {title} →
          </a>
        )}
      </div>
    </section>
  );
}
