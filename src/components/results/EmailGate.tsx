import { useState } from "react";

interface EmailGateProps {
  onUnlock: (email: string) => void;
}

export function EmailGate({ onUnlock }: EmailGateProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    onUnlock(email);
  }

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8">
      <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2">
        Personalized Roadmap
      </p>
      <h2 className="text-xl font-bold text-white mb-2">
        Unlock Your Development Roadmap
      </h2>
      <p className="text-slate-400 text-sm mb-6 leading-relaxed">
        Get your personalized roadmap, recommended chapters, and next steps.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            placeholder="your@email.com"
            className="w-full bg-slate-800 border border-slate-600 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            autoComplete="email"
          />
          {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 text-sm whitespace-nowrap shadow-lg shadow-purple-900/30"
        >
          Unlock My Roadmap
        </button>
      </form>

      <p className="text-slate-600 text-xs mt-3">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}
