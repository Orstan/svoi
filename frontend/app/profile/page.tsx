'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Settings, Heart, Star, LogOut, Edit } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout, checkAuth } = useAuthStore();
  const [activeTab, setActiveTab] = useState('info');
  const [isEditing, setIsEditing] = useState(false);
  
  // Завантажуємо дані користувача з authStore або тестових даних
  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+48 123 456 789',
    location: 'Warszawa',
    avatar: '👤',
  });

  useEffect(() => {
    // Перевіряємо чи є тестовий користувач
    const testUser = localStorage.getItem('test_user');
    if (testUser) {
      const parsed = JSON.parse(testUser);
      setUserData({
        name: parsed.name,
        email: parsed.email,
        phone: '+48 123 456 789',
        location: 'Warszawa',
        avatar: '👤',
      });
    } else if (user) {
      setUserData({
        name: user.name,
        email: user.email,
        phone: '+48 123 456 789',
        location: 'Warszawa',
        avatar: user.avatar || '👤',
      });
    } else {
      // Якщо не авторизований - редірект на login
      router.push('/login');
    }
  }, [user, router]);

  const handleLogout = async () => {
    localStorage.removeItem('test_user');
    await logout();
    router.push('/');
  };

  const handleSave = () => {
    // TODO: Відправка на API
    setIsEditing(false);
    alert('Профіль оновлено!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: 'Мій профіль' }]} />

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Бічна панель */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center">
                <div className="text-6xl mb-4">{userData.avatar}</div>
                <h2 className="text-xl font-bold text-gray-900">{userData.name}</h2>
                <p className="text-gray-600">{userData.email}</p>
              </div>

              <nav className="mt-6 space-y-2">
                <button
                  onClick={() => setActiveTab('info')}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition
                    ${activeTab === 'info' ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-50'}
                  `}
                >
                  <User size={20} />
                  <span>Особиста інформація</span>
                </button>

                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition
                    ${activeTab === 'favorites' ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-50'}
                  `}
                >
                  <Heart size={20} />
                  <span>Улюблені</span>
                </button>

                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition
                    ${activeTab === 'reviews' ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-50'}
                  `}
                >
                  <Star size={20} />
                  <span>Мої відгуки</span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition
                    ${activeTab === 'settings' ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-50'}
                  `}
                >
                  <Settings size={20} />
                  <span>Налаштування</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition"
                >
                  <LogOut size={20} />
                  <span>Вийти</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Основний контент */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Особиста інформація */}
              {activeTab === 'info' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Особиста інформація</h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
                      >
                        <Edit size={20} />
                        <span>Редагувати</span>
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                        >
                          Скасувати
                        </button>
                        <button
                          onClick={handleSave}
                          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                        >
                          Зберегти
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ім'я та Прізвище
                      </label>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={userData.name}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        disabled={!isEditing}
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Телефон
                      </label>
                      <input
                        type="tel"
                        disabled={!isEditing}
                        value={userData.phone}
                        onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Місто
                      </label>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={userData.location}
                        onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Улюблені */}
              {activeTab === 'favorites' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Улюблені майстри</h2>
                  <div className="text-center py-12 text-gray-500">
                    <Heart size={64} className="mx-auto mb-4 text-gray-300" />
                    <p>У вас ще немає улюблених майстрів</p>
                    <Link
                      href="/masters"
                      className="inline-block mt-4 text-primary-600 hover:text-primary-700"
                    >
                      Переглянути майстрів →
                    </Link>
                  </div>
                </div>
              )}

              {/* Відгуки */}
              {activeTab === 'reviews' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Мої відгуки</h2>
                  <div className="text-center py-12 text-gray-500">
                    <Star size={64} className="mx-auto mb-4 text-gray-300" />
                    <p>Ви ще не залишали відгуків</p>
                  </div>
                </div>
              )}

              {/* Налаштування */}
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Налаштування</h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">Email сповіщення</h3>
                        <p className="text-sm text-gray-600">Отримувати сповіщення на email</p>
                      </div>
                      <input type="checkbox" className="w-5 h-5" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">SMS сповіщення</h3>
                        <p className="text-sm text-gray-600">Отримувати SMS про нові повідомлення</p>
                      </div>
                      <input type="checkbox" className="w-5 h-5" />
                    </div>

                    <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition">
                      Видалити акаунт
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
