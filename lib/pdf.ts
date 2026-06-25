import jsPDF from "jspdf";
import { AssessmentState } from "@/lib/types";
import { QUESTIONS } from "@/data/questions";

type FrameworkScore = {
  framework: string;
  percentage: number;
  criticalGaps: number;
};

export function generateAssessmentPDF(
  state: AssessmentState
): Uint8Array {
  const doc = new jsPDF();

  const scoreMap: Record<string, number> = {
    "Fully Implemented": 4,
    "Partially Implemented": 3,
    Planned: 2,
    "Not Implemented": 1,
  };

  const frameworkScores: FrameworkScore[] =
    state.selectedFrameworks.map((framework) => {
      const responses =
        state.responses?.[framework] || {};

      const questions =
        QUESTIONS[framework as keyof typeof QUESTIONS];

      let totalScore = 0;

      questions.forEach((question) => {
        const answer =
          responses[question.id];

        totalScore +=
          scoreMap[answer] || 0;
      });

      const maxScore =
        questions.length * 4;

      const percentage =
        maxScore > 0
          ? Math.round(
              (totalScore / maxScore) * 100
            )
          : 0;

      const criticalGaps =
        Object.values(responses).filter(
          (answer) =>
            answer === "Not Implemented"
        ).length;

      return {
        framework,
        percentage,
        criticalGaps,
      };
    });

  const overallScore =
    frameworkScores.length > 0
      ? Math.round(
          frameworkScores.reduce(
            (sum, item) =>
              sum + item.percentage,
            0
          ) / frameworkScores.length
        )
      : 0;

  const totalCriticalGaps =
    frameworkScores.reduce(
      (sum, item) =>
        sum + item.criticalGaps,
      0
    );

  const riskLevel =
    overallScore >= 80
      ? "Low"
      : overallScore >= 60
      ? "Medium"
      : "High";

  const recommendations: string[] = [];

  if (overallScore < 60) {
    recommendations.push(
      "Immediate remediation is recommended.",
      "Implement missing security controls.",
      "Conduct organization-wide compliance training.",
      "Schedule a detailed compliance review."
    );
  } else if (overallScore < 80) {
    recommendations.push(
      "Strengthen partially implemented controls.",
      "Review policies and procedures.",
      "Perform periodic compliance assessments.",
      "Address identified control gaps."
    );
  } else {
    recommendations.push(
      "Maintain your compliance posture.",
      "Continue regular audits.",
      "Provide awareness training.",
      "Review controls periodically."
    );
  }

  let y = 20;

  /* Header */

  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text(
    "Eruditech Solutions",
    20,
    y
  );

  y += 10;

  doc.setFontSize(14);
  doc.text(
    "Compliance Assessment Report",
    20,
    y
  );

  y += 15;

  doc.setDrawColor(200);
  doc.line(20, y, 190, y);

  y += 10;

  /* Company Details */

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(
    "Company Details",
    20,
    y
  );

  y += 10;

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  doc.text(
    `Name: ${state.companyInfo.firstName}`,
    20,
    y
  );

  y += 7;

  doc.text(
    `Company: ${state.companyInfo.companyName}`,
    20,
    y
  );

  y += 7;

  doc.text(
    `Industry: ${state.companyInfo.industry}`,
    20,
    y
  );

  y += 7;

  doc.text(
    `Country: ${state.companyInfo.country}`,
    20,
    y
  );

  y += 7;

  doc.text(
    `Company Size: ${state.companyInfo.companySize}`,
    20,
    y
  );

  y += 7;

  doc.text(
    `Email: ${state.companyInfo.email}`,
    20,
    y
  );

  y += 15;

  /* Summary */

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");

  doc.text(
    "Assessment Summary",
    20,
    y
  );

  y += 10;

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  doc.text(
    `Overall Score: ${overallScore}%`,
    20,
    y
  );

  y += 7;

  doc.text(
    `Risk Level: ${riskLevel}`,
    20,
    y
  );

  y += 7;

  doc.text(
    `Critical Gaps: ${totalCriticalGaps}`,
    20,
    y
  );

  y += 15;

  /* Framework Scores */

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");

  doc.text(
    "Framework Breakdown",
    20,
    y
  );

  y += 10;

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  frameworkScores.forEach((item) => {
    doc.text(
      `${item.framework}: ${item.percentage}% (Critical Gaps: ${item.criticalGaps})`,
      20,
      y
    );

    y += 7;

    if (y > 260) {
      doc.addPage();
      y = 20;
    }
  });

  y += 10;

  /* Recommendations */

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");

  doc.text(
    "Recommendations",
    20,
    y
  );

  y += 10;

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  recommendations.forEach(
    (recommendation) => {
      doc.text(
        `• ${recommendation}`,
        25,
        y
      );

      y += 7;

      if (y > 260) {
        doc.addPage();
        y = 20;
      }
    }
  );

  y += 15;

  doc.setFontSize(10);

  doc.text(
    `Generated on: ${new Date().toLocaleString()}`,
    20,
    y
  );

  y += 7;

  doc.text(
    "Prepared by Eruditech Solutions",
    20,
    y
  );

  const pdfBuffer = doc.output("arraybuffer");

return new Uint8Array(pdfBuffer);
}