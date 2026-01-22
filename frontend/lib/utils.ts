import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(min?: number, max?: number, currency: string = 'PLN'): string {
  if (min && max) {
    return `${min} - ${max} ${currency}`;
  } else if (min) {
    return `від ${min} ${currency}`;
  }
  return 'Договірна';
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}
