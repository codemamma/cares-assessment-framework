export type CareCategoryKey =
  | "communicate_with_empathy"
  | "adapt_with_agility"
  | "relationships_built_on_trust"
  | "empower_with_trust"
  | "stay_calm_through_challenges";

export interface AssessmentQuestion {
  id: string;
  category: CareCategoryKey;
  categoryLabel: string;
  prompt: string;
  order: number;
}

export interface AssessmentCategory {
  key: CareCategoryKey;
  label: string;
  shortLabel: string;
  description: string;
  order: number;
  questions: AssessmentQuestion[];
}

export type AssessmentResponses = Record<string, number>;

export interface CategoryScore {
  key: CareCategoryKey;
  label: string;
  shortLabel: string;
  raw: number;
  max: number;
  percentage: number;
}

export interface AssessmentResults {
  responses: AssessmentResponses;
  categoryScores: CategoryScore[];
  rawScore: number;
  normalizedScore: number;
  highestCategory: CategoryScore;
  lowestCategory: CategoryScore;
  scoreBand: ScoreBand;
}

export interface ScoreBand {
  label: string;
  title: string;
  summary: string;
  interpretation: string;
  min: number;
  max: number;
}

export interface CommitmentData {
  focusArea: CareCategoryKey | "";
  practice: string;
  measure: string;
  support: string;
}

export interface EmailCaptureData {
  firstName: string;
  email: string;
  role: string;
  company: string;
}
