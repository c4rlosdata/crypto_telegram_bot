// config.js
import dotenv from 'dotenv';

dotenv.config();

const config = {
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
  telegramChatId: process.env.TELEGRAM_CHAT_ID,

  // Chaves de API das corretoras
  binanceApiKey: process.env.BINANCE_API_KEY,
  binanceApiSecret: process.env.BINANCE_API_SECRET,

  coinbaseApiKey: process.env.COINBASE_API_KEY,
  coinbaseApiSecret: process.env.COINBASE_API_SECRET,

  // ... outras corretoras
};

export default config;
