import { useState } from "react";

interface EmailGateProps {
  onUnlock: (email: string, role: string, name: string) => void;
}

export function EmailGate({ onUnlock }: EmailGateProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState<{ email?: string; role?: string }>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: { email?: string; role?: string } = {};
    if (!email || !email.includes("@")) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!role.trim()) {
      newErrors.role = "Please enter your role or title.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    onUnlock(email, role.trim(), name.trim());
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

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full bg-slate-800 border border-slate-600 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            autoComplete="given-name"
          />
          <p className="text-slate-600 text-xs mt-1">First name (optional)</p>
        </div>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: undefined })); }}
            placeholder="your@email.com"
            className="w-full bg-slate-800 border border-slate-600 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            autoComplete="email"
          />
          {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
        </div>
        <div>
          <input
            type="text"
            value={role}
            onChange={(e) => { setRole(e.target.value); setErrors(prev => ({ ...prev, role: undefined })); }}
            placeholder="e.g., Engineering Manager, Founder, Team Lead"
            className="w-full bg-slate-800 border border-slate-600 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            autoComplete="organization-title"
          />
          {errors.role && <p className="text-red-400 text-xs mt-1.5">{errors.role}</p>}
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 text-sm whitespace-nowrap shadow-lg shadow-purple-900/30"
        >
          Unlock My Roadmap
        </button>
      </form>

      <p className="text-slate-600 text-xs mt-3">
        This is only to send you your assessment report and roadmap. No subscription.
      </p>
    </div>
  );
}
