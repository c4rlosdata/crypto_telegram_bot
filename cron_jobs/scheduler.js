// cron_jobs/scheduler.js
import cron from 'node-cron';
import logger from '../utils/logger.js';
import { fetchAllData } from '../modules/api_integration.js';
import { processData } from '../modules/data_processing.js';
import { sendMessage } from '../modules/telegram_bot.js';
import { saveData } from '../modules/data_storage.js';

export function startScheduler() {
  // Executa a cada 10 minutos
  cron.schedule('*/10 * * * *', async () => {
    logger.info('Iniciando tarefa agendada.');

    try {
      const data = await fetchAllData();
      const message = processData(data);

      sendMessage(message);
      saveData(data);
    } catch (error) {
      logger.error('Erro na tarefa agendada: %s', error.message);
    }
  });

  logger.info('Scheduler iniciado e aguardando próxima execução.');
}
