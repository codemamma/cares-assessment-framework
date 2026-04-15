import { DashboardData } from "@/types/dashboard";
import { dimensionLabel, actionLabel, formatDate } from "@/lib/dashboard";

interface Props {
  leads: DashboardData["leads"];
}

type LeadRow = DashboardData["leads"][number];

interface GroupedLead extends LeadRow {
  actions: string[];
  primaryAction: string | null;
}

const PRIORITY_ORDER = [
  "strategy session",
  "org assessment interest",
  "toolkit interest",
  "book order",
];

function groupLeads(leads: DashboardData["leads"]): GroupedLead[] {
  const grouped = leads.reduce<Record<string, GroupedLead>>((acc, item) => {
    const key = item.assessment_id || `${item.email}-${item.created_at}`;
    if (!acc[key]) {
      acc[key] = { ...item, actions: [] };
    }
    if (item.last_action && item.last_action !== "No Action Yet") {
      acc[key].actions.push(item.last_action);
    }
    return acc;
  }, {});

  return Object.values(grouped).map((item) => {
    const uniqueActions = [...new Set(item.actions)];
    const primaryAction =
      PRIORITY_ORDER.find((priority) =>
        uniqueActions.some((action) =>
          action.toLowerCase().includes(priority)
        )
      ) || uniqueActions[0] || null;
    return { ...item, actions: uniqueActions, primaryAction };
  });
}

function scoreBadgeClass(score: number) {
  if (score >= 75) return "bg-green-900/50 text-green-300 border border-green-800/60";
  if (score >= 55) return "bg-blue-900/50 text-blue-300 border border-blue-800/60";
  if (score >= 40) return "bg-amber-900/50 text-amber-300 border border-amber-800/60";
  return "bg-red-900/50 text-red-300 border border-red-800/60";
}

function scoreBandTextClass(score: number) {
  if (score >= 75) return "text-green-500";
  if (score >= 55) return "text-blue-500";
  if (score >= 40) return "text-amber-500";
  return "text-red-500";
}

function scoreBandLabel(band: string | null, score: number): string {
  if (band) return band;
  if (score >= 80) return "Strong";
  if (score >= 60) return "Developing";
  if (score >= 40) return "Transition";
  return "Emerging";
}

function actionBadge(type: string | null) {
  if (!type) return "text-slate-500 italic";
  const map: Record<string, string> = {
    strategy_session_clicked: "text-amber-400",
    strategy_session: "text-amber-400",
    toolkit_clicked: "text-blue-400",
    toolkit: "text-blue-400",
    workshop_clicked: "text-green-400",
    workshop: "text-green-400",
    book: "text-sky-400",
    commitment: "text-teal-400",
  };
  return map[type] ?? "text-slate-400";
}

export function LeadsTable({ leads }: Props) {
  const groupedLeads = groupLeads(leads);

  if (groupedLeads.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Leads</p>
        <h2 className="text-lg font-bold text-white mb-4">Recent Leadership Assessments</h2>
        <p className="text-slate-500 text-sm">No leads yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Leads</p>
      <h2 className="text-lg font-bold text-white mb-4">
        Recent Leadership Assessments{" "}
        <span className="text-slate-600 text-sm font-normal">({groupedLeads.length})</span>
      </h2>

      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full text-sm border-collapse min-w-[760px]">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3 pr-4">
                Email
              </th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3 pr-4">
                Score
              </th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3 pr-4">
                Weakest
              </th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3 pr-4">
                Strongest
              </th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3 pr-4">
                Last Action
              </th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {groupedLeads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
              >
                <td className="py-3 pr-4 text-slate-200 font-medium max-w-[220px] truncate">
                  {lead.email
                    ? lead.name
                      ? <>{lead.name} <span className="text-slate-500 font-normal">({lead.email})</span></>
                      : lead.email
                    : <span className="text-slate-600 italic">not captured</span>
                  }
                </td>
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold tabular-nums ${scoreBadgeClass(lead.overall_score)}`}
                    >
                      {lead.overall_score}
                    </span>
                    <span className={`text-xs font-medium ${scoreBandTextClass(lead.overall_score)}`}>
                      {scoreBandLabel(lead.score_band, lead.overall_score)}
                    </span>
                  </div>
                </td>
                <td className="py-3 pr-4 text-slate-400 text-xs max-w-[150px]">
                  {lead.lowest_dimension ? dimensionLabel(lead.lowest_dimension) : "—"}
                </td>
                <td className="py-3 pr-4 text-slate-400 text-xs max-w-[150px]">
                  {lead.strongest_dimension ? dimensionLabel(lead.strongest_dimension) : "—"}
                </td>
                <td className={`py-3 pr-4 text-xs font-medium ${actionBadge(lead.primaryAction)}`}>
                  {lead.primaryAction ? actionLabel(lead.primaryAction) : "No Action Yet"}
                  {lead.actions.length > 1 && (
                    <span className="ml-2 text-xs text-gray-400 font-normal">
                      +{lead.actions.length - 1} more
                    </span>
                  )}
                </td>
                <td className="py-3 text-slate-500 text-xs tabular-nums whitespace-nowrap">
                  {formatDate(lead.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
