# 🚀 Швидкий старт проекту Svoi24.pl

## 📋 Що вже готово

✅ Laravel Backend з API  
✅ Next.js Frontend з усіма сторінками  
✅ Сайт працює на https://svoi24.pl  
✅ GitHub репозиторій налаштовано  

## 🔧 Швидке налаштування на сервері

### 1. Backend API налаштування (5-10 хв)

```bash
ssh root@185.170.196.74
cd /var/www/svoi/backend

# Створити БД
mysql -u root -p
CREATE DATABASE svoi24_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'svoi24_user'@'localhost' IDENTIFIED BY 'сильний_пароль';
GRANT ALL PRIVILEGES ON svoi24_db.* TO 'svoi24_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# Налаштувати .env
cp .env.example .env
nano .env
# Вказати DB_DATABASE, DB_USERNAME, DB_PASSWORD

# Згенерувати ключ
php artisan key:generate

# Запустити міграції та заповнити дані
php artisan migrate --force
php artisan db:seed --force

# Налаштувати права
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache
php artisan storage:link

# Кешувати конфігурацію
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### 2. Frontend налаштування (2 хв)

```bash
cd /var/www/svoi/frontend

# Створити .env.local
nano .env.local
```

Додайте:
```env
NEXT_PUBLIC_API_URL=https://api.svoi24.pl/api/v1
```

```bash
# Пересобрати
npm run build

# Перезапустити
pm2 restart frontend
```

### 3. Налаштувати Nginx для API (опціонально)

Якщо хочете API на окремому субдомені `api.svoi24.pl`:

```bash
# Створити конфігурацію
nano /etc/nginx/sites-available/api.svoi24
```

Вставте конфігурацію з `SETUP_BACKEND_SERVER.md`

```bash
# Активувати
ln -s /etc/nginx/sites-available/api.svoi24 /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx

# SSL
certbot --nginx -d api.svoi24.pl
```

## 🎯 Що працює зараз

### Сторінки Frontend:
- ✅ `/` - Головна
- ✅ `/masters` - Список майстрів (+ фільтри)
- ✅ `/masters/[id]` - Профіль майстра
- ✅ `/categories` - Категорії
- ✅ `/login` - Авторизація
- ✅ `/register` - Реєстрація
- ✅ `/how-it-works` - Як це працює

### API Endpoints:
- `GET /api/v1/categories` - Список категорій
- `GET /api/v1/locations/voivodeships` - Воєводства
- `GET /api/v1/masters` - Список майстрів
- `GET /api/v1/masters/{id}` - Профіль майстра
- `POST /api/v1/register` - Реєстрація
- `POST /api/v1/login` - Вхід
- `POST /api/v1/logout` - Вихід

## 📝 Що потрібно додати

### Пріоритет 1 (основні функції):
1. **Створення профілю майстра** (`/become-master`)
2. **Редагування профілю** (`/profile/edit`)
3. **Завантаження портфоліо** (photo upload)
4. **Система відгуків** (reviews)

### Пріоритет 2 (додаткові функції):
5. Google OAuth авторизація
6. Email верифікація
7. Пошук по категоріях та містах
8. Сторінка "Про нас"
9. FAQ

### Пріоритет 3 (монетизація):
10. PRO статус для майстрів (Stripe)
11. Promоція профілів
12. Аналітика переглядів

## 🧪 Тестування

```bash
# Перевірити API
curl https://api.svoi24.pl/api/v1/categories

# Перевірити frontend
curl https://svoi24.pl

# Логи
pm2 logs frontend
tail -f /var/www/svoi/backend/storage/logs/laravel.log
```

## 🆘 Типові проблеми

**502 Bad Gateway:**
- Перевірте чи запущено PM2: `pm2 status`
- Перевірте логи: `pm2 logs frontend`

**API не працює:**
- Перевірте права: `ls -la storage/`
- Очистіть кеш: `php artisan optimize:clear`
- Перевірте логи: `tail -f storage/logs/laravel.log`

**Сторінки 404:**
- Пересоберіть: `npm run build`
- Перезапустіть: `pm2 restart frontend`

## 📚 Документація

- `README.md` - Загальний опис проекту
- `DEPLOY.md` - Детальна інструкція деплою
- `FEATURES.md` - Список функцій
- `SETUP_BACKEND_SERVER.md` - Backend налаштування
- `SERVER_DEPLOY_COMMANDS.md` - Команди для деплою
- `NEXT_STEPS.md` - Наступні кроки розробки

## 🎉 Готово!

Проект працює на:
- 🌐 Frontend: https://svoi24.pl
- 🔌 API: https://api.svoi24.pl (після налаштування)
- 📊 GitHub: https://github.com/Orstan/svoi
