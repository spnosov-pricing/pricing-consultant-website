import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"
  ),
  title: {
    default: "Консультант по прайсингу и монетизации | IT-команды",
    template: "%s | Прайсинг и Монетизация",
  },
  description:
    "Помогаю IT-командам выстроить эффективную стратегию прайсинга и монетизации. Аудит, стратегия, внедрение.",
  openGraph: {
    title: "Консультант по прайсингу и монетизации",
    description:
      "Помогаю IT-командам выстроить эффективную стратегию прайсинга и монетизации.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
