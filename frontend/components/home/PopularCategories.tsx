'use client';

import Link from 'next/link';

const categories = [
  { name: 'Краса', icon: '💅', slug: 'uroda-i-zdrowie', count: 245 },
  { name: 'Ремонт', icon: '🔨', slug: 'remont-i-budownictwo', count: 189 },
  { name: 'Авто', icon: '🚗', slug: 'serwis-samochodowy', count: 78 },
  { name: 'Освіта', icon: '📚', slug: 'edukacja-i-korepetycje', count: 156 },
  { name: 'Діти', icon: '👶', slug: 'opieka-nad-dziecmi', count: 92 },
  { name: 'Побут', icon: '🏠', slug: 'uslugi-domowe', count: 134 },
  { name: 'IT', icon: '💻', slug: 'it-i-design', count: 67 },
  { name: 'Фото', icon: '📸', slug: 'foto-i-wideo', count: 54 },
];

export function PopularCategories() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Популярні категорії
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/masters?category=${category.slug}`}
              className="flex flex-col items-center p-6 bg-gray-50 rounded-xl hover:bg-primary-50 hover:shadow-md transition group"
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition">
                {category.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {category.name}
              </h3>
              <p className="text-sm text-gray-600">
                {category.count} майстрів
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
