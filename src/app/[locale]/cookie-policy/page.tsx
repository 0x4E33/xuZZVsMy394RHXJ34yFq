import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { CookiesContent } from "@/components/pages/legal/cookies-content";
import { pickMessages } from '@/i18n/messages';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Legal.cookies' });
  return {
    title: t('title'),
  };
}

export default async function CookiesPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const messages = pickMessages(await getMessages({locale}), ['Legal']);

  return (
    <NextIntlClientProvider messages={messages}>
      <CookiesContent />
    </NextIntlClientProvider>
  );
}
