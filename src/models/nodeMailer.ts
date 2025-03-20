import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // Brevo requires STARTTLS, so secure should be false
  auth: {
    user: process.env.SMTP_USER as string,
    pass: process.env.SMTP_PASS as string,
  },
  tls: {
    rejectUnauthorized: false, // Prevents TLS certificate issues
  },
});

export default transporter;
