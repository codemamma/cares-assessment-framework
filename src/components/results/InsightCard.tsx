interface InsightCardProps {
  type: "strength" | "opportunity";
  categoryLabel: string;
  score: number;
  maxScore: number;
  percentage: number;
}

export function InsightCard({
  type,
  categoryLabel,
  score,
  maxScore,
  percentage,
}: InsightCardProps) {
  const isStrength = type === "strength";

  return (
    <div
      className={`rounded-2xl p-6 border ${
        isStrength
          ? "bg-green-900/20 border-green-700/40"
          : "bg-amber-900/20 border-amber-700/40"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
            isStrength ? "bg-green-500/20" : "bg-amber-500/20"
          }`}
        >
          <span className="text-xl">{isStrength ? "★" : "◎"}</span>
        </div>
        <div>
          <p
            className={`text-xs font-semibold uppercase tracking-wider mb-1 ${
              isStrength ? "text-green-400" : "text-amber-400"
            }`}
          >
            {isStrength ? "Strongest Capability" : "Biggest Development Opportunity"}
          </p>
          <h3 className="text-white font-bold text-lg mb-1">{categoryLabel}</h3>
          <p className="text-slate-400 text-sm">
            {score}/{maxScore} points · {percentage}%
          </p>
        </div>
      </div>
    </div>
  );
}
