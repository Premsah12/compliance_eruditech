import { AssessmentState } from "./types";

const STORAGE_KEY = "eruditech_assessment";

export function saveAssessmentState(state: AssessmentState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadAssessmentState(): AssessmentState | null {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function clearAssessmentState() {
  localStorage.removeItem(STORAGE_KEY);
}