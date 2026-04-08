/*
  # Create CARES Assessment Schema

  ## Summary
  Sets up all tables needed to store assessment submissions, scores, commitments,
  and track whether a report email has been sent.

  ## New Tables

  ### assessments
  Stores a single completed assessment submission per row.
  - id (uuid, primary key)
  - email (text, required) — the email address the report will be sent to
  - overall_score (int) — normalized 0–100 score
  - raw_score (int) — raw sum of all 25 question responses
  - score_band (text) — e.g. "Developing", "Strong"
  - lowest_dimension (text) — CareCategoryKey of lowest scoring dimension
  - strongest_dimension (text) — CareCategoryKey of highest scoring dimension
  - roadmap_steps (jsonb) — array of 3 concise step strings
  - recommended_chapters (jsonb) — array of { number, title, reason }
  - report_sent (boolean, default false) — flipped to true after email is sent
  - created_at (timestamptz)

  ### assessment_category_scores
  One row per dimension per assessment (5 rows per assessment).
  - id (uuid, primary key)
  - assessment_id (uuid, FK → assessments.id)
  - category_key (text)
  - label (text)
  - raw (int)
  - max (int)
  - percentage (int)

  ### assessment_commitments
  Optional commitment data submitted by the user.
  - id (uuid, primary key)
  - assessment_id (uuid, FK → assessments.id)
  - focus_area (text)
  - practice (text)
  - measure (text)
  - support (text)
  - created_at (timestamptz)

  ## Security
  - RLS enabled on all tables
  - All tables are service-role only (edge functions use the service role key)
  - No public access
*/

CREATE TABLE IF NOT EXISTS assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  overall_score int NOT NULL DEFAULT 0,
  raw_score int NOT NULL DEFAULT 0,
  score_band text NOT NULL DEFAULT '',
  lowest_dimension text NOT NULL DEFAULT '',
  strongest_dimension text NOT NULL DEFAULT '',
  roadmap_steps jsonb NOT NULL DEFAULT '[]',
  recommended_chapters jsonb NOT NULL DEFAULT '[]',
  report_sent boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage assessments"
  ON assessments
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can insert assessments"
  ON assessments
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update assessments"
  ON assessments
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE TABLE IF NOT EXISTS assessment_category_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  category_key text NOT NULL,
  label text NOT NULL DEFAULT '',
  raw int NOT NULL DEFAULT 0,
  max int NOT NULL DEFAULT 25,
  percentage int NOT NULL DEFAULT 0
);

ALTER TABLE assessment_category_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage category scores"
  ON assessment_category_scores
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can insert category scores"
  ON assessment_category_scores
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE TABLE IF NOT EXISTS assessment_commitments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  focus_area text NOT NULL DEFAULT '',
  practice text NOT NULL DEFAULT '',
  measure text NOT NULL DEFAULT '',
  support text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE assessment_commitments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage commitments"
  ON assessment_commitments
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can insert commitments"
  ON assessment_commitments
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS assessments_email_idx ON assessments(email);
CREATE INDEX IF NOT EXISTS assessment_category_scores_assessment_id_idx ON assessment_category_scores(assessment_id);
CREATE INDEX IF NOT EXISTS assessment_commitments_assessment_id_idx ON assessment_commitments(assessment_id);
