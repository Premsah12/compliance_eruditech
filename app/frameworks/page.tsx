"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FRAMEWORKS } from "@/lib/frameworks";
import {
  loadAssessmentState,
  saveAssessmentState,
} from "@/lib/storage";

export default function FrameworksPage() {
  const router = useRouter();

  const [selected, setSelected] = useState<string[]>([]);

  const toggleFramework = (id: string) => {
    if (selected.includes(id)) {
      setSelected(
        selected.filter((framework) => framework !== id)
      );
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleContinue = () => {
    if (selected.length === 0) {
      alert("Please select at least one framework.");
      return;
    }

    const state = loadAssessmentState();

    if (!state) {
      router.push("/company-details");
      return;
    }

    saveAssessmentState({
      ...state,
      selectedFrameworks: selected,
    });

    router.push("/assessment");
  };

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Select Compliance Frameworks
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Choose one or more frameworks to assess your
            organization's compliance posture.
          </p>
        </div>

        {/* Framework Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {FRAMEWORKS.map((framework) => {
            const isSelected = selected.includes(
              framework.id
            );

            return (
              <div
                key={framework.id}
                onClick={() =>
                  toggleFramework(framework.id)
                }
                className={`
                  cursor-pointer
                  rounded-3xl
                  border-2
                  p-8
                  transition-all
                  duration-200
                  bg-white
                  shadow-sm
                  hover:shadow-xl
                  hover:-translate-y-1
                  ${
                    isSelected
                      ? "border-blue-600 ring-2 ring-blue-200"
                      : "border-gray-200"
                  }
                `}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {framework.name}
                    </h2>

                    <p className="mt-3 text-gray-600 leading-relaxed">
                      {framework.description}
                    </p>
                  </div>

                  {isSelected && (
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg">
                      ✓
                    </div>
                  )}
                </div>

                <div className="mt-8">
                  <span
                    className={`
                      inline-flex
                      px-4
                      py-2
                      rounded-full
                      text-sm
                      font-medium
                      ${
                        isSelected
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-600"
                      }
                    `}
                  >
                    {isSelected
                      ? "Selected"
                      : "Click to Select"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Count */}
        <div className="mt-10 text-center">
          <p className="text-gray-700 text-lg">
            Selected Frameworks:{" "}
            <span className="font-bold text-blue-600">
              {selected.length}
            </span>
          </p>
        </div>

        {/* Actions */}
        <div className="mt-12 flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={() =>
              router.push("/company-details")
            }
            className="
              px-8
              py-4
              rounded-2xl
              border
              border-gray-300
              bg-white
              text-gray-800
              font-semibold
              hover:bg-gray-50
              transition
            "
          >
            Back
          </button>

          <button
            onClick={handleContinue}
            className="
              px-10
              py-4
              rounded-2xl
              bg-blue-600
              hover:bg-blue-700
              text-white
              font-semibold
              shadow-lg
              transition
            "
          >
            Continue to Assessment
          </button>
        </div>
      </div>
    </main>
  );
}