'use client';

import { useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form:', formData);
    alert('Дякуємо за звернення! Ми зв\'яжемося з вами найближчим часом.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: 'Контакти' }]} />

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Контактна інформація */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Зв'яжіться з нами
            </h1>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Mail className="text-primary-600 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <a href="mailto:info@svoi24.pl" className="text-primary-600 hover:underline">
                      info@svoi24.pl
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="text-primary-600 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900">Телефон</h3>
                    <a href="tel:+48123456789" className="text-primary-600 hover:underline">
                      +48 123 456 789
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="text-primary-600 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900">Адреса</h3>
                    <p className="text-gray-700">
                      Warszawa, Polska
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Години роботи:</strong><br />
                Понеділок - П'ятниця: 9:00 - 18:00<br />
                Субота - Неділя: 10:00 - 16:00
              </p>
            </div>
          </div>

          {/* Форма зворотного зв'язку */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Надішліть нам повідомлення
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ім'я
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
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="ivan@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Тема
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Тема звернення"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Повідомлення
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Ваше повідомлення..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition font-semibold flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>Надіслати</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
