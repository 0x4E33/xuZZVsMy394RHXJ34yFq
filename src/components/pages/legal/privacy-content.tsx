"use client";

import { LegalLayout } from "@/components/layout/legal-layout";
import { useTranslations } from 'next-intl';

export function PrivacyContent() {
  const t = useTranslations('Legal.privacy');

  const sections = [
    { id: "collect", title: t('s1.title') },
    { id: "use", title: t('s2.title') },
    { id: "share", title: t('s3.title') },
    { id: "storage", title: t('s4.title') },
    { id: "rights", title: t('s5.title') },
    { id: "children", title: t('s6.title') },
    { id: "transfer", title: t('s7.title') },
    { id: "changes", title: t('s8.title') },
    { id: "contact", title: t('s9.title') },
  ];

  return (
    <LegalLayout
      title={t('title')}
      lastUpdated={t('lastUpdated')}
      sections={sections}
    >
      <p>{t('intro')}</p>

      <p>
        {t('contactIntro')} <a href="https://t.me/Epay_02" target="_blank" rel="noopener noreferrer" className="text-cyan-400">@Epay_02</a> or <a href="https://t.me/Epay_3" target="_blank" rel="noopener noreferrer" className="text-cyan-400">@Epay_3</a>
      </p>

      <h2 id="collect">{t('s1.title')}</h2>
      <p>{t('s1.desc')}</p>

      <h3 id="collect-pii">{t('s1.s11.title')}</h3>
      <p>{t('s1.s11.desc')}</p>
      <ul>
        <li dangerouslySetInnerHTML={{ __html: t.raw('s1.s11.items.name') }} />
        <li dangerouslySetInnerHTML={{ __html: t.raw('s1.s11.items.ssn') }} />
        <li dangerouslySetInnerHTML={{ __html: t.raw('s1.s11.items.address') }} />
        <li dangerouslySetInnerHTML={{ __html: t.raw('s1.s11.items.dob') }} />
        <li dangerouslySetInnerHTML={{ __html: t.raw('s1.s11.items.email') }} />
        <li dangerouslySetInnerHTML={{ __html: t.raw('s1.s11.items.phone') }} />
      </ul>

      <h3 id="collect-financial">{t('s1.s12.title')}</h3>
      <ul>
        <li dangerouslySetInnerHTML={{ __html: t.raw('s1.s12.items.bank') }} />
        <li dangerouslySetInnerHTML={{ __html: t.raw('s1.s12.items.card') }} />
        <li dangerouslySetInnerHTML={{ __html: t.raw('s1.s12.items.records') }} />
      </ul>

      <h3 id="collect-technical">{t('s1.s13.title')}</h3>
      <ul>
        <li dangerouslySetInnerHTML={{ __html: t.raw('s1.s13.items.ip') }} />
        <li dangerouslySetInnerHTML={{ __html: t.raw('s1.s13.items.device') }} />
        <li dangerouslySetInnerHTML={{ __html: t.raw('s1.s13.items.os') }} />
        <li dangerouslySetInnerHTML={{ __html: t.raw('s1.s13.items.cookies') }} />
      </ul>

      <h2 id="use">{t('s2.title')}</h2>
      <p>{t('s2.desc')}</p>

      <h3 id="use-compliance">{t('s2.s21.title')}</h3>
      <p>{t('s2.s21.desc')}</p>
      <ul>
        {[0, 1, 2, 3].map((i) => (
          <li key={i}>{t(`s2.s21.items.${i}`)}</li>
        ))}
      </ul>

      <h3 id="use-services">{t('s2.s22.title')}</h3>
      <ul>
        <li dangerouslySetInnerHTML={{ __html: t.raw('s2.s22.items.processing') }} />
        <li dangerouslySetInnerHTML={{ __html: t.raw('s2.s22.items.support') }} />
        <li dangerouslySetInnerHTML={{ __html: t.raw('s2.s22.items.personal') }} />
      </ul>

      <h2 id="share">{t('s3.title')}</h2>
      <p>{t('s3.desc')}</p>

      <h3 id="share-legal">{t('s3.s31.title')}</h3>
      <ul>
        {[0, 1].map((i) => (
          <li key={i}>{t(`s3.s31.items.${i}`)}</li>
        ))}
      </ul>

      <h3 id="share-thirdparty">{t('s3.s32.title')}</h3>
      <p>{t('s3.s32.desc')}</p>

      <h2 id="storage">{t('s4.title')}</h2>
      <h3 id="storage-security">{t('s4.s41.title')}</h3>
      <p>{t('s4.s41.desc')}</p>
      <h3 id="storage-retention">{t('s4.s42.title')}</h3>
      <p>{t('s4.s42.desc')}</p>

      <h2 id="rights">{t('s5.title')}</h2>
      <p>{t('s5.desc')}</p>
      <ul>
        {[0, 1, 2, 3, 4].map((i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: t.raw(`s5.items.${i}`) }} />
        ))}
      </ul>

      <h2 id="children">{t('s6.title')}</h2>
      <p>{t('s6.desc')}</p>

      <h2 id="transfer">{t('s7.title')}</h2>
      <p>{t('s7.desc')}</p>

      <h2 id="changes">{t('s8.title')}</h2>
      <p>{t('s8.desc')}</p>

      <h2 id="contact">{t('s9.title')}</h2>
      <p>{t('s9.desc')} <a href="https://t.me/Epay_02" target="_blank" rel="noopener noreferrer" className="text-cyan-400">@Epay_02</a> or <a href="https://t.me/Epay_3" target="_blank" rel="noopener noreferrer" className="text-cyan-400">@Epay_3</a></p>
    </LegalLayout>
  );
}
