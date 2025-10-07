"use server";

import { createTransport } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

import { sleep } from "@/lib/utils";
import { emailSchema } from "@/lib/validations";

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
    console.error(
      "Something Went Wrong",
      SMTP_SERVER_USERNAME,
      SMTP_SERVER_PASSWORD,
      error
    );
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
