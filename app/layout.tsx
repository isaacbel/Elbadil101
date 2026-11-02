import type { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';
import { Kufam, Kreon, Noto_Naskh_Arabic, Inter } from 'next/font/google';
import { I18nProvider, Locale } from '@/lib/i18n';
import { candidate } from '@/data/content';
import './globals.css';

// ALBADIL Brand Fonts via next/font/google (self-hosted)
const kufam = Kufam({
  subsets: ['latin'],
  weight: ['600', '700', '900'],
  display: 'swap',
  variable: '--font-kufam',
});

const kreon = Kreon({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
  variable: '--font-kreon',
});

const notoNaskh = Noto_Naskh_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-naskh',
});

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-latin',
});

export const viewport: Viewport = {
  themeColor: '#0B4F4A',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'البديل · القائمة الحرّة 101',
    template: '%s | البديل · القائمة الحرّة 101',
  },
  description: 'البديل · القائمة الحرّة 101 — صوت التغيير والتنمية الحقيقية في خدمة المواطن.',
  keywords: [
    'البديل',
    'القائمة الحرة 101',
    'انتخابات الجزائر 2026',
    'التنمية المحلية',
    'مكتب المواطن',
  ],
  authors: [{ name: 'البديل · القائمة الحرّة 101' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://candidate-office.dz'),
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/favicon/apple-touch-icon.png',
    other: [
      { rel: 'manifest', url: '/favicon/site.webmanifest' },
    ],
  },
  alternates: {
    canonical: '/',
    languages: {
      ar: '/',
      fr: '/?lang=fr',
      en: '/?lang=en',
    },
  },
  openGraph: {
    title: 'البديل · القائمة الحرّة 101',
    description: 'صوت التغيير والتنمية الحقيقية في خدمة المواطن.',
    url: '/',
    siteName: 'البديل · القائمة الحرّة 101',
    locale: 'ar_DZ',
    type: 'website',
    images: [
      {
        url: '/logo/png/horizontal/ALBADIL_horizontal_color_large.png',
        width: 1200,
        height: 630,
        alt: 'البديل · القائمة الحرّة 101',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'البديل · القائمة الحرّة 101',
    description: 'صوت التغيير والتنمية الحقيقية في خدمة المواطن.',
    images: ['/logo/png/horizontal/ALBADIL_horizontal_color_large.png'],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('locale')?.value;
  const initialLocale: Locale =
    localeCookie === 'fr' || localeCookie === 'en' || localeCookie === 'ar'
      ? localeCookie
      : 'ar';
  const dir = initialLocale === 'ar' ? 'rtl' : 'ltr';

  // Schema.org Person / Organization JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'البديل · القائمة الحرّة 101',
    alternateName: 'ALBADIL 101',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://candidate-office.dz',
    logo: '/logo/svg/ALBADIL_horizontal_color.svg',
    address: {
      '@type': 'PostalAddress',
      addressLocality: candidate.place.en,
      addressCountry: 'DZ',
    },
    sameAs: [
      candidate.social.facebook,
      candidate.social.x,
      candidate.social.instagram,
      candidate.social.youtube,
    ].filter((url) => url && !url.includes('example')),
  };

  return (
    <html
      lang={initialLocale}
      dir={dir}
      className={`${kufam.variable} ${kreon.variable} ${notoNaskh.variable} ${inter.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen">
        <I18nProvider initialLocale={initialLocale}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
