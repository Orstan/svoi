'use client';

import Breadcrumbs from '@/components/Breadcrumbs';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: 'Політика конфіденційності' }]} />

        <div className="bg-white rounded-lg shadow-sm p-8 mt-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Політика конфіденційності
          </h1>

          <div className="prose max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                1. Збір інформації
              </h2>
              <p>
                Ми збираємо інформацію, яку ви надаєте нам під час реєстрації на платформі Свої для Своїх. 
                Це включає ваше ім'я, email, номер телефону, адресу та іншу інформацію, необхідну для надання послуг.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                2. Використання інформації
              </h2>
              <p>Ми використовуємо зібрану інформацію для:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Надання та покращення наших послуг</li>
                <li>Зв'язку з вами щодо вашого облікового запису</li>
                <li>Відправки важливих повідомлень та оновлень</li>
                <li>Персоналізації вашого досвіду</li>
                <li>Забезпечення безпеки платформи</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                3. Захист даних
              </h2>
              <p>
                Ми використовуємо сучасні технології та процедури для захисту вашої особистої інформації. 
                Всі дані зберігаються на захищених серверах, а передача відбувається через зашифровані з'єднання.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                4. Обмін інформацією
              </h2>
              <p>
                Ми не продаємо, не передаємо та не розголошуємо вашу особисту інформацію третім особам, 
                за винятком випадків, коли це необхідно для надання послуг або вимагається законом.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                5. Файли cookie
              </h2>
              <p>
                Ми використовуємо файли cookie для покращення роботи сайту та вашого досвіду. 
                Ви можете налаштувати ваш браузер для відхилення cookie, але це може обмежити функціональність сайту.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                6. Ваші права
              </h2>
              <p>Ви маєте право:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Отримати доступ до своїх особистих даних</li>
                <li>Виправити неточні дані</li>
                <li>Видалити свій обліковий запис</li>
                <li>Відкликати згоду на обробку даних</li>
                <li>Подати скаргу до наглядового органу</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                7. Зміни в політиці
              </h2>
              <p>
                Ми можемо час від часу оновлювати цю політику конфіденційності. 
                Про будь-які суттєві зміни ми повідомимо вас через email або повідомлення на сайті.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                8. Контакти
              </h2>
              <p>
                Якщо у вас є запитання щодо політики конфіденційності, зв'яжіться з нами:
              </p>
              <ul className="list-none space-y-1 ml-4">
                <li>Email: privacy@svoi24.pl</li>
                <li>Телефон: +48 123 456 789</li>
              </ul>
            </section>

            <p className="text-sm text-gray-500 mt-8">
              Остання оновлення: Січень 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
