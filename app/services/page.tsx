import Link from "next/link";
import { services, clientTestimonials } from "@/lib/services-data";

export default function ServicesPage() {
  return (
    <div>
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
            Услуги
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Подбираю формат работы под ваши задачи и этап развития продукта
          </p>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-16">
          {services.map((service) => (
            <article
              key={service.id}
              id={service.id}
              className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-slate-900">
                {service.title}
              </h2>
              <p className="mt-4 text-slate-600">{service.description}</p>
              <div className="mt-6">
                <h3 className="font-semibold text-slate-900">Что входит:</h3>
                <ul className="mt-2 list-inside list-disc space-y-1 text-slate-600">
                  {service.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 flex flex-wrap gap-6">
                <div>
                  <span className="text-sm text-slate-500">Результат:</span>
                  <p className="font-medium text-slate-900">{service.result}</p>
                </div>
                <div>
                  <span className="text-sm text-slate-500">Срок:</span>
                  <p className="font-medium text-slate-900">{service.duration}</p>
                </div>
                {service.priceRange && (
                  <div>
                    <span className="text-sm text-slate-500">Стоимость:</span>
                    <p className="font-medium text-slate-900">
                      {service.priceRange}
                    </p>
                  </div>
                )}
              </div>
              <Link
                href={`/consultation?service=${service.id}`}
                className="mt-6 inline-flex rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
              >
                Оставить заявку
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold text-slate-900">
            Отзывы клиентов
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {clientTestimonials.map((testimonial, idx) => (
              <blockquote
                key={idx}
                className="rounded-xl bg-white p-6 shadow-sm"
              >
                <p className="text-slate-700">&ldquo;{testimonial.quote}&rdquo;</p>
                <cite className="mt-4 block text-sm text-slate-500 not-italic">
                  — {testimonial.author}
                </cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-2xl bg-primary-600 p-12 text-center text-white">
          <h2 className="text-2xl font-bold">Готовы обсудить вашу задачу?</h2>
          <p className="mt-4 text-primary-100">
            Пройдите квиз или оставьте заявку — свяжусь в течение 24 часов
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/quiz"
              className="rounded-lg bg-white px-6 py-3 font-medium text-primary-600 hover:bg-primary-50 transition-colors"
            >
              Пройти квиз
            </Link>
            <Link
              href="/consultation"
              className="rounded-lg border-2 border-white px-6 py-3 font-medium text-white hover:bg-white/10 transition-colors"
            >
              Оставить заявку
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
