'use client';

import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (location) params.set('location', location);
    router.push(`/masters?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-[url('/poland.png')] bg-cover bg-[position:50%_35%] sm:bg-[position:50%_30%] lg:bg-[position:50%_25%] min-h-[420px] sm:min-h-[480px] lg:min-h-[560px] flex items-center py-12 sm:py-16 lg:py-20">
      <div className="absolute inset-0 bg-white/50" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-3 sm:mb-4">
            Свої для Своїх
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700">
            Знайди українських майстрів у Польщі
          </p>
        </div>

        <form 
          onSubmit={handleSearch}
          className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Що шукаєте? (манікюр, сантехнік...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Місто (Warszawa, Kraków...)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-4 bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition font-medium text-lg"
          >
            Знайти майстра
          </button>
        </form>

        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-gray-600">
            Популярні пошуки:{' '}
            <button onClick={() => router.push('/masters?category=manicure')} className="text-primary-600 hover:underline">
              Манікюр
            </button>
            {', '}
            <button onClick={() => router.push('/masters?category=hydraulik')} className="text-primary-600 hover:underline">
              Сантехнік
            </button>
            {', '}
            <button onClick={() => router.push('/masters?category=fryzjer')} className="text-primary-600 hover:underline">
              Перукар
            </button>
            {', '}
            <button onClick={() => router.push('/masters?category=korepetycje')} className="text-primary-600 hover:underline">
              Репетитор
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
