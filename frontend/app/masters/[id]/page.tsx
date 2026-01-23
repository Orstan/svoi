'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { MapPin, Star, Phone, MessageCircle, Heart, Share2 } from 'lucide-react';
import { mastersApi, reviewsApi, favoritesApi } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';

export default function MasterProfilePage() {
  const params = useParams();
  const { isAuthenticated } = useAuthStore();
  const [master, setMaster] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    loadMaster();
  }, [params.id]);

  const loadMaster = async () => {
    try {
      const response = await mastersApi.show(params.id as string);
      setMaster(response.data);
      setIsFavorite(response.data.is_favorite);
    } catch (error) {
      console.error('Error loading master:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      alert('Увійдіть для додавання в улюблені');
      return;
    }

    try {
      await favoritesApi.toggle(parseInt(params.id as string));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      alert('Помилка при додаванні в улюблені');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!master) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Майстра не знайдено</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex-shrink-0 overflow-hidden">
              {master.user?.avatar && (
                <img
                  src={master.user.avatar}
                  alt={master.user.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {master.user?.name}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin size={18} className="mr-2" />
                    {master.location?.name_uk}
                  </div>
                  {master.rating > 0 && (
                    <div className="flex items-center mb-4">
                      <Star size={20} className="text-yellow-400 fill-current mr-2" />
                      <span className="text-xl font-semibold">{master.rating.toFixed(1)}</span>
                      <span className="text-gray-500 ml-2">
                        ({master.reviews_count} відгуків)
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button className="p-2 border rounded-lg hover:bg-gray-50">
                    <Heart size={20} />
                  </button>
                  <button className="p-2 border rounded-lg hover:bg-gray-50">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {master.is_verified && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    ✓ Верифікований
                  </span>
                )}
                {master.is_pro && (
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    ⭐ PRO
                  </span>
                )}
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Досвід: {master.experience_years} років
                </span>
              </div>

              <div className="flex gap-3">
                {master.whatsapp_link && (
                  <a
                    href={master.whatsapp_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium"
                  >
                    <MessageCircle size={20} />
                    WhatsApp
                  </a>
                )}
                {master.telegram_link && (
                  <a
                    href={master.telegram_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    <MessageCircle size={20} />
                    Telegram
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b">
            <nav className="flex gap-8 px-6">
              <button
                onClick={() => setActiveTab('about')}
                className={`py-4 border-b-2 font-medium transition ${
                  activeTab === 'about'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Про майстра
              </button>
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`py-4 border-b-2 font-medium transition ${
                  activeTab === 'portfolio'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Портфоліо
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 border-b-2 font-medium transition ${
                  activeTab === 'reviews'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Відгуки ({master.reviews_count})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'about' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Опис</h2>
                <p className="text-gray-700 whitespace-pre-line mb-6">{master.bio}</p>

                {master.services && master.services.length > 0 && (
                  <>
                    <h2 className="text-xl font-semibold mb-4">Послуги</h2>
                    <div className="space-y-4">
                      {master.services.map((service: any) => (
                        <div key={service.id} className="border rounded-lg p-4">
                          <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                          <p className="text-gray-600 mb-3">{service.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-primary-600 font-semibold">
                              {service.price_min} - {service.price_max} {service.currency}
                            </span>
                            {service.duration && (
                              <span className="text-gray-500 text-sm">
                                Тривалість: {service.duration} хв
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === 'portfolio' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Портфоліо</h2>
                {master.portfolio_items && master.portfolio_items.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {master.portfolio_items.map((item: any) => (
                      <div key={item.id} className="aspect-square rounded-lg overflow-hidden">
                        <img
                          src={item.image_url}
                          alt={item.description}
                          className="w-full h-full object-cover hover:scale-105 transition"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">Портфоліо поки порожнє</p>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Відгуки</h2>
                {master.reviews && master.reviews.length > 0 ? (
                  <div className="space-y-6">
                    {master.reviews.map((review: any) => (
                      <div key={review.id} className="border-b pb-6">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold">{review.author?.name}</p>
                            <div className="flex items-center gap-1 mt-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  size={16}
                                  className={
                                    star <= review.rating
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.created_at).toLocaleDateString('uk-UA')}
                          </span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                        {review.master_response && (
                          <div className="mt-4 ml-6 p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm font-medium text-gray-900 mb-1">
                              Відповідь майстра:
                            </p>
                            <p className="text-sm text-gray-700">{review.master_response}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">Відгуків поки немає</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
