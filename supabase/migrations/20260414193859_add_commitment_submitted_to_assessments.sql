/*
  # Add commitment_submitted flag to assessments

  ## Summary
  Adds a boolean column to the assessments table to track whether a user
  has submitted their Commitment to Growth form. This enables dashboard
  conversion tracking and identification of high-intent users.

  ## Changes
  - assessments: add `commitment_submitted` (boolean, default false)
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'assessments' AND column_name = 'commitment_submitted'
  ) THEN
    ALTER TABLE assessments ADD COLUMN commitment_submitted boolean NOT NULL DEFAULT false;
  END IF;
END $$;
