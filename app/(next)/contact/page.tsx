import { Resend } from "resend";
import EmailTemplate from "../../(next)/components/email-template";

export default async function Page() {
  async function send() {
    "use server";
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["thibaut.randria@gmail.com"],
      subject: "Hello world",
      react: EmailTemplate({ firstName: "John" }),
    });
    console.log(data);
  }
  return (
    <form action={send}>
      {/* <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <textarea placeholder="Message"></textarea>
        <input type="file" /> */}
      <button type="submit">Submit</button>
    </form>
  );
}
