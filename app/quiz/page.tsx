"use client";

import { useState } from "react";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import QuizResult from "@/components/quiz/QuizResult";
import {
  quizQuestions,
  getRecommendedService,
  getServiceById,
  type QuizAnswer,
} from "@/lib/quiz-logic";

const initialAnswers: QuizAnswer = {
  productType: "",
  monetizationStage: "",
  urgency: "",
  budget: "",
  teamSize: "",
};

export default function QuizPage() {
  const [answers, setAnswers] = useState<QuizAnswer>(initialAnswers);
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentQuestion = quizQuestions[step];
  const allAnswered = Object.values(answers).every(Boolean);
  const isLastStep = step === quizQuestions.length - 1;

  const handleAnswer = (id: keyof QuizAnswer, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleNext = () => {
    if (isLastStep) {
      setCompleted(true);
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    setStep((s) => Math.max(0, s - 1));
  };

  const handleReset = () => {
    setAnswers(initialAnswers);
    setStep(0);
    setCompleted(false);
  };

  if (completed) {
    const serviceId = getRecommendedService(answers);
    const service = getServiceById(serviceId);
    return (
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold text-slate-900">
            Результат квиза
          </h1>
          <p className="mt-2 text-slate-600">
            По вашим ответам мы подобрали наиболее подходящую услугу
          </p>
          <div className="mt-8">
            <QuizResult service={service} />
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="mt-8 text-sm text-slate-500 hover:text-primary-600"
          >
            Пройти квиз заново
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-slate-900">
          Подбор услуги
        </h1>
        <p className="mt-2 text-slate-600">
          Ответьте на несколько вопросов — подберём подходящий формат работы
        </p>
        <div className="mt-2 flex gap-1">
          {quizQuestions.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full ${
                i <= step ? "bg-primary-600" : "bg-slate-200"
              }`}
            />
          ))}
        </div>
        <div className="mt-12">
          {currentQuestion && (
            <QuizQuestion
              question={currentQuestion.question}
              options={currentQuestion.options}
              value={(answers as Record<string, string>)[currentQuestion.id] ?? ""}
              onChange={(v) =>
                handleAnswer(currentQuestion.id as keyof QuizAnswer, v)
              }
            />
          )}
        </div>
        <div className="mt-12 flex justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 0}
            className="rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:hover:bg-transparent"
          >
            Назад
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={
              !(answers as Record<string, string>)[currentQuestion?.id ?? ""]
            }
            className="rounded-lg bg-primary-600 px-6 py-2 font-medium text-white hover:bg-primary-700 disabled:opacity-50 disabled:hover:bg-primary-600"
          >
            {isLastStep ? "Узнать результат" : "Далее"}
          </button>
        </div>
      </div>
    </div>
  );
}
