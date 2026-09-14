import { NextResponse } from "next/server";
import { sendTelegramMessage } from "@/lib/telegram";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, role, text } = body;

    if (!name || !text) {
      return NextResponse.json(
        { error: "Имя и отзыв обязательны" },
        { status: 400 }
      );
    }

    const message = [
      "⭐ <b>Новый отзыв с astraweb</b>\n",
      `<b>Имя:</b> ${name}`,
      role ? `<b>Компания/роль:</b> ${role}` : null,
      `<b>Отзыв:</b> ${text}`,
    ]
      .filter((line): line is string => line !== null)
      .join("\n");

    const status = await sendTelegramMessage(message);

    return NextResponse.json({
      success: true,
      message:
        status === "sent"
          ? "Спасибо! Отзыв отправлен на проверку."
          : "Отзыв получен (демо-режим)",
    });
  } catch {
    return NextResponse.json(
      { error: "Ошибка отправки" },
      { status: 500 }
    );
  }
}