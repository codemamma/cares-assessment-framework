import { DashboardData } from "@/types/dashboard";
import { dimensionLabel, actionLabel, formatDate } from "@/lib/dashboard";

interface Props {
  leads: DashboardData["leads"];
}

function scoreBadge(score: number) {
  if (score >= 75) return "bg-green-900/50 text-green-300 border border-green-800/60";
  if (score >= 55) return "bg-blue-900/50 text-blue-300 border border-blue-800/60";
  if (score >= 40) return "bg-amber-900/50 text-amber-300 border border-amber-800/60";
  return "bg-red-900/50 text-red-300 border border-red-800/60";
}

function actionBadge(type: string | null) {
  if (!type) return "text-slate-600";
  const map: Record<string, string> = {
    strategy_session_clicked: "text-amber-400",
    toolkit_clicked: "text-blue-400",
    workshop_clicked: "text-green-400",
  };
  return map[type] ?? "text-slate-400";
}

export function LeadsTable({ leads }: Props) {
  if (leads.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Leads</p>
        <h2 className="text-lg font-bold text-white mb-4">Recent submissions</h2>
        <p className="text-slate-500 text-sm">No leads yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Leads</p>
      <h2 className="text-lg font-bold text-white mb-4">
        Recent submissions{" "}
        <span className="text-slate-600 text-sm font-normal">(last 50)</span>
      </h2>

      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full text-sm border-collapse min-w-[720px]">
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
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
              >
                <td className="py-3 pr-4 text-slate-200 font-medium max-w-[200px] truncate">
                  {lead.email || <span className="text-slate-600 italic">not captured</span>}
                </td>
                <td className="py-3 pr-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold tabular-nums ${scoreBadge(
                      lead.overall_score
                    )}`}
                  >
                    {lead.overall_score}
                  </span>
                </td>
                <td className="py-3 pr-4 text-slate-400 text-xs max-w-[150px]">
                  {lead.lowest_dimension ? dimensionLabel(lead.lowest_dimension) : "—"}
                </td>
                <td className="py-3 pr-4 text-slate-400 text-xs max-w-[150px]">
                  {lead.strongest_dimension ? dimensionLabel(lead.strongest_dimension) : "—"}
                </td>
                <td className={`py-3 pr-4 text-xs font-medium ${actionBadge(lead.last_action)}`}>
                  {actionLabel(lead.last_action)}
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
