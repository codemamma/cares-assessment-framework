"use client";

import { useState, useEffect } from "react";
import { assessmentCategories } from "@/data/caresQuestions";
import { CommitmentData, CareCategoryKey } from "@/types/assessment";
import { saveCommitmentData, loadCommitmentData } from "@/lib/storage";

export function CommitmentToGrowth() {
  const [data, setData] = useState<CommitmentData>({
    focusArea: "",
    practice: "",
    measure: "",
    support: "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setData(loadCommitmentData());
  }, []);

  function handleChange(field: keyof CommitmentData, value: string) {
    const updated = { ...data, [field]: value };
    setData(updated);
    setSaved(false);
  }

  function handleSave() {
    saveCommitmentData(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="bg-slate-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              Commitment to Growth
            </h2>
            <p className="text-slate-400">
              Leadership development begins with intention. Choose one area to
              focus on and define your commitment.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Which capability will you focus on?
              </label>
              <select
                value={data.focusArea}
                onChange={(e) =>
                  handleChange("focusArea", e.target.value as CareCategoryKey | "")
                }
                className="w-full bg-slate-700 border border-slate-600 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                What will you practice?
              </label>
              <textarea
                value={data.practice}
                onChange={(e) => handleChange("practice", e.target.value)}
                placeholder="Describe one specific behavior or habit you'll work on..."
                rows={3}
                className="w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
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
                className="w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
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
                className="w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleSave}
                className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 text-sm"
              >
                Save Commitment
              </button>
              {saved && (
                <span className="text-green-400 text-sm font-medium animate-fade-in">
                  Saved successfully
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
