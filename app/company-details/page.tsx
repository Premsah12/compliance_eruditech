"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CompanyInfo, AssessmentState } from "@/lib/types";
import { saveAssessmentState } from "@/lib/storage";

export default function CompanyDetailsPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CompanyInfo>();

  const onSubmit = async (data: CompanyInfo) => {
    const state: AssessmentState = {
      companyInfo: data,
      selectedFrameworks: [],
      responses: {},
      isComplete: false,
    };

    saveAssessmentState(state);

    router.push("/frameworks");
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-200">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Company Details
          </h1>

          <p className="mt-2 text-gray-600">
            Enter your organization details to begin the compliance
            assessment.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>

            <input
              {...register("firstName", {
                required: "First Name is required",
              })}
              placeholder="Enter your first name"
              className="
                w-full
                px-4
                py-3
                rounded-xl
                border
                border-gray-300
                bg-white
                text-gray-900
                placeholder:text-gray-500
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
                transition
              "
            />

            {errors.firstName && (
              <p className="mt-2 text-sm text-red-600">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>

            <input
              {...register("companyName", {
                required: "Company Name is required",
              })}
              placeholder="Enter company name"
              className="
                w-full
                px-4
                py-3
                rounded-xl
                border
                border-gray-300
                bg-white
                text-gray-900
                placeholder:text-gray-500
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
                transition
              "
            />

            {errors.companyName && (
              <p className="mt-2 text-sm text-red-600">
                {errors.companyName.message}
              </p>
            )}
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Industry
            </label>

            <input
              {...register("industry", {
                required: "Industry is required",
              })}
              placeholder="Healthcare, Fintech, SaaS..."
              className="
                w-full
                px-4
                py-3
                rounded-xl
                border
                border-gray-300
                bg-white
                text-gray-900
                placeholder:text-gray-500
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
                transition
              "
            />

            {errors.industry && (
              <p className="mt-2 text-sm text-red-600">
                {errors.industry.message}
              </p>
            )}
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country
            </label>

            <input
              {...register("country", {
                required: "Country is required",
              })}
              placeholder="India"
              className="
                w-full
                px-4
                py-3
                rounded-xl
                border
                border-gray-300
                bg-white
                text-gray-900
                placeholder:text-gray-500
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
                transition
              "
            />

            {errors.country && (
              <p className="mt-2 text-sm text-red-600">
                {errors.country.message}
              </p>
            )}
          </div>

          {/* Company Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Size
            </label>

            <select
              {...register("companySize", {
                required: "Company Size is required",
              })}
              className="
                w-full
                px-4
                py-3
                rounded-xl
                border
                border-gray-300
                bg-white
                text-gray-900
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
                transition
              "
            >
              <option value="">Select company size</option>
              <option value="startup">Startup (1–10)</option>
              <option value="small">Small (11–50)</option>
              <option value="medium">Medium (51–250)</option>
              <option value="enterprise">Enterprise (250+)</option>
            </select>

            {errors.companySize && (
              <p className="mt-2 text-sm text-red-600">
                {errors.companySize.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              {...register("email", {
                required: "Email Address is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Please enter a valid email address",
                },
              })}
              placeholder="john@example.com"
              className="
                w-full
                px-4
                py-3
                rounded-xl
                border
                border-gray-300
                bg-white
                text-gray-900
                placeholder:text-gray-500
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
                transition
              "
            />

            {errors.email && (
              <p className="mt-2 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="
              w-full
              mt-4
              bg-blue-600
              hover:bg-blue-700
              disabled:bg-blue-400
              text-white
              font-semibold
              py-4
              rounded-xl
              transition
              shadow-md
            "
          >
            {isSubmitting
              ? "Processing..."
              : "Continue to Framework Selection"}
          </button>
        </form>
      </div>
    </main>
  );
}