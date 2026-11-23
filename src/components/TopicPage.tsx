import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reviews from '@/components/Reviews';
import JsonLd from '@/components/JsonLd';
import { SITE_URL } from '@/lib/seo';
import type { Topic } from '@/content/topics';
import type { Locale } from '@/i18n/routing';
import { guideTopics, guideText } from '@/content/guide-localization';

export default function TopicPage({
  topic,
  locale,
}: {
  topic: Topic;
  locale: Locale;
}) {
  const t = guideText(locale);
  const topics = guideTopics(locale);
  const homeUrl = `${SITE_URL}/${locale}`;
  const selfUrl = `${homeUrl}/${topic.slug}`;
  const otherTopics = Object.values(topics).filter((t) => t.slug !== topic.slug);

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: topic.faq.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('Home'),
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: topic.title,
        item: selfUrl,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <Header />
      <main>
        <div className="relative isolate flex min-h-[26rem] items-end overflow-hidden px-5 pb-10 pt-24 text-white sm:min-h-[32rem]">
          <img src="/gallery/princes-street-gardens (1).jpg" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" fetchPriority="high" />
          <div className="absolute inset-0 -z-10" style={{ background: 'var(--hero-overlay)' }} />
          <div className="mx-auto w-full max-w-4xl">
          {/* Breadcrumb */}
          <nav aria-label={t('Breadcrumb')} className="mb-6 text-sm text-white/90">
            <a href={homeUrl} className="underline">
              {t('Home')}
            </a>
            <span className="mx-2">/</span>
            <span>{topic.title}</span>
          </nav>

          <h1
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4"
          >
            {topic.title}
          </h1>
          <p className="text-sm text-white/90">
            {topic.updated}
          </p>
          </div>
        </div>
        <div className="section-padding max-w-4xl mx-auto">

          <p
            className="text-lg leading-relaxed mb-10"
            style={{ color: 'var(--text-secondary)' }}
          >
            {topic.intro}
          </p>

          <section className="mb-10 rounded-xl border p-5 sm:p-7" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
            <h2 className="mb-4 font-display text-2xl font-semibold">{t('Princes Street Gardens at a glance')}</h2>
            <dl className="space-y-3">
              <div><dt className="font-semibold">{t('Managed by')}</dt><dd>{t('City of Edinburgh Council')}</dd></div>
              <div><dt className="font-semibold">{t('Location')}</dt><dd>{t('Princes Street and The Mound, Edinburgh EH2')}</dd></div>
              <div><dt className="font-semibold">{t('Admission and access')}</dt><dd>{t('Free public gardens. The east and west gardens have separate gates and seasonal closing times.')}</dd></div>
              <div><dt className="font-semibold">{t('Getting here')}</dt><dd>{t('From Edinburgh Waverley, walk via Waverley Bridge to the east gardens. Princes Street tram stop is close to the Mound and west gardens.')}</dd></div>
            </dl>
            <p className="mt-4">
              <a href="https://maps.app.goo.gl/d4fuHbdFk3VPCpse7" className="underline" style={{ color: 'var(--accent)' }}>{t('View the gardens on Google Maps')}</a>
            </p>
          </section>

          {topic.sections.map((section, i) => (
            <section key={i} className="mb-8 rounded-2xl border p-5 sm:p-8" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              <h2
                className="font-display text-2xl font-semibold mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                {section.heading}
              </h2>

              {section.paragraphs?.map((p, j) => (
                <p
                  key={j}
                  className="leading-relaxed mb-3"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {p}
                </p>
              ))}

              {section.bullets && (
                <ul className="space-y-2 my-3">
                  {section.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span
                        className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                        style={{ background: 'var(--accent)' }}
                      />
                      <span style={{ color: 'var(--text-secondary)' }}>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.table && (
                <div
                  className="overflow-x-auto rounded-xl my-4"
                  style={{ border: '1px solid var(--border-color)' }}
                >
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ color: 'var(--text-muted)' }}>
                        {section.table.columns.map((c, j) => (
                          <th key={j} className="text-left font-medium p-3">
                            {c}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, r) => (
                        <tr key={r} style={{ borderTop: '1px solid var(--border-color)' }}>
                          {row.map((cell, c) => (
                            <td
                              key={c}
                              className="p-3"
                              style={{
                                color: 'var(--text-primary)',
                                verticalAlign: 'top',
                              }}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {section.note && (
                <p
                  className="text-xs mt-3"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {section.note}
                </p>
              )}
            </section>
          ))}

          {/* FAQ */}
          <section className="mt-16">
            <h2
              className="font-display text-2xl font-semibold mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('Frequently asked questions')}
            </h2>
            <div className="space-y-3">
              {topic.faq.map((item, i) => (
                <details
                  key={i}
                  className="group rounded-lg border p-4"
                  style={{
                    borderColor: 'var(--border-color)',
                    background: 'var(--bg-tertiary)',
                  }}
                >
                  <summary className="cursor-pointer list-none font-medium" style={{ color: 'var(--text-primary)' }}>
                    <span className="mr-2 inline-block transition-transform group-open:rotate-45">
                      +
                    </span>
                    {item.question}
                  </summary>
                  <p className="mt-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* More guides */}
          <section className="mt-16">
            <h2
              className="font-display text-xl font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('More visitor guides')}
            </h2>
            <div className="flex flex-wrap gap-3">
              {otherTopics.map((t) => (
                <a
                  key={t.slug}
                  href={`/${locale}/${t.slug}`}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  style={{
                    color: 'var(--accent)',
                    border: '1px solid var(--accent)',
                  }}
                >
                  {t.navLabel}
                </a>
              ))}
              <a href={`/${locale}/nearby`} className="px-4 py-2 rounded-full text-sm font-medium" style={{ color: 'var(--accent)', border: '1px solid var(--accent)' }}>
                {t('Nearby attractions')}
              </a>
            </div>
          </section>
        </div>
        <Reviews />
      </main>
      <Footer />
    </>
  );
}
