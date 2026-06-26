import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Nunito_Sans } from "next/font/google";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/shared/common/header/Header";
import { Footer } from "@/components/shared/common/footer/Footer";
import { FloatingButtons } from "@/components/shared/common/floatingbuttons/FloatingButtons";
import { Chatbot } from "@/components/chatbot/Chatbot";
import "../globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "LS Global",
  description: "Your trusted partner for global solutions",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate that the incoming locale is valid
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${nunitoSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingButtons />
          <Chatbot />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
