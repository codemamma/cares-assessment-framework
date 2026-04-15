import { DashboardData } from "@/types/dashboard";
import { dimensionLabel } from "@/lib/dashboard";

interface Props {
  dimensions: DashboardData["dimensions"];
}

function scoreColor(avg: number): string {
  if (avg >= 75) return "bg-green-500";
  if (avg >= 55) return "bg-blue-500";
  if (avg >= 40) return "bg-amber-500";
  return "bg-red-500";
}

function scoreTextColor(avg: number): string {
  if (avg >= 75) return "text-green-400";
  if (avg >= 55) return "text-blue-400";
  if (avg >= 40) return "text-amber-400";
  return "text-red-400";
}

export function DimensionInsights({ dimensions }: Props) {
  const weakLabel = dimensions.mostCommonWeak
    ? dimensionLabel(dimensions.mostCommonWeak.key)
    : null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
        Dimension Insights
      </p>
      <h2 className="text-lg font-bold text-white mb-1">Average score per capability</h2>
      <p className="text-xs text-slate-500 mb-6">
        {weakLabel
          ? <>Insight: Most users show gaps in <span className="text-slate-400 font-medium">{weakLabel}</span>, presenting an opportunity for targeted support.</>
          : "Insight: Not enough data yet to identify common gaps."}
      </p>

      <div className="flex flex-col gap-4 mb-6">
        {dimensions.averages.map((dim) => (
          <div key={dim.key} className="flex items-center gap-3">
            <div className="w-48 shrink-0">
              <span className="text-sm text-slate-300 leading-tight">{dim.label}</span>
            </div>
            <div className="flex-1 bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-2.5 rounded-full transition-all duration-700 ${scoreColor(dim.avg)}`}
                style={{ width: `${dim.avg}%` }}
              />
            </div>
            <span className={`text-sm font-bold tabular-nums w-10 text-right ${scoreTextColor(dim.avg)}`}>
              {dim.avg}%
            </span>
          </div>
        ))}
      </div>

      {weakLabel && (
        <div className="bg-amber-950/40 border border-amber-800/40 rounded-xl px-4 py-3">
          <p className="text-xs text-amber-500 font-semibold uppercase tracking-wider mb-1">
            Most Common Weak Area
          </p>
          <p className="text-white text-sm font-medium">
            Most leaders struggle with:{" "}
            <span className="text-amber-300 font-semibold">{weakLabel}</span>
            {dimensions.mostCommonWeak && (
              <span className="text-slate-500 font-normal ml-2">
                ({dimensions.mostCommonWeak.count} leaders)
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
