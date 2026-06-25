import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-green-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-10 text-center">

        {/* Success Icon */}
        <div className="mx-auto mb-6 flex items-center justify-center w-24 h-24 rounded-full bg-green-100">
          <span className="text-5xl">✅</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Report Sent Successfully
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-lg leading-relaxed mb-8">
          Thank you for completing the compliance assessment.
          Your report request has been recorded successfully.
        </p>

        {/* Next Steps */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-left mb-8">
          <h2 className="text-xl font-semibold text-green-900 mb-4">
            What happens next?
          </h2>

          <ul className="space-y-3 text-green-800">
            <li>✓ Your assessment data has been saved.</li>

            <li>
              ✓ PDF generation will be processed automatically.
            </li>

            <li>
              ✓ The compliance report will be emailed to you.
            </li>

            <li>
              ✓ If you requested consultation, our team may contact you.
            </li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4">

          <Link
            href="/"
            className="
              flex-1
              py-4
              rounded-2xl
              bg-blue-600
              hover:bg-blue-700
              text-white
              font-semibold
              transition
            "
          >
            Back to Home
          </Link>

          <Link
            href="/company-details"
            className="
              flex-1
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
            Start New Assessment
          </Link>

        </div>
      </div>
    </main>
  );
}