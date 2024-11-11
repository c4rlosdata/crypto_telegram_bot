// modules/data_storage.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from '../utils/logger.js';

// Utilizado para obter o diretório atual em módulos ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFilePath = path.join(__dirname, '..', 'data', 'history.json');

// Certifique-se de que o diretório existe
if (!fs.existsSync(path.dirname(dataFilePath))) {
  fs.mkdirSync(path.dirname(dataFilePath), { recursive: true });
}

export function saveData(data) {
  fs.readFile(dataFilePath, 'utf8', (err, fileData) => {
    let jsonData = [];
    if (!err && fileData) {
      jsonData = JSON.parse(fileData);
    }

    jsonData.push({
      timestamp: new Date().toISOString(),
      data,
    });

    fs.writeFile(
      dataFilePath,
      JSON.stringify(jsonData, null, 2),
      'utf8',
      (err) => {
        if (err) {
          logger.error('Erro ao salvar dados: %s', err.message);
        } else {
          logger.info('Dados salvos com sucesso.');
        }
      }
    );
  });
}
