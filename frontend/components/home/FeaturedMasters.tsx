'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Star, MapPin, CheckCircle } from 'lucide-react';
import { mastersApi } from '@/lib/api';

export function FeaturedMasters() {
  const [masters, setMasters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMasters();
  }, []);

  const loadMasters = async () => {
    try {
      const response = await mastersApi.getAll({ 
        sort_by: 'rating', 
        per_page: 4 
      });
      setMasters(response.data.data || []);
    } catch (error) {
      console.error('Error loading masters:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Кращі майстри
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4">
          Кращі майстри
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Найвищі рейтинги від українців по всій Польщі
        </p>
        
        <div className="grid md:grid-cols-4 gap-6">
          {masters.slice(0, 4).map((master: any) => (
            <Link
              key={master.id}
              href={`/masters/${master.id}`}
              className="group"
            >
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition">
                <div className="aspect-square bg-gray-100 relative">
                  {master.user?.avatar ? (
                    <img 
                      src={master.user.avatar} 
                      alt={master.user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-600 text-4xl font-bold">
                      {master.user?.name?.charAt(0)}
                    </div>
                  )}
                  {master.is_verified && (
                    <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full">
                      <CheckCircle size={16} />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-primary-600 transition">
                    {master.user?.name}
                  </h3>
                  {master.location && (
                    <p className="text-sm text-gray-600 flex items-center mb-2">
                      <MapPin size={14} className="mr-1" />
                      {master.location.name}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="text-yellow-400 fill-yellow-400" size={16} />
                      <span className="ml-1 font-semibold">{master.rating || 5.0}</span>
                      <span className="ml-1 text-sm text-gray-600">
                        ({master.reviews_count || 0})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/masters"
            className="inline-block bg-primary-500 text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition font-medium"
          >
            Переглянути всіх майстрів
          </Link>
        </div>
      </div>
    </section>
  );
}
