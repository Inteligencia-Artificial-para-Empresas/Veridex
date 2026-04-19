// src/app/[locale]/layout.tsx

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";
import { TelegramFloat } from "@/components/layout/TelegramFloat";

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="text-white antialiased">
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#050505]">
          <div className="hero-grid-bg absolute inset-0 opacity-100" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(255,215,0,0.1)_0%,_transparent_70%)]" />
        </div>

        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="relative flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <TelegramFloat />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
