import { useEffect, useState } from "react";
import { fetchDashboardData } from "@/lib/dashboard";
import { DashboardData } from "@/types/dashboard";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { ConversionFunnel } from "@/components/dashboard/ConversionFunnel";
import { DimensionInsights } from "@/components/dashboard/DimensionInsights";
import { ActionInsights } from "@/components/dashboard/ActionInsights";
import { LeadsTable } from "@/components/dashboard/LeadsTable";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData()
      .then(setData)
      .catch(() => setError("Failed to load dashboard data."))
      .finally(() => setLoading(false));
  }, []);

  function handleRefresh() {
    setLoading(true);
    setError(null);
    fetchDashboardData()
      .then(setData)
      .catch(() => setError("Failed to load dashboard data."))
      .finally(() => setLoading(false));
  }

  return (
    <div className="min-h-screen bg-[#07111f] text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              CARES Assessment
            </p>
            <h1 className="text-3xl font-black text-white">Author Dashboard</h1>
            <p className="text-slate-400 mt-1 text-sm">
              Analytics and lead intelligence
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-sm font-medium px-4 py-2 rounded-xl transition-all disabled:opacity-50"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {loading && !data && (
          <div className="flex items-center justify-center py-32">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-slate-400 text-sm">Loading dashboard…</span>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-950/40 border border-red-800/40 rounded-2xl px-6 py-5 text-red-300 text-sm">
            {error}
          </div>
        )}

        {data && (
          <div className="flex flex-col gap-6">
            <KpiCards kpis={data.kpis} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ConversionFunnel kpis={data.kpis} funnel={data.funnel} />
              <DimensionInsights dimensions={data.dimensions} />
            </div>

            <ActionInsights actions={data.actions} />

            <LeadsTable leads={data.leads} />
          </div>
        )}
      </div>
    </div>
  );
}
