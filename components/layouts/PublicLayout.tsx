"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/shared/common/header/Header";
import { Footer } from "@/components/shared/common/footer/Footer";
import { FloatingButtons } from "@/components/shared/common/floatingbuttons/FloatingButtons";
import { Chatbot } from "@/components/chatbot/Chatbot";

interface NavCategory {
  id: string;
  name: string;
  slug: string;
}

export function PublicLayout({
  children,
  navCategories,
}: {
  children: React.ReactNode;
  navCategories: NavCategory[];
}) {
  const pathname = usePathname();
  
  // Check if current path is an admin route
  const isAdminRoute = pathname?.includes("/admin");

  // For admin routes, render only children without public layout elements
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // For public routes, render with header, footer, etc.
  return (
    <>
      <Header navCategories={navCategories} />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingButtons />
      <Chatbot />
    </>
  );
}
