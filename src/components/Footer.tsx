import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { guideTopics, guideText } from '@/content/guide-localization';
import type { Locale } from '@/i18n/routing';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale() as Locale;
  const copy = guideText(locale);
  const topics = guideTopics(locale);
  const prefix = `/${locale}`;

  return (
    <footer
      className="py-12 px-4 sm:px-6"
      style={{ background: 'var(--bg-tertiary)', borderTop: '1px solid var(--border-color)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-8 mb-8">
          <div className="max-w-md">
            <h3 className="font-display text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              {t('officialResourcesTitle')}
            </h3>
            <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
              {t('disclaimer')}
            </p>
            <div className="flex flex-col gap-2">
              <a href="https://www.edinburgh.gov.uk/directory-record/1099222/west-princes-street-gardens" target="_blank" rel="noopener noreferrer" className="hover:underline text-sm" style={{ color: 'var(--accent)' }}>
                {copy('Edinburgh City Council')}
              </a>
              <a href="https://portal.historicenvironment.scot/designation/GDL00367" target="_blank" rel="noopener noreferrer" className="hover:underline text-sm" style={{ color: 'var(--accent)' }}>
                {copy('Historic Environment Scotland')}
              </a>
              <a href="https://ewh.org.uk/ross-fountain/" target="_blank" rel="noopener noreferrer" className="hover:underline text-sm" style={{ color: 'var(--accent)' }}>
                {copy('Edinburgh World Heritage')}
              </a>
              <a href="https://edinburgh.org/point-of-interest/scott-monument/" target="_blank" rel="noopener noreferrer" className="hover:underline text-sm" style={{ color: 'var(--accent)' }}>
                {copy('Official Edinburgh Tourism Board')}
              </a>
              <a href="https://www.nationalgalleries.org/visit/scottish-national-gallery" target="_blank" rel="noopener noreferrer" className="hover:underline text-sm" style={{ color: 'var(--accent)' }}>
                {copy('Scottish National Gallery')}
              </a>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm mt-4 sm:mt-0">
              <div className="flex flex-col gap-2 mr-4">
                <h3 className="font-display text-base font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {copy('Visitor guides')}
                </h3>
                {Object.values(topics).map((g) => (
                  <a
                    key={g.slug}
                    href={`/${locale}/${g.slug}`}
                    style={{ color: 'var(--text-secondary)' }}
                    className="hover:underline"
                  >
                    {g.navLabel}
                  </a>
                ))}
              </div>
            <a href={`${prefix}/privacy-policy`} style={{ color: 'var(--text-secondary)' }} className="hover:underline">
              {t('privacy')}
            </a>
            <a href={`${prefix}/terms-of-service`} style={{ color: 'var(--text-secondary)' }} className="hover:underline">
              {t('terms')}
            </a>
            <a href={`${prefix}/cookie-settings`} style={{ color: 'var(--text-secondary)' }} className="hover:underline">
              {t('cookies')}
            </a>
          </div>
        </div>

        <div
          className="pt-6 text-center text-sm space-y-4"
          style={{ borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
        >
          <p>{t('rights')}</p>
          <p className="text-xs max-w-3xl mx-auto leading-relaxed">{t('disclaimer')}</p>
        </div>
      </div>
    </footer>
  );
}
