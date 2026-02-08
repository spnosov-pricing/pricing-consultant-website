import Link from "next/link";
import type { Service } from "@/lib/services-data";

interface QuizResultProps {
  service: Service;
}

export default function QuizResult({ service }: QuizResultProps) {
  return (
    <div className="rounded-2xl border-2 border-primary-200 bg-primary-50/50 p-8">
      <p className="text-sm font-medium text-primary-600">
        Рекомендуемая услуга
      </p>
      <h2 className="mt-2 text-2xl font-bold text-slate-900">
        {service.title}
      </h2>
      <p className="mt-4 text-slate-600">{service.description}</p>
      <ul className="mt-4 list-inside list-disc space-y-1 text-slate-600">
        {service.features.slice(0, 3).map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap gap-4">
        <span className="rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700">
          {service.duration}
        </span>
        {service.priceRange && (
          <span className="rounded-full bg-slate-200 px-3 py-1 text-sm font-medium text-slate-700">
            {service.priceRange}
          </span>
        )}
      </div>
      <Link
        href={`/consultation?service=${service.id}`}
        className="mt-6 inline-flex rounded-lg bg-primary-600 px-6 py-3 font-medium text-white hover:bg-primary-700 transition-colors"
      >
        Оставить заявку
      </Link>
    </div>
  );
}
