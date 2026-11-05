import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import NotFoundShell from '@/components/NotFoundShell';

// Root layout lives under the dynamic [locale] segment, so Next can't compose a
// static 404 from it: unmatched URLs and notFound() on prerendered routes land
// here (see node_modules/next/dist/docs/.../not-found.md, global-not-found).
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: "Page introuvable | L'instant Verdon",
};

export default function GlobalNotFound() {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${outfit.variable}`}>
        <NotFoundShell />
      </body>
    </html>
  );
}
