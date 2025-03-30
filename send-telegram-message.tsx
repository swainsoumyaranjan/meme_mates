import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  
    const { message } = req.body;
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
  
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return res.status(500).json({ message: "Telegram credentials are missing" });
    }
  
    try {
      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error(`Telegram API error: ${response.statusText}`);
      }
  
      return res.status(200).json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
      console.error("Telegram Bot Error:", error);
      return res.status(500).json({ success: false, message: "Failed to send message" });
    }
  }
  