'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Heart, MapPin, Star } from 'lucide-react';
import { favoritesApi } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';

export default function FavoritesPage() {
  const { isAuthenticated } = useAuthStore();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      loadFavorites();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const loadFavorites = async () => {
    try {
      const response = await favoritesApi.list();
      setFavorites(response.data || []);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (masterId: number) => {
    try {
      await favoritesApi.toggle(masterId);
      setFavorites(favorites.filter(f => f.id !== masterId));
    } catch (error) {
      console.error('Error removing favorite:', error);
      alert('Помилка при видаленні');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: 'Улюблені' }]} />

        <div className="mt-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
            Улюблені майстри
          </h1>

          {favorites.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-6 sm:p-12 text-center">
              <Heart size={48} className="sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-gray-300" />
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                У вас ще немає улюблених майстрів
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Додайте майстрів до улюблених, щоб швидко знаходити їх пізніше
              </p>
              <Link
                href="/masters"
                className="inline-block bg-primary-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-primary-700 transition font-semibold text-sm sm:text-base"
              >
                Переглянути майстрів
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((master) => (
                <Link
                  key={master.id}
                  href={`/masters/${master.id}`}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
                >
                  <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 relative">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveFavorite(master.id);
                      }}
                      className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition"
                      title="Видалити з улюблених"
                    >
                      <Heart size={20} className="text-red-500 fill-current" />
                    </button>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {master.name}
                    </h3>

                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin size={16} className="mr-1" />
                      {master.location}
                    </div>

                    <div className="flex items-center">
                      <Star size={16} className="text-yellow-400 fill-current mr-1" />
                      <span className="font-medium">{master.rating}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
