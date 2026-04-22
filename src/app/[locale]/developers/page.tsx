import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { DevelopersContent } from "@/components/pages/developers-content";
import { pickMessages } from '@/i18n/messages';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Navbar' });
  return {
    title: `${t('developers')} | EPay`,
  };
}

export default async function DevelopersPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const messages = pickMessages(await getMessages({locale}), ['Developers']);

  return (
    <NextIntlClientProvider messages={messages}>
      <DevelopersContent />
    </NextIntlClientProvider>
  );
}
