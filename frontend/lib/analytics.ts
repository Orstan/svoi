// Google Analytics 4
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-F9FMC86X6L';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (!GA_TRACKING_ID) return;
  
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (!GA_TRACKING_ID) return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Відслідковування кліків на майстра
export const trackMasterView = (masterId: number, masterName: string) => {
  event({
    action: 'view_master',
    category: 'engagement',
    label: masterName,
    value: masterId,
  });
};

// Відслідковування пошуку
export const trackSearch = (query: string) => {
  event({
    action: 'search',
    category: 'engagement',
    label: query,
  });
};

// Відслідковування контакту з майстром
export const trackContact = (masterId: number, method: 'whatsapp' | 'telegram' | 'phone') => {
  event({
    action: 'contact_master',
    category: 'conversion',
    label: method,
    value: masterId,
  });
};

// Відслідковування реєстрації
export const trackSignup = (method: 'email' | 'google') => {
  event({
    action: 'sign_up',
    category: 'conversion',
    label: method,
  });
};

// Відслідковування входу
export const trackLogin = (method: 'email' | 'google') => {
  event({
    action: 'login',
    category: 'engagement',
    label: method,
  });
};
