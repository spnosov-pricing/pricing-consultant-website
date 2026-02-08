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
  const [popupEmail, setPopupEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Появление поп-апа при попытке уйти с сайта (курсор вверх)
  useEffect(() => {
    const handleMouseOut = (event: MouseEvent) => {
      if (event.clientY <= 0 && !wasShown) {
        setIsPopupOpen(true);
        setWasShown(true);
      }
    };
    document.addEventListener("mouseleave", handleMouseOut);
    return () => document.removeEventListener("mouseleave", handleMouseOut);
  }, [wasShown]);

  // Функция отправки email из поп-апа в Telegram/Formspree
  const handlePopupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!popupEmail) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("email", popupEmail);
      formData.append("name", "Подписчик из поп-апа");
      formData.append("service", "Запрос чек-листа (Exit Intent)");

      const res = await fetch("/api/consultation", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setIsSubmitted(true);
        setTimeout(() => setIsPopupOpen(false), 3000);
      }
    } catch (err) {
      console.error("Ошибка отправки:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {/* 1. ГЛАВНЫЙ ЭКРАН С ВАШИМ ФОТО */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Помогаю IT-командам
              <span className="block text-blue-600">зарабатывать больше</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-2xl">
              Консультирую по прайсингу и монетизации. Выстраиваю стратегию,
              анализирую модель, внедряю изменения — чтобы вы получали больше
              выручки без потери клиентов.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link href="/quiz" className="rounded-lg bg-blue-600 px-8 py-4 text-base font-medium text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                Пройти квиз
              </Link>
              <Link href="/consultation" className="rounded-lg border-2 border-blue-600 px-8 py-4 text-base font-medium text-blue-600 hover:bg-blue-50 transition-all">
                Записаться на консультацию
              </Link>
            </div>
          </div>

          <div className="flex-1 relative w-full max-w-[400px]">
            <div className="aspect-[4/5] overflow-hidden rounded-3xl border-[10px] border-white shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500">
              <Image
                src="/my-photo.jpg" 
                alt="Консультант по прайсингу"
                width={500}
                height={625}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. УСЛУГИ */}
      <section className="px-4 py-24 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold text-slate-900">Услуги</h2>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link key={service.id} href={service.href} className="group rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600">{service.title}</h3>
                <p className="mt-4 text-slate-600">{service.description}</p>
                <div className="mt-6 flex items-center text-sm font-bold text-blue-600">Подробнее →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ЭФФЕКТЫ */}
      <section className="bg-slate-900 px-4 py-24 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-7xl grid gap-12 sm:grid-cols-3">
          {clientEffects.map((effect) => (
            <div key={effect.label}>
              <div className="text-5xl font-extrabold text-blue-400">{effect.value}</div>
              <div className="mt-4 text-lg text-slate-400">{effect.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. ВСПЛЫВАЮЩИЙ ПОП-АП (ПОЯВЛЯЕТСЯ ПРИ УХОДЕ) */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-10 shadow-2xl animate-in fade-in zoom-in duration-300">
            <button onClick={() => setIsPopupOpen(false)} className="absolute right-6 top-6 text-slate-400 hover:text-slate-600">
              ✕
            </button>
            
            <div className="text-center">
              {!isSubmitted ? (
                <>
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl">👋</div>
                  <h2 className="text-3xl font-bold text-slate-900">Подождите!</h2>
                  <p className="mt-4 text-lg text-slate-600">
                    Заберите <span className="font-bold text-blue-600">«Чек-лист идеального прайсинга»</span> бесплатно перед уходом.
                  </p>
                  <form onSubmit={handlePopupSubmit} className="mt-8 flex flex-col gap-4">
                    <input
                      required
                      type="email"
                      value={popupEmail}
                      onChange={(e) => setPopupEmail(e.target.value)}
                      placeholder="Ваш рабочий Email"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all"
                    />
                    <button 
                      disabled={isSubmitting}
                      className="w-full rounded-xl bg-blue-600 py-4 font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? "Отправка..." : "Получить чек-лист"}
                    </button>
                  </form>
                </>
              ) : (
                <div className="py-10">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-3xl">✅</div>
                  <h2 className="text-2xl font-bold text-slate-900">Готово!</h2>
                  <p className="mt-4 text-slate-600">Чек-лист уже летит к вам на почту.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

