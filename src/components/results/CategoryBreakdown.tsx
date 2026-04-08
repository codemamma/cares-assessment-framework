import { CategoryScore } from "@/types/assessment";

interface CategoryBreakdownProps {
  categoryScores: CategoryScore[];
}

const CATEGORY_INITIALS: Record<string, string> = {
  communicate_with_empathy: "C",
  adapt_with_agility: "A",
  relationships_built_on_trust: "R",
  empower_with_trust: "E",
  stay_calm_through_challenges: "S",
};

export function CategoryBreakdown({ categoryScores }: CategoryBreakdownProps) {
  return (
    <div className="bg-slate-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-2">
          Capability Breakdown
        </h2>
        <p className="text-slate-400 mb-8">
          Your scores across each of the five CARES dimensions
        </p>
        <div className="space-y-4">
          {categoryScores.map((score) => (
            <div
              key={score.key}
              className="bg-slate-800 rounded-2xl p-5 border border-slate-700"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-300 font-bold text-sm">
                    {CATEGORY_INITIALS[score.key]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-white font-semibold text-sm truncate">
                      {score.label}
                    </p>
                    <span className="text-yellow-400 font-bold text-sm ml-2 flex-shrink-0">
                      {score.raw}/{score.max}
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-2 rounded-full transition-all duration-700"
                      style={{ width: `${score.percentage}%` }}
                    />
                  </div>
                </div>
                <span className="text-slate-400 text-xs ml-2 flex-shrink-0">
                  {score.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
