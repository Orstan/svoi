# 🔧 Налаштування Backend на сервері

## 1️⃣ Підключитися до сервера
```bash
ssh root@185.170.196.74
cd /var/www/svoi/backend
```

## 2️⃣ Налаштувати .env файл

```bash
# Створити .env з прикладу
cp .env.example .env

# Відредагувати .env
nano .env
```

### Основні налаштування:

```env
APP_NAME="Свої для Своїх"
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=https://api.svoi24.pl

# База даних
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=svoi24_db
DB_USERNAME=svoi24_user
DB_PASSWORD=ваш_сильний_пароль

# Frontend URL для CORS
FRONTEND_URL=https://svoi24.pl
SANCTUM_STATEFUL_DOMAINS=svoi24.pl

# Email (налаштуйте пізніше)
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@svoi24.pl
MAIL_FROM_NAME="${APP_NAME}"

# Google OAuth (налаштуйте пізніше)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=https://api.svoi24.pl/auth/google/callback

# AWS S3 (для зберігання фото, налаштуйте пізніше)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=eu-central-1
AWS_BUCKET=svoi24-uploads
```

## 3️⃣ Створити базу даних

```bash
# Увійти в MySQL
mysql -u root -p

# Створити базу даних
CREATE DATABASE svoi24_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Створити користувача
CREATE USER 'svoi24_user'@'localhost' IDENTIFIED BY 'ваш_сильний_пароль';

# Надати права
GRANT ALL PRIVILEGES ON svoi24_db.* TO 'svoi24_user'@'localhost';
FLUSH PRIVILEGES;

# Вийти
EXIT;
```

## 4️⃣ Згенерувати APP_KEY

```bash
php artisan key:generate
```

## 5️⃣ Запустити міграції

```bash
# Запустити міграції
php artisan migrate --force

# Запустити seeders (тестові дані)
php artisan db:seed --force
```

## 6️⃣ Налаштувати права доступу

```bash
# Надати права на папки storage та cache
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

# Створити symbolic link для storage
php artisan storage:link
```

## 7️⃣ Оптимізувати для production

```bash
# Очистити старий кеш
php artisan optimize:clear

# Створити новий кеш
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## 8️⃣ Налаштувати PHP-FPM та Nginx

### Nginx конфігурація для API
Створити `/etc/nginx/sites-available/api.svoi24`:

```nginx
server {
    listen 80;
    server_name api.svoi24.pl;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.svoi24.pl;
    
    # SSL certificates (будуть створені пізніше)
    ssl_certificate /etc/letsencrypt/live/api.svoi24.pl/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.svoi24.pl/privkey.pem;
    
    root /var/www/svoi/backend/public;
    index index.php;
    
    # Максимальний розмір завантажуваних файлів
    client_max_body_size 20M;
    
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
    
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
    
    location ~ /\.(?!well-known).* {
        deny all;
    }
    
    # CORS headers
    add_header 'Access-Control-Allow-Origin' 'https://svoi24.pl' always;
    add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
    add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type, X-Requested-With' always;
    add_header 'Access-Control-Allow-Credentials' 'true' always;
}
```

### Активувати конфігурацію:

```bash
# Створити symbolic link
ln -s /etc/nginx/sites-available/api.svoi24 /etc/nginx/sites-enabled/

# Перевірити конфігурацію
nginx -t

# Перезавантажити Nginx
systemctl reload nginx
```

## 9️⃣ Налаштувати SSL для API

```bash
# Встановити Certbot (якщо ще не встановлено)
apt install certbot python3-certbot-nginx

# Отримати SSL сертифікат
certbot --nginx -d api.svoi24.pl

# Автоматичне оновлення (перевірити)
certbot renew --dry-run
```

## 🔟 Перевірити роботу API

```bash
# Перевірити доступність
curl https://api.svoi24.pl

# Перевірити API endpoint
curl https://api.svoi24.pl/api/v1/categories

# Переглянути логи якщо є помилки
tail -f storage/logs/laravel.log
```

## ✅ Готово!

Тепер backend API доступний на https://api.svoi24.pl

### Наступні кроки:
1. Налаштувати frontend `.env.local` з `NEXT_PUBLIC_API_URL=https://api.svoi24.pl/api/v1`
2. Перезібрати та перезапустити frontend
3. Протестувати роботу всіх сторінок
