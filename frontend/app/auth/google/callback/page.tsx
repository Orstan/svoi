import { Suspense } from 'react';
import GoogleCallbackClient from './GoogleCallbackClient';

export default function GoogleCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-6 text-center">
            <h1 className="text-xl font-semibold text-gray-900">Авторизація...</h1>
            <p className="mt-2 text-gray-600">Зачекайте, виконуємо вхід.</p>
          </div>
        </div>
      }
    >
      <GoogleCallbackClient />
    </Suspense>
  );
}
