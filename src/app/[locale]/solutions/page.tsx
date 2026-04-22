import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { SolutionsContent } from "@/components/pages/solutions-content";
import { pickMessages } from '@/i18n/messages';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Navbar' });
  return {
    title: `${t('solutions')} | EPay`,
  };
}

export default async function SolutionsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const messages = pickMessages(await getMessages({locale}), ['Solutions']);

  return (
    <NextIntlClientProvider messages={messages}>
      <SolutionsContent />
    </NextIntlClientProvider>
  );
}
