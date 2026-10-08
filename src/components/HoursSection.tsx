'use client';

import { useTranslations, useMessages } from 'next-intl';
import type { ReactNode } from 'react';

export default function HoursSection() {
  const t = useTranslations('hours');
  const messages = useMessages() as any;
  const schedule = (messages?.hours?.schedule || []) as Array<{
    period: string;
    closes: string;
    gates: string;
  }>;
  const headers = messages?.hours?.scheduleHeaders || {
    period: 'Dates',
    closes: 'Closing time',
    gates: 'Gates start closing',
  };

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <TimeCard title={t('park')} time={t('parkTime')} iconKey="park" />
          <TimeCard title={t('bestTime')} time={t('bestTimeSpring')} subtitle={t('bestTimeSummer')} iconKey="season" />
          <TimeCard title={t('bestTime')} time={t('bestTimeAutumn')} subtitle={t('bestTimeWinter')} iconKey="season" />
        </div>

        <div
          className="rounded-xl p-5 flex items-start gap-4 mb-8"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" className="flex-shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t('tip')}</p>
        </div>

        <div
          className="rounded-xl p-6 mb-6"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
        >
          <h3 className="font-display text-xl font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
            {t('scheduleTitle')}
          </h3>
          <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
            {t('scheduleNote')}
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ color: 'var(--text-muted)' }}>
                  <th className="text-left font-medium py-2 pr-4">{headers.period}</th>
                  <th className="text-left font-medium py-2 pr-4">{headers.closes}</th>
                  <th className="text-left font-medium py-2">{headers.gates}</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row, i) => (
                  <tr key={i} style={{ borderTop: '1px solid var(--border-color)' }}>
                    <td className="py-2 pr-4" style={{ color: 'var(--text-primary)' }}>{row.period}</td>
                    <td className="py-2 pr-4 font-medium" style={{ color: 'var(--text-primary)' }}>{row.closes}</td>
                    <td className="py-2" style={{ color: 'var(--text-secondary)' }}>{row.gates}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
            {t('sourceNote')}
          </p>
        </div>
      </div>
    </section>
  );
}

function TimeCard({ title, time, subtitle, iconKey }: { title: string; time: string; subtitle?: string; iconKey: string }) {
  const icons: Record<string, ReactNode> = {
    park: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L4 12h3v4h10v-4h3L12 2z" />
        <rect x="10" y="16" width="4" height="6" />
      </svg>
    ),
    season: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    ),
  };

  return (
    <div
      className="rounded-xl p-6"
      style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
    >
      <div className="flex items-center gap-3 mb-3" style={{ color: 'var(--accent)' }}>
        {icons[iconKey]}
        <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>{title}</h3>
      </div>
      <p className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{time}</p>
      {subtitle && (
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{subtitle}</p>
      )}
    </div>
  );
}
