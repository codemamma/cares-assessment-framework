"use client";

import { cn } from "@/lib/utils";

const RATING_LABELS: Record<number, string> = {
  1: "Rarely",
  2: "Occasionally",
  3: "Sometimes",
  4: "Often",
  5: "Consistently",
};

interface RatingScaleProps {
  value: number | undefined;
  onChange: (value: number) => void;
  questionId: string;
}

export function RatingScale({ value, onChange, questionId }: RatingScaleProps) {
  return (
    <div className="flex gap-2 flex-wrap sm:flex-nowrap" role="group" aria-label="Rating scale">
      {[1, 2, 3, 4, 5].map((rating) => {
        const isSelected = value === rating;
        return (
          <button
            key={rating}
            type="button"
            aria-label={`${rating} - ${RATING_LABELS[rating]}`}
            aria-pressed={isSelected}
            onClick={() => onChange(rating)}
            className={cn(
              "flex-1 min-w-[56px] flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl border-2 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1",
              isSelected
                ? "border-purple-500 bg-purple-500/10 text-purple-300"
                : "border-gray-200 bg-white text-gray-500 hover:border-purple-300 hover:bg-purple-50"
            )}
          >
            <span
              className={cn(
                "text-lg font-bold leading-none",
                isSelected ? "text-purple-500" : "text-gray-700"
              )}
            >
              {rating}
            </span>
            <span className="text-[10px] font-medium leading-tight text-center whitespace-nowrap">
              {RATING_LABELS[rating]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
