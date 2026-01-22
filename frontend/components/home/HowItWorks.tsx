import { Search, UserCheck, MessageCircle } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Оберіть послугу',
    description: 'Виберіть потрібну категорію та місто в пошуку',
  },
  {
    icon: UserCheck,
    title: 'Знайдіть майстра',
    description: 'Перегляньте профілі, відгуки та портфоліо майстрів',
  },
  {
    icon: MessageCircle,
    title: 'Зв\'яжіться напряму',
    description: 'Напишіть або зателефонуйте майстру через WhatsApp/Telegram',
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4">
          Як це працює
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Три простих кроки до знайдення ідеального майстра
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <step.icon className="text-primary-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {step.description}
                </p>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
