'use client';

import { useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'Як зареєструватися на платформі?',
      answer: 'Натисніть на кнопку "Реєстрація" у верхньому меню, заповніть форму з вашими даними та підтвердіть email.',
    },
    {
      question: 'Як стати майстром на платформі?',
      answer: 'Натисніть "Стати майстром", заповніть анкету з вашими професійними даними, додайте портфоліо. Після модерації ваш профіль буде активовано.',
    },
    {
      question: 'Чи безкоштовна реєстрація для майстрів?',
      answer: 'Так, базова реєстрація абсолютно безкоштовна. Ви можете створити профіль, додати послуги та отримувати замовлення без будь-яких платежів.',
    },
    {
      question: 'Як я можу зв\'язатися з майстром?',
      answer: 'На сторінці майстра натисніть кнопку "Написати повідомлення" або використайте контакти (телефон, Telegram, WhatsApp), якщо майстер їх вказав.',
    },
    {
      question: 'Чи перевіряються майстри?',
      answer: 'Так, всі майстри проходять базову верифікацію. Майстри з позначкою "Верифікований" пройшли додаткову перевірку документів.',
    },
    {
      question: 'Як залишити відгук про майстра?',
      answer: 'Після замовлення послуги ви можете залишити відгук на сторінці майстра. Відгуки допомагають іншим клієнтам зробити вибір.',
    },
    {
      question: 'Що таке PRO-майстер?',
      answer: 'PRO-майстри - це майстри з преміум підпискою, які отримують більше переваг: вищі позиції в пошуку, додаткове портфоліо, виділення в списку.',
    },
    {
      question: 'Як я можу оплатити послугу?',
      answer: 'Оплата відбувається за домовленістю з майстром. Ми рекомендуємо обговорювати умови оплати заздалегідь.',
    },
    {
      question: 'Що робити, якщо я не задоволений послугою?',
      answer: 'Зв\'яжіться з нашою службою підтримки через форму зворотного зв\'язку. Ми допоможемо вирішити конфлікт.',
    },
    {
      question: 'Чи можна змінити дані профілю?',
      answer: 'Так, ви можете редагувати свій профіль в особистому кабінеті в будь-який час.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: 'Часті питання' }]} />

        <div className="mt-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Часті питання (FAQ)
          </h1>
          <p className="text-gray-600 mb-8">
            Відповіді на найпопулярніші питання про роботу платформи
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUp className="text-primary-600 flex-shrink-0" size={24} />
                  ) : (
                    <ChevronDown className="text-gray-400 flex-shrink-0" size={24} />
                  )}
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              Не знайшли відповідь?
            </h3>
            <p className="text-gray-700 mb-4">
              Зв'яжіться з нашою службою підтримки, і ми з радістю допоможемо вам!
            </p>
            <a
              href="/contact"
              className="inline-block bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition font-semibold"
            >
              Зв'язатися з нами
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
