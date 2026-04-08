/*
  # Add UPDATE policy for assessment_commitments

  The save-commitment edge function upserts commitment rows (update if exists,
  insert if new). The existing schema only had SELECT and INSERT policies for
  assessment_commitments. This migration adds the missing UPDATE policy so the
  service role can update existing commitment rows without errors.

  ## Changes
  - Add UPDATE policy on assessment_commitments for service_role
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'assessment_commitments'
      AND policyname = 'Service role can update commitments'
  ) THEN
    CREATE POLICY "Service role can update commitments"
      ON assessment_commitments
      FOR UPDATE
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;
