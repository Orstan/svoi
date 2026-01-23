import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  noindex?: boolean;
}

export default function SEO({
  title = 'Свої для Своїх - Українські майстри в Польщі',
  description = 'Знайдіть перевірених українських майстрів у Польщі. Ремонт, будівництво, краса, навчання та інші послуги від професіоналів.',
  keywords = 'українські майстри польща, послуги україномовні, ремонт польща, будівництво, майстри варшава',
  ogImage = 'https://svoi24.pl/og-image.jpg',
  ogType = 'website',
  canonical,
  noindex = false,
}: SEOProps) {
  const fullTitle = title.includes('Свої для Своїх') ? title : `${title} | Свої для Своїх`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Свої для Своїх" />
      <meta property="og:locale" content="uk_UA" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Content-Language" content="uk" />
    </Head>
  );
}
