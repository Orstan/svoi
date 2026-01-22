'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Search, Menu, X, User, Heart } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/logo.png" 
              alt="Svoi24" 
              width={140} 
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/masters" 
              className="text-gray-700 hover:text-primary-600 transition"
            >
              Майстри
            </Link>
            <Link 
              href="/categories" 
              className="text-gray-700 hover:text-primary-600 transition"
            >
              Категорії
            </Link>
            <Link 
              href="/how-it-works" 
              className="text-gray-700 hover:text-primary-600 transition"
            >
              Як це працює
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link 
                  href="/favorites" 
                  className="p-2 text-gray-700 hover:text-primary-600 transition"
                >
                  <Heart size={20} />
                </Link>
                <Link 
                  href="/profile" 
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition"
                >
                  <User size={20} />
                  <span>{user?.name}</span>
                </Link>
                <button
                  onClick={() => logout()}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Вийти
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="text-gray-700 hover:text-primary-600 transition"
                >
                  Увійти
                </Link>
                <Link 
                  href="/register" 
                  className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition"
                >
                  Реєстрація
                </Link>
              </>
            )}
            <Link 
              href="/become-master" 
              className="bg-secondary-500 text-white px-4 py-2 rounded-lg hover:bg-secondary-600 transition font-medium"
            >
              Стати майстром
            </Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            <Link 
              href="/masters" 
              className="block py-2 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Майстри
            </Link>
            <Link 
              href="/categories" 
              className="block py-2 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Категорії
            </Link>
            {isAuthenticated ? (
              <>
                <Link 
                  href="/favorites" 
                  className="block py-2 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Вибране
                </Link>
                <Link 
                  href="/profile" 
                  className="block py-2 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Профіль
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-gray-700"
                >
                  Вийти
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="block py-2 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Увійти
                </Link>
                <Link 
                  href="/register" 
                  className="block py-2 text-primary-600 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Реєстрація
                </Link>
              </>
            )}
            <Link 
              href="/become-master" 
              className="block py-2 text-secondary-600 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Стати майстром
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
