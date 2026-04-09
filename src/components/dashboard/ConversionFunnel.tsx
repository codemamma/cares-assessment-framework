import { DashboardData } from "@/types/dashboard";

interface Props {
  kpis: DashboardData["kpis"];
  funnel: DashboardData["funnel"];
}

interface FunnelStepProps {
  label: string;
  count: number;
  pct: number | null;
  pctLabel: string | null;
  color: string;
  barColor: string;
  maxCount: number;
}

function FunnelStep({ label, count, pct, pctLabel, color, barColor, maxCount }: FunnelStepProps) {
  const barWidth = maxCount > 0 ? Math.round((count / maxCount) * 100) : 0;

  return (
    <div className="flex items-center gap-4">
      <div className="w-40 shrink-0 text-right">
        <span className="text-sm text-slate-400">{label}</span>
      </div>
      <div className="flex-1 flex items-center gap-3">
        <div className="flex-1 bg-slate-800 rounded-full h-3 overflow-hidden">
          <div
            className={`h-3 rounded-full transition-all duration-700 ${barColor}`}
            style={{ width: `${barWidth}%` }}
          />
        </div>
        <span className={`text-sm font-bold tabular-nums w-10 text-right ${color}`}>
          {count.toLocaleString()}
        </span>
      </div>
      {pct !== null && pctLabel && (
        <div className="w-32 shrink-0">
          <span className="text-xs text-slate-500">{pctLabel}: </span>
          <span className="text-xs font-semibold text-slate-300">{pct}%</span>
        </div>
      )}
    </div>
  );
}

export function ConversionFunnel({ kpis, funnel }: Props) {
  const maxCount = kpis.totalStarted;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
        Conversion Funnel
      </p>
      <h2 className="text-lg font-bold text-white mb-6">From start to action</h2>

      <div className="flex flex-col gap-5">
        <FunnelStep
          label="Started"
          count={kpis.totalStarted}
          pct={null}
          pctLabel={null}
          color="text-white"
          barColor="bg-slate-500"
          maxCount={maxCount}
        />
        <FunnelStep
          label="Completed"
          count={kpis.totalCompleted}
          pct={funnel.completionRate}
          pctLabel="Completion"
          color="text-green-400"
          barColor="bg-green-500"
          maxCount={maxCount}
        />
        <FunnelStep
          label="Email Captured"
          count={kpis.totalEmails}
          pct={funnel.emailCaptureRate}
          pctLabel="Of completed"
          color="text-blue-400"
          barColor="bg-blue-500"
          maxCount={maxCount}
        />
        <FunnelStep
          label="Strategy Click"
          count={kpis.strategyClicks}
          pct={funnel.conversionRate}
          pctLabel="Of emails"
          color="text-amber-400"
          barColor="bg-amber-500"
          maxCount={maxCount}
        />
      </div>
    </div>
  );
}
