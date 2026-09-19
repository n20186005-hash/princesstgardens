import { setRequestLocale, getMessages, getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
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

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
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
        <Gallery />
        <HotelsSection />
        <Reviews />
        <MapEmbed />
        <FaqSection title={tFaq('title')} items={faqItems} />
      </main>
      <Footer />
    </>
  );
}
