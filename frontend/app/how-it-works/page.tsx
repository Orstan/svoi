import Link from 'next/link';
import { Search, UserCheck, MessageCircle, Star } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
          Як це працює?
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          Простий спосіб знайти українських майстрів у Польщі
        </p>

        <div className="space-y-12">
          {/* Для клієнтів */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Для клієнтів</h2>
            
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Search className="text-primary-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">1. Знайдіть майстра</h3>
                  <p className="text-gray-600">
                    Використовуйте пошук за категорією, локацією або назвою послуги. 
                    Переглядайте профілі, портфоліо та відгуки.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="text-primary-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">2. Зв'яжіться напряму</h3>
                  <p className="text-gray-600">
                    Натисніть кнопку WhatsApp або Telegram і обговоріть деталі безпосередньо з майстром.
                    Ми не беремо комісію - спілкуйтеся напряму!
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Star className="text-primary-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">3. Залишіть відгук</h3>
                  <p className="text-gray-600">
                    Після роботи поділіться враженнями. Ваш відгук допоможе іншим українцям знайти якісних майстрів.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Для майстрів */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Для майстрів</h2>
            
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                  <UserCheck className="text-secondary-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">1. Створіть профіль</h3>
                  <p className="text-gray-600">
                    Зареєструйтеся безкоштовно, заповніть інформацію про себе, додайте фото робіт.
                    Вкажіть ваші послуги та контакти.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                  <Search className="text-secondary-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">2. Отримуйте замовлення</h3>
                  <p className="text-gray-600">
                    Клієнти знайдуть вас через пошук і зв'яжуться напряму через WhatsApp або Telegram.
                    Без посередників та комісій!
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                  <Star className="text-secondary-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">3. Збирайте відгуки</h3>
                  <p className="text-gray-600">
                    Якісна робота = позитивні відгуки = більше клієнтів. Підвищуйте рейтинг та ставайте ТОП майстром!
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t">
              <h3 className="text-lg font-semibold mb-4">Переваги PRO-статусу:</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-primary-600">✓</span>
                  Виділення у пошуку з міткою PRO
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary-600">✓</span>
                  Показ у топі результатів пошуку
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary-600">✓</span>
                  Більша видимість для потенційних клієнтів
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/register"
            className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition font-semibold text-lg"
          >
            Почати зараз
          </Link>
        </div>
      </div>
    </div>
  );
}
