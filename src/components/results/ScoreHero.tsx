import { AssessmentResults } from "@/types/assessment";
import { Badge } from "@/components/shared/Badge";

interface ScoreHeroProps {
  results: AssessmentResults;
}

export function ScoreHero({ results }: ScoreHeroProps) {
  const { normalizedScore, scoreBand, rawScore } = results;

  const bandColor =
    normalizedScore >= 80
      ? "text-green-400"
      : normalizedScore >= 60
      ? "text-blue-400"
      : normalizedScore >= 40
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div className="bg-[#07111f] text-white py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <Badge variant="purple" className="mb-6">
          Assessment Complete
        </Badge>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Your CARES Leadership Profile
        </h1>
        <p className="text-slate-400 mb-10 text-lg">
          Based on your responses across all 5 dimensions
        </p>

        <div className="flex flex-col items-center mb-10">
          <div className="relative flex items-center justify-center w-44 h-44 rounded-full border-4 border-yellow-400/30 bg-yellow-400/5 mb-4">
            <div className="text-center">
              <span className={`text-6xl font-black ${bandColor}`}>
                {normalizedScore}
              </span>
              <span className="text-slate-400 text-2xl font-bold">/100</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 mb-2">Raw score: {rawScore} / 125</p>
          <span
            className={`text-xl font-bold ${bandColor}`}
          >
            {scoreBand.title}
          </span>
        </div>

        <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 text-left">
          <p className="text-slate-200 leading-relaxed text-base">
            {scoreBand.interpretation}
          </p>
        </div>
      </div>
    </div>
  );
}
