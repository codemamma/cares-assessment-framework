"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loadAssessmentResponses, clearAssessmentResponses } from "@/lib/storage";
import { calculateResults, generateMockResponses } from "@/lib/scoring";
import { AssessmentResults } from "@/types/assessment";
import { ScoreHero } from "@/components/results/ScoreHero";
import { CategoryBreakdown } from "@/components/results/CategoryBreakdown";
import { InsightCard } from "@/components/results/InsightCard";
import { RecommendationCard } from "@/components/results/RecommendationCard";
import { CommitmentToGrowth } from "@/components/results/CommitmentToGrowth";

const DEV_MOCK = process.env.NODE_ENV === "development";

export default function ResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const responses = loadAssessmentResponses();
    const hasResponses = Object.keys(responses).length === 25;

    if (!hasResponses && DEV_MOCK) {
      const mockResponses = generateMockResponses();
      setResults(calculateResults(mockResponses));
    } else if (!hasResponses) {
      router.push("/assessment");
      return;
    } else {
      setResults(calculateResults(responses));
    }
    setMounted(true);
  }, [router]);

  function handleRetake() {
    clearAssessmentResponses();
    router.push("/assessment");
  }

  if (!mounted || !results) {
    return (
      <div className="min-h-screen bg-[#07111f] flex items-center justify-center">
        <div className="text-slate-400 text-lg">Calculating your results...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07111f]">
      <ScoreHero results={results} />
      <CategoryBreakdown categoryScores={results.categoryScores} />

      <div className="bg-[#07111f] py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2">Key Insights</h2>
          <p className="text-slate-400 mb-6">
            Your leadership profile highlights these key findings
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InsightCard
              type="strength"
              categoryLabel={results.highestCategory.label}
              score={results.highestCategory.raw}
              maxScore={results.highestCategory.max}
              percentage={results.highestCategory.percentage}
            />
            <InsightCard
              type="opportunity"
              categoryLabel={results.lowestCategory.label}
              score={results.lowestCategory.raw}
              maxScore={results.lowestCategory.max}
              percentage={results.lowestCategory.percentage}
            />
          </div>
        </div>
      </div>

      <div className="bg-slate-900/50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2">
            Development Roadmap
          </h2>
          <p className="text-slate-400 mb-8">
            Targeted guidance based on your lowest-scoring dimension
          </p>
          <RecommendationCard lowestCategory={results.lowestCategory.key} />
        </div>
      </div>

      <CommitmentToGrowth />

      <div className="bg-[#07111f] py-12 px-4 border-t border-slate-800">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-semibold">Ready to go deeper?</p>
            <p className="text-slate-400 text-sm">
              Retake the assessment after 30 days to measure your growth.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleRetake}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm"
            >
              Retake Assessment
            </button>
            <Link
              href="/"
              className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
