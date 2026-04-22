import { CareCategoryKey } from "@/types/assessment";
import { recommendationsByCategory, chapterMap } from "@/data/recommendations";

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

type ReadingTag = "Start Here" | "Apply & Strengthen" | "Apply at Scale";

interface ReadingEntry {
  title: string;
  tag: ReadingTag;
  subtext: string;
}

function getReadingList(lowestCategory: CareCategoryKey): ReadingEntry[] {
  const primary = chapterMap[lowestCategory];
  return [
    {
      title: primary.title,
      tag: "Start Here",
      subtext: "Start with this chapter to strengthen your key development area.",
    },
    {
      title: "CARES in Action",
      tag: "Apply & Strengthen",
      subtext: "This chapter is for practical application to strengthen your overall CARES leadership.",
    },
    {
      title: "Applying CARES to Your Organization",
      tag: "Apply at Scale",
      subtext: "Extend principles from this chapter across your team or organization.",
    },
  ];
}

const tagStyles: Record<ReadingTag, { card: string; badge: string }> = {
  "Start Here": {
    card: "bg-sky-950/40 border-sky-700/50",
    badge: "bg-sky-500/20 border border-sky-500/40 text-sky-300",
  },
  "Apply & Strengthen": {
    card: "bg-slate-800 border-slate-700",
    badge: "bg-slate-700 border border-slate-600 text-slate-400",
  },
  "Apply at Scale": {
    card: "bg-slate-800 border-slate-700",
    badge: "bg-slate-700 border border-slate-600 text-slate-400",
  },
};

export function SuggestedReading({ lowestCategory }: SuggestedReadingProps) {
  const primary = chapterMap[lowestCategory];
  if (!primary) return null;

  const chapters = getReadingList(lowestCategory);

  return (
    <div className="space-y-3">
      {chapters.map((chapter, i) => {
        const styles = tagStyles[chapter.tag];
        return (
          <div
            key={i}
            className={`rounded-2xl p-5 border flex items-start gap-4 ${styles.card}`}
          >
            <div className="flex-shrink-0 mt-0.5">
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${styles.badge}`}
              >
                {chapter.tag}
              </span>
            </div>
            <div className="flex-1">
              <p
                className={`font-semibold text-sm leading-snug ${
                  chapter.tag === "Start Here" ? "text-white" : "text-slate-200"
                }`}
              >
                {chapter.title}
              </p>
              <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                {chapter.subtext}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
