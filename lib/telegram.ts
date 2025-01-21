// app/lib/services/telegram.ts
import { Order } from "@prisma/client";
import { getCurrencySymbol } from "@/lib/symbol";

export async function sendTelegramNotification(order: Order) {
  const total = (order.price * 1.6).toFixed(2);
  const symbol = getCurrencySymbol(order.currency);
  const title = order.title.length > 40 
  ? order.title.slice(0, 37) + '...' 
  : order.title;

  const message = `*** New paybcn order! *** \n ☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️ \n \n 🏧 ***${symbol}${total}*** \n 🛂 ${title} \n \n  ➡️ [Support](https://t.me/c/2286354910/2)`;

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