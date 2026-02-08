import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string || "Новый подписчик";
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string || "Не указан";
    const service = formData.get("service") as string || "Подписка из поп-апа";
    const comment = formData.get("comment") as string || "";

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Сообщение для Telegram
    const message = `
🚀 **Новая заявка с сайта!**
👤 Имя: ${name}
📧 Email: ${email}
📞 Тел: ${phone}
🛠 Услуга: ${service}
💬 Коммент: ${comment}
    `.trim();

    // 1. Отправка в Telegram
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      await fetch(`https://api.telegram.org{botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "Markdown",
        }),
      });
    }

    // 2. Отправка в Formspree (сохраняем старую логику для страховки)
    const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT;
    if (FORMSPREE_ENDPOINT) {
      await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, service, comment }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
