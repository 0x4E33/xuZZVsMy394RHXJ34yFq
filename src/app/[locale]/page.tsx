import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Hero } from "@/components/sections/hero";
import { Channels } from "@/components/sections/channels";
import { Capabilities } from "@/components/sections/capabilities";
import { Solutions } from "@/components/sections/solutions";
import { Metrics } from "@/components/sections/metrics";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";
import { CyberGlobe } from "@/components/ui/cyber-globe";
import { pickMessages } from "@/i18n/messages";

export default async function Home({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const messages = pickMessages(await getMessages({locale}), [
    'Hero',
    'Channels',
    'Capabilities',
    'Solutions',
    'Metrics',
    'Testimonials',
    'CTA',
  ]);

  return (
    <NextIntlClientProvider messages={messages}>
      <main className="flex flex-col flex-1 relative bg-transparent">
        <div className="fixed inset-0 z-[-1] bg-[#050505]">
          <CyberGlobe />
        </div>

        <Hero />
        <div className="bg-[#050505]/60 backdrop-blur-sm">
          <Channels />
        </div>
        <div className="bg-[#050505]/80 backdrop-blur-md">
          <Capabilities />
          <Solutions />
          <Metrics />
          <Testimonials />
        </div>
        <CTA />
      </main>
    </NextIntlClientProvider>
  );
}
