import { useTranslations } from 'next-intl';

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill={i <= count ? '#f0b429' : 'var(--border-color)'}
          stroke="none"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  const t = useTranslations('reviews');
  const tHero = useTranslations('hero');
  const rating = Number(tHero('rating')) || 4.7;

  return (
    <section id="reviews" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <div
          className="rounded-xl p-6 sm:p-8 text-center"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
        >
          <p
            className="text-sm mb-3"
            style={{ color: 'var(--text-muted)' }}
          >
            {t('declaration')}
          </p>

          <div className="flex justify-center mb-3">
            <Stars count={Math.round(rating)} />
          </div>

          <p
            className="font-display text-4xl font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            {rating.toFixed(1)}
          </p>
          <p className="text-base mt-1" style={{ color: 'var(--text-secondary)' }}>
            {tHero('reviewCount')}
          </p>

          <p className="text-sm mt-4" style={{ color: 'var(--text-muted)' }}>
            {t('ratingNote')}
          </p>

          <div className="flex justify-center mt-6">
            <a
              href="https://maps.app.goo.gl/d4fuHbdFk3VPCpse7"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all"
              style={{
                color: 'var(--accent)',
                border: '1px solid var(--accent)',
              }}
            >
              <span>{t('moreReviews')}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="group-hover:translate-x-1 transition-transform"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
