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
  {
    id: 1,
    name: 'Краса',
    slug: 'uroda',
    icon: '💅',
    masters_count: 245,
    children: [
      { id: 101, name: 'Манікюр', slug: 'uroda-manicure', masters_count: 0 },
      { id: 102, name: 'Педикюр', slug: 'uroda-pedicure', masters_count: 0 },
      { id: 103, name: 'Перукар', slug: 'uroda-fryzjer', masters_count: 0 },
      { id: 104, name: 'Масаж', slug: 'uroda-masaz', masters_count: 0 },
    ],
  },
  {
    id: 2,
    name: 'Ремонт',
    slug: 'remont',
    icon: '🔨',
    masters_count: 189,
    children: [
      { id: 201, name: 'Сантехнік', slug: 'remont-hydraulik', masters_count: 0 },
      { id: 202, name: 'Електрик', slug: 'remont-elektryk', masters_count: 0 },
      { id: 203, name: 'Плитка', slug: 'remont-plytka', masters_count: 0 },
      { id: 204, name: 'Маляр', slug: 'remont-malowanie', masters_count: 0 },
    ],
  },
  {
    id: 3,
    name: 'Авто',
    slug: 'auto',
    icon: '🚗',
    masters_count: 78,
    children: [
      { id: 301, name: 'Автомеханік', slug: 'auto-mechanik', masters_count: 0 },
      { id: 302, name: 'Автоелектрик', slug: 'auto-elektryk', masters_count: 0 },
      { id: 303, name: 'Шиномонтаж', slug: 'auto-opony', masters_count: 0 },
    ],
  },
  {
    id: 4,
    name: 'Освіта',
    slug: 'edukacja',
    icon: '📚',
    masters_count: 156,
    children: [
      { id: 401, name: 'Польська мова', slug: 'edukacja-polski', masters_count: 0 },
      { id: 402, name: 'Математика', slug: 'edukacja-matematyka', masters_count: 0 },
      { id: 403, name: 'Англійська', slug: 'edukacja-angielski', masters_count: 0 },
    ],
  },
  {
    id: 5,
    name: 'Діти',
    slug: 'dzieci',
    icon: '�',
    masters_count: 92,
    children: [
      { id: 501, name: 'Няня', slug: 'dzieci-niania', masters_count: 0 },
      { id: 502, name: 'Аніматор', slug: 'dzieci-animator', masters_count: 0 },
    ],
  },
  {
    id: 6,
    name: 'Побут',
    slug: 'dom',
    icon: '🏠',
    masters_count: 134,
    children: [
      { id: 601, name: 'Прибирання', slug: 'dom-sprzatanie', masters_count: 0 },
      { id: 602, name: 'Переїзди', slug: 'dom-przeprowadzki', masters_count: 0 },
      { id: 603, name: 'Ремонт техніки', slug: 'dom-naprawa', masters_count: 0 },
    ],
  },
  {
    id: 7,
    name: 'IT',
    slug: 'it',
    icon: '�',
    masters_count: 67,
    children: [
      { id: 701, name: 'Веб-розробка', slug: 'it-web', masters_count: 0 },
      { id: 702, name: 'Дизайн', slug: 'it-design', masters_count: 0 },
      { id: 703, name: 'Ремонт ПК', slug: 'it-naprawa', masters_count: 0 },
    ],
  },
  {
    id: 8,
    name: 'Фото',
    slug: 'foto',
    icon: '�',
    masters_count: 54,
    children: [
      { id: 801, name: 'Фотограф', slug: 'foto-fotograf', masters_count: 0 },
      { id: 802, name: 'Відеограф', slug: 'foto-video', masters_count: 0 },
    ],
  },
];

export const mockVoivodeships = [
  { id: 1, name_uk: 'Мазовецьке', name_pl: 'Mazowieckie' },
  { id: 2, name_uk: 'Малопольське', name_pl: 'Małopolskie' },
  { id: 3, name_uk: 'Великопольське', name_pl: 'Wielkopolskie' },
];
