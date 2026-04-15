import { DashboardData } from "@/types/dashboard";

interface Props {
  leads: DashboardData["leads"];
}

function scoreBadgeClass(score: number) {
  if (score >= 75) return "bg-green-900/50 text-green-300 border border-green-800/60";
  if (score >= 55) return "bg-blue-900/50 text-blue-300 border border-blue-800/60";
  if (score >= 40) return "bg-amber-900/50 text-amber-300 border border-amber-800/60";
  return "bg-red-900/50 text-red-300 border border-red-800/60";
}

function isHighIntent(lead: DashboardData["leads"][number]): boolean {
  const action = lead.last_action ?? "";
  return lead.overall_score < 50 || action === "strategy_session_clicked" || action === "strategy_session";
}

function intentTag(lead: DashboardData["leads"][number]): { label: string; style: string } {
  const action = lead.last_action ?? "";
  if (action === "strategy_session_clicked" || action === "strategy_session") {
    return { label: "Strategy Interest", style: "bg-amber-900/50 text-amber-300 border border-amber-800/50" };
  }
  return { label: "Needs Support", style: "bg-red-900/40 text-red-300 border border-red-800/50" };
}

export function HighIntentLeads({ leads }: Props) {
  const highIntentLeads = leads.filter(isHighIntent).slice(0, 5);

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
      <p className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-1">Priority</p>
      <h2 className="text-lg font-bold text-white mb-4">
        High Intent Leads
      </h2>

      {highIntentLeads.length === 0 ? (
        <p className="text-slate-500 text-sm">No high-intent leads yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {highIntentLeads.map((lead) => {
            const tag = intentTag(lead);
            const displayName = lead.name || lead.email || "Anonymous";
            return (
              <div
                key={lead.id}
                className="flex items-center justify-between gap-4 bg-slate-800/50 rounded-xl px-4 py-3"
              >
                <span className="text-sm text-slate-200 font-medium truncate max-w-[220px]">
                  {displayName}
                </span>
                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold tabular-nums ${scoreBadgeClass(lead.overall_score)}`}
                  >
                    {lead.overall_score}
                  </span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${tag.style}`}>
                    {tag.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
