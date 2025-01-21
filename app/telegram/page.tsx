export default async function Telegram () {
        //telegram Bot api
        const message = `*** New paybcn order ! *** \n ☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️ \n \n 🏧 ***$243.89 (1.04 ETH)*** \n 🛂 Samsonite luggage leather port uni \n ✅ Validated \n \n  🔗[Paybcn](http://example.com)   ➡️[Whitepaper](http://example.com) `;
        const telegramApiUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
    
        const telegramResponse = await fetch(telegramApiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: '-1002286354910',
            message_thread_id:'2286354910/2',
            text: message,
            parse_mode: "Markdown",
          }),
        });
    
        if (!telegramResponse.ok) {
          console.error("Failed to send message via Telegram:", await telegramResponse.text());
        } else {
          console.log("Telegram notification sent successfully!");
        }
    return (
        <div>tel</div>
    )
}