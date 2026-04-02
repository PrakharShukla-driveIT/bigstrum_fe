import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    // Simple split for the firstName/lastName SendGrid logic
    const [firstName, ...lastNameParts] = name.trim().split(" ");
    const lastName = lastNameParts.join(" ") || "Customer";

    if (!firstName || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const sendGridResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: process.env.CONTACT_RECEIVER_EMAIL }],
          },
        ],
        from: { 
          email: process.env.SENDGRID_VERIFIED_SENDER,
          name: "Bigstrum Website" 
        },
        reply_to: {
          email: email,
          name: name
        },
        subject: `New Lead: ${name} (${company || 'No Company'})`,
        content: [
          {
            type: "text/plain",
            value: `New submission details:\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || "N/A"}\n\nMessage:\n${message}`,
          },
        ],
      }),
    });

    if (!sendGridResponse.ok) {
      const errorData = await sendGridResponse.json();
      console.error("SendGrid API Error:", errorData);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}