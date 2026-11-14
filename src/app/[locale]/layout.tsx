import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "../globals.css";
import { getDictionary } from "@/lib/dictionaries";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export async function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale as 'fr' | 'en');
  return {
    metadataBase: new URL('https://www.linstantverdon.com'),
    title: dict.meta.title,
    description: dict.meta.description,
    icons: {
      icon: '/assets/accueil/logo.webp',
      apple: '/assets/accueil/logo.webp',
    },
    openGraph: {
      siteName: "L'instant Verdon",
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
      images: [{
        url: '/assets/accueil/home.webp',
        width: 1200,
        height: 630,
        alt: "L'instant Verdon — Canyoning & Escalade dans les Gorges du Verdon",
      }],
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import CookieConsent from "@/components/CookieConsent";

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
        {/* Google Tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-797772111"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            // Consent Mode v2: denied until the visitor accepts in the
            // banner (CookieConsent.tsx); a stored choice is reapplied here.
            var c = null;
            try { c = localStorage.getItem('liv-consent-v1'); } catch (e) {}
            var g = c === 'granted' ? 'granted' : 'denied';
            gtag('consent', 'default', {
              ad_storage: g,
              ad_user_data: g,
              ad_personalization: g,
              analytics_storage: g,
              wait_for_update: 500
            });
            gtag('set', 'ads_data_redaction', true);
            gtag('js', new Date());
            gtag('config', 'AW-797772111');
          `}
        </Script>
        <LocalBusinessSchema locale={locale} />
        <Navbar dict={dict} locale={locale} />
        {children}
        <Footer dict={dict} locale={locale} />
        <WhatsAppFloating />
        <CookieConsent locale={locale} />
      </body>
    </html>
  );
}
