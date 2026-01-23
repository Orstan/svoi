'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Menu, Plus, MessageCircle, User } from 'lucide-react';

export default function MobileNavigation() {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Головна',
      href: '/',
      icon: Home,
    },
    {
      name: 'Меню',
      href: '/categories',
      icon: Menu,
    },
    {
      name: 'Додати',
      href: '/become-master',
      icon: Plus,
      isSpecial: true,
    },
    {
      name: 'Повідомлення',
      href: '/messages',
      icon: MessageCircle,
    },
    {
      name: 'Профіль',
      href: '/profile',
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          if (item.isSpecial) {
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col items-center justify-center -mt-8"
              >
                <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition">
                  <Icon size={24} strokeWidth={2.5} />
                </div>
              </Link>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex flex-col items-center justify-center flex-1 h-full transition
                ${isActive ? 'text-primary-600' : 'text-gray-600'}
              `}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-xs mt-1 ${isActive ? 'font-semibold' : ''}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
