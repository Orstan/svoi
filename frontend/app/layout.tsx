import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import MobileNavigation from '@/components/MobileNavigation';
import dynamic from 'next/dynamic';

const GoogleAnalytics = dynamic(() => import('@/components/GoogleAnalytics'), {
  ssr: false,
});

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Свої для Своїх - Українські майстри в Польщі | Svoi24.pl',
  description: 'Знайдіть перевірених українських майстрів у Польщі. Ремонт, будівництво, краса, навчання та інші послуги від професіоналів. ✓ Відгуки ✓ Рейтинги ✓ Гарантія якості',
  keywords: 'українські майстри польща, послуги україномовні, ремонт польща, будівництво, майстри варшава, краса польща',
  metadataBase: new URL('https://svoi24.pl'),
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/icon-192.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Svoi24',
  },
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    title: 'Свої для Своїх - Українські майстри в Польщі',
    description: 'Знайдіть українських майстрів та спеціалістів у Польщі',
    url: 'https://svoi24.pl',
    siteName: 'Свої для Своїх',
    images: [
      {
        url: 'https://svoi24.pl/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Свої для Своїх',
      },
    ],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className={inter.className}>
        <GoogleAnalytics />
        <Header />
        <main className="min-h-screen pb-20 md:pb-0">{children}</main>
        <Footer />
        <MobileNavigation />
      </body>
    </html>
  );
}
