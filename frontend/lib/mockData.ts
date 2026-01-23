// Тимчасові тестові дані, поки backend не готовий

export const mockMasters = [
  {
    id: 1,
    user: {
      name: 'Іван Петренко',
      avatar: null,
    },
    bio: 'Професійний майстер з ремонту квартир. Досвід роботи 10+ років.',
    location: { name_uk: 'Варшава' },
    rating: 4.8,
    reviews_count: 24,
    is_verified: true,
    is_pro: true,
    experience_years: 10,
    services: [
      {
        id: 1,
        title: 'Ремонт квартир',
        description: 'Повний ремонт квартир під ключ',
        price_min: 5000,
        price_max: 15000,
        currency: 'PLN',
        duration: 480,
      },
    ],
    portfolio_items: [],
    reviews: [],
  },
  {
    id: 2,
    user: {
      name: 'Марія Коваль',
      avatar: null,
    },
    bio: 'Перукар-стиліст. Працюю з усіма типами волосся.',
    location: { name_uk: 'Краків' },
    rating: 5.0,
    reviews_count: 45,
    is_verified: true,
    is_pro: false,
    experience_years: 7,
    services: [
      {
        id: 2,
        title: 'Стрижка',
        description: 'Жіноча та чоловіча стрижка',
        price_min: 80,
        price_max: 150,
        currency: 'PLN',
        duration: 60,
      },
    ],
    portfolio_items: [],
    reviews: [],
  },
];

export const mockCategories = [
  { id: 1, name_uk: 'Ремонт та будівництво', slug: 'remont', icon: '🔨' },
  { id: 2, name_uk: 'Краса та здоров\'я', slug: 'krasa', icon: '💇' },
  { id: 3, name_uk: 'Навчання', slug: 'navchannya', icon: '📚' },
  { id: 4, name_uk: 'Транспорт', slug: 'transport', icon: '🚗' },
];

export const mockVoivodeships = [
  { id: 1, name_uk: 'Мазовецьке', name_pl: 'Mazowieckie' },
  { id: 2, name_uk: 'Малопольське', name_pl: 'Małopolskie' },
  { id: 3, name_uk: 'Великопольське', name_pl: 'Wielkopolskie' },
];
