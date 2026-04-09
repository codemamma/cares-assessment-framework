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

function scoreBarHtml(percentage: number): string {
  const filled = Math.round(percentage / 10);
  const blocks = Array.from({ length: 10 }, (_, i) =>
    `<span style="display:inline-block;width:18px;height:8px;border-radius:3px;background:${i < filled ? "#eab308" : "#334155"};margin-right:2px;"></span>`
  ).join("");
  return blocks;
}

function buildEmailHtml(params: {
  email: string;
  overall_score: number;
  score_band: string;
  categoryScores: { category_key: string; label: string; raw: number; max: number; percentage: number }[];
  lowest_dimension: string;
  strongest_dimension: string;
  roadmap_steps: string[];
  recommended_chapters: { title: string; isPrimary: boolean }[];
  commitment: { focus_area: string; practice: string; measure: string; support: string } | null;
}): string {
  const {
    overall_score,
    score_band,
    categoryScores,
    lowest_dimension,
    strongest_dimension,
    roadmap_steps,
    recommended_chapters,
    commitment,
  } = params;

  const lowestLabel = DIMENSION_LABELS[lowest_dimension] ?? lowest_dimension;
  const strongestLabel = DIMENSION_LABELS[strongest_dimension] ?? strongest_dimension;

  const categoryRows = categoryScores
    .map(
      (c) => `
      <tr>
        <td style="padding:8px 0;color:#cbd5e1;font-size:13px;width:200px;">${c.label}</td>
        <td style="padding:8px 0;">${scoreBarHtml(c.percentage)}</td>
        <td style="padding:8px 0;color:#94a3b8;font-size:12px;text-align:right;padding-left:12px;">${c.percentage}%</td>
      </tr>`
    )
    .join("");

  const roadmapRows = roadmap_steps
    .map(
      (step, i) => `
      <tr>
        <td style="padding:10px 0;vertical-align:top;width:28px;">
          <span style="display:inline-block;width:26px;height:26px;border-radius:50%;background:#3b1d8a;color:#c4b5fd;font-size:12px;font-weight:700;text-align:center;line-height:26px;">${i + 1}</span>
        </td>
        <td style="padding:10px 0 10px 10px;color:#cbd5e1;font-size:13px;line-height:1.6;">${step}</td>
      </tr>`
    )
    .join("");

  const chapterRows = recommended_chapters
    .map(
      (ch) => `
      <div style="background:${ch.isPrimary ? "#0c1e35" : "#1e293b"};border:1px solid ${ch.isPrimary ? "#1d4ed844" : "#334155"};border-radius:10px;padding:14px 16px;margin-bottom:10px;">
        <div style="display:flex;align-items:flex-start;gap:16px;">
          <span style="background:${ch.isPrimary ? "#0ea5e920" : "#334155"};border:1px solid ${ch.isPrimary ? "#0ea5e940" : "#475569"};color:${ch.isPrimary ? "#7dd3fc" : "#94a3b8"};font-size:11px;font-weight:700;padding:3px 8px;border-radius:6px;flex-shrink:0;white-space:nowrap;">${ch.isPrimary ? "Focus Area" : "Apply &amp; Strengthen"}</span>
          <div>
            <p style="margin:0 0 4px;color:#f1f5f9;font-size:13px;font-weight:600;">${ch.title}</p>
            <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.5;">${ch.isPrimary ? "This chapter directly addresses your key development area." : "Practical application to strengthen your overall CARES leadership."}</p>
          </div>
        </div>
      </div>`
    )
    .join("");

  const commitmentHtml = commitment
    ? `
    <div style="background:#0f172a;border:1px solid #1e293b;border-radius:12px;padding:24px;margin-bottom:32px;">
      <h2 style="margin:0 0 16px;color:#f1f5f9;font-size:16px;font-weight:700;">Your Commitment to Growth</h2>
      ${commitment.focus_area ? `<p style="margin:0 0 8px;color:#94a3b8;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Focus Area</p><p style="margin:0 0 16px;color:#cbd5e1;font-size:13px;">${DIMENSION_LABELS[commitment.focus_area] ?? commitment.focus_area}</p>` : ""}
      ${commitment.practice ? `<p style="margin:0 0 8px;color:#94a3b8;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">What you'll practice</p><p style="margin:0 0 16px;color:#cbd5e1;font-size:13px;line-height:1.6;">${commitment.practice}</p>` : ""}
      ${commitment.measure ? `<p style="margin:0 0 8px;color:#94a3b8;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">How you'll measure progress</p><p style="margin:0 0 16px;color:#cbd5e1;font-size:13px;line-height:1.6;">${commitment.measure}</p>` : ""}
      ${commitment.support ? `<p style="margin:0 0 8px;color:#94a3b8;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Who will support you</p><p style="margin:0;color:#cbd5e1;font-size:13px;line-height:1.6;">${commitment.support}</p>` : ""}
    </div>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your CARES Leadership Report</title>
</head>
<body style="margin:0;padding:0;background:#07111f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#07111f;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

          <!-- Header -->
          <tr>
            <td style="padding-bottom:32px;">
              <p style="margin:0 0 4px;color:#a78bfa;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;">Assessment Complete</p>
              <h1 style="margin:0;color:#f1f5f9;font-size:24px;font-weight:800;">Your CARES Leadership Profile</h1>
            </td>
          </tr>

          <!-- Score Summary -->
          <tr>
            <td style="background:#0f172a;border:1px solid #1e293b;border-radius:16px;padding:24px;margin-bottom:24px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:middle;padding-right:20px;width:100px;">
                    <div style="background:#1c2a1c;border:1px solid #16a34a44;border-radius:12px;padding:12px 16px;display:inline-block;">
                      <span style="color:#4ade80;font-size:36px;font-weight:900;line-height:1;">${overall_score}</span>
                      <p style="margin:2px 0 0;color:#64748b;font-size:11px;">out of 100</p>
                      <p style="margin:2px 0 0;color:#4ade80;font-size:12px;font-weight:600;">${score_band}</p>
                    </div>
                  </td>
                  <td style="vertical-align:middle;">
                    <table cellpadding="0" cellspacing="0" width="100%">
                      ${categoryRows}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr><td style="height:24px;"></td></tr>

          <!-- Key Insights -->
          <tr>
            <td style="padding-bottom:24px;">
              <p style="margin:0 0 4px;color:#64748b;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">Key Insights</p>
              <h2 style="margin:0 0 16px;color:#f1f5f9;font-size:16px;font-weight:700;">What your results reveal</h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="width:48%;background:#052e16;border:1px solid #14532d;border-radius:12px;padding:16px;vertical-align:top;">
                    <p style="margin:0 0 6px;color:#4ade80;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;">Strongest Capability</p>
                    <p style="margin:0;color:#f1f5f9;font-size:14px;font-weight:700;">${strongestLabel}</p>
                  </td>
                  <td style="width:4%;"></td>
                  <td style="width:48%;background:#431407;border:1px solid #78350f;border-radius:12px;padding:16px;vertical-align:top;">
                    <p style="margin:0 0 6px;color:#fbbf24;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;">Biggest Opportunity</p>
                    <p style="margin:0;color:#f1f5f9;font-size:14px;font-weight:700;">${lowestLabel}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Focus Insight -->
          <tr>
            <td style="background:#1c1a10;border:1px solid #44380044;border-radius:12px;padding:20px;margin-bottom:24px;">
              <p style="margin:0 0 8px;color:#fbbf24;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">Focus Insight</p>
              <p style="margin:0;color:#f1f5f9;font-size:14px;line-height:1.6;">
                Your biggest growth lever is <strong style="color:#fde68a;">${lowestLabel}</strong>. This is the capability that will unlock your leadership effectiveness.
              </p>
            </td>
          </tr>

          <tr><td style="height:24px;"></td></tr>

          <!-- Development Roadmap -->
          <tr>
            <td style="padding-bottom:24px;">
              <p style="margin:0 0 4px;color:#64748b;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">Development Roadmap</p>
              <h2 style="margin:0 0 16px;color:#f1f5f9;font-size:16px;font-weight:700;">Your next three moves</h2>
              <div style="background:#0f172a;border:1px solid #1e293b;border-radius:12px;padding:16px 20px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${roadmapRows}
                </table>
              </div>
            </td>
          </tr>

          <!-- Suggested Reading -->
          <tr>
            <td style="padding-bottom:24px;">
              <p style="margin:0 0 4px;color:#64748b;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">Suggested Reading</p>
              <h2 style="margin:0 0 16px;color:#f1f5f9;font-size:16px;font-weight:700;">Go deeper</h2>
              ${chapterRows}
            </td>
          </tr>

          <!-- Commitment (optional) -->
          ${commitmentHtml}

          <!-- CTA -->
          <tr>
            <td style="background:linear-gradient(135deg,#3b1d8a,#1e293b);border:1px solid #7c3aed44;border-radius:16px;padding:28px;text-align:center;margin-bottom:32px;">
              <h2 style="margin:0 0 8px;color:#f1f5f9;font-size:18px;font-weight:800;">Ready to accelerate your growth?</h2>
              <p style="margin:0 0 20px;color:#94a3b8;font-size:13px;">Book a free 15-minute strategy session with a CARES coach and build your personal action plan.</p>
              <a href="#" style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#6d28d9);color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:10px;">
                Book a 15-min Strategy Session
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:24px;text-align:center;border-top:1px solid #1e293b;">
              <p style="margin:0;color:#475569;font-size:12px;line-height:1.6;">
                This report was generated from your CARES Leadership Assessment.<br />
                You're receiving this because you requested your results.
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

    const body = await req.json();

    let assessmentId: string | null = body.assessmentId ?? null;
    let assessmentEmail: string | null = null;
    let emailHtmlData: Parameters<typeof buildEmailHtml>[0] | null = null;

    if (assessmentId) {
      const { data: assessment, error: assessmentErr } = await supabase
        .from("assessments")
        .select("*")
        .eq("id", assessmentId)
        .maybeSingle();

      if (assessmentErr || !assessment) {
        return json({ error: "Assessment not found" }, 404);
      }

      if (!assessment.email) {
        return json({ error: "No email address on assessment" }, 400);
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

      assessmentEmail = assessment.email;
      emailHtmlData = {
        email: assessment.email,
        overall_score: assessment.overall_score,
        score_band: assessment.score_band,
        categoryScores: categoryScores ?? [],
        lowest_dimension: assessment.lowest_dimension,
        strongest_dimension: assessment.strongest_dimension,
        roadmap_steps: Array.isArray(assessment.roadmap_steps) ? assessment.roadmap_steps : [],
        recommended_chapters: Array.isArray(assessment.recommended_chapters) ? assessment.recommended_chapters : [],
        commitment: commitment ?? null,
      };
    } else {
      const {
        email,
        overall_score,
        raw_score,
        score_band,
        lowest_dimension,
        strongest_dimension,
        roadmap_steps,
        recommended_chapters,
        categoryScores: incomingScores,
      } = body;

      if (!email || !email.includes("@")) {
        return json({ error: "Valid email is required" }, 400);
      }

      const { data: existing } = await supabase
        .from("assessments")
        .select("id")
        .eq("email", email)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      let newAssessment: { id: string } | null = null;

      if (existing) {
        await supabase
          .from("assessments")
          .update({
            overall_score: overall_score ?? 0,
            raw_score: raw_score ?? 0,
            score_band: score_band ?? "",
            lowest_dimension: lowest_dimension ?? "",
            strongest_dimension: strongest_dimension ?? "",
            roadmap_steps: roadmap_steps ?? [],
            recommended_chapters: recommended_chapters ?? [],
            report_sent: false,
            completed_at: new Date().toISOString(),
          })
          .eq("id", existing.id);
        newAssessment = existing;
      } else {
        const { data: inserted, error: insertError } = await supabase
          .from("assessments")
          .insert({
            email,
            overall_score: overall_score ?? 0,
            raw_score: raw_score ?? 0,
            score_band: score_band ?? "",
            lowest_dimension: lowest_dimension ?? "",
            strongest_dimension: strongest_dimension ?? "",
            roadmap_steps: roadmap_steps ?? [],
            recommended_chapters: recommended_chapters ?? [],
            report_sent: false,
            completed_at: new Date().toISOString(),
          })
          .select("id")
          .single();

        if (insertError || !inserted) {
          console.error("Insert error:", insertError);
          return json({ error: "Failed to save assessment" }, 500);
        }
        newAssessment = inserted;
      }

      assessmentId = newAssessment.id;

      if (Array.isArray(incomingScores) && incomingScores.length > 0) {
        await supabase
          .from("assessment_category_scores")
          .delete()
          .eq("assessment_id", assessmentId);

        await supabase.from("assessment_category_scores").insert(
          incomingScores.map((s: { category_key: string; label: string; raw: number; max: number; percentage: number }) => ({
            assessment_id: assessmentId,
            category_key: s.category_key,
            label: s.label,
            raw: s.raw,
            max: s.max,
            percentage: s.percentage,
          }))
        );
      }

      assessmentEmail = email;
      emailHtmlData = {
        email,
        overall_score: overall_score ?? 0,
        score_band: score_band ?? "",
        categoryScores: Array.isArray(incomingScores)
          ? incomingScores.map((s: { category_key: string; label: string; raw: number; max: number; percentage: number }) => ({
              category_key: s.category_key,
              label: s.label,
              raw: s.raw,
              max: s.max,
              percentage: s.percentage,
            }))
          : [],
        lowest_dimension: lowest_dimension ?? "",
        strongest_dimension: strongest_dimension ?? "",
        roadmap_steps: Array.isArray(roadmap_steps) ? roadmap_steps : [],
        recommended_chapters: Array.isArray(recommended_chapters) ? recommended_chapters : [],
        commitment: null,
      };
    }

    const emailHtml = buildEmailHtml(emailHtmlData!);

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error("RESEND_API_KEY not configured");
      return json({ error: "Email service not configured" }, 500);
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "CARES Assessment <onboarding@resend.dev>",
        to: [assessmentEmail],
        subject: "Your CARES Leadership Report",
        html: emailHtml,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json();
      console.error("Resend error:", errorData);
      return json({ error: "Failed to send email", detail: errorData }, 500);
    }

    await supabase
      .from("assessments")
      .update({ report_sent: true })
      .eq("id", assessmentId);

    return json({ success: true, assessmentId });
  } catch (err) {
    console.error("Unexpected error:", err);
    return json({ error: "Internal server error" }, 500);
  }
});
