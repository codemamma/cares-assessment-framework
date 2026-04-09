/*
  # Add completed_at and assessment_actions table

  ## Summary
  Extends the assessments schema to support tracking completion timestamps
  and user interaction events (clicks, actions) for dashboard analytics.

  ## Changes

  ### assessments table
  - Add `completed_at` (timestamptz, nullable) — set when the user finishes all 25 questions
    and lands on the results page. Null means they started but did not complete.

  ### New Table: assessment_actions
  Tracks discrete user actions post-assessment (e.g. clicking a CTA button).
  - id (uuid, primary key)
  - assessment_id (uuid, FK → assessments.id, nullable) — may not be linked if no email yet
  - action_type (text) — e.g. 'strategy_session_clicked', 'toolkit_clicked', 'workshop_clicked'
  - metadata (jsonb) — optional additional context
  - created_at (timestamptz)

  ## Security
  - RLS enabled on assessment_actions
  - Service role only access
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'assessments' AND column_name = 'completed_at'
  ) THEN
    ALTER TABLE assessments ADD COLUMN completed_at timestamptz;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS assessment_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid REFERENCES assessments(id) ON DELETE SET NULL,
  action_type text NOT NULL DEFAULT '',
  metadata jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE assessment_actions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can select actions"
  ON assessment_actions
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can insert actions"
  ON assessment_actions
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS assessment_actions_assessment_id_idx ON assessment_actions(assessment_id);
CREATE INDEX IF NOT EXISTS assessment_actions_action_type_idx ON assessment_actions(action_type);
