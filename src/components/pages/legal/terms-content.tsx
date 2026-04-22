"use client";

import { LegalLayout } from "@/components/layout/legal-layout";
import { useTranslations } from 'next-intl';

export function TermsContent() {
  const t = useTranslations('Legal.terms');

  const sections = [
    { id: "regulations", title: t('s1.title') },
    { id: "ownership", title: t('s2.title') },
    { id: "warranties", title: t('s3.title') },
    { id: "liability", title: t('s4.title') },
    { id: "confidentiality", title: t('s5.title') },
    { id: "linking", title: t('s6.title') },
    { id: "thirdparty", title: t('s7.title') },
  ];

  return (
    <LegalLayout
      title={t('title')}
      lastUpdated={t('lastUpdated')}
      sections={sections}
    >
      <p>{t('intro')}</p>

      <h2 id="regulations">{t('s1.title')}</h2>
      <p>{t('s1.desc')}</p>

      <h2 id="ownership">{t('s2.title')}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.raw('s2.desc') }} />

      <h2 id="warranties">{t('s3.title')}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.raw('s3.desc1') }} />
      <p>{t('s3.desc2')}</p>

      <h2 id="liability">{t('s4.title')}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.raw('s4.desc1') }} />
      <p>{t('s4.desc2')}</p>

      <h2 id="confidentiality">{t('s5.title')}</h2>
      <p>{t('s5.desc')}</p>

      <h2 id="linking">{t('s6.title')}</h2>
      <p>{t('s6.desc')}</p>

      <h2 id="thirdparty">{t('s7.title')}</h2>
      <p>{t('s7.desc')}</p>
    </LegalLayout>
  );
}
