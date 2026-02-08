import Link from "next/link";

const footerLinks = [
  { href: "/services", label: "Услуги" },
  { href: "/quiz", label: "Квиз" },
  { href: "/blog", label: "Блог" },
  { href: "/consultation", label: "Консультация" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <Link
              href="/"
              className="text-lg font-bold text-primary-700"
            >
              Прайсинг & Монетизация
            </Link>
            <p className="mt-2 text-sm text-slate-600">
              Консультирую IT-команды по прайсингу и монетизации
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate-600 hover:text-primary-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Прайсинг & Монетизация. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
