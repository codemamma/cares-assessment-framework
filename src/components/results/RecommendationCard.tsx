import { CareCategoryKey } from "@/types/assessment";
import { recommendationsByCategory } from "@/data/recommendations";

interface RecommendationCardProps {
  lowestCategory: CareCategoryKey;
}

export function RecommendationCard({ lowestCategory }: RecommendationCardProps) {
  const data = recommendationsByCategory[lowestCategory];
  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <h3 className="text-white font-bold text-lg mb-4">
          Recommended Next Steps
        </h3>
        <div className="space-y-4">
          {data.recommendations.map((rec, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center mt-0.5">
                <span className="text-purple-300 text-xs font-bold">{i + 1}</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <h3 className="text-white font-bold text-lg mb-4">
          Suggested Reading
        </h3>
        <div className="space-y-3">
          {data.chapters.map((chapter) => (
            <div
              key={chapter.number}
              className="bg-slate-700/50 rounded-xl p-4 border border-slate-600"
            >
              <div className="flex items-start gap-3">
                <span className="text-xs font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-lg px-2 py-1 flex-shrink-0">
                  Ch. {chapter.number}
                </span>
                <div>
                  <p className="text-white font-semibold text-sm">
                    {chapter.title}
                  </p>
                  <p className="text-slate-400 text-xs mt-1">{chapter.reason}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: "CARES Leadership Toolkit", desc: "Frameworks and worksheets to deepen your practice", icon: "📘" },
          { title: "Team Workshop", desc: "Bring CARES to your entire leadership team", icon: "👥" },
          { title: "1:1 Strategy Session", desc: "Work through your development plan with a coach", icon: "🎯" },
        ].map((card) => (
          <div
            key={card.title}
            className="bg-slate-800 rounded-2xl p-5 border border-slate-700 text-center cursor-pointer hover:border-purple-500/50 hover:bg-purple-500/5 transition-all group"
          >
            <div className="text-2xl mb-3">{card.icon}</div>
            <h4 className="text-white font-semibold text-sm mb-1">{card.title}</h4>
            <p className="text-slate-400 text-xs">{card.desc}</p>
            <p className="text-purple-400 text-xs mt-3 font-medium group-hover:text-purple-300 transition-colors">
              Learn more →
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
