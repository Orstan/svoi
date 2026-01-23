'use client';

import Breadcrumbs from '@/components/Breadcrumbs';
import { Check, Star, Zap } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: 'Базовий',
      price: 'Безкоштовно',
      description: 'Для початку роботи',
      features: [
        'Профіль майстра',
        'До 5 послуг',
        'До 10 фото в портфоліо',
        'Відгуки клієнтів',
        'Базова підтримка',
      ],
      icon: Check,
      color: 'bg-gray-600',
    },
    {
      name: 'PRO',
      price: '99 PLN/міс',
      description: 'Для професіоналів',
      popular: true,
      features: [
        'Всі функції базового',
        'Необмежена кількість послуг',
        'Необмежене портфоліо',
        'Вища позиція в пошуку',
        'Значок PRO',
        'Пріоритетна підтримка',
        'Статистика переглядів',
      ],
      icon: Star,
      color: 'bg-yellow-500',
    },
    {
      name: 'Бізнес',
      price: '199 PLN/міс',
      description: 'Для команд та студій',
      features: [
        'Всі функції PRO',
        'До 5 майстрів в одному профілі',
        'Корпоративна сторінка',
        'API інтеграція',
        'Персональний менеджер',
        'Промо-матеріали',
      ],
      icon: Zap,
      color: 'bg-purple-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: 'Тарифи' }]} />

        <div className="text-center mt-6 mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Оберіть свій тариф
          </h1>
          <p className="text-xl text-gray-600">
            Почніть безкоштовно, оновіться коли будете готові
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <div
                key={index}
                className={`
                  bg-white rounded-xl shadow-sm p-8 relative
                  ${plan.popular ? 'ring-2 ring-primary-600 shadow-xl scale-105' : ''}
                `}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Популярний
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className={`inline-flex ${plan.color} text-white p-3 rounded-lg mb-4`}>
                    <Icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <Check className="text-green-500 mr-2 flex-shrink-0" size={20} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`
                    w-full py-3 rounded-lg font-semibold transition
                    ${plan.popular
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }
                  `}
                >
                  {index === 0 ? 'Почати безкоштовно' : 'Обрати план'}
                </button>
              </div>
            );
          })}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Потрібен індивідуальний план?
          </h3>
          <p className="text-gray-700 mb-6">
            Зв'яжіться з нами для обговорення спеціальних умов для великих студій
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
          >
            Зв'язатися з нами
          </a>
        </div>
      </div>
    </div>
  );
}
