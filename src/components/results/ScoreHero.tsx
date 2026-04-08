import { AssessmentResults } from "@/types/assessment";

interface ScoreHeroProps {
  results: AssessmentResults;
}

export function ScoreHero({ results }: ScoreHeroProps) {
  const { normalizedScore, scoreBand } = results;

  const bandColor =
    normalizedScore >= 80
      ? "text-green-400"
      : normalizedScore >= 60
      ? "text-blue-400"
      : normalizedScore >= 40
      ? "text-yellow-400"
      : "text-red-400";

  const bandBg =
    normalizedScore >= 80
      ? "bg-green-500/10 border-green-500/30"
      : normalizedScore >= 60
      ? "bg-blue-500/10 border-blue-500/30"
      : normalizedScore >= 40
      ? "bg-yellow-500/10 border-yellow-500/30"
      : "bg-red-500/10 border-red-500/30";

  return (
    <div className="bg-[#07111f] text-white pt-12 pb-8 px-4 border-b border-slate-800/60">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">
          Assessment Complete
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Your CARES Leadership Profile
        </h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className={`flex items-center gap-3 rounded-2xl px-5 py-3 border flex-shrink-0 ${bandBg}`}>
            <span className={`text-4xl font-black leading-none ${bandColor}`}>
              {normalizedScore}
            </span>
            <div>
              <p className="text-slate-500 text-xs">out of 100</p>
              <p className={`text-sm font-semibold ${bandColor}`}>
                {scoreBand.label}
              </p>
            </div>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
            {scoreBand.summary}
          </p>
        </div>
      </div>
    </div>
  );
}
