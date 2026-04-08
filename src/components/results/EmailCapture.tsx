import { useState } from "react";
import { EmailCaptureData } from "@/types/assessment";
import { saveEmailCapture } from "@/lib/storage";

interface EmailCaptureProps {
  onComplete?: (data: EmailCaptureData) => void;
  onSkip?: () => void;
}

export function EmailCapture({ onComplete, onSkip }: EmailCaptureProps) {
  const [data, setData] = useState<EmailCaptureData>({
    firstName: "",
    email: "",
    role: "",
    company: "",
  });

  function handleChange(field: keyof EmailCaptureData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    saveEmailCapture(data);
    onComplete?.(data);
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-2">
          Get Your Full Report
        </h2>
        <p className="text-slate-400 mb-6 text-sm">
          Enter your details to receive a downloadable summary of your CARES Leadership Profile.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1.5">
              First Name
            </label>
            <input
              type="text"
              value={data.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              placeholder="Your first name"
              required
              className="w-full bg-slate-800 border border-slate-600 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="you@company.com"
              required
              className="w-full bg-slate-800 border border-slate-600 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1.5">
              Role / Title
            </label>
            <input
              type="text"
              value={data.role}
              onChange={(e) => handleChange("role", e.target.value)}
              placeholder="e.g. VP Engineering, Team Lead"
              className="w-full bg-slate-800 border border-slate-600 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1.5">
              Company
            </label>
            <input
              type="text"
              value={data.company}
              onChange={(e) => handleChange("company", e.target.value)}
              placeholder="Organization name"
              className="w-full bg-slate-800 border border-slate-600 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm"
            >
              Send My Report
            </button>
            <button
              type="button"
              onClick={onSkip}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white font-semibold px-4 py-3 rounded-xl transition-all text-sm"
            >
              Skip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
