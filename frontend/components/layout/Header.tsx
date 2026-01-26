'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Menu, X, User, Heart } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // Перевіряємо тестового користувача
    const testUser = localStorage.getItem('test_user');
    const testToken = localStorage.getItem('auth_token');
    
    if (testUser && testToken) {
      setCurrentUser(JSON.parse(testUser));
    } else if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  }, [user]);

  const handleLogout = async () => {
    localStorage.removeItem('test_user');
    await logout();
    setCurrentUser(null);
    router.push('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between items-center h-16">
          <Link
            href="/become-master"
            className="md:hidden inline-flex items-center justify-center h-10 px-3 rounded-lg bg-secondary-500 text-white text-sm font-medium hover:bg-secondary-600 transition"
          >
            Стати майстром
          </Link>

          <Link href="/" className="flex items-center space-x-2 md:static md:transform-none md:-translate-x-0 absolute left-1/2 -translate-x-1/2">
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

          {/* Мобільне меню прибрано, використовується нижня навігація */}
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
