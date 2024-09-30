import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

type Data = { message: string };

// Email validation schema
const EmailSchema = z.string().email({ message: "Adresse email non valide" });

// Function to send the welcome email
async function sendWelcomeEmail(
  email: string,
  apiKey: string,
  templateId: number,
) {
  const url = `https://api.brevo.com/v3/smtp/email`;
  const data = {
    to: [{ email }],
    templateId,
  };

  const options = {
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
  };

  try {
    const response = await axios.post(url, data, options);
    if (response.status === 201) {
      return true;
    } else {
      console.error(
        "Unexpected response status from Brevo API:",
        response.status,
      );
      return false;
    }
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return false;
  }
}

// New subscriber handler
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const emailValidation = EmailSchema.safeParse(body.email);

    if (!emailValidation.success) {
      return NextResponse.json(
        { message: emailValidation.error.errors[0].message },
        { status: 400 },
      );
    }

    const email = emailValidation.data;
    const API_KEY = process.env.BREVO_API_KEY;
    const TEMPLATE_ID = parseInt(
      process.env.BREVO_WELCOME_EMAIL_TEMPLATE_ID || "0",
      10,
    );

    if (!API_KEY) {
      console.error("BREVO_API_KEY is not set");
      return NextResponse.json(
        { message: "Une erreure s'est produite." },
        { status: 500 },
      );
    }

    if (TEMPLATE_ID === 0) {
      console.warn(
        "BREVO_WELCOME_EMAIL_TEMPLATE_ID is not set. Skipping welcome email.",
      );
      return NextResponse.json(
        { message: "Merci pour votre inscription!" },
        { status: 200 },
      );
    }

    const emailSent = await sendWelcomeEmail(email, API_KEY, TEMPLATE_ID);

    if (emailSent) {
      console.log("Welcome email sent successfully!");
      return NextResponse.json(
        { message: "Merci pour votre inscription!" },
        { status: 200 },
      );
    } else {
      console.error("Failed to send welcome email");
      return NextResponse.json(
        { message: "Merci pour votre inscription!" },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error("Error in new subscriber handler:", error);
    return NextResponse.json(
      { message: "Merci pour votre inscription!" },
      { status: 200 },
    );
  }
}

export const runtime = "edge";
