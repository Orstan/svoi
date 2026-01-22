'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { categoriesApi } from '@/lib/api';

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Усі категорії</h1>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div key={category.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-4">{category.icon}</span>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {category.name_uk}
                  </h2>
                </div>

                {category.children && category.children.length > 0 && (
                  <div className="space-y-2">
                    {category.children.map((subcategory: any) => (
                      <Link
                        key={subcategory.id}
                        href={`/masters?category=${subcategory.id}`}
                        className="block text-gray-700 hover:text-primary-600 transition"
                      >
                        → {subcategory.name_uk}
                      </Link>
                    ))}
                  </div>
                )}

                <Link
                  href={`/masters?category=${category.id}`}
                  className="mt-4 inline-block text-primary-600 hover:text-primary-700 font-medium"
                >
                  Переглянути всіх →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
