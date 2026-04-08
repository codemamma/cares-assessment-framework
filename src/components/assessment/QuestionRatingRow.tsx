import { AssessmentQuestion } from "@/types/assessment";
import { RatingScale } from "./RatingScale";

interface QuestionRatingRowProps {
  question: AssessmentQuestion;
  value: number | undefined;
  onChange: (value: number) => void;
  index: number;
}

export function QuestionRatingRow({
  question,
  value,
  onChange,
  index,
}: QuestionRatingRowProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
      <div className="flex gap-3 mb-4">
        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-100 text-purple-600 text-sm font-bold flex items-center justify-center">
          {index + 1}
        </span>
        <p className="text-gray-800 font-medium leading-relaxed pt-0.5">
          {question.prompt}
        </p>
      </div>
      <RatingScale
        value={value}
        onChange={onChange}
        questionId={question.id}
      />
    </div>
  );
}
