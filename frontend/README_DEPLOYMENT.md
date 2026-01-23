# 🚀 Деплой на сервер

## 1. Налаштування .env файлу на сервері

Створіть файл `.env.local` на сервері:

```bash
cd /var/www/svoi/frontend
nano .env.local
```

Додайте:
```bash
# Backend API
NEXT_PUBLIC_API_URL=https://api.svoi24.pl/api/v1
NEXT_PUBLIC_WS_URL=wss://api.svoi24.pl/ws

# Google Analytics
NEXT_PUBLIC_GA_ID=G-F9FMC86X6L
```

## 2. Деплой останніх змін

```bash
cd /var/www/svoi/frontend
git pull origin main
npm install
npm run build
pm2 restart 0
```

## 3. Перевірка

Відкрийте https://svoi24.pl та перевірте:
- ✅ Google Analytics працює (відкрийте Network → gtag/js)
- ✅ PWA manifest доступний (/manifest.json)
- ✅ Service Worker реєструється (/sw.js)
- ✅ Сторінки відкриваються без помилок

## 4. Моніторинг

```bash
# Логи PM2
pm2 logs 0

# Статус
pm2 status
```

## 5. Додаткові налаштування

### Іконки PWA
Створіть:
- `/public/icon-192.png` (192x192px)
- `/public/icon-512.png` (512x512px)
- `/public/og-image.jpg` (1200x630px для Open Graph)

### Firebase Push Notifications (опціонально)
Додайте в `.env.local`:
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```
