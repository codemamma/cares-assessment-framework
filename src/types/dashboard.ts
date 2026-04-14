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
    commitmentRate: number;
    toolkitClicks: number;
    workshopClicks: number;
    strategyClicks: number;
    bookClicks: number;
    commitmentClicks: number;
  };
  leads: {
    id: string;
    email: string;
    overall_score: number;
    lowest_dimension: string;
    strongest_dimension: string;
    last_action: string | null;
    created_at: string;
  }[];
}
