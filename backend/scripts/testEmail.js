import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const user = process.env.EMAIL_USER || "prashantkrjha12@gmail.com";
const pass = (process.env.EMAIL_PASS || "").replace(/\s+/g, "");
const recipients = (process.env.EMAIL_TO || "sales.imagetechindustries@gmail.com, prashantkrjha1233@gmail.com")
  .split(",")
  .map(e => e.trim())
  .filter(Boolean);

console.log(`Connecting with user: ${user}`);
console.log(`Sending to recipients:`, recipients);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: user,
    pass: pass
  }
});

async function main() {
  try {
    const verified = await transporter.verify();
    console.log("Transporter verification success:", verified);

    const info = await transporter.sendMail({
      from: `"ImageTech Industries" <${user}>`,
      to: recipients,
      subject: "✅ Test Email - ImageTech Website Enquiry System",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #0284c7;">ImageTech Industries - Email System Configured Successfully!</h2>
          <p>This is a test notification to confirm that your Gmail SMTP integration is working properly.</p>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 20px 0;">
            <p><strong>Sender:</strong> ${user}</p>
            <p><strong>Recipients:</strong> ${recipients.join(", ")}</p>
            <p><strong>Status:</strong> Active & Ready to receive website enquiries</p>
          </div>
          <p style="font-size: 12px; color: #64748b;">ImageTech Industries Notification System</p>
        </div>
      `
    });

    console.log("Email sent successfully! MessageId:", info.messageId);
  } catch (err) {
    console.error("Error during email test:", err);
  }
}

main();
