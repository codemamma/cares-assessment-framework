import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const AMAZON_BOOK_URL =
  "https://www.amazon.com/dp/1964644593?ref=cm_sw_r_ffobk_cp_ud_dp_JPQ78VTAXV96F7JPM3PA&ref_=cm_sw_r_ffobk_cp_ud_dp_JPQ78VTAXV96F7JPM3PA&social_share=cm_sw_r_ffobk_cp_ud_dp_JPQ78VTAXV96F7JPM3PA&bestFormat=true";

const CALENDLY_BASE_URL = "https://calendly.com/waraich-saby/30min";

const REDIRECT_MAP: Record<string, string> = {
  book: AMAZON_BOOK_URL,
  strategy_session: CALENDLY_BASE_URL,
};

const ALLOWED_ACTIONS = new Set(Object.keys(REDIRECT_MAP));

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const assessmentId = url.searchParams.get("assessmentId");
    const actionType = url.searchParams.get("actionType");

    if (!assessmentId || !actionType) {
      return new Response(JSON.stringify({ error: "Missing required parameters" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!ALLOWED_ACTIONS.has(actionType)) {
      return new Response(JSON.stringify({ error: "Invalid actionType" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    await supabase.from("assessment_actions").insert({
      assessment_id: assessmentId,
      action_type: actionType,
    });

    let redirectUrl = REDIRECT_MAP[actionType];

    if (actionType === "strategy_session") {
      const email = url.searchParams.get("email") ?? "";
      redirectUrl = `${CALENDLY_BASE_URL}?source=cares_assessment_email&email=${encodeURIComponent(email)}`;
    }

    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        Location: redirectUrl,
      },
    });
  } catch (err) {
    console.error("track-action-and-redirect error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
