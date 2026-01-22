import Link from 'next/link';
import { Facebook, Instagram, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Свої для Своїх</h3>
            <p className="text-sm">
              Маркетплейс послуг для української спільноти в Польщі
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-white transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-white transition">
                <Instagram size={20} />
              </a>
              <a href="mailto:info@svoi-ua.pl" className="hover:text-white transition">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Для клієнтів</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/masters" className="hover:text-white transition">
                  Знайти майстра
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white transition">
                  Категорії послуг
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white transition">
                  Як це працює
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Для майстрів</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/become-master" className="hover:text-white transition">
                  Стати майстром
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition">
                  Тарифи
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Інформація</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  Про нас
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Контакти
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Політика конфіденційності
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Умови використання
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Свої для Своїх. Всі права захищені.</p>
        </div>
      </div>
    </footer>
  );
}
