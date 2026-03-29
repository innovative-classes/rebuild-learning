import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailOptions) {
  // Skip sending if SMTP is not configured
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log(`[Email] SMTP not configured. Would send to ${to}: ${subject}`);
    return;
  }

  await transporter.sendMail({
    from: `"${process.env.FROM_NAME || "Rebuild Learning"}" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export function verificationEmailHtml(name: string, token: string) {
  const url = `${APP_URL}/verify-email?token=${token}`;
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
      <div style="text-align: center; margin-bottom: 32px;">
        <div style="display: inline-block; width: 40px; height: 40px; background: #dc2626; border-radius: 8px; line-height: 40px; color: white; font-weight: bold; font-size: 14px;">RL</div>
        <p style="font-size: 14px; color: #737373; margin-top: 8px;">Rebuild Learning</p>
      </div>
      <h1 style="font-size: 20px; font-weight: 600; color: #171717; margin-bottom: 8px;">Verify your email</h1>
      <p style="font-size: 14px; color: #525252; line-height: 1.6;">Hi ${name}, please verify your email address to activate your Rebuild Learning account.</p>
      <a href="${url}" style="display: inline-block; margin: 24px 0; padding: 12px 32px; background: #dc2626; color: white; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 500;">Verify Email Address</a>
      <p style="font-size: 12px; color: #a3a3a3; line-height: 1.5;">If the button doesn't work, copy and paste this link:<br/><a href="${url}" style="color: #525252;">${url}</a></p>
      <p style="font-size: 12px; color: #a3a3a3; margin-top: 32px;">This link expires in 24 hours. If you didn't create an account, please ignore this email.</p>
    </div>
  `;
}

export function passwordResetEmailHtml(name: string, token: string) {
  const url = `${APP_URL}/reset-password?token=${token}`;
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
      <div style="text-align: center; margin-bottom: 32px;">
        <div style="display: inline-block; width: 40px; height: 40px; background: #dc2626; border-radius: 8px; line-height: 40px; color: white; font-weight: bold; font-size: 14px;">RL</div>
        <p style="font-size: 14px; color: #737373; margin-top: 8px;">Rebuild Learning</p>
      </div>
      <h1 style="font-size: 20px; font-weight: 600; color: #171717; margin-bottom: 8px;">Reset your password</h1>
      <p style="font-size: 14px; color: #525252; line-height: 1.6;">Hi ${name}, we received a request to reset your password. Click the button below to create a new one.</p>
      <a href="${url}" style="display: inline-block; margin: 24px 0; padding: 12px 32px; background: #dc2626; color: white; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 500;">Reset Password</a>
      <p style="font-size: 12px; color: #a3a3a3; line-height: 1.5;">If the button doesn't work, copy and paste this link:<br/><a href="${url}" style="color: #525252;">${url}</a></p>
      <p style="font-size: 12px; color: #a3a3a3; margin-top: 32px;">This link expires in 1 hour. If you didn't request a password reset, please ignore this email.</p>
    </div>
  `;
}

export function bookingConfirmationEmailHtml(name: string, date: string, time: string, status: string) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
      <div style="text-align: center; margin-bottom: 32px;">
        <div style="display: inline-block; width: 40px; height: 40px; background: #dc2626; border-radius: 8px; line-height: 40px; color: white; font-weight: bold; font-size: 14px;">RL</div>
        <p style="font-size: 14px; color: #737373; margin-top: 8px;">Rebuild Learning</p>
      </div>
      <h1 style="font-size: 20px; font-weight: 600; color: #171717; margin-bottom: 8px;">Booking ${status === "CONFIRMED" ? "Confirmed" : "Update"}</h1>
      <p style="font-size: 14px; color: #525252; line-height: 1.6;">Hi ${name}, your counselling session has been <strong>${status.toLowerCase()}</strong>.</p>
      <div style="background: #f5f5f5; border-radius: 8px; padding: 16px; margin: 20px 0;">
        <p style="font-size: 13px; color: #525252; margin: 0 0 8px 0;"><strong>Date:</strong> ${date}</p>
        <p style="font-size: 13px; color: #525252; margin: 0;"><strong>Time:</strong> ${time}</p>
      </div>
      <p style="font-size: 12px; color: #a3a3a3; margin-top: 32px;">For questions, contact us at the email provided during registration.</p>
    </div>
  `;
}

export function paymentReceiptEmailHtml(name: string, assessmentTitle: string, amount: number, paymentId: string) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
      <div style="text-align: center; margin-bottom: 32px;">
        <div style="display: inline-block; width: 40px; height: 40px; background: #dc2626; border-radius: 8px; line-height: 40px; color: white; font-weight: bold; font-size: 14px;">RL</div>
        <p style="font-size: 14px; color: #737373; margin-top: 8px;">Rebuild Learning</p>
      </div>
      <h1 style="font-size: 20px; font-weight: 600; color: #171717; margin-bottom: 8px;">Payment Receipt</h1>
      <p style="font-size: 14px; color: #525252; line-height: 1.6;">Hi ${name}, your payment was successful!</p>
      <div style="background: #f5f5f5; border-radius: 8px; padding: 16px; margin: 20px 0;">
        <p style="font-size: 13px; color: #525252; margin: 0 0 8px 0;"><strong>Item:</strong> ${assessmentTitle}</p>
        <p style="font-size: 13px; color: #525252; margin: 0 0 8px 0;"><strong>Amount:</strong> ₹${amount}</p>
        <p style="font-size: 13px; color: #525252; margin: 0;"><strong>Payment ID:</strong> ${paymentId}</p>
      </div>
      <p style="font-size: 14px; color: #525252;">You can now access your full career report from the assessments page.</p>
      <p style="font-size: 12px; color: #a3a3a3; margin-top: 32px;">© ${new Date().getFullYear()} N.B.V. Subba Rao. Rebuild Learning.</p>
    </div>
  `;
}

export function newBookingAdminEmailHtml(studentName: string, studentEmail: string, date: string, time: string, message?: string) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
      <div style="text-align: center; margin-bottom: 32px;">
        <div style="display: inline-block; width: 40px; height: 40px; background: #dc2626; border-radius: 8px; line-height: 40px; color: white; font-weight: bold; font-size: 14px;">RL</div>
        <p style="font-size: 14px; color: #737373; margin-top: 8px;">Rebuild Learning — Admin</p>
      </div>
      <h1 style="font-size: 20px; font-weight: 600; color: #171717; margin-bottom: 8px;">New Counselling Booking</h1>
      <div style="background: #f5f5f5; border-radius: 8px; padding: 16px; margin: 20px 0;">
        <p style="font-size: 13px; color: #525252; margin: 0 0 8px 0;"><strong>Student:</strong> ${studentName}</p>
        <p style="font-size: 13px; color: #525252; margin: 0 0 8px 0;"><strong>Email:</strong> ${studentEmail}</p>
        <p style="font-size: 13px; color: #525252; margin: 0 0 8px 0;"><strong>Preferred Date:</strong> ${date}</p>
        <p style="font-size: 13px; color: #525252; margin: 0;"><strong>Preferred Time:</strong> ${time}</p>
        ${message ? `<p style="font-size: 13px; color: #525252; margin: 8px 0 0 0;"><strong>Message:</strong> ${message}</p>` : ""}
      </div>
      <p style="font-size: 14px; color: #525252;">Log in to the admin panel to confirm or reschedule this booking.</p>
    </div>
  `;
}

// --- Convenience send wrappers ---

export async function sendVerificationEmail(to: string, name: string, token: string) {
  return sendEmail({
    to,
    subject: "Verify your email — Rebuild Learning",
    html: verificationEmailHtml(name, token),
  });
}

export async function sendPasswordResetEmail(to: string, name: string, token: string) {
  return sendEmail({
    to,
    subject: "Reset your password — Rebuild Learning",
    html: passwordResetEmailHtml(name, token),
  });
}

export async function sendBookingConfirmationEmail(to: string, name: string, date: string, time: string, status = "PENDING") {
  return sendEmail({
    to,
    subject: `Counselling booking ${status === "CONFIRMED" ? "confirmed" : "update"} — Rebuild Learning`,
    html: bookingConfirmationEmailHtml(name, date, time, status),
  });
}

export async function sendPaymentReceiptEmail(to: string, name: string, amount: number, item: string, paymentId: string) {
  return sendEmail({
    to,
    subject: "Payment receipt — Rebuild Learning",
    html: paymentReceiptEmailHtml(name, item, amount, paymentId),
  });
}

export async function sendNewBookingAdminEmail(studentName: string, studentEmail: string, phone: string, date: string, time: string, message?: string) {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.FROM_EMAIL || process.env.SMTP_USER;
  if (!adminEmail) return;
  return sendEmail({
    to: adminEmail,
    subject: `New counselling booking from ${studentName}`,
    html: newBookingAdminEmailHtml(studentName, studentEmail, date, time, message),
  });
}
