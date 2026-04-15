import { DashboardData } from "@/types/dashboard";

export async function fetchDashboardData(): Promise<DashboardData> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const res = await fetch(`${supabaseUrl}/functions/v1/get-dashboard-data`, {
    headers: {
      Authorization: `Bearer ${supabaseAnonKey}`,
      Apikey: supabaseAnonKey,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  return res.json();
}

const DIMENSION_LABELS: Record<string, string> = {
  communicate_with_empathy: "Communicate with Empathy",
  adapt_with_agility: "Adapt with Agility",
  relationships_built_on_trust: "Relationships Built on Trust",
  empower_with_trust: "Empower with Trust",
  stay_calm_through_challenges: "Stay Calm through Challenges",
};

export function dimensionLabel(key: string): string {
  return DIMENSION_LABELS[key] ?? key.replace(/_/g, " ");
}

export function actionLabel(type: string | null): string {
  if (!type) return "No Action Yet";
  const map: Record<string, string> = {
    strategy_session_clicked: "Strategy Session",
    strategy_session: "Strategy Session",
    toolkit_clicked: "Toolkit",
    toolkit: "Toolkit",
    workshop_clicked: "Workshop",
    workshop: "Workshop",
    book: "Book",
    commitment: "Commitment Submitted",
  };
  return map[type] ?? type.replace(/_/g, " ");
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
