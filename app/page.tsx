import Link from "next/link";

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
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-slate-50 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Помогаю IT-командам
            <span className="block text-primary-600">
              зарабатывать больше
            </span>
          </h1>
          <p className="mt-6 text-lg text-slate-600">
            Консультирую по прайсингу и монетизации. Выстраиваю стратегию,
            анализирую модель, внедряю изменения — чтобы вы получали больше
            выручки без потери клиентов.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/quiz"
              className="rounded-lg bg-primary-600 px-6 py-3 text-base font-medium text-white hover:bg-primary-700 transition-colors"
            >
              Пройти квиз
            </Link>
            <Link
              href="/consultation"
              className="rounded-lg border-2 border-primary-600 px-6 py-3 text-base font-medium text-primary-600 hover:bg-primary-50 transition-colors"
            >
              Записаться на консультацию
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold text-slate-900">
            Услуги
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
            Подбираю формат работы под ваши задачи и этап развития продукта
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.id}
                href={service.href}
                className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary-200 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-primary-600 transition-colors">
                  {service.title}
                </h3>
                <p className="mt-2 text-slate-600">{service.description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-primary-600">
                  Подробнее
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="text-primary-600 font-medium hover:underline"
            >
              Смотреть все услуги →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold text-white">
            Эффекты клиентов
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-300">
            Результаты после внедрения рекомендаций
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {clientEffects.map((effect) => (
              <div
                key={effect.label}
                className="rounded-xl bg-slate-800/50 p-8 text-center"
              >
                <div className="text-4xl font-bold text-accent">
                  {effect.value}
                </div>
                <div className="mt-2 text-slate-300">{effect.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-2xl bg-primary-50 p-12 text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            Не знаете, с чего начать?
          </h2>
          <p className="mt-4 text-slate-600">
            Пройдите короткий квиз — за 2 минуты подберём подходящую услугу
          </p>
          <Link
            href="/quiz"
            className="mt-6 inline-flex rounded-lg bg-primary-600 px-6 py-3 text-base font-medium text-white hover:bg-primary-700 transition-colors"
          >
            Пройти квиз
          </Link>
        </div>
      </section>
    </div>
  );
}
