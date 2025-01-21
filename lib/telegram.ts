// app/lib/services/telegram.ts
import { Order } from "@prisma/client";
import { getCurrencySymbol } from "@/lib/symbol";

export async function sendTelegramNotification(order: Order) {
  const total = order.price * 1.6;
  const symbol = getCurrencySymbol(order.currency);

  const message = `*** New paybcn order! *** \n ☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️ \n \n 🏧 ***${symbol}${total}*** \n 🛂 ${order.title} \n ✅ Thank you! \n \n  🔗 [Paybcn](http://paybcn.com)  ➡️ [Whitepaper](http://paybcn.com/witepaper) `;

  const telegramApiUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

  const response = await fetch(telegramApiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_CHANNEL_ID,
      message_thread_id: process.env.THREAD_ID,
      text: message,
      parse_mode: "Markdown",
    }),
  });

  if (!response.ok) {
    throw new Error(`Telegram API error: ${await response.text()}`);
  }

  return response;
}