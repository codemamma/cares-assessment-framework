/*
  # Add name column to assessments table

  1. Changes
    - `assessments` table: add optional `name` column (text, nullable)
      - Stores the user's first name captured at the email gate
      - Null for existing records and when user leaves field blank

  2. Notes
    - Column is nullable to maintain backward compatibility with existing rows
    - No RLS changes needed; existing policies cover this column automatically
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'assessments' AND column_name = 'name'
  ) THEN
    ALTER TABLE assessments ADD COLUMN name text DEFAULT NULL;
  END IF;
END $$;
