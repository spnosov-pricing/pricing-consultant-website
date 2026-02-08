"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ConsultationForm from "@/components/consultation/ConsultationForm";
import { services } from "@/lib/services-data";

function ConsultationContent() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("service");
  const service = serviceId
    ? services.find((s) => s.id === serviceId)
    : undefined;

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl">
        <h1 className="text-3xl font-bold text-slate-900">
          Заявка на консультацию
        </h1>
        <p className="mt-2 text-slate-600">
          Оставьте контакты — свяжусь в течение 24 часов
        </p>
        {service && (
          <p className="mt-4 rounded-lg bg-primary-50 p-4 text-sm text-primary-800">
            Выбрана услуга: <strong>{service.title}</strong>
          </p>
        )}
        <ConsultationForm defaultService={service?.id} />
      </div>
    </div>
  );
}

export default function ConsultationPage() {
  return (
    <Suspense fallback={<div className="px-4 py-16 text-center">Загрузка...</div>}>
      <ConsultationContent />
    </Suspense>
  );
}
