import { assessmentCategories } from "@/data/caresQuestions";
import {
  AssessmentResponses,
  AssessmentResults,
  CategoryScore,
  CareCategoryKey,
  ScoreBand,
} from "@/types/assessment";

const scoreBands: ScoreBand[] = [
  {
    min: 80,
    max: 100,
    label: "Strong",
    title: "Strong CARES Leadership Foundation",
    summary:
      "You consistently demonstrate CARES leadership behaviors across multiple dimensions.",
    interpretation:
      "You consistently demonstrate CARES leadership behaviors across multiple dimensions. Your leadership likely creates environments of trust, innovation, and engagement. Focus on maintaining these strengths while mentoring others.",
  },
  {
    min: 60,
    max: 79,
    label: "Developing",
    title: "Developing CARES Capabilities",
    summary:
      "You show solid CARES leadership in several areas with opportunities to strengthen others.",
    interpretation:
      "You show solid CARES leadership in several areas with opportunities to strengthen others. Identify your strongest element and leverage it while developing complementary capabilities.",
  },
  {
    min: 40,
    max: 59,
    label: "Transition",
    title: "Transition Zone",
    summary:
      "You demonstrate a mix of SCARE and CARES tendencies, likely varying by situation or pressure level.",
    interpretation:
      "You demonstrate a mix of SCARE and CARES tendencies, likely varying by situation or pressure level. Look for patterns in when you shift away from CARES behaviors and build consistency one capability at a time.",
  },
  {
    min: 0,
    max: 39,
    label: "Development",
    title: "Significant Development Opportunity",
    summary:
      "Your current leadership approach shows meaningful development opportunities.",
    interpretation:
      "Your current leadership approach shows meaningful development opportunities. Start with small, consistent CARES practices rather than attempting wholesale change. Focus first on self-awareness and one core capability.",
  },
];

export function getScoreBand(normalizedScore: number): ScoreBand {
  return (
    scoreBands.find(
      (band) => normalizedScore >= band.min && normalizedScore <= band.max
    ) ?? scoreBands[scoreBands.length - 1]
  );
}

export function calculateResults(
  responses: AssessmentResponses
): AssessmentResults {
  const categoryScores: CategoryScore[] = assessmentCategories.map(
    (category) => {
      const raw = category.questions.reduce((sum, q) => {
        return sum + (responses[q.id] ?? 0);
      }, 0);
      const max = category.questions.length * 5;
      const percentage = Math.round((raw / max) * 100);

      return {
        key: category.key,
        label: category.label,
        shortLabel: category.shortLabel,
        raw,
        max,
        percentage,
      };
    }
  );

  const rawScore = categoryScores.reduce((sum, c) => sum + c.raw, 0);
  const normalizedScore = Math.round(((rawScore - 25) / (125 - 25)) * 100);

  const sorted = [...categoryScores].sort((a, b) => b.raw - a.raw);
  const highestCategory = sorted[0];
  const lowestCategory = sorted[sorted.length - 1];

  return {
    responses,
    categoryScores,
    rawScore,
    normalizedScore,
    highestCategory,
    lowestCategory,
    scoreBand: getScoreBand(normalizedScore),
  };
}

export function isCategoryComplete(
  categoryKey: CareCategoryKey,
  responses: AssessmentResponses
): boolean {
  const category = assessmentCategories.find((c) => c.key === categoryKey);
  if (!category) return false;
  return category.questions.every((q) => responses[q.id] !== undefined);
}

export function generateMockResponses(): AssessmentResponses {
  const responses: AssessmentResponses = {};
  assessmentCategories.forEach((category) => {
    category.questions.forEach((q) => {
      responses[q.id] = Math.floor(Math.random() * 3) + 3;
    });
  });
  return responses;
}
