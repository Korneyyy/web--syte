import { NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, telegram, email, description } = body;

    if (!name || !phone || !telegram || !email || !description) {
      return NextResponse.json(
        { error: "Все поля обязательны" },
        { status: 400 }
      );
    }

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.warn("Telegram credentials not configured");
      return NextResponse.json(
        { success: true, message: "Заявка получена (демо-режим)" }
      );
    }

    const message = [
      "📩 <b>Новая заявка с astraweb</b>\n",
      `<b>Имя:</b> ${name}`,
      `<b>Телефон:</b> ${phone}`,
      `<b>Telegram:</b> ${telegram}`,
      `<b>Email:</b> ${email}`,
      `<b>Описание:</b> ${description}`,
    ].join("\n");

    const res = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "HTML",
        }),
      }
    );

    if (!res.ok) {
      throw new Error("Telegram API error");
    }

    return NextResponse.json({ success: true, message: "Заявка отправлена!" });
  } catch {
    return NextResponse.json(
      { error: "Ошибка отправки" },
      { status: 500 }
    );
  }
}
