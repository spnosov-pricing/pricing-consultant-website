"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/services", label: "Услуги" },
  { href: "/quiz", label: "Квиз" },
  { href: "/blog", label: "Блог" },
  { href: "/consultation", label: "Консультация" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold text-primary-700">
            Прайсинг & Монетизация
          </Link>

          <div className="hidden md:flex md:items-center md:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-600 hover:text-primary-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/consultation"
              className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
            >
              Записаться
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Меню"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-slate-200">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/consultation"
              className="block mx-4 mt-2 rounded-lg bg-primary-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-primary-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Записаться
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
