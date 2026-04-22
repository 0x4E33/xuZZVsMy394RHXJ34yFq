import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { ContactContent } from "@/components/pages/contact-content";
import { pickMessages } from '@/i18n/messages';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Navbar' });
  return {
    title: `${t('contact')} | EPay`,
  };
}

export default async function ContactPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const messages = pickMessages(await getMessages({locale}), ['Contact']);

  return (
    <NextIntlClientProvider messages={messages}>
      <ContactContent />
    </NextIntlClientProvider>
  );
}
