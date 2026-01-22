# 🚀 Команди для деплою на сервер

## SSH до сервера
```bash
ssh root@185.170.196.74
```

## 1️⃣ Frontend - оновлення та перезбірка

```bash
cd /var/www/svoi/frontend

# Видалити конфліктуючий файл
rm -f frontend/package-lock.json

# Оновити код
git reset --hard HEAD
git pull origin main

# Встановити залежності
npm install

# Зібрати проект
npm run build

# Перезапустити PM2
pm2 restart frontend
pm2 logs frontend --lines 50
```

## 2️⃣ Backend - оновлення

```bash
cd /var/www/svoi/backend

# Оновити код
git reset --hard HEAD
git pull origin main

# Оновити залежності (якщо потрібно)
composer install --no-dev --optimize-autoloader

# Запустити міграції (якщо є нові)
php artisan migrate --force

# Очистити кеш
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Перезавантажити PHP-FPM (якщо потрібно)
systemctl reload php8.1-fpm
```

## 🔍 Перевірка статусу

```bash
# Статус PM2
pm2 status

# Логи frontend
pm2 logs frontend --lines 100

# Логи Nginx
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/svoi24_error.log
```

## 🛠️ Troubleshooting

### Якщо Next.js не збирається
```bash
cd /var/www/svoi/frontend
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Якщо 404 на всіх сторінках
- Перевірте чи Next.js працює: `pm2 logs frontend`
- Перевірте Nginx конфігурацію: `/etc/nginx/sites-available/svoi24`
- Переконайтеся що proxy_pass вказує на правильний порт

### Якщо Laravel API не працює
```bash
cd /var/www/svoi/backend
php artisan optimize:clear
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache
```

## 📝 Швидке оновлення після git push

```bash
# Виконайте на сервері:
cd /var/www/svoi/frontend && rm -f frontend/package-lock.json && git reset --hard HEAD && git pull origin main && npm install && npm run build && pm2 restart frontend
```

## ✅ Перевірка роботи

Відкрийте в браузері:
- https://svoi24.pl - головна
- https://svoi24.pl/masters - список майстрів
- https://svoi24.pl/categories - категорії
- https://svoi24.pl/login - авторизація
