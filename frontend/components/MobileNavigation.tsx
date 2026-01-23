'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Home, Menu, Plus, MessageCircle, User, X, Users, Grid3x3, HelpCircle, Info, Mail } from 'lucide-react';

export default function MobileNavigation() {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);

  const navItems: Array<{
    name: string;
    href?: string;
    icon: any;
    isSpecial?: boolean;
    isMenu?: boolean;
    onClick?: () => void;
  }> = [
    {
      name: 'Головна',
      href: '/',
      icon: Home,
    },
    {
      name: 'Меню',
      onClick: () => setShowMenu(!showMenu),
      icon: Menu,
      isMenu: true,
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

  const menuItems = [
    { name: 'Майстри', href: '/masters', icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { name: 'Категорії', href: '/categories', icon: Grid3x3, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { name: 'Як це працює', href: '/how-it-works', icon: HelpCircle, color: 'text-green-600', bgColor: 'bg-green-50' },
    { name: 'Про нас', href: '/about', icon: Info, color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { name: 'Контакти', href: '/contact', icon: Mail, color: 'text-red-600', bgColor: 'bg-red-50' },
  ];

  return (
    <>
      {/* Випадаюче меню */}
      {showMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden" onClick={() => setShowMenu(false)}>
          <div className="fixed bottom-16 left-0 right-0 bg-white rounded-t-2xl shadow-xl p-6 animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Меню</h3>
              <button onClick={() => setShowMenu(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setShowMenu(false)}
                  className="block px-4 py-3 rounded-lg hover:bg-gray-100 transition"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Нижня навігація */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            if (item.isSpecial && item.href) {
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

            if (item.isMenu) {
              return (
                <button
                  key={item.name}
                  onClick={item.onClick}
                  className="flex flex-col items-center justify-center flex-1 h-full transition text-gray-600"
                >
                  <Icon size={22} strokeWidth={2} />
                  <span className="text-xs mt-1">{item.name}</span>
                </button>
              );
            }

            if (item.href) {
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
            }
            
            return null;
          })}
        </div>
      </nav>
    </>
  );
}
