import { AssessmentResponses, CommitmentData, EmailCaptureData } from "@/types/assessment";

const KEYS = {
  RESPONSES: "cares_assessment_responses",
  COMMITMENT: "cares_commitment_data",
  EMAIL: "cares_email_capture",
  CURRENT_STEP: "cares_current_step",
};

export function saveAssessmentResponses(responses: AssessmentResponses): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEYS.RESPONSES, JSON.stringify(responses));
}

export function loadAssessmentResponses(): AssessmentResponses {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEYS.RESPONSES);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function clearAssessmentResponses(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEYS.RESPONSES);
  localStorage.removeItem(KEYS.CURRENT_STEP);
}

export function saveCommitmentData(data: CommitmentData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEYS.COMMITMENT, JSON.stringify(data));
}

export function loadCommitmentData(): CommitmentData {
  if (typeof window === "undefined") return { focusArea: "", practice: "", measure: "", support: "" };
  try {
    const raw = localStorage.getItem(KEYS.COMMITMENT);
    return raw ? JSON.parse(raw) : { focusArea: "", practice: "", measure: "", support: "" };
  } catch {
    return { focusArea: "", practice: "", measure: "", support: "" };
  }
}

export function saveCurrentStep(step: number): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEYS.CURRENT_STEP, String(step));
}

export function loadCurrentStep(): number {
  if (typeof window === "undefined") return 0;
  const raw = localStorage.getItem(KEYS.CURRENT_STEP);
  return raw ? parseInt(raw, 10) : 0;
}

export function saveEmailCapture(data: EmailCaptureData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEYS.EMAIL, JSON.stringify(data));
}

export function loadEmailCapture(): EmailCaptureData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEYS.EMAIL);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
