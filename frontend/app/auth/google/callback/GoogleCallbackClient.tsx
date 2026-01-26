'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function GoogleCallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { checkAuth } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get('token');
    const redirect = searchParams.get('redirect') || '/profile';

    if (!token) {
      setError('Missing token');
      return;
    }

    localStorage.setItem('auth_token', token);
    document.cookie = `auth_token=${token}; path=/; max-age=2592000`;

    (async () => {
      try {
        await checkAuth();
      } finally {
        router.replace(redirect);
      }
    })();
  }, [checkAuth, router, searchParams]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-6 text-center">
          <h1 className="text-xl font-semibold text-gray-900">Помилка авторизації</h1>
          <p className="mt-2 text-gray-600">Спробуйте ще раз.</p>
          <button
            className="mt-4 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
            onClick={() => router.replace('/login')}
          >
            Перейти до входу
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-6 text-center">
        <h1 className="text-xl font-semibold text-gray-900">Авторизація...</h1>
        <p className="mt-2 text-gray-600">Зачекайте, виконуємо вхід.</p>
      </div>
    </div>
  );
}
