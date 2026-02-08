"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const services = [
  {
    id: "audit",
    title: "Аудит монетизации",
    description: "Анализ текущей модели ценообразования и выявление точек роста",
    href: "/services#audit",
  },
  {
    id: "strategy",
    title: "Стратегия прайсинга",
    description: "Разработка оптимальной стратегии для вашего продукта",
    href: "/services#strategy",
  },
  {
    id: "implementation",
    title: "Внедрение",
    description: "Пошаговое внедрение новой модели с поддержкой команды",
    href: "/services#implementation",
  },
];

const clientEffects = [
  { value: "+35%", label: "Рост выручки в среднем" },
  { value: "-20%", label: "Сокращение оттока клиентов" },
  { value: "50+", label: "IT-команд проконсультировано" },
];

export default function HomePage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [wasShown, setWasShown] = useState(false);

  // Логика появления поп-апа при попытке уйти с сайта
  useEffect(() => {
    const handleMouseOut = (event: MouseEvent) => {
      // clientY <= 0 означает, что курсор ушел вверх к вкладкам или крестику
      if (event.clientY <= 0 && !wasShown) {
        setIsPopupOpen(true);
        setWasShown(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseOut);
    return () => document.removeEventListener("mouseleave", handleMouseOut);
  }, [wasShown]);

  return (
    <div className="relative">
      {/* ГЛАВНЫЙ ЭКРАН С ФОТО */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Помогаю IT-командам
              <span className="block text-blue-600">
                зарабатывать больше
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-2xl">
              Консультирую по прайсингу и монетизации. Выстраиваю стратегию,
              анализирую модель, внедряю изменения — чтобы вы получали больше
              выручки без потери клиентов.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="/quiz"
                className="rounded-lg bg-blue-600 px-8 py-4 text-base font-medium text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
              >
                Пройти квиз
              </Link>
              <Link
                href="/consultation"
                className="rounded-lg border-2 border-blue-600 px-8 py-4 text-base font-medium text-blue-600 hover:bg-blue-50 transition-all"
              >
                Записаться на консультацию
              </Link>
            </div>
          </div>

          {/* БЛОК С ФОТО */}
          <div className="flex-1 relative w-full max-w-[450px]">
            <div className="aspect-[4/5] overflow-hidden rounded-3xl border-[12px] border-white shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <Image
                src="/my-photo.jpg" 
                alt="Консультант по прайсингу"
                width={600}
                height={750}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            {/* Декоративный элемент за фото */}
            <div className="absolute -bottom-6 -left-6 -z-10 h-32 w-32 rounded-full bg-blue-100 blur-2xl"></div>
          </div>
        </div>
      </section>

      {/* УСЛУГИ */}
      <section className="px-4 py-24 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold text-slate-900">Услуги</h2>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.id}
                href={service.href}
                className="group relative rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
              >
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="mt-4 text-slate-600 leading-relaxed">{service.description}</p>
                <div className="mt-6 flex items-center text-sm font-bold text-blue-600">
                  Подробнее
                  <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ЭФФЕКТЫ */}
      <section className="bg-slate-900 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 sm:grid-cols-3">
            {clientEffects.map((effect) => (
              <div key={effect.label} className="text-center">
                <div className="text-5xl font-extrabold text-blue-400">
                  {effect.value}
                </div>
                <div className="mt-4 text-lg text-slate-400">{effect.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ВСПЛЫВАЮЩИЙ ПОП-АП (EXIT INTENT) */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-10 shadow-2xl animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute right-6 top-6 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl">
                👋
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Подождите!</h2>
              <p className="mt-4 text-lg text-slate-600">
                Не уходите с пустыми руками. Заберите 
                <span className="font-bold text-blue-600"> «Чек-лист идеального прайсинга» </span> 
                бесплатно.
              </p>
              
              <div className="mt-8 flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Ваш рабочий Email"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all"
                />
                <button className="w-full rounded-xl bg-blue-600 py-4 font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
                  Получить чек-лист
                </button>
                <p className="text-xs text-slate-400">
                  Никакого спама. Только полезные материалы по монетизации.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

