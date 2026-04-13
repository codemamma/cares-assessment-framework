import { useState } from "react";
import { AssessmentResults } from "@/types/assessment";
import { trackAction } from "@/lib/api";

interface CTASectionProps {
  results: AssessmentResults;
  email: string;
  assessmentId: string | null;
}

type ToastState = {
  visible: boolean;
  message: string;
};

export function CTASection({ assessmentId }: CTASectionProps) {
  const [strategyDone, setStrategyDone] = useState(false);
  const [toast, setToast] = useState<ToastState>({ visible: false, message: "" });

  function showToast(message: string) {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: "" }), 4000);
  }

  async function handleStrategySession() {
    if (assessmentId) {
      await trackAction(assessmentId, "strategy_session_clicked");
    }
    setStrategyDone(true);
  }

  async function handleToolkit() {
    if (assessmentId) {
      await trackAction(assessmentId, "toolkit_interest");
    }
    showToast("Toolkit launching soon. Get early access.");
  }

  async function handleOrgAssessment() {
    if (assessmentId) {
      await trackAction(assessmentId, "org_assessment_interest");
    }
    showToast("Organizational assessment launching soon. Join the waitlist.");
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
    <div className="space-y-4 relative">
      {toast.visible && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-800 border border-slate-600 text-slate-200 text-sm px-5 py-3 rounded-xl shadow-2xl transition-all duration-300">
          {toast.message}
        </div>
      )}

      <div className="bg-gradient-to-br from-blue-900/40 to-slate-900 border border-blue-500/30 rounded-2xl p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div>
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
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
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-200 text-sm shadow-lg shadow-blue-900/40 whitespace-nowrap flex-shrink-0"
          >
            Book Free Session
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div
          onClick={handleToolkit}
          className="relative bg-slate-800/40 border border-slate-700/60 rounded-2xl p-5 cursor-pointer hover:border-slate-600 hover:bg-slate-800/60 transition-all group opacity-85 hover:opacity-100"
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="text-slate-300 font-semibold text-sm group-hover:text-white transition-colors leading-snug">
              CARES Leadership Toolkit
            </h4>
            <span className="flex-shrink-0 text-[10px] font-semibold uppercase tracking-wide bg-amber-500/15 text-amber-400 border border-amber-500/25 px-2 py-0.5 rounded-full">
              Coming Soon
            </span>
          </div>
          <p className="text-slate-500 text-xs leading-relaxed">
            Practical frameworks, worksheets, and guided exercises from each CARES dimension to help you apply your results in real-world leadership situations.
          </p>
          <p className="text-slate-600 text-xs leading-relaxed mt-2">
            Includes chapter-based exercises, reflection prompts, and action templates.
          </p>
          <p className="text-slate-500 text-xs mt-3 group-hover:text-blue-400 transition-colors">
            Explore Toolkit →
          </p>
        </div>

        <div
          onClick={handleOrgAssessment}
          className="relative bg-slate-800/40 border border-slate-700/60 rounded-2xl p-5 cursor-pointer hover:border-slate-600 hover:bg-slate-800/60 transition-all group opacity-85 hover:opacity-100"
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="text-slate-300 font-semibold text-sm group-hover:text-white transition-colors leading-snug">
              CARES Organizational Assessment
            </h4>
            <span className="flex-shrink-0 text-[10px] font-semibold uppercase tracking-wide bg-amber-500/15 text-amber-400 border border-amber-500/25 px-2 py-0.5 rounded-full">
              Coming Soon
            </span>
          </div>
          <p className="text-slate-500 text-xs leading-relaxed">
            Assess alignment, communication, and leadership effectiveness across your entire team or organization.
          </p>
          <p className="text-slate-600 text-xs leading-relaxed mt-2">
            Designed for leadership teams and enterprise workshops.
          </p>
          <p className="text-slate-500 text-xs mt-3 group-hover:text-blue-400 transition-colors">
            Coming Soon →
          </p>
        </div>
      </div>
    </div>
  );
}
