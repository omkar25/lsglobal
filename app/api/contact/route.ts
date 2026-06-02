import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactFormSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the form data
    const result = contactFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: result.error.issues },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message } = result.data;

    // Create transporter with SMTP configuration from environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // true for port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Format date
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const formattedTime = now.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });

    // Email content
    const mailOptions = {
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.SMTP_TO_EMAIL,
      subject: subject || `New Enquiry from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header with gradient -->
            <div style="background: linear-gradient(135deg, #D28E45 0%, #C07D35 100%); padding: 30px 40px; position: relative;">
              <div style="display: inline-block; background-color: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; margin-bottom: 15px;">
                <span style="color: #ffffff; font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;">LS GLOBAL TRADERS</span>
              </div>
              <h1 style="color: #ffffff; margin: 0 0 8px 0; font-size: 28px; font-weight: 700;">New Enquiry Received</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 14px;">${formattedDate} · ${formattedTime}</p>
              <div style="position: absolute; top: 30px; right: 40px; width: 50px; height: 50px; background-color: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 24px;">✉️</span>
              </div>
            </div>

            <!-- Content -->
            <div style="padding: 40px;">
              <p style="color: #555; font-size: 15px; line-height: 1.6; margin: 0 0 30px 0;">
                A new contact form submission has been received from the LS Global Traders website. Please find the details below.
              </p>

              <!-- Contact Information Box -->
              <div style="background-color: #D28E45; border-radius: 10px; overflow: hidden; margin-bottom: 30px;">
                <div style="padding: 15px 20px;">
                  <span style="color: #ffffff; font-size: 12px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;">CONTACT INFORMATION</span>
                </div>
                <div style="background-color: #ffffff; padding: 20px;">
                  <!-- Name -->
                  <div style="display: flex; align-items: center; padding: 15px 0; border-bottom: 1px solid #eee;">
                    <span style="background-color: #D28E45; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; min-width: 70px; text-align: center;">NAME</span>
                    <span style="color: #333; font-size: 15px; margin-left: 20px; font-weight: 500;">${name}</span>
                  </div>
                  <!-- Email -->
                  <div style="display: flex; align-items: center; padding: 15px 0; border-bottom: 1px solid #eee;">
                    <span style="background-color: #D28E45; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; min-width: 70px; text-align: center;">EMAIL</span>
                    <a href="mailto:${email}" style="color: #D28E45; font-size: 15px; margin-left: 20px; text-decoration: none; font-weight: 500;">${email}</a>
                  </div>
                  <!-- Phone -->
                  <div style="display: flex; align-items: center; padding: 15px 0; border-bottom: 1px solid #eee;">
                    <span style="background-color: #D28E45; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; min-width: 70px; text-align: center;">PHONE</span>
                    <a href="tel:${phone}" style="color: #D28E45; font-size: 15px; margin-left: 20px; text-decoration: none; font-weight: 500;">${phone}</a>
                  </div>
                  ${subject ? `
                  <!-- Subject -->
                  <div style="display: flex; align-items: center; padding: 15px 0;">
                    <span style="background-color: #D28E45; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; min-width: 70px; text-align: center;">SUBJECT</span>
                    <span style="color: #333; font-size: 15px; margin-left: 20px; font-weight: 500;">${subject}</span>
                  </div>
                  ` : ''}
                </div>
              </div>

              ${message ? `
              <!-- Message Section -->
              <div style="margin-bottom: 30px;">
                <h3 style="color: #333; font-size: 12px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; margin: 0 0 15px 0;">MESSAGE</h3>
                <div style="background-color: #f9f9f9; border-left: 4px solid #D28E45; padding: 20px; border-radius: 0 8px 8px 0;">
                  <p style="color: #555; font-size: 15px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
                </div>
              </div>
              ` : ''}

              <!-- Reply Button -->
              <div style="text-align: center; margin: 30px 0;">
                <a href="mailto:${email}" style="display: inline-block; background-color: #D28E45; color: #ffffff; padding: 14px 32px; border-radius: 30px; text-decoration: none; font-size: 15px; font-weight: 600;">Reply to ${name} →</a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #f9f9f9; padding: 25px 40px; border-top: 1px solid #eee;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <p style="color: #888; font-size: 12px; margin: 0 0 4px 0;">Auto-generated from the contact form at <a href="https://lsglobaltraders.com" style="color: #D28E45; text-decoration: none;">lsglobaltraders.com</a></p>
                  <p style="color: #aaa; font-size: 11px; margin: 0;">© ${now.getFullYear()} LS Global Traders · All rights reserved</p>
                </div>
                <span style="background-color: #fff; border: 1px solid #ddd; padding: 6px 12px; border-radius: 15px; font-size: 10px; color: #888; font-weight: 500; letter-spacing: 0.5px;">AUTO-GENERATED</span>
              </div>
            </div>

          </div>
        </body>
        </html>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone}
${subject ? `Subject: ${subject}` : ""}
${message ? `\nMessage:\n${message}` : ""}

---
This email was sent from the LS Global Traders website contact form.
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
