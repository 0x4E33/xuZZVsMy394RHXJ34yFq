"use client";

import { LegalLayout } from "@/components/layout/legal-layout";
import { useTranslations } from 'next-intl';

export function CookiesContent() {
  const t = useTranslations('Legal.cookies');

  const sections = [
    { id: "scope", title: t('s1.title') },
    { id: "collect", title: t('s2.title') },
    { id: "use", title: t('s3.title') },
    { id: "cookies", title: t('s4.title') },
    { id: "share", title: t('s5.title') },
    { id: "security", title: t('s6.title') },
    { id: "rights", title: t('s7.title') },
    { id: "minors", title: t('s8.title') },
    { id: "transfer", title: t('s9.title') },
    { id: "changes", title: t('s10.title') },
  ];

  return (
    <LegalLayout
      title={t('title')}
      lastUpdated={t('lastUpdated')}
      sections={sections}
    >
      <p dangerouslySetInnerHTML={{ __html: t.raw('intro') }} />

      <h2 id="scope">{t('s1.title')}</h2>
      <p>{t('s1.desc')}</p>

      <h2 id="collect">{t('s2.title')}</h2>
      <p>{t('s2.desc')}</p>
      <ul>
        {[0, 1, 2, 3, 4].map((i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: t.raw(`s2.items.${i}`) }} />
        ))}
      </ul>

      <h2 id="use">{t('s3.title')}</h2>
      <ul>
        {[0, 1, 2, 3, 4].map((i) => (
          <li key={i}>{t(`s3.items.${i}`)}</li>
        ))}
      </ul>

      <h2 id="cookies">{t('s4.title')}</h2>
      <p>{t('s4.desc')}</p>
      <ul>
        {[0, 1, 2].map((i) => (
          <li key={i}>{t(`s4.items.${i}`)}</li>
        ))}
      </ul>
      <p>{t('s4.footer')}</p>

      <h2 id="share">{t('s5.title')}</h2>
      <p>{t('s5.desc')}</p>
      <ul>
        {[0, 1, 2].map((i) => (
          <li key={i}>{t(`s5.items.${i}`)}</li>
        ))}
      </ul>

      <h2 id="security">{t('s6.title')}</h2>
      <p>{t('s6.desc')}</p>
      <ul>
        {[0, 1, 2, 3, 4].map((i) => (
          <li key={i}>{t(`s6.items.${i}`)}</li>
        ))}
      </ul>

      <h2 id="rights">{t('s7.title')}</h2>
      <p>{t('s7.desc')}</p>
      <ul>
        {[0, 1, 2, 3, 4].map((i) => (
          <li key={i}>{t(`s7.items.${i}`)}</li>
        ))}
      </ul>
      <p>
        {t('s7.footer')} <a href="https://t.me/Epay_02" target="_blank" rel="noopener noreferrer" className="text-cyan-400">@Epay_02</a> or <a href="https://t.me/Epay_3" target="_blank" rel="noopener noreferrer" className="text-cyan-400">@Epay_3</a>
      </p>

      <h2 id="minors">{t('s8.title')}</h2>
      <p>{t('s8.desc')}</p>

      <h2 id="transfer">{t('s9.title')}</h2>
      <p>{t('s9.desc')}</p>

      <h2 id="changes">{t('s10.title')}</h2>
      <p>{t('s10.desc')}</p>
    </LegalLayout>
  );
}
