'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Star, Search, Filter } from 'lucide-react';
import { mastersApi, categoriesApi, locationsApi } from '@/lib/api';

function MastersContent() {
  const searchParams = useSearchParams();
  const [masters, setMasters] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [voivodeships, setVoivodeships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    location: searchParams.get('location') || '',
    verified: false,
  });

  useEffect(() => {
    loadData();
  }, [filters]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [mastersRes, categoriesRes, locationsRes] = await Promise.all([
        mastersApi.list(filters),
        categoriesApi.list(),
        locationsApi.voivodeships(),
      ]);
      setMasters(mastersRes.data.data || []);
      setCategories(categoriesRes.data || []);
      setVoivodeships(locationsRes.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
      setMasters([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Наші майстри</h1>

        {/* Фільтри */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Пошук
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Назва послуги..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Категорія
              </label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Всі категорії</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name_uk}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Воєводство
              </label>
              <select
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Вся Польща</option>
                {voivodeships.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name_uk}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.verified}
                  onChange={(e) => setFilters({ ...filters, verified: e.target.checked })}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">Тільки верифіковані</span>
              </label>
            </div>
          </div>
        </div>

        {/* Список майстрів */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Завантаження...</p>
          </div>
        ) : masters.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {masters.map((master) => (
              <Link
                key={master.id}
                href={`/masters/${master.id}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 relative">
                  {master.user?.avatar && (
                    <img
                      src={master.user.avatar}
                      alt={master.user.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {master.is_verified && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      ✓ Верифікований
                    </div>
                  )}
                  {master.is_pro && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      ⭐ PRO
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {master.user?.name}
                  </h3>

                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin size={16} className="mr-1" />
                    {master.location?.name_uk}
                  </div>

                  {master.rating > 0 && (
                    <div className="flex items-center mb-3">
                      <Star size={16} className="text-yellow-400 fill-current mr-1" />
                      <span className="font-medium">{master.rating.toFixed(1)}</span>
                      <span className="text-gray-500 text-sm ml-1">
                        ({master.reviews_count} відгуків)
                      </span>
                    </div>
                  )}

                  <p className="text-gray-700 text-sm line-clamp-2 mb-3">
                    {master.bio}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {master.services?.slice(0, 2).map((service: any) => (
                      <span
                        key={service.id}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {service.title}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Майстрів не знайдено</p>
            <p className="text-gray-500 mt-2">Спробуйте змінити фільтри пошуку</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MastersPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    }>
      <MastersContent />
    </Suspense>
  );
}
