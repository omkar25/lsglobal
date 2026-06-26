import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const buyerRfqSchema = z.object({
  type: z.literal("buyer"),
  productName: z.string().min(2, "Product name is required"),
  quantity: z.string().min(1, "Quantity is required"),
  destinationCountry: z.string().min(2, "Destination country is required"),
  email: z.string().email("Invalid email address"),
  whatsapp: z.string().min(10, "WhatsApp number is required"),
  additionalDetails: z.string().optional(),
});

const supplierRfqSchema = z.object({
  type: z.literal("supplier"),
  productName: z.string().min(2, "Product name is required"),
  productionCapacity: z.string().min(1, "Production capacity is required"),
  certifications: z.string().optional(),
  country: z.string().min(2, "Country is required"),
  companyName: z.string().min(2, "Company name is required"),
  contactPerson: z.string().min(2, "Contact person is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  additionalDetails: z.string().optional(),
});

const rfqSchema = z.discriminatedUnion("type", [buyerRfqSchema, supplierRfqSchema]);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = rfqSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: result.error.issues },
        { status: 400 }
      );
    }

    const data = result.data;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

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

    const isBuyer = data.type === "buyer";
    const title = isBuyer ? "New Buyer RFQ Request" : "New Supplier Registration";
    const emoji = isBuyer ? "🛒" : "🏭";

    let detailsHtml = "";
    let detailsText = "";

    if (isBuyer) {
      detailsHtml = `
        <div style="display: flex; align-items: center; padding: 15px 0; border-bottom: 1px solid #eee;">
          <span style="background-color: #D28E45; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; min-width: 120px; text-align: center;">PRODUCT</span>
          <span style="color: #333; font-size: 15px; margin-left: 20px; font-weight: 500;">${data.productName}</span>
        </div>
        <div style="display: flex; align-items: center; padding: 15px 0; border-bottom: 1px solid #eee;">
          <span style="background-color: #D28E45; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; min-width: 120px; text-align: center;">QUANTITY</span>
          <span style="color: #333; font-size: 15px; margin-left: 20px; font-weight: 500;">${data.quantity}</span>
        </div>
        <div style="display: flex; align-items: center; padding: 15px 0; border-bottom: 1px solid #eee;">
          <span style="background-color: #D28E45; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; min-width: 120px; text-align: center;">DESTINATION</span>
          <span style="color: #333; font-size: 15px; margin-left: 20px; font-weight: 500;">${data.destinationCountry}</span>
        </div>
        <div style="display: flex; align-items: center; padding: 15px 0; border-bottom: 1px solid #eee;">
          <span style="background-color: #D28E45; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; min-width: 120px; text-align: center;">EMAIL</span>
          <a href="mailto:${data.email}" style="color: #D28E45; font-size: 15px; margin-left: 20px; text-decoration: none; font-weight: 500;">${data.email}</a>
        </div>
        <div style="display: flex; align-items: center; padding: 15px 0;">
          <span style="background-color: #D28E45; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; min-width: 120px; text-align: center;">WHATSAPP</span>
          <a href="https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}" style="color: #D28E45; font-size: 15px; margin-left: 20px; text-decoration: none; font-weight: 500;">${data.whatsapp}</a>
        </div>
      `;
      detailsText = `
Product: ${data.productName}
Quantity: ${data.quantity}
Destination Country: ${data.destinationCountry}
Email: ${data.email}
WhatsApp: ${data.whatsapp}
${data.additionalDetails ? `Additional Details: ${data.additionalDetails}` : ""}
      `;
    } else {
      detailsHtml = `
        <div style="display: flex; align-items: center; padding: 15px 0; border-bottom: 1px solid #eee;">
          <span style="background-color: #D28E45; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; min-width: 120px; text-align: center;">COMPANY</span>
          <span style="color: #333; font-size: 15px; margin-left: 20px; font-weight: 500;">${data.companyName}</span>
        </div>
        <div style="display: flex; align-items: center; padding: 15px 0; border-bottom: 1px solid #eee;">
          <span style="background-color: #D28E45; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; min-width: 120px; text-align: center;">CONTACT</span>
          <span style="color: #333; font-size: 15px; margin-left: 20px; font-weight: 500;">${data.contactPerson}</span>
        </div>
        <div style="display: flex; align-items: center; padding: 15px 0; border-bottom: 1px solid #eee;">
          <span style="background-color: #D28E45; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; min-width: 120px; text-align: center;">PRODUCT</span>
          <span style="color: #333; font-size: 15px; margin-left: 20px; font-weight: 500;">${data.productName}</span>
        </div>
        <div style="display: flex; align-items: center; padding: 15px 0; border-bottom: 1px solid #eee;">
          <span style="background-color: #D28E45; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; min-width: 120px; text-align: center;">CAPACITY</span>
          <span style="color: #333; font-size: 15px; margin-left: 20px; font-weight: 500;">${data.productionCapacity}</span>
        </div>
        <div style="display: flex; align-items: center; padding: 15px 0; border-bottom: 1px solid #eee;">
          <span style="background-color: #D28E45; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; min-width: 120px; text-align: center;">CERTIFICATIONS</span>
          <span style="color: #333; font-size: 15px; margin-left: 20px; font-weight: 500;">${data.certifications || "Not specified"}</span>
        </div>
        <div style="display: flex; align-items: center; padding: 15px 0; border-bottom: 1px solid #eee;">
          <span style="background-color: #D28E45; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; min-width: 120px; text-align: center;">COUNTRY</span>
          <span style="color: #333; font-size: 15px; margin-left: 20px; font-weight: 500;">${data.country}</span>
        </div>
        <div style="display: flex; align-items: center; padding: 15px 0; border-bottom: 1px solid #eee;">
          <span style="background-color: #D28E45; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; min-width: 120px; text-align: center;">EMAIL</span>
          <a href="mailto:${data.email}" style="color: #D28E45; font-size: 15px; margin-left: 20px; text-decoration: none; font-weight: 500;">${data.email}</a>
        </div>
        <div style="display: flex; align-items: center; padding: 15px 0;">
          <span style="background-color: #D28E45; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; min-width: 120px; text-align: center;">PHONE</span>
          <a href="tel:${data.phone}" style="color: #D28E45; font-size: 15px; margin-left: 20px; text-decoration: none; font-weight: 500;">${data.phone}</a>
        </div>
      `;
      detailsText = `
Company: ${data.companyName}
Contact Person: ${data.contactPerson}
Product: ${data.productName}
Production Capacity: ${data.productionCapacity}
Certifications: ${data.certifications || "Not specified"}
Country: ${data.country}
Email: ${data.email}
Phone: ${data.phone}
${data.additionalDetails ? `Additional Details: ${data.additionalDetails}` : ""}
      `;
    }

    const additionalDetailsHtml = (isBuyer ? data.additionalDetails : data.additionalDetails) ? `
      <div style="margin-bottom: 30px;">
        <h3 style="color: #333; font-size: 12px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; margin: 0 0 15px 0;">ADDITIONAL DETAILS</h3>
        <div style="background-color: #f9f9f9; border-left: 4px solid #D28E45; padding: 20px; border-radius: 0 8px 8px 0;">
          <p style="color: #555; font-size: 15px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${isBuyer ? data.additionalDetails : data.additionalDetails}</p>
        </div>
      </div>
    ` : "";

    const mailOptions = {
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_USER}>`,
      replyTo: data.email,
      to: process.env.SMTP_TO_EMAIL,
      subject: `${title} - ${data.productName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <div style="background: linear-gradient(135deg, #D28E45 0%, #C07D35 100%); padding: 30px 40px; position: relative;">
              <div style="display: inline-block; background-color: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; margin-bottom: 15px;">
                <span style="color: #ffffff; font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;">LS GLOBAL TRADERS</span>
              </div>
              <h1 style="color: #ffffff; margin: 0 0 8px 0; font-size: 28px; font-weight: 700;">${title}</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 14px;">${formattedDate} · ${formattedTime}</p>
              <div style="position: absolute; top: 30px; right: 40px; width: 50px; height: 50px; background-color: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 24px;">${emoji}</span>
              </div>
            </div>

            <div style="padding: 40px;">
              <p style="color: #555; font-size: 15px; line-height: 1.6; margin: 0 0 30px 0;">
                ${isBuyer ? "A new buyer has submitted a Request for Quotation (RFQ) from the LS Global Traders website." : "A new supplier has registered interest to partner with LS Global Traders."}
              </p>

              <div style="background-color: #D28E45; border-radius: 10px; overflow: hidden; margin-bottom: 30px;">
                <div style="padding: 15px 20px;">
                  <span style="color: #ffffff; font-size: 12px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;">${isBuyer ? "BUYER DETAILS" : "SUPPLIER DETAILS"}</span>
                </div>
                <div style="background-color: #ffffff; padding: 20px;">
                  ${detailsHtml}
                </div>
              </div>

              ${additionalDetailsHtml}

              <div style="text-align: center; margin: 30px 0;">
                <a href="mailto:${data.email}" style="display: inline-block; background-color: #D28E45; color: #ffffff; padding: 14px 32px; border-radius: 30px; text-decoration: none; font-size: 15px; font-weight: 600;">Reply to ${isBuyer ? "Buyer" : data.contactPerson} →</a>
              </div>
            </div>

            <div style="background-color: #f9f9f9; padding: 25px 40px; border-top: 1px solid #eee;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <p style="color: #888; font-size: 12px; margin: 0 0 4px 0;">Auto-generated from <a href="https://lsglobaltraders.com" style="color: #D28E45; text-decoration: none;">lsglobaltraders.com</a></p>
                  <p style="color: #aaa; font-size: 11px; margin: 0;">© ${now.getFullYear()} LS Global Traders · All rights reserved</p>
                </div>
                <span style="background-color: #fff; border: 1px solid #ddd; padding: 6px 12px; border-radius: 15px; font-size: 10px; color: #888; font-weight: 500; letter-spacing: 0.5px;">${isBuyer ? "BUYER RFQ" : "SUPPLIER REG"}</span>
              </div>
            </div>

          </div>
        </body>
        </html>
      `,
      text: `
${title}

${detailsText}

---
This email was sent from the LS Global Traders website.
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Request submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending RFQ email:", error);
    return NextResponse.json(
      { error: "Failed to submit request" },
      { status: 500 }
    );
  }
}
