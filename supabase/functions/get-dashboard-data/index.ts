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
      { data: commitments },
    ] = await Promise.all([
      supabase
        .from("assessments")
        .select("id, email, overall_score, lowest_dimension, strongest_dimension, completed_at, created_at")
        .order("created_at", { ascending: false }),
      supabase
        .from("assessment_actions")
        .select("id, assessment_id, action_type, created_at"),
      supabase
        .from("assessment_commitments")
        .select("assessment_id"),
    ]);

    const allAssessments = assessments ?? [];
    const allActions = actions ?? [];

    const totalStarted = allAssessments.length;
    const totalCompleted = allAssessments.filter((a) => a.completed_at !== null).length;
    const totalEmails = allAssessments.filter((a) => a.email && a.email.length > 0).length;
    const strategyClicks = allActions.filter((a) => a.action_type === "strategy_session_clicked").length;
    const toolkitClicks = allActions.filter((a) => a.action_type === "toolkit_clicked").length;
    const workshopClicks = allActions.filter((a) => a.action_type === "workshop_clicked").length;

    const completionRate = totalStarted > 0 ? Math.round((totalCompleted / totalStarted) * 100) : 0;
    const emailCaptureRate = totalCompleted > 0 ? Math.round((totalEmails / totalCompleted) * 100) : 0;
    const conversionRate = totalEmails > 0 ? Math.round((strategyClicks / totalEmails) * 100) : 0;
    const toolkitRate = totalEmails > 0 ? Math.round((toolkitClicks / totalEmails) * 100) : 0;
    const workshopRate = totalEmails > 0 ? Math.round((workshopClicks / totalEmails) * 100) : 0;
    const strategyRate = totalEmails > 0 ? Math.round((strategyClicks / totalEmails) * 100) : 0;

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

    const actionsByAssessment: Record<string, { type: string; created_at: string }> = {};
    for (const action of allActions) {
      if (!action.assessment_id) continue;
      const existing = actionsByAssessment[action.assessment_id];
      if (!existing || action.created_at > existing.created_at) {
        actionsByAssessment[action.assessment_id] = {
          type: action.action_type,
          created_at: action.created_at,
        };
      }
    }

    const leads = allAssessments.slice(0, 50).map((a) => ({
      id: a.id,
      email: a.email,
      overall_score: a.overall_score,
      lowest_dimension: a.lowest_dimension,
      strongest_dimension: a.strongest_dimension,
      last_action: actionsByAssessment[a.id]?.type ?? null,
      created_at: a.created_at,
    }));

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
      },
      dimensions: {
        averages: dimensionAverages,
        mostCommonWeak: mostCommonWeak ? { key: mostCommonWeak[0], count: mostCommonWeak[1] } : null,
      },
      actions: {
        toolkitRate,
        workshopRate,
        strategyRate,
        toolkitClicks,
        workshopClicks,
        strategyClicks,
      },
      leads,
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return json({ error: "Internal server error" }, 500);
  }
});
