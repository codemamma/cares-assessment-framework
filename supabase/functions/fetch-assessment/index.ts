import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
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
    const { assessmentId } = await req.json();

    if (!assessmentId) {
      return json({ error: "assessmentId is required" }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: assessment, error: assessmentErr } = await supabase
      .from("assessments")
      .select("*")
      .eq("id", assessmentId)
      .maybeSingle();

    if (assessmentErr || !assessment) {
      return json({ error: "Assessment not found" }, 404);
    }

    const { data: categoryScores } = await supabase
      .from("assessment_category_scores")
      .select("*")
      .eq("assessment_id", assessmentId);

    const { data: commitment } = await supabase
      .from("assessment_commitments")
      .select("*")
      .eq("assessment_id", assessmentId)
      .maybeSingle();

    return json({
      assessment,
      categoryScores: categoryScores ?? [],
      commitment: commitment ?? null,
    });
  } catch (err) {
    console.error("fetch-assessment error:", err);
    return json({ error: "Internal server error" }, 500);
  }
});
