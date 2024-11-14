// modules/telegram_bot.js
import TelegramBot from 'node-telegram-bot-api';
import config from '../config.js';

class TelegramBotModule {
  constructor() {
    this.bot = new TelegramBot(config.telegramBotToken, { polling: false });
  }

  sendArbitrageAlert(opportunity) {
    const message = `
*Oportunidade de Arbitragem Encontrada!*

Símbolo: *${opportunity.symbol}*

Comprar em *${opportunity.buyAt}* por *$${opportunity.buyPrice.toFixed(2)}*
Vender em *${opportunity.sellAt}* por *$${opportunity.sellPrice.toFixed(2)}*

*Spread*: ${opportunity.spread.toFixed(2)}%
`;

    this.bot.sendMessage(config.telegramChatId, message, { parse_mode: 'Markdown' });
  }
}

export default TelegramBotModule;
