'use client';

import { WifiOff } from 'lucide-react';
import Link from 'next/link';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
        <WifiOff size={64} className="mx-auto mb-4 text-gray-400" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Немає з'єднання
        </h1>
        <p className="text-gray-600 mb-6">
          Перевірте підключення до інтернету та спробуйте ще раз
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-semibold w-full"
        >
          Оновити сторінку
        </button>
        <Link
          href="/"
          className="block mt-4 text-primary-600 hover:text-primary-700"
        >
          На головну
        </Link>
      </div>
    </div>
  );
}
