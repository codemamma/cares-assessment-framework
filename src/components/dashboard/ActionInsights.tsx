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
  if (name === "Org Assessment") return "enterprise";
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
      <span className={`text-sm font-bold tabular-nums w-24 text-right ${color}`}>{rate}% <span className="font-normal text-slate-500 text-xs">of users</span></span>
      <span className="text-xs text-slate-600 w-16 text-right tabular-nums">{clicks} clicks</span>
    </div>
  );
}

export function ActionInsights({ actions }: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <p className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-1">
        Action Insights
      </p>
      <h2 className="text-lg font-bold text-white mb-1">What users do after results</h2>
      <p className="text-xs text-slate-500 mb-6">
        {actions.topAction ? (
          <>
            Insight: <span className="text-slate-300 font-medium">{actions.topAction}</span> is the most selected next step{" "}
            <span className="text-violet-400 font-semibold">({actions.topActionRate}% of users)</span>, indicating strong interest in{" "}
            <span className="text-slate-400 font-medium">{actionIntent(actions.topAction)}</span>.
          </>
        ) : "Insight: No action data yet."}
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
          label="Org Assessment"
          clicks={actions.orgAssessmentClicks}
          rate={actions.orgAssessmentRate}
          color="text-rose-400"
          barColor="bg-rose-500"
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
        <ActionRow
          label="Commitment"
          clicks={actions.commitmentClicks}
          rate={actions.commitmentRate}
          color="text-teal-400"
          barColor="bg-teal-500"
        />
      </div>
    </div>
  );
}
