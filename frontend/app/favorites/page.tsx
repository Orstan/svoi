'use client';

import { useState } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Heart, MapPin, Star } from 'lucide-react';

export default function FavoritesPage() {
  const [favorites] = useState<any[]>([]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: 'Улюблені' }]} />

        <div className="mt-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Улюблені майстри
          </h1>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : favorites.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Heart size={64} className="mx-auto mb-4 text-gray-300" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                У вас ще немає улюблених майстрів
              </h2>
              <p className="text-gray-600 mb-6">
                Додайте майстрів до улюблених, щоб швидко знаходити їх пізніше
              </p>
              <Link
                href="/masters"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
              >
                Переглянути майстрів
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((master) => (
                <div
                  key={master.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
                >
                  <Link href={`/masters/${master.id}`}>
                    <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 relative">
                      {master.avatar && (
                        <img
                          src={master.avatar}
                          alt={master.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </Link>

                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Link href={`/masters/${master.id}`}>
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600">
                          {master.name}
                        </h3>
                      </Link>
                      <button
                        onClick={() => handleRemoveFavorite(master.id)}
                        className="p-1 hover:bg-gray-100 rounded-full transition"
                        title="Видалити з улюблених"
                      >
                        <Heart size={20} className="text-red-500 fill-current" />
                      </button>
                    </div>

                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin size={16} className="mr-1" />
                      {master.city || 'Польща'}
                    </div>

                    <div className="flex items-center">
                      <Star size={16} className="text-yellow-400 fill-current mr-1" />
                      <span className="font-medium">{master.rating || '5.0'}</span>
                      <span className="text-sm text-gray-500 ml-1">
                        ({master.reviews_count || 0} відгуків)
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
