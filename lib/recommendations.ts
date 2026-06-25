import { Framework } from "./frameworks";

export function getRecommendations(
  framework: Framework,
  score: number
) {
  if (score >= 80) {
    return [
      "Maintain current controls.",
      "Continue periodic audits.",
      "Review policies annually."
    ];
  }

  switch (framework) {
    case "DPDPA":
      return [
        "Improve consent mechanisms.",
        "Conduct privacy audits.",
        "Strengthen breach procedures."
      ];

    case "HIPAA":
      return [
        "Review PHI protections.",
        "Train employees regularly.",
        "Update BAAs."
      ];

    case "ISO27001":
      return [
        "Perform risk assessments.",
        "Strengthen access control.",
        "Review incident response."
      ];

    case "SOC2":
      return [
        "Improve monitoring.",
        "Test disaster recovery.",
        "Review least-privilege access."
      ];
  }
}