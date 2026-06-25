import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-100 flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-bold text-slate-900 mb-6">
          Eruditech Compliance Assessment Tool
        </h1>

        <p className="text-lg text-slate-600 mb-8">
          Assess your organization's compliance posture across multiple
          regulatory frameworks and receive a detailed PDF report.
        </p>

        <Link
          href="/company-details"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition"
        >
          Start Assessment
        </Link>
      </div>
    </main>
  );
}