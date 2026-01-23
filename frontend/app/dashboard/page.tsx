'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, Camera, MapPin, Phone, Mail, Briefcase, 
  Plus, Trash2, Save, Upload, Star, DollarSign 
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useAuthStore } from '@/store/authStore';

interface Service {
  id?: number;
  title: string;
  description: string;
  price: string;
  duration: string;
}

interface PortfolioItem {
  id?: number;
  image: string;
  description: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+48 123 456 789',
    location: 'Warszawa',
    bio: 'Професійний майстер з 5-річним досвідом роботи',
    experience: '5',
    category: 'beauty',
    avatar: null as File | null,
  });

  const [services, setServices] = useState<Service[]>([
    { id: 1, title: 'Манікюр класичний', description: 'Класичний манікюр з покриттям', price: '100', duration: '60' },
  ]);

  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([
    { id: 1, image: 'https://via.placeholder.com/300', description: 'Робота 1' },
  ]);

  const [newService, setNewService] = useState<Service>({
    title: '',
    description: '',
    price: '',
    duration: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSaveProfile = () => {
    // TODO: API call
    console.log('Saving profile:', profileData);
    alert('Профіль збережено!');
  };

  const handleAddService = () => {
    if (!newService.title || !newService.price) {
      alert('Заповніть назву та ціну послуги');
      return;
    }

    setServices([...services, { ...newService, id: services.length + 1 }]);
    setNewService({ title: '', description: '', price: '', duration: '' });
  };

  const handleDeleteService = (id?: number) => {
    setServices(services.filter(s => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: 'Панель майстра' }]} />

        <div className="mt-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Панель управління майстра
          </h1>

          {/* Табы */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('profile')}
                className={`
                  pb-4 px-1 border-b-2 font-medium text-sm transition
                  ${activeTab === 'profile'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                  }
                `}
              >
                <User className="inline mr-2" size={18} />
                Профіль
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className={`
                  pb-4 px-1 border-b-2 font-medium text-sm transition
                  ${activeTab === 'services'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                  }
                `}
              >
                <Briefcase className="inline mr-2" size={18} />
                Послуги
              </button>
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`
                  pb-4 px-1 border-b-2 font-medium text-sm transition
                  ${activeTab === 'portfolio'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                  }
                `}
              >
                <Camera className="inline mr-2" size={18} />
                Портфоліо
              </button>
            </nav>
          </div>

          {/* Редагування профілю */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Особиста інформація</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Фото профілю
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-3xl">
                      {user?.avatar || '👤'}
                    </div>
                    <label className="cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
                      <Camera className="inline mr-2" size={18} />
                      Завантажити фото
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => setProfileData({ 
                          ...profileData, 
                          avatar: e.target.files?.[0] || null 
                        })}
                      />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="inline mr-2" size={16} />
                      Ім'я
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="inline mr-2" size={16} />
                      Email
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="inline mr-2" size={16} />
                      Телефон
                    </label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="inline mr-2" size={16} />
                      Місто
                    </label>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Про себе
                  </label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <button
                  onClick={handleSaveProfile}
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
                >
                  <Save className="inline mr-2" size={18} />
                  Зберегти зміни
                </button>
              </div>
            </div>
          )}

          {/* Управління послугами */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              {/* Додати нову послугу */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Додати нову послугу</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      placeholder="Назва послуги"
                      value={newService.title}
                      onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <textarea
                      placeholder="Опис послуги"
                      value={newService.description}
                      onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 text-gray-400" size={20} />
                      <input
                        type="number"
                        placeholder="Ціна (PLN)"
                        value={newService.price}
                        onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Тривалість (хв)"
                      value={newService.duration}
                      onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <button
                  onClick={handleAddService}
                  className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  <Plus className="inline mr-2" size={18} />
                  Додати послугу
                </button>
              </div>

              {/* Список послуг */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Мої послуги</h2>
                
                <div className="space-y-4">
                  {services.map((service) => (
                    <div key={service.id} className="border rounded-lg p-4 flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{service.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span className="font-medium text-green-600">{service.price} PLN</span>
                          <span>• {service.duration} хв</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteService(service.id)}
                        className="text-red-600 hover:text-red-700 p-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Портфоліо */}
          {activeTab === 'portfolio' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Моє портфоліо</h2>
                <label className="cursor-pointer bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
                  <Upload className="inline mr-2" size={18} />
                  Завантажити фото
                  <input type="file" accept="image/*" multiple className="hidden" />
                </label>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {portfolio.map((item) => (
                  <div key={item.id} className="relative group">
                    <img
                      src={item.image}
                      alt={item.description}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
