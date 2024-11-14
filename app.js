// app.js
import DataCollector from './modules/data_collector.js';
import ArbitrageDetector from './modules/arbitrage_detector.js';
import TelegramBotModule from './modules/telegram_bot.js';

const dataCollector = new DataCollector();
const arbitrageDetector = new ArbitrageDetector(dataCollector);
const telegramBot = new TelegramBotModule();

arbitrageDetector.on('arbitrage_opportunity', (opportunity) => {
  console.log('Oportunidade de Arbitragem Encontrada:', opportunity);
  telegramBot.sendArbitrageAlert(opportunity);
});
