import { Resend } from "resend";
import { EmailTemplate } from "../../(next)/components/ui";

export async function GET() {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: "<contact@tamisitee-experiment.com>",
      to: ["thibaut.randria@gmail.com"],
      subject: "Hello world",
      react: EmailTemplate({ firstName: "John" }),
      attachments: [
        {
          filename: "logo.png",
        },
      ],
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
