import { services } from "./services-data";

export type QuizAnswer = {
  productType: string;
  monetizationStage: string;
  urgency: string;
  budget: string;
  teamSize: string;
};

const serviceScores: Record<
  string,
  { [key: string]: { [option: string]: number } }
> = {
  audit: {
    productType: { saas: 2, marketplace: 1, product: 2, other: 1 },
    monetizationStage: { none: 3, early: 2, stable: 1, scaling: 0 },
    urgency: { low: 2, medium: 1, high: 0 },
    budget: { low: 0, medium: 2, high: 1 },
    teamSize: { small: 1, medium: 2, large: 1 },
  },
  strategy: {
    productType: { saas: 2, marketplace: 2, product: 2, other: 1 },
    monetizationStage: { none: 1, early: 2, stable: 2, scaling: 1 },
    urgency: { low: 2, medium: 2, high: 1 },
    budget: { low: 0, medium: 1, high: 3 },
    teamSize: { small: 1, medium: 2, large: 2 },
  },
  implementation: {
    productType: { saas: 2, marketplace: 1, product: 1, other: 0 },
    monetizationStage: { none: 0, early: 0, stable: 2, scaling: 3 },
    urgency: { low: 1, medium: 2, high: 2 },
    budget: { low: 0, medium: 0, high: 3 },
    teamSize: { small: 0, medium: 2, large: 3 },
  },
  "quick-consult": {
    productType: { saas: 1, marketplace: 1, product: 1, other: 2 },
    monetizationStage: { none: 2, early: 1, stable: 1, scaling: 0 },
    urgency: { low: 1, medium: 1, high: 2 },
    budget: { low: 2, medium: 1, high: 0 },
    teamSize: { small: 2, medium: 1, large: 0 },
  },
};

export function getRecommendedService(answers: QuizAnswer): string {
  const scores: Record<string, number> = {};

  for (const [serviceId, criteria] of Object.entries(serviceScores)) {
    let total = 0;
    for (const [key, options] of Object.entries(criteria)) {
      const answer = (answers as Record<string, string>)[key];
      total += options[answer] ?? 0;
    }
    scores[serviceId] = total;
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return sorted[0]?.[0] ?? "quick-consult";
}

export function getServiceById(id: string) {
  return services.find((s) => s.id === id) ?? services[services.length - 1];
}

export const quizQuestions = [
  {
    id: "productType",
    question: "Какой тип продукта?",
    options: [
      { value: "saas", label: "B2B SaaS" },
      { value: "marketplace", label: "Маркетплейс / платформа" },
      { value: "product", label: "Продукт с подпиской" },
      { value: "other", label: "Другое" },
    ],
  },
  {
    id: "monetizationStage",
    question: "На каком этапе монетизация?",
    options: [
      { value: "none", label: "Ещё не монетизируем" },
      { value: "early", label: "Пилот, первые платящие" },
      { value: "stable", label: "Стабильная выручка" },
      { value: "scaling", label: "Масштабирование" },
    ],
  },
  {
    id: "urgency",
    question: "Насколько срочно нужно решение?",
    options: [
      { value: "low", label: "Хочу разобраться постепенно" },
      { value: "medium", label: "Есть дедлайн в 1–3 месяца" },
      { value: "high", label: "Нужно срочно, за несколько недель" },
    ],
  },
  {
    id: "budget",
    question: "Какой бюджет готовы заложить?",
    options: [
      { value: "low", label: "До 100 000 ₽" },
      { value: "medium", label: "100 000 – 500 000 ₽" },
      { value: "high", label: "Более 500 000 ₽" },
    ],
  },
  {
    id: "teamSize",
    question: "Размер команды, которая будет внедрять изменения?",
    options: [
      { value: "small", label: "1–3 человека" },
      { value: "medium", label: "4–10 человек" },
      { value: "large", label: "Более 10 человек" },
    ],
  },
];
