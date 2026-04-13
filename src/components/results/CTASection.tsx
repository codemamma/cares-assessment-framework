import { useState } from "react";
import { AssessmentResults } from "@/types/assessment";
import { trackAction } from "@/lib/api";

interface CTASectionProps {
  results: AssessmentResults;
  email: string;
  assessmentId: string | null;
}

export function CTASection({ assessmentId }: CTASectionProps) {
  const [strategyDone, setStrategyDone] = useState(false);

  async function handleStrategySession() {
    if (assessmentId) {
      await trackAction(assessmentId, "strategy_session_clicked");
    }
    setStrategyDone(true);
  }

  async function handleToolkit() {
    if (assessmentId) {
      await trackAction(assessmentId, "toolkit_clicked");
    }
  }

  async function handleWorkshop() {
    if (assessmentId) {
      await trackAction(assessmentId, "workshop_clicked");
    }
  }

  if (strategyDone) {
    return (
      <div className="bg-green-900/20 border border-green-700/40 rounded-2xl p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
          <span className="text-green-400 text-xl">✓</span>
        </div>
        <h3 className="text-white font-bold text-lg mb-2">You're all set</h3>
        <p className="text-slate-300 text-sm max-w-sm mx-auto leading-relaxed">
          Your leadership roadmap has been shared. We'll reach out to schedule your session.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-purple-900/40 to-slate-900 border border-purple-500/30 rounded-2xl p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div>
            <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
              Recommended
            </p>
            <h3 className="text-white font-bold text-lg mb-1">
              1:1 Strategy Session
            </h3>
            <p className="text-slate-400 text-sm">
              Book a free 15-minute strategy session with Saby Waraich.
            </p>
          </div>
          <button
            onClick={handleStrategySession}
            className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-200 text-sm shadow-lg shadow-purple-900/40 whitespace-nowrap flex-shrink-0"
          >
            Book Free Session
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          {
            title: "CARES Leadership Toolkit",
            desc: "Frameworks and worksheets for daily practice",
            handler: handleToolkit,
          },
          {
            title: "Team Workshop",
            desc: "Bring the CARES framework to your entire leadership team",
            handler: handleWorkshop,
          },
        ].map((card) => (
          <div
            key={card.title}
            onClick={card.handler}
            className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 cursor-pointer hover:border-slate-600 hover:bg-slate-800 transition-all group"
          >
            <h4 className="text-slate-300 font-semibold text-sm mb-1 group-hover:text-white transition-colors">
              {card.title}
            </h4>
            <p className="text-slate-500 text-xs leading-relaxed">{card.desc}</p>
            <p className="text-slate-500 text-xs mt-3 group-hover:text-purple-400 transition-colors">
              Learn more →
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
