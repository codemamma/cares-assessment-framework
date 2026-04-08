import { AssessmentCategory } from "@/types/assessment";
import { AssessmentResponses } from "@/types/assessment";
import { QuestionRatingRow } from "./QuestionRatingRow";

interface CategorySectionProps {
  category: AssessmentCategory;
  responses: AssessmentResponses;
  onAnswer: (questionId: string, value: number) => void;
}

export function CategorySection({
  category,
  responses,
  onAnswer,
}: CategorySectionProps) {
  return (
    <div>
      <div className="mb-6">
        <p className="text-sm font-semibold text-purple-600 uppercase tracking-wider mb-1">
          {category.shortLabel}
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {category.label}
        </h1>
        <p className="text-gray-600 leading-relaxed">{category.description}</p>
      </div>

      <div className="space-y-4">
        {category.questions.map((question, index) => (
          <QuestionRatingRow
            key={question.id}
            question={question}
            value={responses[question.id]}
            onChange={(value) => onAnswer(question.id, value)}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
