import { CategoryScore } from "@/types/assessment";

interface CategoryBreakdownProps {
  categoryScores: CategoryScore[];
}

export function CategoryBreakdown({ categoryScores }: CategoryBreakdownProps) {
  return (
    <div className="bg-[#07111f] px-4 pt-8 pb-10">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
          5 Dimensions
        </p>
        <div className="space-y-3">
          {categoryScores.map((score) => (
            <div key={score.key} className="flex items-center gap-3">
              <p className="text-slate-300 text-sm w-40 flex-shrink-0 truncate">
                {score.shortLabel}
              </p>
              <div className="flex-1 bg-slate-800 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-2 rounded-full transition-all duration-700"
                  style={{ width: `${score.percentage}%` }}
                />
              </div>
              <span className="text-slate-500 text-xs w-8 text-right flex-shrink-0">
                {score.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
