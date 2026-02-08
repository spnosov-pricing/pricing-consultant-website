"use client";

type Option = { value: string; label: string };

interface QuizQuestionProps {
  question: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export default function QuizQuestion({
  question,
  options,
  value,
  onChange,
}: QuizQuestionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">{question}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex cursor-pointer items-center rounded-lg border-2 p-4 transition-colors ${
              value === option.value
                ? "border-primary-600 bg-primary-50"
                : "border-slate-200 hover:border-primary-200"
            }`}
          >
            <input
              type="radio"
              name={question}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            <span className="text-slate-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
