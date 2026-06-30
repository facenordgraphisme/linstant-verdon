import React from 'react';
import Link from 'next/link';
import { getDictionary } from '@/lib/dictionaries';
import { client } from '@/sanity/client';
import { parseMarkdown } from '@/lib/markdown';
import { Calendar, User, ArrowLeft, MessageSquare, Phone, CalendarRange } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 86400;

export async function generateStaticParams() {
  const posts = await client.fetch(`*[_type == "post"]{ "slug": slug.current }`);
  const locales = ['fr', 'en'];
  const params = [];
  for (const post of posts) {
    if (!post.slug) continue;
    for (const locale of locales) {
      params.push({
        locale,
        slug: post.slug,
      });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const post = await client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      "title": title[$locale],
      "description": description[$locale]
    }
  `, { slug: decodedSlug, locale });

  if (!post) return { title: "Article non trouvé | L'instant Verdon" };

  return {
    title: `${post.title} | L'instant Verdon`,
    description: post.description,
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: {
        fr: `/fr/blog/${slug}`,
        en: `/en/blog/${slug}`,
        'x-default': `/fr/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/${locale}/blog/${slug}`,
      type: 'article',
      images: post.imageUrl ? [{ url: post.imageUrl, width: 1200, height: 630, alt: post.title }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const dict = getDictionary(locale as 'fr' | 'en');
  const blogDict = dict.blog || {
    publishedAt: "Publié le",
    author: "Par Emma & Angèle",
    backToList: "← Retour aux articles"
  };

  // Fetch the full post from Sanity
  const post = await client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      "title": title[$locale],
      "description": description[$locale],
      publishedAt,
      "imageUrl": mainImage.asset->url,
      "content": content[$locale]
    }
  `, { slug: decodedSlug, locale });

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-12 bg-white rounded-3xl shadow-xl max-w-md border border-slate-100">
          <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-4">Article non trouvé</h1>
          <p className="text-slate-500 mb-8 font-semibold">Cet article n'existe pas ou a été déplacé.</p>
          <Link 
            href={`/${locale}/blog`}
            className="button-glow inline-block text-xs font-black uppercase tracking-wider py-4 px-8"
          >
            {blogDict.backToList}
          </Link>
        </div>
      </main>
    );
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    image: post.imageUrl || undefined,
    url: `https://www.linstantverdon.com/${locale}/blog/${decodedSlug}`,
    inLanguage: locale === 'fr' ? 'fr-FR' : 'en-US',
    author: [
      {
        '@type': 'Person',
        name: 'Emma Aglaé',
        jobTitle: locale === 'fr' ? 'Guide diplômée d\'État canyonisme' : 'State-certified canyoning guide',
        worksFor: { '@type': 'Organization', name: "L'instant Verdon" },
      },
      {
        '@type': 'Person',
        name: 'Angèle Kanapa',
        jobTitle: locale === 'fr' ? 'Guide diplômée d\'État escalade & canyonisme' : 'State-certified climbing & canyoning guide',
        worksFor: { '@type': 'Organization', name: "L'instant Verdon" },
      },
    ],
    publisher: {
      '@type': 'Organization',
      name: "L'instant Verdon",
      url: 'https://www.linstantverdon.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.linstantverdon.com/assets/accueil/logo.webp',
      },
    },
  }

  return (
    <main className="min-h-screen bg-slate-50/30 pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* Banner Hero */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-black text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] scale-105"
          style={{ backgroundImage: `url(${post.imageUrl || '/assets/canyon/canyon.jpeg'})` }}
        />
        {/* Soft elegant blur and dark mask overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
          {/* Breadcrumbs */}
          <div className="flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] mb-8 text-white/50">
            <Link href={`/${locale}`} className="hover:text-primary transition-colors">Accueil</Link>
            <span>/</span>
            <Link href={`/${locale}/blog`} className="hover:text-primary transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white truncate max-w-[200px]">{post.title}</span>
          </div>

          <h1 className="text-4xl md:text-6.5xl font-black uppercase tracking-tighter leading-none text-white-shadow max-w-4xl mx-auto">
            {post.title}
          </h1>

          {/* Meta Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-10 text-white/80 font-bold text-xs uppercase tracking-wider bg-white/5 backdrop-blur-md py-4 px-8 rounded-2xl border border-white/10 w-fit mx-auto shadow-2xl">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-primary" />
              <span>{formattedDate}</span>
            </div>
            <div className="w-px h-4 bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-2">
              <User size={14} className="text-primary" />
              <span>{blogDict.author}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body Section */}
      <section className="relative -mt-16 z-30 px-6 max-w-5xl mx-auto">
        <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl p-8 md:p-20">
          
          {/* Back button */}
          <div className="mb-14">
            <Link 
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors duration-300 group"
            >
              <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
              {blogDict.backToList}
            </Link>
          </div>

          {/* Description Block */}
          <div className="border-l-4 border-primary pl-6 py-2 mb-12">
            <p className="text-lg md:text-xl text-slate-800 font-bold italic leading-relaxed">
              {post.description}
            </p>
          </div>

          {/* Main Content Rendered via Markdown Parser */}
          <article className="prose prose-slate max-w-none text-slate-700">
            {parseMarkdown(post.content)}
          </article>

          {/* Separation */}
          <div className="h-px bg-slate-100 my-16" />

          {/* Dual Authors Bio card */}
          <div className="p-8 md:p-12 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex -space-x-4 shrink-0">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-lg rotate-[-6deg]">
                <img src="/assets/a propos/emma.JPG.jpeg" alt="Emma" className="w-full h-full object-cover" />
              </div>
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-lg rotate-[6deg]">
                <img src="/assets/a propos/angele.jpg.jpeg" alt="Angèle" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="text-center md:text-left space-y-2">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-primary">Les Auteurs</span>
              <h3 className="text-2xl font-black text-[#109ea5] uppercase tracking-tight">Emma Aglaé & Angèle Kanapa</h3>
              <p className="text-sm text-slate-500 font-semibold leading-relaxed">
                Guides diplômées d'État passionnées par le Verdon. Nous aimons explorer, repousser les limites de la verticalité, et partager la beauté magique de nos gorges sauvages.
              </p>
            </div>
          </div>

          {/* Solid Booking CTA Panel */}
          <div className="mt-16 bg-slate-900 text-white rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none transition-transform duration-1000 group-hover:scale-110" />
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 justify-between">
              <div className="text-center lg:text-left space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">L'AVENTURE VOUS ATTEND</span>
                <h4 className="text-3xl md:text-4.5xl font-black uppercase tracking-tighter leading-tight">
                  Envie de découvrir ces merveilles en vrai ?
                </h4>
                <p className="text-white/60 font-semibold text-sm max-w-xl">
                  Rejoignez-nous pour une sortie inoubliable ! Réservez votre parcours de canyoning, de randonnée aquatique ou d'escalade dans le Verdon en quelques clics.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full lg:w-auto">
                <Link 
                  href={`/${locale}/contact`}
                  className="inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-white text-slate-900 font-black uppercase tracking-wider text-xs shadow-2xl hover:bg-slate-50 hover:scale-[1.02] transition-all duration-300 text-center"
                >
                  <MessageSquare size={16} className="text-primary" />
                  Nous contacter
                </Link>
                <a 
                  href="https://app.book-adventure.fr/public/booking/65eb5a8dfb9e3e414973b8b0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-glow inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-black uppercase tracking-wider text-xs shadow-2xl hover:scale-[1.02] transition-all duration-300 text-center"
                >
                  <CalendarRange size={16} />
                  Voir les départs
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
