"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  loadAssessmentState,
  saveAssessmentState,
} from "@/lib/storage";

export default function SubmissionPage() {
  const router = useRouter();

  const [emailConsent, setEmailConsent] = useState(false);
  const [contactConsent, setContactConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!emailConsent) {
      alert(
        "Please agree to receive your report via email."
      );
      return;
    }

    const state = loadAssessmentState();

    if (!state) {
      alert("Assessment data not found.");
      router.push("/");
      return;
    }

    setLoading(true);

    try {
      /*
        Save consent selections
      */
      (state as any).emailConsent =
        emailConsent;

      (state as any).contactConsent =
        contactConsent;

      saveAssessmentState(state);

      /*
        Send to API
      */
      const response = await fetch(
        "/api/send-email",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            state,
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
            "Failed to send report."
        );
      }

      router.push("/success");
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-12 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-3xl border border-gray-200">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Submit Your Report
          </h1>

          <p className="mt-3 text-gray-600 text-lg">
            Review the information below and
            choose how you'd like to receive
            your compliance assessment report.
          </p>
        </div>

        {/* Email Consent */}
        <div className="border border-gray-200 rounded-2xl p-6 mb-6">
          <label className="flex items-start gap-4 cursor-pointer">

            <input
              type="checkbox"
              checked={emailConsent}
              onChange={(e) =>
                setEmailConsent(
                  e.target.checked
                )
              }
              className="mt-1 h-5 w-5"
            />

            <div>
              <p className="font-semibold text-gray-900">
                I agree to receive my
                assessment report via email.
              </p>

              <p className="text-gray-600 text-sm mt-2">
                A PDF copy of your report
                will be delivered to your
                registered email address.
              </p>
            </div>

          </label>
        </div>

        {/* Contact Consent */}
        <div className="border border-gray-200 rounded-2xl p-6 mb-8">
          <label className="flex items-start gap-4 cursor-pointer">

            <input
              type="checkbox"
              checked={contactConsent}
              onChange={(e) =>
                setContactConsent(
                  e.target.checked
                )
              }
              className="mt-1 h-5 w-5"
            />

            <div>
              <p className="font-semibold text-gray-900">
                I agree to be contacted
                regarding compliance
                improvement services.
              </p>

              <p className="text-gray-600 text-sm mt-2">
                Eruditech Solutions may
                contact you with
                recommendations,
                remediation strategies,
                and compliance guidance.
              </p>
            </div>

          </label>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-4">

          <button
            onClick={() =>
              router.push("/results")
            }
            disabled={loading}
            className="
              flex-1
              border
              border-gray-300
              py-4
              rounded-2xl
              font-semibold
              text-gray-800
              hover:bg-gray-50
              transition
              disabled:opacity-50
            "
          >
            Back
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`
              flex-1
              py-4
              rounded-2xl
              font-semibold
              text-white
              transition
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }
            `}
          >
            {loading
              ? "Generating & Sending Report..."
              : "Send Report"}
          </button>

        </div>

      </div>
    </main>
  );
}