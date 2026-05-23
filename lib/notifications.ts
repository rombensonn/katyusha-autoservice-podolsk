import nodemailer from "nodemailer";
import type { StoredLead } from "@/lib/lead-schema";
import { business } from "@/lib/site-data";
import { escapeHtml } from "@/lib/utils";

export function formatLeadMessage(lead: StoredLead) {
  return [
    "Новая заявка с сайта «Катюша»",
    "",
    `Имя: ${lead.name}`,
    `Телефон: ${lead.phoneNormalized}`,
    `Автомобиль: ${lead.car || "не указан"}`,
    `Проблема: ${lead.problem}`,
    `Способ связи: ${lead.contactMethod}`,
    `Страница: ${lead.sourcePage || "не указана"}`,
    `Дата и время: ${lead.receivedAt}`
  ].join("\n");
}

export async function sendTelegramLead(lead: StoredLead) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return { configured: false, sent: false };
  }

  const message = formatLeadMessage(lead);
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      disable_web_page_preview: true
    })
  });

  if (!response.ok) {
    throw new Error("Telegram request failed");
  }

  const data = (await response.json()) as { ok?: boolean };
  if (!data.ok) {
    throw new Error("Telegram API returned not ok");
  }

  return { configured: true, sent: true };
}

export async function sendEmailLead(lead: StoredLead) {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.LEADS_EMAIL_TO;

  if (!host || !user || !pass || !to) {
    return { configured: false, sent: false };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });

  const text = formatLeadMessage(lead);

  await transporter.sendMail({
    from: `"${business.name}" <${user}>`,
    to,
    subject: "Новая заявка с сайта «Катюша»",
    text,
    html: `<pre style="font-family: Arial, sans-serif; white-space: pre-wrap;">${escapeHtml(text)}</pre>`
  });

  return { configured: true, sent: true };
}
