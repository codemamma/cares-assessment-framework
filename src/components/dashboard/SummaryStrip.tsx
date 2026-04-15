import { DashboardData } from "@/types/dashboard";

interface Props {
  summary: DashboardData["summary"];
}

interface StripItemProps {
  label: string;
  value: string;
  accent: string;
}

function StripItem({ label, value, accent }: StripItemProps) {
  return (
    <div className="flex flex-col items-center gap-1 px-6 py-3">
      <span className={`text-2xl font-black tabular-nums ${accent}`}>{value}</span>
      <span className="text-xs text-slate-500 font-medium text-center">{label}</span>
    </div>
  );
}

export function SummaryStrip({ summary }: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl">
      <div className="flex flex-wrap justify-around divide-x divide-slate-800">
        <StripItem
          label="Avg Score"
          value={String(summary.avgScore)}
          accent="text-white"
        />
        <StripItem
          label="Low Scores (<50)"
          value={`${summary.pctLow}%`}
          accent="text-red-400"
        />
        <StripItem
          label="Mid Scores (50–70)"
          value={`${summary.pctMid}%`}
          accent="text-amber-400"
        />
        <StripItem
          label="High Scores (>70)"
          value={`${summary.pctHigh}%`}
          accent="text-green-400"
        />
      </div>
    </div>
  );
}
