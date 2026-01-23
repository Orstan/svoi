'use client';

import Breadcrumbs from '@/components/Breadcrumbs';
import { Users, Target, Heart, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: 'Про нас' }]} />

        <div className="bg-white rounded-lg shadow-sm p-8 mt-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Про Свої для Своїх
          </h1>

          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              <strong>Свої для Своїх</strong> - це платформа, яка об'єднує українських майстрів та спеціалістів у Польщі з клієнтами, які потребують їхніх послуг.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <Users className="text-primary-600 mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-2">Наша місія</h3>
                <p className="text-gray-700">
                  Допомагати українцям знаходити перевірених майстрів і спеціалістів у Польщі, створюючи довіру та взаємопідтримку в громаді.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <Target className="text-green-600 mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-2">Наша мета</h3>
                <p className="text-gray-700">
                  Стати найбільшою платформою українських послуг у Польщі, де кожен може знайти професіонала у будь-якій сфері.
                </p>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <Heart className="text-red-600 mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-2">Наші цінності</h3>
                <p className="text-gray-700">
                  Якість, надійність, взаємна підтримка та професіоналізм - основа нашої роботи.
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <Award className="text-purple-600 mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-2">Наші переваги</h3>
                <p className="text-gray-700">
                  Перевірені майстри, зручний пошук, система рейтингів та відгуків, безпечні платежі.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Чому обирають нас?
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Всі майстри проходять верифікацію</li>
              <li>Прозора система рейтингів та відгуків</li>
              <li>Підтримка української мови</li>
              <li>Зручний пошук за категоріями та локацією</li>
              <li>Безкоштовна реєстрація для майстрів</li>
              <li>Підтримка клієнтів 24/7</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
