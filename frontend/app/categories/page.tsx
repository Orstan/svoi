'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Baby,
  Camera,
  Car,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Home,
  Laptop,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { categoriesApi } from '@/lib/api';
import Breadcrumbs from '@/components/Breadcrumbs';

function CategoryIcon({ category }: { category: any }) {
  const raw = `${category?.slug || ''} ${category?.name || ''}`.toLowerCase();

  let Icon = Sparkles;
  if (raw.includes('краса') || raw.includes('beauty') || raw.includes('uroda')) Icon = Sparkles;
  else if (raw.includes('ремонт') || raw.includes('repair') || raw.includes('napraw')) Icon = Wrench;
  else if (raw.includes('авто') || raw.includes('auto') || raw.includes('car')) Icon = Car;
  else if (raw.includes('освіта') || raw.includes('education') || raw.includes('eduk')) Icon = GraduationCap;
  else if (raw.includes('діти') || raw.includes('children') || raw.includes('dzieci')) Icon = Baby;
  else if (raw.includes('побут') || raw.includes('home') || raw.includes('dom')) Icon = Home;
  else if (raw.includes('it') || raw.includes('айті') || raw.includes('tech')) Icon = Laptop;
  else if (raw.includes('фото') || raw.includes('photo') || raw.includes('zdj')) Icon = Camera;

  return <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary-700" strokeWidth={2.2} />;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openCategoryId, setOpenCategoryId] = useState<number | null>(null);

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
                      <CategoryIcon category={category} />
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
                  <>
                    {/* Desktop/tablet: показуємо чіпи завжди */}
                    <div className="hidden sm:flex mt-4 flex-wrap gap-2">
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

                    {/* Mobile: accordion */}
                    <div className="sm:hidden mt-3">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenCategoryId(openCategoryId === category.id ? null : category.id)
                        }
                        className="w-full flex items-center justify-between rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-100 px-3 py-2 transition"
                      >
                        <span className="text-sm font-medium text-gray-800">Підкатегорії</span>
                        {openCategoryId === category.id ? (
                          <ChevronUp size={18} className="text-gray-600" />
                        ) : (
                          <ChevronDown size={18} className="text-gray-600" />
                        )}
                      </button>

                      <div
                        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
                          openCategoryId === category.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="pt-3 flex flex-wrap gap-2">
                          {category.children.map((subcategory: any) => (
                            <Link
                              key={subcategory.id}
                              href={`/masters?category=${subcategory.id}`}
                              className="inline-flex items-center rounded-full bg-white text-gray-700 border border-gray-200 px-3 py-1 text-xs transition hover:border-primary-200 hover:text-primary-700"
                            >
                              {subcategory.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
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
