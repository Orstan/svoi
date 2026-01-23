'use client';

import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { Locale, useTranslation } from '@/lib/i18n';

export default function LanguageSwitcher() {
  const { locale, changeLocale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages: { code: Locale; name: string; flag: string }[] = [
    { code: 'uk', name: 'Українська', flag: '🇺🇦' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
  ];

  const currentLanguage = languages.find((lang) => lang.code === locale);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
      >
        <Globe size={20} />
        <span className="text-xl">{currentLanguage?.flag}</span>
        <span className="hidden md:inline text-sm">{currentLanguage?.name}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  changeLocale(lang.code);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition
                  ${locale === lang.code ? 'bg-primary-50 text-primary-600' : ''}
                  ${lang.code === 'uk' ? 'rounded-t-lg' : ''}
                  ${lang.code === 'en' ? 'rounded-b-lg' : ''}
                `}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="text-sm font-medium">{lang.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
