import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "../globals.css";
import { getDictionary } from "@/lib/dictionaries";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale as 'fr' | 'en');
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    icons: {
      icon: '/assets/accueil/logo.webp',
      apple: '/assets/accueil/logo.webp',
    }
  };
}

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const dict = getDictionary(locale as 'fr' | 'en');
  
  return (
    <html lang={locale}>
      <body className={`${inter.variable} ${outfit.variable}`}>
        <LocalBusinessSchema locale={locale} />
        <Navbar dict={dict} locale={locale} />
        {children}
        <Footer dict={dict} locale={locale} />
      </body>
    </html>
  );
}
