"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { services } from "@/lib/services-data";

const schema = z.object({
  name: z.string().min(2, "Введите имя"),
  email: z.string().email("Введите корректный email"),
  phone: z.string().min(10, "Введите телефон"),
  service: z.string(),
  comment: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface ConsultationFormProps {
  defaultService?: string;
}

export default function ConsultationForm({
  defaultService,
}: ConsultationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      service: defaultService ?? "",
    },
  });

  useEffect(() => {
    if (defaultService) setValue("service", defaultService);
  }, [defaultService, setValue]);

  const onSubmit = async (data: FormData) => {
    setError(null);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("service", data.service);
      if (data.comment) formData.append("comment", data.comment);

      const res = await fetch("/api/consultation", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Ошибка отправки");
      setSubmitted(true);
    } catch {
      setError(
        "Не удалось отправить заявку. Проверьте подключение или попробуйте позже."
      );
    }
  };

  if (submitted) {
    return (
      <div className="mt-12 rounded-2xl bg-primary-50 p-8 text-center">
        <h2 className="text-xl font-bold text-slate-900">Спасибо!</h2>
        <p className="mt-2 text-slate-600">
          Заявка получена. Свяжусь с вами в течение 24 часов.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-12 space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700">
          Имя *
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          placeholder="Иван Иванов"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-slate-700"
        >
          Email *
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          placeholder="ivan@company.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
          Телефон *
        </label>
        <input
          id="phone"
          type="tel"
          {...register("phone")}
          className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          placeholder="+7 (999) 123-45-67"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="service"
          className="block text-sm font-medium text-slate-700"
        >
          Услуга
        </label>
        <select
          id="service"
          {...register("service")}
          className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
        >
          <option value="">Выберите услугу</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-slate-700"
        >
          Комментарий
        </label>
        <textarea
          id="comment"
          rows={4}
          {...register("comment")}
          className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          placeholder="Кратко опишите вашу задачу..."
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-primary-600 px-6 py-3 font-medium text-white hover:bg-primary-700 disabled:opacity-50"
      >
        {isSubmitting ? "Отправка..." : "Отправить заявку"}
      </button>
    </form>
  );
}
