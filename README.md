# Свої для Своїх - Маркетплейс послуг

Маркетплейс для з'єднання українських замовників у Польщі з українськими майстрами та спеціалістами.

🌐 **Домен:** [svoi24.pl](https://svoi24.pl)

## 🚀 Технології

### Backend
- **Laravel 10** - PHP Framework
- **MySQL 8.0** - База даних
- **Filament PHP 3** - Адмін-панель
- **Laravel Sanctum** - API Authentication
- **Laravel Socialite** - OAuth (Google)

### Frontend
- **Next.js 14** - React Framework з SSR
- **TypeScript** - Типізація
- **TailwindCSS** - Стилізація
- **Zustand** - State Management
- **Axios** - HTTP клієнт

## 📋 Можливості

### Для клієнтів
- 🔍 Пошук майстрів за категорією та локацією
- ⭐ Перегляд рейтингів та відгуків
- 📱 Прямий зв'язок через WhatsApp/Telegram
- ❤️ Збереження вибраних майстрів
- 🌐 Багатомовний інтерфейс (UA/PL/EN)

### Для майстрів
- 📝 Створення профілю спеціаліста
- 🖼️ Завантаження портфоліо (до 10 фото)
- 💼 Управління послугами та цінами
- 💬 Відповіді на відгуки клієнтів
- 🚀 PRO-статус для просування

### Для адміністраторів
- 👥 Управління користувачами
- ✅ Модерація анкет та фото
- 📊 Статистика платформи
- 🏷️ Управління категоріями та локаціями

## 🛠️ Встановлення

### Backend (Laravel)

```bash
cd backend

# Встановлення залежностей
composer install

# Налаштування середовища
cp .env.example .env
php artisan key:generate

# Налаштування бази даних в .env
# DB_DATABASE=svoi_marketplace
# DB_USERNAME=root
# DB_PASSWORD=

# Міграції та заповнення даних
php artisan migrate
php artisan db:seed

# Створення symbolic link для storage
php artisan storage:link

# Запуск сервера
php artisan serve
```

### Frontend (Next.js)

```bash
cd frontend

# Встановлення залежностей
npm install

# Налаштування середовища
cp .env.local.example .env.local

# Редагувати .env.local:
# NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
# NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id

# Запуск dev сервера
npm run dev
```

Відкрийте:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Admin Panel: http://localhost:8000/admin

## 📁 Структура проекту

```
svoi/
├── backend/              # Laravel API Backend
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/
│   │   │       └── Api/     # API контролери
│   │   └── Models/          # Eloquent моделі
│   ├── database/
│   │   ├── migrations/      # Міграції БД
│   │   └── seeders/         # Seeders
│   └── routes/
│       └── api.php          # API маршрути
│
└── frontend/            # Next.js Frontend
    ├── app/             # Next.js App Router
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/      # React компоненти
    │   ├── layout/
    │   └── home/
    ├── lib/            # Утиліти та API клієнт
    ├── store/          # Zustand stores
    └── messages/       # i18n переклади
```

## 🗄️ База даних

### Основні таблиці

- **users** - Користувачі (клієнти, майстри, адміни)
- **categories** - Категорії послуг (багатомовні)
- **locations** - Воєводства та міста Польщі
- **master_profiles** - Профілі майстрів
- **services** - Послуги майстрів
- **portfolio_items** - Портфоліо робіт
- **reviews** - Відгуки клієнтів
- **favorites** - Вибрані майстри

## 🔐 Авторизація

API використовує Laravel Sanctum для token-based авторизації.

### Реєстрація
```http
POST /api/v1/register
Content-Type: application/json

{
  "name": "Ім'я",
  "email": "email@example.com",
  "password": "password",
  "password_confirmation": "password"
}
```

### Вхід
```http
POST /api/v1/login
Content-Type: application/json

{
  "email": "email@example.com",
  "password": "password"
}
```

## 🌍 API Endpoints

### Публічні
- `GET /api/v1/categories` - Список категорій
- `GET /api/v1/locations/voivodeships` - Воєводства
- `GET /api/v1/locations/cities` - Міста
- `GET /api/v1/masters` - Список майстрів
- `GET /api/v1/masters/{id}` - Профіль майстра

### Авторизовані
- `POST /api/v1/masters` - Створити профіль майстра
- `POST /api/v1/masters/{id}/portfolio` - Завантажити фото
- `POST /api/v1/masters/{id}/reviews` - Додати відгук
- `POST /api/v1/favorites/{id}/toggle` - Додати/видалити з вибраного

## 🎨 Дизайн система

### Кольори
- **Primary (Yellow)**: `#f5b72d` - Основний акцент
- **Secondary (Blue)**: `#3fa2ee` - Додатковий акцент

### Компоненти
- Використовується TailwindCSS для стилізації
- Mobile-first підхід
- Адаптивний дизайн

## 🚀 Деплой

### Backend (Laravel)

#### Вимоги VPS
- Ubuntu 20.04+
- PHP 8.1+
- MySQL 8.0+
- Nginx
- Composer

#### Кроки
```bash
# Клонування репозиторію
git clone your-repo-url
cd backend

# Встановлення
composer install --optimize-autoloader --no-dev
php artisan key:generate
php artisan migrate --force
php artisan db:seed --force
php artisan storage:link
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Налаштування Nginx
# Див. конфігурацію нижче
```

### Frontend (Next.js)

#### Vercel (Рекомендовано)
```bash
# 1. Підключіть GitHub репозиторій до Vercel
# 2. Встановіть змінні середовища:
#    NEXT_PUBLIC_API_URL=https://your-api-domain.com/api/v1
#    NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
# 3. Deploy автоматично!
```

#### VPS
```bash
npm run build
npm start
# або використайте PM2
pm2 start npm --name "svoi-frontend" -- start
```

## 🔧 Nginx конфігурація

```nginx
server {
    listen 80;
    server_name api.svoi-ua.pl;
    root /var/www/backend/public;

    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

## 💰 Монетизація

### Freemium модель
- ✅ Безкоштовна реєстрація
- 💎 PRO-статус (підняття в ТОП)
- 🚀 Бустинг анкети

### Ручна оплата (MVP)
На старті - оплата через BLIK/карта з ручним підтвердженням адміном.

## 📧 Підтримка

- Email: info@svoi-ua.pl
- Telegram: @svoidlasvoyih

## 📄 Ліцензія

Proprietary - Всі права захищені © 2024 Свої для Своїх
