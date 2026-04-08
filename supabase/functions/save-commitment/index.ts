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
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { assessmentId, focus_area, practice, measure, support } = await req.json();

    if (!assessmentId) {
      return json({ error: "assessmentId is required" }, 400);
    }

    const { data: assessment } = await supabase
      .from("assessments")
      .select("id")
      .eq("id", assessmentId)
      .maybeSingle();

    if (!assessment) {
      return json({ error: "Assessment not found" }, 404);
    }

    const { data: existing } = await supabase
      .from("assessment_commitments")
      .select("id")
      .eq("assessment_id", assessmentId)
      .maybeSingle();

    if (existing) {
      await supabase
        .from("assessment_commitments")
        .update({
          focus_area: focus_area ?? "",
          practice: practice ?? "",
          measure: measure ?? "",
          support: support ?? "",
        })
        .eq("id", existing.id);
    } else {
      await supabase
        .from("assessment_commitments")
        .insert({
          assessment_id: assessmentId,
          focus_area: focus_area ?? "",
          practice: practice ?? "",
          measure: measure ?? "",
          support: support ?? "",
        });
    }

    return json({ success: true });
  } catch (err) {
    console.error("Unexpected error:", err);
    return json({ error: "Internal server error" }, 500);
  }
});
