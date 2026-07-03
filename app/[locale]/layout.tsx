import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Nunito_Sans } from "next/font/google";
import { routing } from "@/i18n/routing";
import { PublicLayout } from "@/components/layouts/PublicLayout";
import { categoryService } from "@/services";
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

  const categoryTree = await categoryService.getCategoryTree(true);
  const navCategories = categoryTree.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
  }));

  return (
    <html
      lang={locale}
      className={`${nunitoSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <PublicLayout navCategories={navCategories}>{children}</PublicLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
