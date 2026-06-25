import { NextResponse } from "next/server";
import { Resend } from "resend";

import { generateAssessmentPDF } from "@/lib/pdf";
import { AssessmentState } from "@/lib/types";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    console.log(
      "RESEND API KEY EXISTS:",
      !!process.env.RESEND_API_KEY
    );

    const body = await req.json();

    const state: AssessmentState = body.state;

    if (!state) {
      return NextResponse.json(
        { error: "Assessment data is required." },
        { status: 400 }
      );
    }

    if (!state.companyInfo?.email) {
      return NextResponse.json(
        { error: "User email is missing." },
        { status: 400 }
      );
    }

    /*
      Generate PDF
    */
    const pdfBuffer = generateAssessmentPDF(state);

    const companyName =
      state.companyInfo.companyName ||
      "Compliance Assessment";

    /*
      Email to User
    */
    const userEmail = await resend.emails.send({
      from:
        "Eruditech Solutions <contact@eruditechsolutions.com>",

      to: [state.companyInfo.email],

      subject:
        "Your Compliance Assessment Report",

      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Compliance Assessment Report</h2>

          <p>
            Dear ${state.companyInfo.firstName},
          </p>

          <p>
            Thank you for completing the compliance assessment.
          </p>

          <p>
            Your assessment report is attached to this email.
          </p>

          <p>
            Regards,<br/>
            Eruditech Solutions
          </p>
        </div>
      `,

      attachments: [
        {
          filename: `${companyName.replace(
            /\s+/g,
            "_"
          )}_Compliance_Report.pdf`,

          content: Buffer.from(pdfBuffer),
        },
      ],
    });

    console.log(
      "USER EMAIL RESPONSE:",
      userEmail
    );

    if (userEmail.error) {
      return NextResponse.json(
        {
          success: false,
          error: userEmail.error.message,
        },
        {
          status: 500,
        }
      );
    }

    /*
      Email to Admin
    */
    const adminEmail = await resend.emails.send({
      from:
        "Eruditech Solutions <contact@eruditechsolutions.com>",

      to: ["contact@eruditechsolutions.com"],

      subject: `New Assessment Submission - ${companyName}`,

      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>New Compliance Assessment Submitted</h2>

          <p>
            A new assessment has been completed.
          </p>

          <ul>
            <li>
              <strong>Name:</strong>
              ${state.companyInfo.firstName}
            </li>

            <li>
              <strong>Company:</strong>
              ${state.companyInfo.companyName}
            </li>

            <li>
              <strong>Email:</strong>
              ${state.companyInfo.email}
            </li>

            <li>
              <strong>Industry:</strong>
              ${state.companyInfo.industry}
            </li>

            <li>
              <strong>Country:</strong>
              ${state.companyInfo.country}
            </li>

            <li>
              <strong>Company Size:</strong>
              ${state.companyInfo.companySize}
            </li>

            <li>
              <strong>Frameworks:</strong>
              ${state.selectedFrameworks.join(", ")}
            </li>
          </ul>

          <p>
            The generated report is attached.
          </p>
        </div>
      `,

      attachments: [
        {
          filename: `${companyName.replace(
            /\s+/g,
            "_"
          )}_Compliance_Report.pdf`,

          content: Buffer.from(pdfBuffer),
        },
      ],
    });

    console.log(
      "ADMIN EMAIL RESPONSE:",
      adminEmail
    );

    return NextResponse.json({
      success: true,
      message: "Emails sent successfully.",
      userEmail,
      adminEmail,
    });
  } catch (error) {
    console.error(
      "SEND EMAIL ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to send report.",
      },
      {
        status: 500,
      }
    );
  }
}