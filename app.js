// app.js
import logger from './utils/logger.js';
import { startScheduler } from './cron_jobs/scheduler.js';

logger.info('Aplicação iniciada.');
startScheduler();
