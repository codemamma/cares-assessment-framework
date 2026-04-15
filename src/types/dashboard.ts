export interface DashboardData {
  kpis: {
    totalStarted: number;
    totalCompleted: number;
    totalEmails: number;
    strategyClicks: number;
  };
  funnel: {
    completionRate: number;
    emailCaptureRate: number;
    conversionRate: number;
    emailConversionFromStarted: number;
  };
  summary: {
    avgScore: number;
    pctLow: number;
    pctMid: number;
    pctHigh: number;
  };
  dimensions: {
    averages: { key: string; label: string; avg: number }[];
    mostCommonWeak: { key: string; count: number } | null;
  };
  actions: {
    toolkitRate: number;
    workshopRate: number;
    strategyRate: number;
    bookRate: number;
    toolkitClicks: number;
    workshopClicks: number;
    strategyClicks: number;
    bookClicks: number;
    topAction: string | null;
    topActionRate: number;
  };
  leads: {
    id: string;
    email: string;
    name: string | null;
    overall_score: number;
    score_band: string | null;
    lowest_dimension: string;
    strongest_dimension: string;
    last_action: string | null;
    created_at: string;
  }[];
}
