import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const baseUrl = 'https://princesstgardens.com';

  const localeUrls = Object.fromEntries(
    routing.locales.map((l) => [l, `${baseUrl}/${l}`])
  );
  const selfUrl = localeUrls[locale] ?? localeUrls[routing.defaultLocale];

  const ogLocale: Record<string, string> = {
    zh: 'zh_CN',
    en: 'en_US',
    pl: 'pl_PL',
    de: 'de_DE',
    it: 'it_IT',
    es: 'es_ES',
    fr: 'fr_FR',
  };

  return {
    title: messages.meta.title,
    description: messages.meta.description,
    alternates: {
      canonical: selfUrl,
      languages: {
        ...localeUrls,
        'x-default': localeUrls[routing.defaultLocale],
      },
    },
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: selfUrl,
      siteName: "Princes Street Gardens",
      locale: ogLocale[locale] ?? 'en_US',
      type: 'website',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={
        locale === 'zh'
          ? 'zh-CN'
          : locale === 'en'
            ? 'en'
            : locale === 'pl'
              ? 'pl'
              : locale === 'de'
                ? 'de'
                : locale === 'it'
                  ? 'it'
                  : locale === 'es'
                    ? 'es'
                    : locale === 'fr'
                      ? 'fr'
                      : 'en'
      }
      suppressHydrationWarning
    >
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous" />
        <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXX" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
