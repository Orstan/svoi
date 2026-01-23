'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Briefcase, MapPin, Phone, Mail, FileText, Upload, Check } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function BecomeMasterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Особисті дані
    name: '',
    email: '',
    phone: '',
    location: '',
    
    // Професійна інформація
    category: '',
    bio: '',
    experience: '',
    
    // Документи
    avatar: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Відправка на API
    console.log('Form data:', formData);
    
    // Показати успіх та перенаправити
    alert('Вашу заявку прийнято! Ми зв\'яжемося з вами найближчим часом.');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: 'Стати майстром' }]} />
        
        <div className="bg-white rounded-lg shadow-sm p-8 mt-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Станьте майстром на Свої для Своїх
            </h1>
            <p className="text-gray-600">
              Заповніть форму і почніть отримувати замовлення вже сьогодні
            </p>
          </div>

          {/* Індикатор кроків */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-semibold
                    ${step >= s ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'}
                  `}
                >
                  {step > s ? <Check size={20} /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-16 h-1 ${step > s ? 'bg-primary-600' : 'bg-gray-200'}`}
                  />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Крок 1: Особисті дані */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">Особисті дані</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline mr-2" size={16} />
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Briefcase className="inline mr-2" size={16} />
                    Ім'я та Прізвище
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Іван Петренко"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="inline mr-2" size={16} />
                    Телефон
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="+48 123 456 789"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="inline mr-2" size={16} />
                    Місто
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Warszawa"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
                >
                  Далі
                </button>
              </div>
            )}

            {/* Крок 2: Професійна інформація */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">Професійна інформація</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Категорія послуг
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Оберіть категорію</option>
                    <option value="beauty">Краса та здоров'я</option>
                    <option value="repair">Ремонт та будівництво</option>
                    <option value="auto">Автосервіс</option>
                    <option value="education">Освіта</option>
                    <option value="it">IT та дизайн</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FileText className="inline mr-2" size={16} />
                    Про себе
                  </label>
                  <textarea
                    required
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Розкажіть про свій досвід та навички..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Досвід роботи (років)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="5"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition font-semibold"
                  >
                    Назад
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
                  >
                    Далі
                  </button>
                </div>
              </div>
            )}

            {/* Крок 3: Фото */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">Завершення</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Upload className="inline mr-2" size={16} />
                    Фото профілю
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({ ...formData, avatar: e.target.files?.[0] || null })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Рекомендуємо завантажити професійне фото
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    ✓ Після відправки заявки наш менеджер зв'яжеться з вами протягом 24 годин
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition font-semibold"
                  >
                    Назад
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
                  >
                    Відправити заявку
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
