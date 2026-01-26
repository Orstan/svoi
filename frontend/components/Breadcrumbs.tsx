'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-6 max-w-full overflow-hidden">
      <Link 
        href="/" 
        className="hover:text-primary-600 transition flex items-center"
      >
        <Home size={16} />
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2 min-w-0">
          <ChevronRight size={16} className="text-gray-400" />
          {item.href ? (
            <Link 
              href={item.href}
              className="hover:text-primary-600 transition break-words min-w-0"
            >
              <span className="block truncate max-w-[14rem] sm:max-w-none">{item.label}</span>
            </Link>
          ) : (
            <span className="text-gray-900 font-medium break-words min-w-0">
              <span className="block truncate max-w-[14rem] sm:max-w-none">{item.label}</span>
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
