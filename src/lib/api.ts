import { CategoryScore } from "@/types/assessment";

interface SubmitAssessmentParams {
  email: string;
  overall_score: number;
  raw_score: number;
  score_band: string;
  lowest_dimension: string;
  strongest_dimension: string;
  roadmap_steps: string[];
  recommended_chapters: { number: number; title: string; reason: string }[];
  categoryScores: CategoryScore[];
}

export async function submitAssessment(params: SubmitAssessmentParams): Promise<void> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const body = {
    email: params.email,
    overall_score: params.overall_score,
    raw_score: params.raw_score,
    score_band: params.score_band,
    lowest_dimension: params.lowest_dimension,
    strongest_dimension: params.strongest_dimension,
    roadmap_steps: params.roadmap_steps,
    recommended_chapters: params.recommended_chapters,
    categoryScores: params.categoryScores.map((c) => ({
      category_key: c.key,
      label: c.label,
      raw: c.raw,
      max: c.max,
      percentage: c.percentage,
    })),
  };

  try {
    await fetch(`${supabaseUrl}/functions/v1/send-assessment-report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${supabaseAnonKey}`,
        "Apikey": supabaseAnonKey,
      },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error("Failed to submit assessment:", err);
  }
}
