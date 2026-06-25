export const SCORE_MAP: Record<string, number> = {
    Comprehensive: 5,
    Documented: 4,
    Adequate: 3,
    Partial: 2,
    Minimal: 1,
  };
  
  export function calculateScore(
    responses: Record<string, string>
  ) {
    const answers = Object.values(responses);
  
    if (answers.length === 0) {
      return 0;
    }
  
    const total = answers.reduce(
      (sum, answer) => sum + (SCORE_MAP[answer] || 0),
      0
    );
  
    return Math.round(
      (total / (answers.length * 5)) * 100
    );
  }
  
  export function getRiskLevel(score: number) {
    if (score >= 80) return "Low";
    if (score >= 60) return "Medium";
  
    return "High";
  }
  
  export function getRiskColor(score: number) {
    if (score >= 80) return "#16a34a";
  
    if (score >= 60) return "#f59e0b";
  
    return "#dc2626";
  }