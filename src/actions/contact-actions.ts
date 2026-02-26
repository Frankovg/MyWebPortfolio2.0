"use server";

import { createTransport } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

import { isTurnstileEnabled, verifyTurnstile } from "@/lib/turnstile";
import { sleep } from "@/lib/utils";
import { emailSchema } from "@/lib/validations";
import { handleError } from "@/utils/handle-error";

const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;
const SITE_MAIL_RECEIVER = process.env.SITE_MAIL_RECEIVER;

const transporter = createTransport({
  service: "gmail",
  host: SMTP_SERVER_HOST,
  port: 587,
  secure: true,
  auth: {
    user: SMTP_SERVER_USERNAME,
    pass: SMTP_SERVER_PASSWORD,
  },
});

type SendMailProps = {
  email: string;
  sendTo?: string;
  subject: string;
  text: string;
  html?: string;
};

export async function sendMail(mail: SendMailProps) {
  if (process.env.NODE_ENV === "development") {
    await sleep(1000);
  }

  const validateEmail = emailSchema.safeParse(mail);
  if (!validateEmail.success) {
    console.error("Invalid mail data.", validateEmail.error);
  }

  const { email, subject, text, html, sendTo } = mail;

  let isVerified = false;
  try {
    isVerified = await transporter.verify();
  } catch (error) {
    handleError(error, "Something Went Wrong");
    return;
  }

  let info: SMTPTransport.SentMessageInfo | undefined;
  if (isVerified) {
    info = await transporter.sendMail({
      from: email,
      to: sendTo || SITE_MAIL_RECEIVER,
      subject: subject,
      text: text,
      html: html ? html : "",
    });
    console.warn("Message Sent", info.messageId);
    console.warn("Mail sent to", SITE_MAIL_RECEIVER);
  }

  return info;
}

type SubmitContactFormProps = {
  email: string;
  subject: string;
  text: string;
  honeypot?: string;
  turnstileToken?: string;
};

type SubmitContactFormResult = {
  messageId?: string;
  error?: "turnstile_failed" | "send_failed";
};

export async function submitContactForm(
  data: SubmitContactFormProps
): Promise<SubmitContactFormResult> {
  if (data.honeypot) {
    return { messageId: "sent" };
  }

  if (isTurnstileEnabled()) {
    const result = await verifyTurnstile(data.turnstileToken || "");
    if (!result.success) {
      return { error: "turnstile_failed" };
    }
  }

  const result = await sendMail({
    email: data.email,
    subject: data.subject,
    text: data.text,
  });

  if (result?.messageId) {
    return { messageId: result.messageId };
  }

  return { error: "send_failed" };
}
