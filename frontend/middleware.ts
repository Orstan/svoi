import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Захищені роути які потребують авторизації
const protectedRoutes = ['/profile', '/messages', '/dashboard'];

// Роути тільки для гостей (не авторизовані)
const authRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  // Перевірка захищених роутів
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  // Якщо захищений роут і немає токена - редірект на login
  if (isProtectedRoute && !token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // Якщо авторизований і намагається зайти на login/register - редірект на профіль
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/messages/:path*', '/dashboard/:path*', '/login', '/register'],
};
