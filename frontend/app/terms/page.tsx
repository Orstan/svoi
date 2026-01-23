'use client';

import Breadcrumbs from '@/components/Breadcrumbs';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: 'Умови використання' }]} />

        <div className="bg-white rounded-lg shadow-sm p-8 mt-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Умови використання
          </h1>

          <div className="prose max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                1. Прийняття умов
              </h2>
              <p>
                Використовуючи платформу Свої для Своїх, ви погоджуєтеся з цими умовами використання. 
                Якщо ви не погоджуєтеся з будь-якою частиною умов, не використовуйте наші послуги.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                2. Реєстрація облікового запису
              </h2>
              <p>
                Для використання повного функціоналу платформи необхідно створити обліковий запис. 
                Ви зобов'язуєтесь надати точну та актуальну інформацію і підтримувати її в актуальному стані.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                <li>Вам повинно бути не менше 18 років</li>
                <li>Один користувач - один обліковий запис</li>
                <li>Ви несете відповідальність за безпеку свого пароля</li>
                <li>Забороняється передавати доступ до облікового запису третім особам</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                3. Правила для майстрів
              </h2>
              <p>Якщо ви реєструєтесь як майстер, ви зобов'язуєтесь:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Надавати якісні послуги відповідно до опису</li>
                <li>Своєчасно відповідати на повідомлення клієнтів</li>
                <li>Дотримуватись узгоджених термінів та цін</li>
                <li>Не розміщувати неправдиву або оманливу інформацію</li>
                <li>Поважати клієнтів та інших майстрів</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                4. Правила для клієнтів
              </h2>
              <p>Як клієнт платформи, ви зобов'язуєтесь:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Поважати майстрів та їхню роботу</li>
                <li>Залишати чесні та об'єктивні відгуки</li>
                <li>Своєчасно оплачувати узгоджені послуги</li>
                <li>Не зловживати системою відгуків</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                5. Заборонені дії
              </h2>
              <p>Забороняється:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Розміщувати незаконний або образливий контент</li>
                <li>Використовувати платформу для шахрайства</li>
                <li>Копіювати або використовувати контент інших користувачів</li>
                <li>Намагатись отримати несанкціонований доступ до системи</li>
                <li>Розміщувати спам або рекламу</li>
                <li>Створювати фальшиві облікові записи</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                6. Інтелектуальна власність
              </h2>
              <p>
                Весь контент на платформі, включаючи тексти, графіку, логотипи та програмне забезпечення, 
                захищений авторським правом і належить Свої для Своїх або її користувачам.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                7. Оплата та комісії
              </h2>
              <p>
                Базова реєстрація на платформі безкоштовна. PRO та Бізнес плани оплачуються згідно з тарифами. 
                Ми залишаємо за собою право змінювати ціни з попереднім повідомленням.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                8. Відповідальність
              </h2>
              <p>
                Платформа виступає лише як посередник між майстрами та клієнтами. 
                Ми не несемо відповідальності за якість наданих послуг, спори між користувачами 
                або будь-які збитки, що виникли в результаті використання платформи.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                9. Припинення доступу
              </h2>
              <p>
                Ми залишаємо за собою право призупинити або видалити обліковий запис користувача 
                без попередження у випадку порушення цих умов використання.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                10. Зміни в умовах
              </h2>
              <p>
                Ми можемо оновлювати ці умови час від часу. Про значні зміни ми повідомимо користувачів 
                через email або повідомлення на платформі.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                11. Контакти
              </h2>
              <p>
                З питань щодо умов використання звертайтесь:
              </p>
              <ul className="list-none space-y-1 ml-4">
                <li>Email: legal@svoi24.pl</li>
                <li>Телефон: +48 123 456 789</li>
              </ul>
            </section>

            <p className="text-sm text-gray-500 mt-8">
              Останнє оновлення: Січень 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
