# Інструкція з деплою "Свої для Своїх"

## Варіанти деплою

### Варіант 1: Vercel (Frontend) + VPS (Backend) - РЕКОМЕНДОВАНО

Це найпростіший і найшвидший варіант для старту.

#### Backend на VPS

**Вимоги:**
- VPS з Ubuntu 20.04+ (від $5/міс: DigitalOcean, Hetzner, OVH)
- Доменне ім'я (svoi24.pl)

**Кроки:**

1. **Підключення до VPS**
```bash
ssh root@your-server-ip
```

2. **Встановлення необхідного ПЗ**
```bash
# Оновлення системи
apt update && apt upgrade -y

# PHP 8.1
apt install -y php8.1 php8.1-fpm php8.1-mysql php8.1-mbstring php8.1-xml php8.1-curl php8.1-zip php8.1-gd

# Composer
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer

# MySQL
apt install -y mysql-server
mysql_secure_installation

# Nginx
apt install -y nginx

# Git
apt install -y git
```

3. **Налаштування MySQL**
```bash
mysql -u root -p

CREATE DATABASE svoi_marketplace CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'svoi_user'@'localhost' IDENTIFIED BY 'strong_password_here';
GRANT ALL PRIVILEGES ON svoi_marketplace.* TO 'svoi_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

4. **Клонування та налаштування Laravel**
```bash
cd /var/www
git clone YOUR_REPO_URL backend
cd backend

# Встановлення залежностей
composer install --optimize-autoloader --no-dev

# Копіювання та налаштування .env
cp .env.example .env
nano .env
```

Редагуйте `.env`:
```env
APP_NAME="Свої для Своїх"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.svoi24.pl

DB_DATABASE=svoi_marketplace
DB_USERNAME=svoi_user
DB_PASSWORD=strong_password_here

FRONTEND_URL=https://svoi-ua.pl
```

```bash
# Генерація ключа та міграції
php artisan key:generate
php artisan migrate --force
php artisan db:seed --force
php artisan storage:link

# Оптимізація
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Права доступу
chown -R www-data:www-data /var/www/backend
chmod -R 755 /var/www/backend
chmod -R 775 /var/www/backend/storage
chmod -R 775 /var/www/backend/bootstrap/cache
```

5. **Nginx конфігурація для Backend API**

```bash
nano /etc/nginx/sites-available/svoi-api
```

Вміст:
```nginx
server {
    listen 80;
    server_name api.svoi-ua.pl;
    root /var/www/backend/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

```bash
# Активація конфігурації
ln -s /etc/nginx/sites-available/svoi-api /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

6. **SSL сертифікат (Let's Encrypt)**
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d api.svoi-ua.pl
```

#### Frontend на Vercel

1. **Завантажте код на GitHub**
```bash
cd frontend
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO
git push -u origin main
```

2. **Створіть проект на Vercel**
   - Зайдіть на https://vercel.com
   - Підключіть GitHub репозиторій
   - Оберіть папку `frontend`
   - Framework Preset: Next.js

3. **Налаштуйте змінні середовища в Vercel:**
```
NEXT_PUBLIC_API_URL=https://api.svoi-ua.pl/api/v1
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-oauth-client-id
```

4. **Deploy!** - Vercel автоматично збудує та задеплоїть

5. **Підключіть свій домен:**
   - Settings → Domains → Add Domain
   - Додайте `svoi-ua.pl` та `www.svoi-ua.pl`
   - Налаштуйте DNS записи згідно інструкцій Vercel

---

### Варіант 2: Повний деплой на VPS

Якщо хочете все на одному сервері.

#### Frontend на VPS

```bash
# Встановлення Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# PM2 для управління процесом
npm install -g pm2

# Клонування frontend
cd /var/www
git clone YOUR_REPO_URL frontend
cd frontend

# Встановлення та білд
npm install
npm run build

# Запуск через PM2
pm2 start npm --name "svoi-frontend" -- start
pm2 save
pm2 startup
```

#### Nginx для Frontend

```bash
nano /etc/nginx/sites-available/svoi-frontend
```

```nginx
server {
    listen 80;
    server_name svoi-ua.pl www.svoi-ua.pl;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
ln -s /etc/nginx/sites-available/svoi-frontend /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
certbot --nginx -d svoi-ua.pl -d www.svoi-ua.pl
```

---

## 🔧 Після деплою

### 1. Створення адмін користувача

```bash
php artisan tinker

$user = new \App\Models\User();
$user->name = 'Admin';
$user->email = 'admin@svoi-ua.pl';
$user->password = bcrypt('your-secure-password');
$user->role = 'admin';
$user->save();
```

### 2. Налаштування Google OAuth

1. Google Cloud Console: https://console.cloud.google.com
2. Create Project → "Svoi dla Svoih"
3. APIs & Services → Credentials → Create OAuth 2.0 Client ID
4. Authorized redirect URIs:
   - `https://api.svoi-ua.pl/auth/google/callback`
   - `https://svoi-ua.pl/auth/google/callback`
5. Скопіюйте Client ID та додайте в обидва `.env`

### 3. Налаштування email

В backend `.env`:
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@svoi-ua.pl
MAIL_FROM_NAME="Svoi dla Svoih"
```

### 4. Моніторинг та логи

```bash
# Laravel логи
tail -f /var/www/backend/storage/logs/laravel.log

# Nginx логи
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/access.log

# PM2 (якщо використовуєте)
pm2 logs svoi-frontend
```

---

## 📊 Моніторинг та резервне копіювання

### Автоматичний бекап БД

```bash
nano /root/backup-db.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y-%m-%d_%H-%M-%S)
mysqldump -u svoi_user -p'strong_password_here' svoi_marketplace > /root/backups/db_$DATE.sql
find /root/backups -name "db_*.sql" -mtime +7 -delete
```

```bash
chmod +x /root/backup-db.sh
crontab -e
# Додайте: 0 2 * * * /root/backup-db.sh
```

---

## 🔥 Troubleshooting

### Backend не відповідає
```bash
# Перевірте PHP-FPM
systemctl status php8.1-fpm

# Перезапустіть
systemctl restart php8.1-fpm
systemctl restart nginx

# Перевірте логи
tail -f /var/www/backend/storage/logs/laravel.log
```

### Frontend не завантажується
```bash
# Якщо на VPS з PM2
pm2 restart svoi-frontend
pm2 logs svoi-frontend

# Перебілд
cd /var/www/frontend
git pull
npm install
npm run build
pm2 restart svoi-frontend
```

### CORS помилки
Перевірте `backend/config/cors.php` та `FRONTEND_URL` в `.env`

---

## 📈 Оптимізація продуктивності

### Backend
```bash
# Redis для кешування (опціонально)
apt install -y redis-server
composer require predis/predis

# В .env
CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis
```

### Frontend
- Vercel автоматично оптимізує
- На VPS можна додати Cloudflare для CDN

---

## ✅ Чекліст запуску

- [ ] Backend задеплоєно та працює
- [ ] Frontend задеплоєно та працює
- [ ] БД заповнена seedами (категорії, локації)
- [ ] SSL сертифікати налаштовані
- [ ] Google OAuth працює
- [ ] Створено адмін користувача
- [ ] Email відправка працює
- [ ] Налаштовано бекапи БД
- [ ] Протестовано реєстрацію та створення профілю майстра

Успіхів! 🚀
