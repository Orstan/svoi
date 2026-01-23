import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import MobileNavigation from '@/components/MobileNavigation';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Свої для Своїх - Українські майстри в Польщі | Svoi24.pl',
  description: 'Знайдіть перевірених українських майстрів у Польщі. Ремонт, будівництво, краса, навчання та інші послуги від професіоналів. ✓ Відгуки ✓ Рейтинги ✓ Гарантія якості',
  keywords: 'українські майстри польща, послуги україномовні, ремонт польща, будівництво, майстри варшава, краса польща',
  metadataBase: new URL('https://svoi24.pl'),
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    title: 'Свої для Своїх - Українські майстри в Польщі',
    description: 'Знайдіть українських майстрів та спеціалістів у Польщі',
    url: 'https://svoi24.pl',
    siteName: 'Свої для Своїх',
    locale: 'uk_UA',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen pb-20 md:pb-0">{children}</main>
        <Footer />
        <MobileNavigation />
      </body>
    </html>
  );
}
