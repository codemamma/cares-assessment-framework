import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const [
      { data: assessments },
      { data: actions },
    ] = await Promise.all([
      supabase
        .from("assessments")
        .select("id, email, name, overall_score, score_band, lowest_dimension, strongest_dimension, completed_at, created_at")
        .order("created_at", { ascending: false }),
      supabase
        .from("assessment_actions")
        .select("id, assessment_id, action_type, created_at"),
    ]);

    const allAssessments = assessments ?? [];
    const allActions = actions ?? [];

    const totalStarted = allAssessments.length;
    const totalCompleted = allAssessments.filter((a) => a.completed_at !== null).length;
    const totalEmails = allAssessments.filter((a) => a.email && a.email.length > 0).length;
    const strategyClicks = allActions.filter((a) => a.action_type === "strategy_session_clicked" || a.action_type === "strategy_session").length;
    const toolkitClicks = allActions.filter((a) => a.action_type === "toolkit_clicked" || a.action_type === "toolkit").length;
    const workshopClicks = allActions.filter((a) => a.action_type === "workshop_clicked" || a.action_type === "workshop").length;
    const bookClicks = allActions.filter((a) => a.action_type === "book").length;
    const commitmentClicks = allActions.filter((a) => a.action_type === "commitment").length;

    const completionRate = totalStarted > 0 ? Math.round((totalCompleted / totalStarted) * 100) : 0;
    const emailCaptureRate = totalCompleted > 0 ? Math.round((totalEmails / totalCompleted) * 100) : 0;
    const emailConversionFromStarted = totalStarted > 0 ? Math.min(100, Math.round((totalEmails / totalStarted) * 100)) : 0;
    const conversionRate = totalEmails > 0 ? Math.round((strategyClicks / totalEmails) * 100) : 0;
    const toolkitRate = totalEmails > 0 ? Math.round((toolkitClicks / totalEmails) * 100) : 0;
    const workshopRate = totalEmails > 0 ? Math.round((workshopClicks / totalEmails) * 100) : 0;
    const strategyRate = totalEmails > 0 ? Math.round((strategyClicks / totalEmails) * 100) : 0;
    const bookRate = totalEmails > 0 ? Math.round((bookClicks / totalEmails) * 100) : 0;
    const commitmentRate = totalEmails > 0 ? Math.round((commitmentClicks / totalEmails) * 100) : 0;

    const actionRates: { name: string; rate: number }[] = [
      { name: "Toolkit", rate: toolkitRate },
      { name: "Workshop", rate: workshopRate },
      { name: "Strategy Session", rate: strategyRate },
      { name: "Book", rate: bookRate },
    ];
    const topActionEntry = actionRates.sort((a, b) => b.rate - a.rate)[0];
    const topAction = topActionEntry && topActionEntry.rate > 0 ? topActionEntry.name : null;
    const topActionRate = topActionEntry ? topActionEntry.rate : 0;

    const completedWithScores = allAssessments.filter((a) => a.completed_at !== null && typeof a.overall_score === "number");
    const avgScore = completedWithScores.length > 0
      ? Math.round(completedWithScores.reduce((sum, a) => sum + a.overall_score, 0) / completedWithScores.length)
      : 0;
    const pctLow = completedWithScores.length > 0
      ? Math.round((completedWithScores.filter((a) => a.overall_score < 50).length / completedWithScores.length) * 100)
      : 0;
    const pctMid = completedWithScores.length > 0
      ? Math.round((completedWithScores.filter((a) => a.overall_score >= 50 && a.overall_score <= 70).length / completedWithScores.length) * 100)
      : 0;
    const pctHigh = completedWithScores.length > 0
      ? Math.round((completedWithScores.filter((a) => a.overall_score > 70).length / completedWithScores.length) * 100)
      : 0;

    const dimensionKeys = [
      "communicate_with_empathy",
      "adapt_with_agility",
      "relationships_built_on_trust",
      "empower_with_trust",
      "stay_calm_through_challenges",
    ];

    const { data: categoryScores } = await supabase
      .from("assessment_category_scores")
      .select("category_key, label, percentage");

    const allScores = categoryScores ?? [];
    const dimensionAverages = dimensionKeys.map((key) => {
      const rows = allScores.filter((s) => s.category_key === key);
      const avg =
        rows.length > 0
          ? Math.round(rows.reduce((sum, r) => sum + r.percentage, 0) / rows.length)
          : 0;
      const label = rows[0]?.label ?? key.replace(/_/g, " ");
      return { key, label, avg };
    });

    const weaknessCounts: Record<string, number> = {};
    for (const a of allAssessments) {
      if (a.lowest_dimension) {
        weaknessCounts[a.lowest_dimension] = (weaknessCounts[a.lowest_dimension] ?? 0) + 1;
      }
    }
    const mostCommonWeak = Object.entries(weaknessCounts).sort((a, b) => b[1] - a[1])[0];

    const assessmentIdsByEmail: Record<string, string[]> = {};
    for (const a of allAssessments) {
      const key = a.email ?? a.id;
      if (!assessmentIdsByEmail[key]) assessmentIdsByEmail[key] = [];
      assessmentIdsByEmail[key].push(a.id);
    }

    const actionsByAssessmentId: Record<string, string[]> = {};
    for (const action of allActions) {
      if (!action.assessment_id) continue;
      if (!actionsByAssessmentId[action.assessment_id]) actionsByAssessmentId[action.assessment_id] = [];
      actionsByAssessmentId[action.assessment_id].push(action.action_type);
    }

    const PRIORITY_ORDER = [
      "strategy_session_clicked",
      "strategy_session",
      "org_assessment_interest",
      "toolkit_clicked",
      "toolkit",
      "book",
      "commitment",
      "workshop_clicked",
      "workshop",
    ];

    const seenEmails = new Set<string>();
    const leads: {
      id: string;
      email: string;
      name: string | null;
      overall_score: number;
      score_band: string | null;
      lowest_dimension: string;
      strongest_dimension: string;
      all_actions: string[];
      last_action: string | null;
      created_at: string;
    }[] = [];

    for (const a of allAssessments) {
      const key = a.email ?? a.id;
      if (seenEmails.has(key)) continue;
      seenEmails.add(key);

      const siblingIds = assessmentIdsByEmail[key] ?? [a.id];
      const allActionsForEmail = siblingIds.flatMap((id) => actionsByAssessmentId[id] ?? []);
      const uniqueActions = [...new Set(allActionsForEmail)];
      const primaryAction = PRIORITY_ORDER.find((p) => uniqueActions.includes(p)) ?? uniqueActions[0] ?? null;

      leads.push({
        id: a.id,
        email: a.email,
        name: a.name ?? null,
        overall_score: a.overall_score,
        score_band: a.score_band ?? null,
        lowest_dimension: a.lowest_dimension,
        strongest_dimension: a.strongest_dimension,
        all_actions: uniqueActions,
        last_action: primaryAction,
        created_at: a.created_at,
      });

      if (leads.length >= 50) break;
    }

    return json({
      kpis: {
        totalStarted,
        totalCompleted,
        totalEmails,
        strategyClicks,
      },
      funnel: {
        completionRate,
        emailCaptureRate,
        conversionRate,
        emailConversionFromStarted,
      },
      summary: {
        avgScore,
        pctLow,
        pctMid,
        pctHigh,
      },
      dimensions: {
        averages: dimensionAverages,
        mostCommonWeak: mostCommonWeak ? { key: mostCommonWeak[0], count: mostCommonWeak[1] } : null,
      },
      actions: {
        toolkitRate,
        workshopRate,
        strategyRate,
        bookRate,
        commitmentRate,
        toolkitClicks,
        workshopClicks,
        strategyClicks,
        bookClicks,
        commitmentClicks,
        topAction,
        topActionRate,
      },
      leads,
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return json({ error: "Internal server error" }, 500);
  }
});
