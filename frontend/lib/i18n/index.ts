import { useState, useEffect } from 'react';
import uk from './locales/uk.json';
import pl from './locales/pl.json';
import en from './locales/en.json';

export type Locale = 'uk' | 'pl' | 'en';

const translations = {
  uk,
  pl,
  en,
};

export const defaultLocale: Locale = 'uk';

export function getTranslations(locale: Locale = defaultLocale) {
  return translations[locale] || translations[defaultLocale];
}

export function useTranslation() {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [t, setT] = useState(translations[defaultLocale]);

  useEffect(() => {
    // Отримати мову з localStorage
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && translations[savedLocale]) {
      setLocale(savedLocale);
      setT(translations[savedLocale]);
    }
  }, []);

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    setT(translations[newLocale]);
    localStorage.setItem('locale', newLocale);
    
    // Оновити API headers
    document.dispatchEvent(new CustomEvent('localeChange', { detail: newLocale }));
  };

  return { t, locale, changeLocale };
}

// Хелпер для отримання вкладених значень
export function getNestedTranslation(obj: any, path: string): string {
  return path.split('.').reduce((current, key) => current?.[key], obj) || path;
}

// Хук для використання в клієнтських компонентах
export function useT() {
  const { t } = useTranslation();
  
  return (key: string) => {
    return getNestedTranslation(t, key);
  };
}
