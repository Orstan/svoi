import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://svoi24.pl';

  // Статичні сторінки
  const staticPages = [
    '',
    '/masters',
    '/categories',
    '/how-it-works',
    '/about',
    '/contact',
    '/pricing',
    '/faq',
    '/privacy',
    '/terms',
    '/login',
    '/register',
    '/become-master',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // TODO: Додати динамічні сторінки майстрів та категорій з API
  // Приклад:
  // const masters = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/masters`).then(res => res.json());
  // const masterPages = masters.data.map((master: any) => ({
  //   url: `${baseUrl}/masters/${master.id}`,
  //   lastModified: new Date(master.updated_at),
  //   changeFrequency: 'daily' as const,
  //   priority: 0.7,
  // }));

  return [...staticPages];
}
