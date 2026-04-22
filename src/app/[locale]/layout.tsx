import { Inter, Outfit } from "next/font/google";
import "../globals.css";
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { locales, routing, type AppLocale } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { pickMessages } from "@/i18n/messages";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

type LayoutParams = Promise<{ locale: string }>;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: LayoutParams }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as AppLocale)) {
    notFound();
  }

  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    title: {
      default: t('title'),
      template: `%s | EPay`,
    },
    description: t('description'),
    icons: {
      icon: "/epay-logo.png",
      shortcut: "/epay-logo.png",
      apple: "/epay-logo.png",
    },
  };
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: LayoutParams;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as AppLocale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = pickMessages(await getMessages({locale}), ['Navbar', 'Footer']);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${outfit.variable} h-full antialiased dark`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
