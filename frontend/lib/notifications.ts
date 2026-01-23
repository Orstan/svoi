// Push нотифікації через Firebase Cloud Messaging (FCM)

export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    console.log('Browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
}

export async function subscribeToNotifications(): Promise<string | null> {
  try {
    const permission = await requestNotificationPermission();
    if (!permission) {
      return null;
    }

    // Отримати Service Worker registration
    const registration = await navigator.serviceWorker.ready;

    // Отримати токен FCM (потрібно буде налаштувати Firebase)
    // const token = await getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY' });
    
    // Тимчасово повертаємо null, поки не налаштований Firebase
    console.log('Notifications enabled');
    return null;
  } catch (error) {
    console.error('Failed to subscribe to notifications:', error);
    return null;
  }
}

export async function unsubscribeFromNotifications(): Promise<void> {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    
    if (subscription) {
      await subscription.unsubscribe();
      console.log('Unsubscribed from notifications');
    }
  } catch (error) {
    console.error('Failed to unsubscribe from notifications:', error);
  }
}

// Показати локальну нотифікацію
export function showLocalNotification(title: string, options?: NotificationOptions) {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      ...options,
    });
  }
}

// Відправити токен на сервер
export async function sendTokenToServer(token: string): Promise<void> {
  try {
    const authToken = localStorage.getItem('auth_token');
    
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({ fcm_token: token }),
    });
  } catch (error) {
    console.error('Failed to send token to server:', error);
  }
}

// Ініціалізація нотифікацій при завантаженні додатку
export async function initializeNotifications(): Promise<void> {
  if (typeof window === 'undefined') return;

  try {
    // Реєструємо Service Worker
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', registration);
    }

    // Запитуємо дозвіл на нотифікації
    const permission = await requestNotificationPermission();
    
    if (permission) {
      const token = await subscribeToNotifications();
      if (token) {
        await sendTokenToServer(token);
      }
    }
  } catch (error) {
    console.error('Failed to initialize notifications:', error);
  }
}
