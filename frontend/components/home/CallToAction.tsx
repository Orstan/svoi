import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ти майстер? Приєднуйся до нас!
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Безкоштовна реєстрація. Тисячі потенційних клієнтів. Українська спільнота.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/become-master"
            className="inline-flex items-center justify-center bg-white text-primary-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition font-semibold text-lg"
          >
            Створити профіль майстра
            <ArrowRight className="ml-2" size={20} />
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition font-semibold text-lg"
          >
            Переглянути тарифи
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-white">
            <div className="text-4xl font-bold mb-2">100%</div>
            <div className="text-white/80">Безкоштовна реєстрація</div>
          </div>
          <div className="text-white">
            <div className="text-4xl font-bold mb-2">24/7</div>
            <div className="text-white/80">Доступ до профілю</div>
          </div>
          <div className="text-white">
            <div className="text-4xl font-bold mb-2">1000+</div>
            <div className="text-white/80">Активних майстрів</div>
          </div>
        </div>
      </div>
    </section>
  );
}
