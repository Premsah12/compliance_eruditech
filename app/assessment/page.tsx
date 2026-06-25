"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadAssessmentState, saveAssessmentState } from "@/lib/storage";
import { QUESTIONS, Question } from "@/data/questions";
import { Framework } from "@/lib/frameworks";
import { AssessmentState } from "@/lib/types";

export default function AssessmentPage() {
  const router = useRouter();

  const [state, setState] = useState<AssessmentState | null>(null);

  const [frameworkIndex, setFrameworkIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    const saved = loadAssessmentState();

    if (!saved || saved.selectedFrameworks.length === 0) {
      router.push("/frameworks");
      return;
    }

    setState(saved);
  }, [router]);

  if (!state) {
    return (
      <main className="min-h-screen flex justify-center items-center">
        Loading...
      </main>
    );
  }

  const frameworks = state.selectedFrameworks as Framework[];

  const currentFramework = frameworks[frameworkIndex];

  const frameworkQuestions: Question[] =
    QUESTIONS[currentFramework];

  const currentQuestion = frameworkQuestions[questionIndex];

  const totalQuestions = frameworks.reduce(
    (sum, fw) => sum + QUESTIONS[fw].length,
    0
  );

  const answeredCount = Object.values(
    state.responses || {}
  ).reduce((sum, responses) => {
    return sum + Object.keys(responses).length;
  }, 0);

  const progress = Math.round(
    (answeredCount / totalQuestions) * 100
  );

  const selectedAnswer =
    state.responses?.[currentFramework]?.[
      currentQuestion.id
    ] || "";

  const answerQuestion = (answer: string) => {
    const updated: AssessmentState = {
      ...state,
      responses: {
        ...state.responses,
        [currentFramework]: {
          ...(state.responses[currentFramework] || {}),
          [currentQuestion.id]: answer,
        },
      },
    };

    saveAssessmentState(updated);

    setState(updated);
  };

  const handleNext = () => {
    if (questionIndex < frameworkQuestions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      return;
    }

    if (frameworkIndex < frameworks.length - 1) {
      setFrameworkIndex(frameworkIndex + 1);
      setQuestionIndex(0);
      return;
    }

    const updated: AssessmentState = {
      ...state,
      isComplete: true,
    };

    saveAssessmentState(updated);

    router.push("/results");
  };

  const handlePrevious = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
      return;
    }

    if (frameworkIndex > 0) {
      const previousFramework =
        frameworks[frameworkIndex - 1];

      setFrameworkIndex(frameworkIndex - 1);

      setQuestionIndex(
        QUESTIONS[previousFramework].length - 1
      );
    }
  };

  const options = [
    "Fully Implemented",
    "Partially Implemented",
    "Planned",
    "Not Implemented",
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-slate-200">

        <div className="mb-10">
        <div className="flex justify-between mb-2 font-semibold text-slate-900">
            <span>{currentFramework}</span>
            <span>{progress}%</span>
          </div>

          <div className="w-full bg-slate-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-2 text-sm text-slate-700">
            Question {answeredCount + 1} of {totalQuestions}
          </p>
        </div>

        <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-4 font-semibold">
          {currentQuestion.category}
        </div>

        <h1 className="text-3xl font-bold text-slate-900 leading-relaxed mb-8">
          {currentQuestion.question}
        </h1>

        <div className="space-y-4">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => answerQuestion(option)}
              className={`w-full text-left border rounded-xl p-5 transition font-medium text-slate-900 ${
                selectedAnswer === option
                  ? "border-blue-600 bg-blue-50 shadow"
                  : "border-slate-300 hover:border-blue-600 hover:bg-slate-50 bg-white"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex justify-between mt-10">
          <button
            onClick={handlePrevious}
            disabled={
              frameworkIndex === 0 &&
              questionIndex === 0
            }
            className="border px-8 py-3 rounded-xl disabled:opacity-50"
          >
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl disabled:opacity-50"
          >
            {frameworkIndex === frameworks.length - 1 &&
            questionIndex === frameworkQuestions.length - 1
              ? "Finish Assessment"
              : "Next"}
          </button>
        </div>
      </div>
    </main>
  );
}