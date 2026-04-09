import { DashboardData } from "@/types/dashboard";

interface Props {
  kpis: DashboardData["kpis"];
}

interface KpiCardProps {
  label: string;
  value: number;
  accent: string;
}

function KpiCard({ label, value, accent }: KpiCardProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-2">
      <span className={`text-4xl font-black tabular-nums ${accent}`}>{value.toLocaleString()}</span>
      <span className="text-sm text-slate-400 font-medium">{label}</span>
    </div>
  );
}

export function KpiCards({ kpis }: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <KpiCard label="Assessments Started" value={kpis.totalStarted} accent="text-white" />
      <KpiCard label="Completed" value={kpis.totalCompleted} accent="text-green-400" />
      <KpiCard label="Emails Captured" value={kpis.totalEmails} accent="text-blue-400" />
      <KpiCard label="Strategy Session Clicks" value={kpis.strategyClicks} accent="text-amber-400" />
    </div>
  );
}
