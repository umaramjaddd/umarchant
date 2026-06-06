import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, phone, message } = await req.json();

    // Validate the fields present in your contact form
    if (!name || !email || !phone || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("Sending email:", { name, email, phone, message });

    const response = await resend.emails.send({
      from: "onboarding@resend.dev", // Make sure this domain is verified in your Resend dashboard
      to: "progrumar@gmail.com", 
      subject: `🛡️ New Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
    });

    console.log("Email sent successfully:", response);

    return new Response(JSON.stringify({ success: true, data: response }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}