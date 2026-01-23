# 📋 Інструкції для деплою

## ⚠️ Важливо! Backend ще не готовий

Зараз фронтенд використовує **fallback на тестові дані**, коли backend API недоступний.

## 🚀 Деплой на сервер

### 1. Створіть `.env.local` на сервері:

```bash
cd /var/www/svoi/frontend
nano .env.local
```

**Додайте (ВАЖЛИВО - backend ще не працює):**
```bash
# Google Analytics
NEXT_PUBLIC_GA_ID=G-F9FMC86X6L

# Тимчасово використовуємо mock дані
NEXT_PUBLIC_USE_MOCK=true

# Коли backend буде готовий - розкоментуйте:
# NEXT_PUBLIC_API_URL=https://api.svoi24.pl/api/v1
# NEXT_PUBLIC_WS_URL=wss://api.svoi24.pl/ws
```

### 2. Деплой:

```bash
git pull origin main
npm install
npm run build
pm2 restart 0
```

### 3. Перевірка:

```bash
pm2 logs 0
```

Не повинно бути помилок про:
- ✅ `images.domains` deprecated
- ✅ `icon-192.png` 404
- ✅ `viewport` warning

---

## 📊 Google Analytics

GA вже підключений з ID: `G-F9FMC86X6L`

Перевірте в браузері:
1. Відкрийте https://svoi24.pl
2. DevTools → Network → фільтр "gtag"
3. Повинен бути запит до `googletagmanager.com`

---

## 🎨 Іконки PWA (TODO)

Створіть іконки:
- `/public/icon-192.png` (192x192px)
- `/public/icon-512.png` (512x512px)

Потім додайте в `manifest.json`:
```json
"icons": [
  {
    "src": "/icon-192.png",
    "sizes": "192x192",
    "type": "image/png"
  },
  {
    "src": "/icon-512.png",
    "sizes": "512x512",
    "type": "image/png"
  }
]
```

---

## 🔌 Підключення Backend API

Коли backend буде готовий:

1. **Видаліть** `NEXT_PUBLIC_USE_MOCK=true` з `.env.local`
2. **Додайте**:
```bash
NEXT_PUBLIC_API_URL=https://api.svoi24.pl/api/v1
NEXT_PUBLIC_WS_URL=wss://api.svoi24.pl/ws
```
3. Перебілдіть:
```bash
npm run build
pm2 restart 0
```

---

## 🐛 Відладка

### Якщо категорії не відображаються:
- Перевірте консоль браузера
- Якщо `USE_MOCK=true` - показуються тестові дані
- Якщо backend доступний - показуються реальні

### Якщо Google Analytics не працює:
```bash
# Перевірте .env.local
cat .env.local | grep GA_ID
```

### Якщо помилки білду:
```bash
# Очистіть кеш
rm -rf .next
npm run build
```
