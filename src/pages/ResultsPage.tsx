import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import {
  loadAssessmentResponses,
  clearAssessmentResponses,
  saveEmailCapture,
  loadEmailCapture,
  saveAssessmentId,
  loadAssessmentId,
} from '@/lib/storage'
import { calculateResults, generateMockResponses } from '@/lib/scoring'
import { AssessmentResults, CareCategoryKey } from '@/types/assessment'
import { ScoreHero } from '@/components/results/ScoreHero'
import { CategoryBreakdown } from '@/components/results/CategoryBreakdown'
import { InsightCard } from '@/components/results/InsightCard'
import { EmailGate } from '@/components/results/EmailGate'
import { RoadmapSteps, SuggestedReading } from '@/components/results/RecommendationCard'
import { CommitmentToGrowth } from '@/components/results/CommitmentToGrowth'
import { CTASection } from '@/components/results/CTASection'
import { recommendationsByCategory, chapterMap, supportingChapters } from '@/data/recommendations'
import { assessmentCategories } from '@/data/caresQuestions'
import { submitAssessment, fetchAssessment, FetchAssessmentResult } from '@/lib/api'
import { getScoreBand } from '@/lib/scoring'

function getReadingList(lowestCategory: CareCategoryKey) {
  const primary = chapterMap[lowestCategory]
  const always = "CARES in Action"
  const other = supportingChapters.filter((c) => c !== always)[0]
  return [
    { title: primary.title, isPrimary: true },
    { title: always, isPrimary: false },
    { title: other, isPrimary: false },
  ]
}

const shortLabelMap = Object.fromEntries(
  assessmentCategories.map((c) => [c.key, c.shortLabel])
)

function hydrateResultsFromDb(data: FetchAssessmentResult): AssessmentResults {
  const categoryScores = data.categoryScores.map((s) => ({
    key: s.category_key,
    label: s.label,
    shortLabel: shortLabelMap[s.category_key] ?? s.label,
    raw: s.raw,
    max: s.max,
    percentage: s.percentage,
  }))

  const sorted = [...categoryScores].sort((a, b) => b.raw - a.raw)

  return {
    responses: {},
    categoryScores,
    rawScore: data.assessment.raw_score,
    normalizedScore: data.assessment.overall_score,
    highestCategory: sorted[0],
    lowestCategory: sorted[sorted.length - 1],
    scoreBand: getScoreBand(data.assessment.overall_score),
  }
}

const DEV_MOCK = import.meta.env.DEV

export default function ResultsPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [results, setResults] = useState<AssessmentResults | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [assessmentId, setAssessmentId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function init() {
      const idFromUrl = searchParams.get('id')
      const idFromStorage = loadAssessmentId()
      const existingId = idFromUrl || idFromStorage

      if (existingId) {
        const fetched = await fetchAssessment(existingId)
        if (cancelled) return
        if (fetched) {
          const hydrated = hydrateResultsFromDb(fetched)
          setResults(hydrated)
          setEmail(fetched.assessment.email)
          setAssessmentId(existingId)
          saveAssessmentId(existingId)
          if (!idFromUrl) {
            setSearchParams({ id: existingId }, { replace: true })
          }
          setLoading(false)
          return
        }
      }

      const responses = loadAssessmentResponses()
      const hasResponses = Object.keys(responses).length === 25

      if (!hasResponses && DEV_MOCK) {
        setResults(calculateResults(generateMockResponses()))
      } else if (!hasResponses) {
        navigate('/assessment')
        return
      } else {
        setResults(calculateResults(responses))
      }

      const savedEmail = loadEmailCapture()
      if (savedEmail?.email) {
        setEmail(savedEmail.email)
      }

      setLoading(false)
    }

    init()
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleEmailUnlock(submittedEmail: string, submittedRole: string, submittedName: string) {
    setEmail(submittedEmail)
    saveEmailCapture({ firstName: submittedName, email: submittedEmail, role: submittedRole, company: '' })

    if (results) {
      const lowestKey = results.lowestCategory.key
      const recs = recommendationsByCategory[lowestKey]
      const roadmapSteps = recs?.recommendations.slice(0, 3) ?? []
      const recommendedChapters = getReadingList(lowestKey)

      const id = await submitAssessment({
        email: submittedEmail,
        role: submittedRole,
        name: submittedName || null,
        overall_score: results.normalizedScore,
        raw_score: results.rawScore,
        score_band: results.scoreBand.label,
        lowest_dimension: results.lowestCategory.key,
        strongest_dimension: results.highestCategory.key,
        roadmap_steps: roadmapSteps,
        recommended_chapters: recommendedChapters,
        categoryScores: results.categoryScores,
      })

      if (id) {
        setAssessmentId(id)
        saveAssessmentId(id)
        setSearchParams({ id }, { replace: true })
      }
    }

    setTimeout(() => {
      document.getElementById('roadmap-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  function handleRetake() {
    clearAssessmentResponses()
    navigate('/assessment')
  }

  if (loading || !results) {
    return (
      <div className="min-h-screen bg-[#07111f] flex items-center justify-center">
        <div className="text-slate-400 text-lg">Loading your results...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#07111f]">
      <ScoreHero results={results} />
      <CategoryBreakdown categoryScores={results.categoryScores} />

      <div className="border-t border-slate-800/60 bg-[#07111f] py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Key Insights
          </p>
          <h2 className="text-xl font-bold text-white mb-6">
            What your results reveal
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
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

          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
            <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
              Focus Insight
            </p>
            <p className="text-white text-base leading-relaxed">
              Your biggest growth lever is{' '}
              <span className="font-semibold text-amber-300">
                {results.lowestCategory.label}
              </span>
              . This is the capability that will unlock your leadership effectiveness.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800/60 bg-slate-900/30 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {!email ? (
            <EmailGate onUnlock={handleEmailUnlock} />
          ) : (
            <div id="roadmap-section" className="space-y-12">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Development Roadmap
                </p>
                <h2 className="text-xl font-bold text-white mb-6">
                  Your next three moves
                </h2>
                <RoadmapSteps lowestCategory={results.lowestCategory.key} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-2">
                  Recommended Reading from the CARES Framework
                </h2>
                <p className="text-sm text-slate-400 mb-6">
                  Based on your assessment, here's where to start.
                </p>
                <SuggestedReading lowestCategory={results.lowestCategory.key} />
              </div>
            </div>
          )}
        </div>
      </div>

      {email && (
        <>
          <div className="border-t border-slate-800/60 bg-[#07111f] py-12 px-4">
            <div className="max-w-3xl mx-auto">
              <CommitmentToGrowth assessmentId={assessmentId} />
            </div>
          </div>

          <div className="border-t border-slate-800/60 bg-slate-900/30 py-12 px-4">
            <div className="max-w-3xl mx-auto">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Next Steps
              </p>
              <h2 className="text-xl font-bold text-white mb-6">
                Take action on your results
              </h2>
              <CTASection results={results} email={email} assessmentId={assessmentId} />
            </div>
          </div>
        </>
      )}

      <div className="border-t border-slate-800 bg-[#07111f] py-8 px-4">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            Retake after 30 days to measure your growth.
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleRetake}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white font-medium px-5 py-2.5 rounded-xl transition-all text-sm"
            >
              Retake Assessment
            </button>
            <Link
              to="/"
              className="text-slate-500 hover:text-slate-300 font-medium px-5 py-2.5 rounded-xl transition-all text-sm"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
