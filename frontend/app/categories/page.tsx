'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { categoriesApi } from '@/lib/api';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await categoriesApi.list();
      setCategories(response.data || []);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        <Breadcrumbs items={[{ label: 'Категорії' }]} />
        <div className="mb-5 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Усі категорії</h1>
          <p className="mt-1 text-sm sm:text-base text-gray-600">
            Оберіть категорію або підкатегорію — і ми покажемо найкращих майстрів
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition p-4 sm:p-6"
              >
                <Link href={`/masters?category=${category.id}`} className="block">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center shadow-inner">
                      <span className="text-3xl">{category.icon}</span>
                    </div>
                    <h2 className="mt-3 text-base sm:text-lg font-semibold text-gray-900 group-hover:text-primary-700 transition">
                      {category.name}
                    </h2>
                    <div className="mt-1 text-xs sm:text-sm text-gray-600">
                      {(category.masters_count ?? 0)} майстрів
                    </div>
                  </div>
                </Link>

                {category.children && category.children.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {category.children.map((subcategory: any) => (
                      <Link
                        key={subcategory.id}
                        href={`/masters?category=${subcategory.id}`}
                        className="inline-flex items-center rounded-full bg-gray-50 hover:bg-primary-50 text-gray-700 hover:text-primary-700 border border-gray-100 hover:border-primary-200 px-3 py-1 text-xs sm:text-sm transition"
                      >
                        {subcategory.name}
                      </Link>
                    ))}
                  </div>
                )}

                <div className="mt-4">
                  <Link
                    href={`/masters?category=${category.id}`}
                    className="inline-flex items-center text-sm font-medium text-primary-700 hover:text-primary-800 transition"
                  >
                    Переглянути всіх
                    <span className="ml-1">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
