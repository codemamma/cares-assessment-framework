import { DashboardData } from "@/types/dashboard";

interface Props {
  actions: DashboardData["actions"];
}

interface ActionRowProps {
  label: string;
  clicks: number;
  rate: number;
  color: string;
  barColor: string;
}

function actionIntent(name: string): string {
  if (name === "Strategy Session") return "coaching";
  if (name === "Workshop") return "workshop";
  return "self-serve";
}

function ActionRow({ label, clicks, rate, color, barColor }: ActionRowProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-36 shrink-0">
        <span className="text-sm text-slate-300">{label}</span>
      </div>
      <div className="flex-1 bg-slate-800 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-2.5 rounded-full transition-all duration-700 ${barColor}`}
          style={{ width: `${rate}%` }}
        />
      </div>
      <span className={`text-sm font-bold tabular-nums w-10 text-right ${color}`}>{rate}%</span>
      <span className="text-xs text-slate-600 w-16 text-right tabular-nums">{clicks} clicks</span>
    </div>
  );
}

export function ActionInsights({ actions }: Props) {
  const insightText = actions.topAction
    ? `${actions.topAction} is the most selected next step (${actions.topActionRate}%), indicating strong intent for ${actionIntent(actions.topAction)}.`
    : "No action data yet.";

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
        Action Insights
      </p>
      <h2 className="text-lg font-bold text-white mb-1">What users do after results</h2>
      <p className="text-xs text-slate-500 mb-6">
        Insight: {insightText}
      </p>

      <div className="flex flex-col gap-5">
        <ActionRow
          label="Toolkit"
          clicks={actions.toolkitClicks}
          rate={actions.toolkitRate}
          color="text-blue-400"
          barColor="bg-blue-500"
        />
        <ActionRow
          label="Workshop"
          clicks={actions.workshopClicks}
          rate={actions.workshopRate}
          color="text-green-400"
          barColor="bg-green-500"
        />
        <ActionRow
          label="Strategy Session"
          clicks={actions.strategyClicks}
          rate={actions.strategyRate}
          color="text-amber-400"
          barColor="bg-amber-500"
        />
        <ActionRow
          label="Book"
          clicks={actions.bookClicks}
          rate={actions.bookRate}
          color="text-sky-400"
          barColor="bg-sky-500"
        />
      </div>
    </div>
  );
}
