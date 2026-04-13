import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -20%, #8b5cf6 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-1.5 text-xs font-semibold text-purple-300 uppercase tracking-wider mb-8">
            Leadership Framework
          </div>

          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
            CARES Leadership{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200">
              Self-Assessment
            </span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Gain an honest, reflective view of your leadership capabilities
            across five dimensions that define the most effective leaders today.
          </p>

          <div className="inline-flex items-center gap-2 bg-slate-800/60 border border-slate-700 rounded-full px-5 py-2 text-sm text-slate-300 mb-12">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block" />
            5 dimensions
            <span className="text-slate-600">·</span>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block" />
            25 behaviors
            <span className="text-slate-600">·</span>
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block" />
            3–5 minutes
          </div>

          <div className="flex justify-center mb-20">
            <Link
              to="/assessment"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-bold px-10 py-4 rounded-2xl text-lg transition-all duration-200 shadow-xl shadow-purple-900/40 hover:shadow-purple-900/60 hover:scale-105"
            >
              Start Assessment
              <span className="text-purple-200">→</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">
            What you&apos;ll discover
          </h2>
          <p className="text-slate-400">
            A clear, evidence-based picture of your current leadership profile
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {[
            {
              icon: "◉",
              title: "Overall CARES Score",
              desc: "A normalized score out of 100 across all five leadership dimensions",
              color: "text-purple-400",
              bg: "bg-purple-500/10 border-purple-500/20",
            },
            {
              icon: "★",
              title: "Strongest Capability",
              desc: "The dimension where your leadership naturally excels",
              color: "text-yellow-400",
              bg: "bg-yellow-500/10 border-yellow-500/20",
            },
            {
              icon: "◎",
              title: "Development Opportunity",
              desc: "The area with the greatest potential for growth and impact",
              color: "text-amber-400",
              bg: "bg-amber-500/10 border-amber-500/20",
            },
            {
              icon: "→",
              title: "Personalized Next Steps",
              desc: "Targeted recommendations and reading aligned to your results",
              color: "text-blue-400",
              bg: "bg-blue-500/10 border-blue-500/20",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl p-6 border bg-slate-900/60 border-slate-800 flex gap-4 items-start"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${item.bg}`}
              >
                <span className={`text-lg ${item.color}`}>{item.icon}</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 mb-12">
          <h2 className="text-xl font-bold text-white mb-6 text-center">
            The CARES Framework
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {[
              { letter: "C", label: "Communicate", sub: "with Empathy" },
              { letter: "A", label: "Adapt", sub: "with Agility" },
              { letter: "R", label: "Relationships", sub: "Built on Trust" },
              { letter: "E", label: "Empower", sub: "with Trust" },
              { letter: "S", label: "Stay Calm", sub: "through Challenges" },
            ].map((item) => (
              <div key={item.letter} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-300 font-black text-xl">
                    {item.letter}
                  </span>
                </div>
                <p className="text-white font-semibold text-sm">{item.label}</p>
                <p className="text-slate-500 text-xs">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-slate-500 text-sm mb-6">
            No account needed. Your email is only used to send your report and roadmap — nothing else.
          </p>
          <Link
            to="/assessment"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-bold px-10 py-4 rounded-2xl text-lg transition-all duration-200 shadow-xl shadow-purple-900/40 hover:scale-105"
          >
            Begin Your Assessment
            <span className="text-purple-200">→</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
