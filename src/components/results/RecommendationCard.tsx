import { CareCategoryKey } from "@/types/assessment";
import { recommendationsByCategory } from "@/data/recommendations";

interface RoadmapStepsProps {
  lowestCategory: CareCategoryKey;
}

export function RoadmapSteps({ lowestCategory }: RoadmapStepsProps) {
  const data = recommendationsByCategory[lowestCategory];
  if (!data) return null;

  const shortRecs = data.recommendations.map((r) => {
    const sentence = r.split(/[.!?]/)[0];
    return sentence.length > 120 ? sentence.slice(0, 117) + "..." : sentence;
  });

  return (
    <div className="space-y-3">
      {shortRecs.map((rec, i) => (
        <div key={i} className="flex gap-4 bg-slate-800 rounded-2xl p-5 border border-slate-700">
          <div className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center mt-0.5">
            <span className="text-purple-300 text-xs font-bold">{i + 1}</span>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed pt-0.5">{rec}.</p>
        </div>
      ))}
    </div>
  );
}

interface SuggestedReadingProps {
  lowestCategory: CareCategoryKey;
}

export function SuggestedReading({ lowestCategory }: SuggestedReadingProps) {
  const data = recommendationsByCategory[lowestCategory];
  if (!data) return null;

  return (
    <div className="space-y-3">
      {data.chapters.map((chapter) => (
        <div
          key={chapter.number}
          className="bg-slate-800 rounded-2xl p-4 border border-slate-700 flex items-start gap-3"
        >
          <span className="text-xs font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-lg px-2 py-1 flex-shrink-0 mt-0.5">
            Ch. {chapter.number}
          </span>
          <div>
            <p className="text-white font-semibold text-sm">{chapter.title}</p>
            <p className="text-slate-400 text-xs mt-1 leading-relaxed">{chapter.reason}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
