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

const DIMENSION_LABELS: Record<string, string> = {
  communicate_with_empathy: "Communicate with Empathy",
  adapt_with_agility: "Adapt with Agility",
  relationships_built_on_trust: "Relationships Built on Trust",
  empower_with_trust: "Empower with Trust",
  stay_calm_through_challenges: "Stay Calm Through Challenges",
};

function buildCommitmentEmailHtml(params: {
  email: string;
  focus_area: string;
  practice: string;
  measure: string;
  support: string;
  supabaseUrl: string;
  assessmentId: string;
}): string {
  const { focus_area, practice, measure, support, supabaseUrl, assessmentId } = params;
  const focusLabel = DIMENSION_LABELS[focus_area] ?? focus_area;

  const row = (label: string, value: string) =>
    value
      ? `<tr>
          <td style="padding:16px 20px;border-bottom:1px solid #1e293b;vertical-align:top;">
            <p style="margin:0 0 4px;color:#64748b;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">${label}</p>
            <p style="margin:0;color:#cbd5e1;font-size:13px;line-height:1.6;">${value}</p>
          </td>
        </tr>`
      : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your CARES Commitment to Growth</title>
</head>
<body style="margin:0;padding:0;background:#07111f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#07111f;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

          <!-- Header -->
          <tr>
            <td style="padding-bottom:32px;">
              <p style="margin:0 0 4px;color:#a78bfa;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;">Commitment Confirmed</p>
              <h1 style="margin:0;color:#f1f5f9;font-size:24px;font-weight:800;">You've taken the next step.</h1>
            </td>
          </tr>

          <!-- Intro -->
          <tr>
            <td style="background:#0f172a;border:1px solid #1e293b;border-radius:16px;padding:24px;margin-bottom:24px;">
              <p style="margin:0;color:#94a3b8;font-size:14px;line-height:1.7;">
                Based on your CARES assessment, you've now defined a commitment to growth. This is where real leadership transformation begins.
              </p>
            </td>
          </tr>

          <tr><td style="height:24px;"></td></tr>

          <!-- Commitment Card -->
          <tr>
            <td style="padding-bottom:24px;">
              <p style="margin:0 0 4px;color:#64748b;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">Your Commitment to Growth</p>
              <h2 style="margin:0 0 16px;color:#f1f5f9;font-size:16px;font-weight:700;">Here's what you committed to</h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;border:1px solid #1e293b;border-radius:12px;border-collapse:collapse;overflow:hidden;">
                ${row("Capability Focus", focusLabel)}
                ${row("What You'll Practice", practice)}
                ${row("How You'll Measure Progress", measure)}
                ${row("Who Will Support You", support)}
              </table>
            </td>
          </tr>

          <!-- Closing Note -->
          <tr>
            <td style="background:#1c1a10;border:1px solid #44380044;border-radius:12px;padding:20px;margin-bottom:24px;">
              <p style="margin:0;color:#fde68a;font-size:13px;line-height:1.7;font-style:italic;">
                Consistency creates change. Revisit this commitment weekly and track your progress.
              </p>
            </td>
          </tr>

          <tr><td style="height:24px;"></td></tr>

          <!-- CTA -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e0a3c,#2d1155);border:1px solid #7c3aed44;border-radius:16px;padding:28px;text-align:center;margin-bottom:32px;">
              <h2 style="margin:0 0 8px;color:#f1f5f9;font-size:18px;font-weight:800;">Ready to accelerate your growth?</h2>
              <p style="margin:0 0 20px;color:#94a3b8;font-size:13px;">Book a free 15-minute strategy session with Saby Waraich.</p>
              <a href="${supabaseUrl}/functions/v1/track-action-and-redirect?assessmentId=${assessmentId}&actionType=strategy_session&email=${encodeURIComponent(params.email)}" style="display:inline-block;background:#7c3aed;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:10px;">
                Book a Free Strategy Session
              </a>
            </td>
          </tr>

          <tr><td style="height:16px;"></td></tr>

          <!-- Book CTA -->
          <tr>
            <td style="background:linear-gradient(135deg,#0c1e35,#1e293b);border:1px solid #1d4ed844;border-radius:16px;padding:28px;text-align:center;margin-bottom:32px;">
              <p style="margin:0 0 20px;color:#94a3b8;font-size:13px;">Explore the full CARES framework and build lasting leadership habits</p>
              <a href="${supabaseUrl}/functions/v1/track-action-and-redirect?assessmentId=${assessmentId}&actionType=book" style="display:inline-block;background:#2563eb;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:10px;">
                Get the Book on Amazon
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:24px;text-align:center;border-top:1px solid #1e293b;">
              <p style="margin:0;color:#475569;font-size:12px;line-height:1.6;">
                This was generated from your CARES Leadership Assessment.<br />
                You're receiving this because you submitted a commitment to growth.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
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
      .select("id, email")
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
      const { error: insertErr } = await supabase
        .from("assessment_commitments")
        .insert({
          assessment_id: assessmentId,
          focus_area: focus_area ?? "",
          practice: practice ?? "",
          measure: measure ?? "",
          support: support ?? "",
        });

      if (insertErr) {
        console.error("Insert commitment error:", insertErr);
        return json({ error: "Failed to save commitment" }, 500);
      }
    }

    await supabase
      .from("assessments")
      .update({ commitment_submitted: true })
      .eq("id", assessmentId);

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (resendApiKey && assessment.email) {
      const emailHtml = buildCommitmentEmailHtml({
        email: assessment.email,
        focus_area: focus_area ?? "",
        practice: practice ?? "",
        measure: measure ?? "",
        support: support ?? "",
        supabaseUrl: Deno.env.get("SUPABASE_URL")!,
        assessmentId,
      });

      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "CARES Leadership Report <reports@mail.scaretocares.com>",
          to: [assessment.email],
          reply_to: "saby@scaretocares.com",
          subject: "Re: Your CARES Leadership Report",
          html: emailHtml,
        }),
      });

      if (!emailResponse.ok) {
        const errData = await emailResponse.json();
        console.error("Commitment email send error:", errData);
      } else {
        const successData = await emailResponse.json();
        console.log("Commitment email sent:", successData);
      }
    }

    return json({ success: true });
  } catch (err) {
    console.error("Unexpected error:", err);
    return json({ error: "Internal server error" }, 500);
  }
});
