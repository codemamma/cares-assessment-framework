import { useState, useEffect } from "react";
import { assessmentCategories } from "@/data/caresQuestions";
import { CommitmentData, CareCategoryKey } from "@/types/assessment";
import { saveCommitmentData, loadCommitmentData } from "@/lib/storage";
import { saveCommitment, trackAction } from "@/lib/api";

interface Props {
  assessmentId: string | null;
}

export function CommitmentToGrowth({ assessmentId }: Props) {
  const [data, setData] = useState<CommitmentData>({
    focusArea: "",
    practice: "",
    measure: "",
    support: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setData(loadCommitmentData());
  }, []);

  function handleChange(field: keyof CommitmentData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  }

  async function handleSave() {
    if (!data.focusArea || !data.practice) {
      setError("Please select a capability and describe what you'll practice.");
      return;
    }

    setSaving(true);
    setError(null);
    saveCommitmentData(data);

    let success = false;
    if (assessmentId) {
      success = await saveCommitment({
        assessmentId,
        focus_area: data.focusArea,
        practice: data.practice,
        measure: data.measure,
        support: data.support,
      });
      if (success) {
        await trackAction(assessmentId, "commitment");
      }
    } else {
      success = true;
    }

    setSaving(false);

    if (success) {
      setSubmitted(true);
    } else {
      setError("Something went wrong. Please try again.");
    }
  }

  const inputClass =
    "w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  if (submitted) {
    const focusLabel =
      assessmentCategories.find((c) => c.key === data.focusArea)?.label ?? data.focusArea;

    return (
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-green-500/30">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mt-0.5">
            <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-white font-bold text-lg mb-1">Commitment saved</h2>
            <p className="text-slate-400 text-sm mb-5">
              Your commitment has been saved and a confirmation has been sent to your email.
            </p>
            <div className="bg-slate-800/60 border border-slate-700 rounded-xl divide-y divide-slate-700/60">
              {data.focusArea && (
                <div className="px-4 py-3">
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Capability Focus</p>
                  <p className="text-slate-200 text-sm">{focusLabel}</p>
                </div>
              )}
              {data.practice && (
                <div className="px-4 py-3">
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">What You'll Practice</p>
                  <p className="text-slate-200 text-sm leading-relaxed">{data.practice}</p>
                </div>
              )}
              {data.measure && (
                <div className="px-4 py-3">
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">How You'll Measure Progress</p>
                  <p className="text-slate-200 text-sm leading-relaxed">{data.measure}</p>
                </div>
              )}
              {data.support && (
                <div className="px-4 py-3">
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Who Will Support You</p>
                  <p className="text-slate-200 text-sm leading-relaxed">{data.support}</p>
                </div>
              )}
            </div>
            <p className="text-slate-500 text-xs mt-4 italic">
              Consistency creates change. Revisit this commitment weekly and track your progress.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Commitment to Growth</h2>
        <p className="text-slate-400">
          Leadership development begins with intention. Choose one area to focus on and define your commitment.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Which capability will you focus on? <span className="text-red-400">*</span>
          </label>
          <select
            value={data.focusArea}
            onChange={(e) => handleChange("focusArea", e.target.value as CareCategoryKey | "")}
            className={inputClass}
          >
            <option value="">Select a capability...</option>
            {assessmentCategories.map((cat) => (
              <option key={cat.key} value={cat.key}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            What will you practice? <span className="text-red-400">*</span>
          </label>
          <textarea
            value={data.practice}
            onChange={(e) => handleChange("practice", e.target.value)}
            placeholder="Describe one specific behavior or habit you'll work on..."
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            How will you measure progress?
          </label>
          <textarea
            value={data.measure}
            onChange={(e) => handleChange("measure", e.target.value)}
            placeholder="What signals or feedback will tell you you're improving?..."
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Who will support you?
          </label>
          <textarea
            value={data.support}
            onChange={(e) => handleChange("support", e.target.value)}
            placeholder="Name a mentor, peer, coach, or colleague who can help hold you accountable..."
            rows={2}
            className={`${inputClass} resize-none`}
          />
        </div>

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        <div className="pt-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 text-sm flex items-center gap-2"
          >
            {saving ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Saving...
              </>
            ) : (
              "Save Commitment"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
