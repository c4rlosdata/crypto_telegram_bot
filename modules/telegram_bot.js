// modules/telegram_bot.js
import TelegramBot from 'node-telegram-bot-api';
import config from '../config.js';
import logger from '../utils/logger.js';

const bot = new TelegramBot(config.telegramBotToken, { polling: false });

export function sendMessage(message) {
  bot
    .sendMessage(config.telegramChatId, message, { parse_mode: 'Markdown' })
    .then(() => {
      logger.info('Mensagem enviada com sucesso ao Telegram.');
    })
    .catch((error) => {
      logger.error('Erro ao enviar mensagem ao Telegram: %s', error.message);
    });
}
