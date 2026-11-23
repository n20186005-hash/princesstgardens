import { setRequestLocale, getMessages, getTranslations } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { buildAttractionJsonLd, buildFaqJsonLd, type FaqItem } from '@/lib/seo';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import BasicInfo from '@/components/BasicInfo';
import HoursSection from '@/components/HoursSection';
import TicketsSection from '@/components/TicketsSection';
import TransportSection from '@/components/TransportSection';
import InfoSection from '@/components/InfoSection';
import RouteSection from '@/components/RouteSection';
import PhotoSpotsSection from '@/components/PhotoSpotsSection';
import HotelsSection from '@/components/HotelsSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import MapEmbed from '@/components/MapEmbed';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import NearbyGuides from '@/components/NearbyGuides';
import { guideTopics, guideText } from '@/content/guide-localization';

function GuideLinks({ locale }: { locale: Locale }) {
  const t = guideText(locale);
  const topics = guideTopics(locale);
  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-2xl sm:text-3xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('Plan your visit')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(topics).map((t) => (
            <a
              key={t.slug}
              href={`/${locale}/${t.slug}`}
              className="rounded-xl p-5 transition-shadow hover:shadow-md"
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
              }}
            >
              <p className="font-medium">{t.navLabel}</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                {t.title.split(' | ')[0].split(' | ')[0]}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const messages = (await getMessages()) as {
    meta: { description: string };
    faq: { items: FaqItem[] };
  };
  const faqItems = messages.faq.items.map((it) => ({
    question: it.question,
    answer: it.answer,
  }));

  const attractionLd = buildAttractionJsonLd(locale as Locale, messages.meta.description);
  const faqLd = buildFaqJsonLd(faqItems);

  const tFaq = await getTranslations({ locale, namespace: 'faq' });

  return (
    <>
      <JsonLd data={[attractionLd, faqLd]} />
      <Header />
      <main>
        <Hero />
        <Intro />
        <BasicInfo />
        <HoursSection />
        <TicketsSection />
        <TransportSection />
        <InfoSection />
        <RouteSection />
        <PhotoSpotsSection />
        <NearbyGuides locale={locale} compact />
        <Gallery />
        <HotelsSection />
        <Reviews />
        <MapEmbed />
        <GuideLinks locale={locale} />
        <FaqSection title={tFaq('title')} items={faqItems} />
      </main>
      <Footer />
    </>
  );
}
