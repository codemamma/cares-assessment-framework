/*
  # Add role column to assessments table

  ## Summary
  Adds an optional role/title field to the assessments table so that
  the user's professional role can be captured at email unlock time
  and stored alongside their assessment results.

  ## Changes

  ### Modified Tables
  - `assessments`
    - Added `role` (text, default '') — the user's self-reported role or title
      (e.g., "Engineering Manager", "Founder", "Team Lead")

  ## Notes
  - Column is optional (empty string default) so existing rows are unaffected
  - Enables future dashboard insights: top roles, conversion by role, role vs score
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'assessments' AND column_name = 'role'
  ) THEN
    ALTER TABLE assessments ADD COLUMN role text NOT NULL DEFAULT '';
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS assessments_role_idx ON assessments(role);
