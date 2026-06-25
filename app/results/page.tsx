"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadAssessmentState } from "@/lib/storage";
import { AssessmentState } from "@/lib/types";
import { Framework } from "@/lib/frameworks";
import { QUESTIONS, Question } from "@/data/questions";

export default function ResultsPage() {
  const router = useRouter();

  const [state, setState] =
    useState<AssessmentState | null>(null);

  useEffect(() => {
    const saved = loadAssessmentState();

    if (!saved || !saved.isComplete) {
      router.push("/assessment");
      return;
    }

    setState(saved);
  }, [router]);

  if (!state) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Loading...
      </main>
    );
  }

  const scoreMap: Record<string, number> = {
    "Fully Implemented": 4,
    "Partially Implemented": 3,
    Planned: 2,
    "Not Implemented": 1,
  };

  const frameworkScores = (
    state.selectedFrameworks as Framework[]
  ).map((framework) => {
    const responses =
      state.responses?.[framework] || {};

    const questions: Question[] =
      QUESTIONS[framework];

    let total = 0;

    questions.forEach((question) => {
      const answer =
        responses[question.id];

      total += scoreMap[answer] || 0;
    });

    const maxScore =
      questions.length * 4;

    const percentage =
      maxScore > 0
        ? Math.round(
            (total / maxScore) * 100
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
      "Immediate remediation is recommended for high-risk areas.",
      "Implement missing security controls as a priority.",
      "Conduct compliance training across teams."
    );
  } else if (overallScore < 80) {
    recommendations.push(
      "Strengthen partially implemented controls.",
      "Review existing policies and procedures.",
      "Perform periodic compliance assessments."
    );
  } else {
    recommendations.push(
      "Maintain your current compliance posture.",
      "Continue periodic audits and monitoring.",
      "Keep employees updated through awareness programs."
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow p-10 mb-8">

          <h1 className="text-4xl font-bold text-slate-900 mb-10">
            Assessment Results
          </h1>

          <div className="grid md:grid-cols-3 gap-6">

            {/* Overall Score */}
            <div className="bg-slate-50 p-8 rounded-2xl text-center">
              <p className="text-slate-500 mb-2">
                Overall Score
              </p>

              <h2 className="text-5xl font-bold text-blue-600">
                {overallScore}%
              </h2>
            </div>

            {/* Risk Level */}
            <div className="bg-slate-50 p-8 rounded-2xl text-center">
              <p className="text-slate-500 mb-2">
                Risk Level
              </p>

              <h2
                className={`text-4xl font-bold ${
                  riskLevel === "Low"
                    ? "text-green-600"
                    : riskLevel === "Medium"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {riskLevel}
              </h2>
            </div>

            {/* Critical Gaps */}
            <div className="bg-slate-50 p-8 rounded-2xl text-center">
              <p className="text-slate-500 mb-2">
                Critical Gaps
              </p>

              <h2 className="text-4xl font-bold text-red-600">
                {totalCriticalGaps}
              </h2>
            </div>

          </div>
        </div>

        {/* Framework Breakdown */}
        <div className="bg-white rounded-2xl shadow p-10 mb-8">

          <h2 className="text-2xl font-bold mb-8 text-slate-900">
            Framework Breakdown
          </h2>

          <div className="space-y-6">

            {frameworkScores.map((item) => (
              <div
                key={item.framework}
                className="border rounded-2xl p-6"
              >
                <div className="flex justify-between mb-3">

                  <h3 className="text-xl font-semibold">
                    {item.framework}
                  </h3>

                  <span className="font-bold text-blue-600">
                    {item.percentage}%
                  </span>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-3 mb-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{
                      width: `${item.percentage}%`,
                    }}
                  />
                </div>

                <p className="text-sm text-slate-600">
                  Critical Gaps:{" "}
                  {item.criticalGaps}
                </p>
              </div>
            ))}

          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-2xl shadow p-10 mb-8">

          <h2 className="text-2xl font-bold mb-6 text-slate-900">
            Recommendations
          </h2>

          <ul className="space-y-4">

            {recommendations.map(
              (recommendation, index) => (
                <li
                  key={index}
                  className="flex gap-3"
                >
                  <span className="text-blue-600">
                    ✓
                  </span>

                  <span className="text-slate-700">
                    {recommendation}
                  </span>
                </li>
              )
            )}

          </ul>
        </div>

        {/* Continue */}
        <div className="text-center">

          <button
            onClick={() =>
              router.push("/submission")
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-semibold"
          >
            Continue to Report Submission
          </button>

        </div>

      </div>
    </main>
  );
}