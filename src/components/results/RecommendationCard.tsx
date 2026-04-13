import { CareCategoryKey } from "@/types/assessment";
import { recommendationsByCategory, chapterMap, supportingChapters } from "@/data/recommendations";

interface RoadmapStepsProps {
  lowestCategory: CareCategoryKey;
}

export function RoadmapSteps({ lowestCategory }: RoadmapStepsProps) {
  const data = recommendationsByCategory[lowestCategory];
  if (!data) return null;

  return (
    <div className="space-y-3">
      {data.recommendations.map((rec, i) => (
        <div key={i} className="flex gap-4 bg-slate-800 rounded-2xl p-5 border border-slate-700">
          <div className="flex-shrink-0 w-7 h-7 rounded-full bg-sky-500/20 border border-sky-500/40 flex items-center justify-center mt-0.5">
            <span className="text-sky-300 text-xs font-bold">{i + 1}</span>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed pt-0.5">{rec}</p>
        </div>
      ))}
    </div>
  );
}

interface SuggestedReadingProps {
  lowestCategory: CareCategoryKey;
}

function getReadingList(lowestCategory: CareCategoryKey): { title: string; isPrimary: boolean }[] {
  const primary = chapterMap[lowestCategory];
  const always = "CARES in Action";
  const other = supportingChapters.filter((c) => c !== always)[0];
  return [
    { title: primary.title, isPrimary: true },
    { title: always, isPrimary: false },
    { title: other, isPrimary: false },
  ];
}

export function SuggestedReading({ lowestCategory }: SuggestedReadingProps) {
  const primary = chapterMap[lowestCategory];
  if (!primary) return null;

  const chapters = getReadingList(lowestCategory);

  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-500 mb-4">
        Based on your assessment, we recommend starting here
      </p>

      {chapters.map((chapter, i) => (
        <div
          key={i}
          className={`rounded-2xl p-5 border flex items-start gap-4 ${
            chapter.isPrimary
              ? "bg-sky-950/40 border-sky-700/50"
              : "bg-slate-800 border-slate-700"
          }`}
        >
          <div className="flex-shrink-0 mt-0.5">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${
                chapter.isPrimary
                  ? "bg-sky-500/20 border border-sky-500/40 text-sky-300"
                  : "bg-slate-700 border border-slate-600 text-slate-400"
              }`}
            >
              {chapter.isPrimary ? "Focus Area" : "Apply & Strengthen"}
            </span>
          </div>
          <div className="flex-1">
            <p
              className={`font-semibold text-sm leading-snug ${
                chapter.isPrimary ? "text-white" : "text-slate-200"
              }`}
            >
              {chapter.title}
            </p>
            <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
              {chapter.isPrimary
                ? "This chapter directly addresses your key development area."
                : "Practical application to strengthen your overall CARES leadership."}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
