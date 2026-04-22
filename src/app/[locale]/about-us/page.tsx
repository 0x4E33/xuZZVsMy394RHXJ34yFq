import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { AboutContent } from "@/components/pages/about-content";
import { pickMessages } from '@/i18n/messages';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });
  return {
    title: `${t('badge')} | EPay`,
  };
}

export default async function AboutPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const messages = pickMessages(await getMessages({locale}), ['About']);

  return (
    <NextIntlClientProvider messages={messages}>
      <AboutContent />
    </NextIntlClientProvider>
  );
}
