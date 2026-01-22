import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Свої для Своїх - Українські майстри в Польщі',
  description: 'Знайдіть українських майстрів та спеціалістів у Польщі. Краса, ремонт, освіта, IT та інші послуги.',
  keywords: 'українські майстри, Польща, послуги, манікюр, ремонт, репетитор',
  metadataBase: new URL('https://svoi24.pl'),
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
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
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
