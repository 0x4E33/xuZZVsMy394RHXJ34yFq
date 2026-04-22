import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { TermsContent } from "@/components/pages/legal/terms-content";
import { pickMessages } from '@/i18n/messages';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Legal.terms' });
  return {
    title: t('title'),
  };
}

export default async function TermsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const messages = pickMessages(await getMessages({locale}), ['Legal']);

  return (
    <NextIntlClientProvider messages={messages}>
      <TermsContent />
    </NextIntlClientProvider>
  );
}
