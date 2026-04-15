import { CategoryScore } from "@/types/assessment";

interface SubmitAssessmentParams {
  email: string;
  role: string;
  name: string | null;
  overall_score: number;
  raw_score: number;
  score_band: string;
  lowest_dimension: string;
  strongest_dimension: string;
  roadmap_steps: string[];
  recommended_chapters: { title: string; isPrimary: boolean }[];
  categoryScores: CategoryScore[];
}

export async function submitAssessment(params: SubmitAssessmentParams): Promise<string | null> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const body = {
    email: params.email,
    role: params.role,
    name: params.name,
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
    const res = await fetch(`${supabaseUrl}/functions/v1/send-assessment-report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${supabaseAnonKey}`,
        "Apikey": supabaseAnonKey,
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const data = await res.json();
      return data.assessmentId ?? null;
    }
    return null;
  } catch (err) {
    console.error("Failed to submit assessment:", err);
    return null;
  }
}

export async function trackAction(assessmentId: string, actionType: string): Promise<void> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  try {
    await fetch(`${supabaseUrl}/functions/v1/track-action`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${supabaseAnonKey}`,
        "Apikey": supabaseAnonKey,
      },
      body: JSON.stringify({ assessmentId, actionType }),
    });
  } catch (err) {
    console.error("Failed to track action:", err);
  }
}

interface SaveCommitmentParams {
  assessmentId: string;
  focus_area: string;
  practice: string;
  measure: string;
  support: string;
}

export async function saveCommitment(params: SaveCommitmentParams): Promise<boolean> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  try {
    const res = await fetch(`${supabaseUrl}/functions/v1/save-commitment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${supabaseAnonKey}`,
        "Apikey": supabaseAnonKey,
      },
      body: JSON.stringify(params),
    });
    return res.ok;
  } catch (err) {
    console.error("Failed to save commitment:", err);
    return false;
  }
}
