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
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-8">Усі категорії</h1>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {categories.map((category) => (
              <div key={category.id} className="bg-white rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition">
                <Link href={`/masters?category=${category.id}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl sm:text-3xl">{category.icon}</span>
                    </div>
                    <h2 className="text-base sm:text-xl font-semibold text-gray-900 flex-1">
                      {category.name}
                    </h2>
                  </div>

                  {category.children && category.children.length > 0 && (
                    <div className="space-y-1.5 sm:space-y-2 mb-3">
                      {category.children.slice(0, 4).map((subcategory: any) => (
                        <div
                          key={subcategory.id}
                          className="text-xs sm:text-sm text-gray-600 hover:text-primary-600 transition truncate"
                        >
                          • {subcategory.name}
                        </div>
                      ))}
                      {category.children.length > 4 && (
                        <div className="text-xs sm:text-sm text-gray-400">
                          +{category.children.length - 4} ще
                        </div>
                      )}
                    </div>
                  )}

                  <div className="text-sm sm:text-base text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                    <span>Переглянути всіх</span>
                    <span>→</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
