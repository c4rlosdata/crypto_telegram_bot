// modules/api_integration.js
import axios from 'axios';
import logger from '../utils/logger.js';
import config from '../config.js';

export async function fetchBinanceData() {
  try {
    const response = await axios.get(
      'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT'
    );
    return response.data;
  } catch (error) {
    logger.error('Erro ao buscar dados da Binance: %s', error.message);
    return null;
  }
}

export async function fetchCoinbaseData() {
  try {
    const response = await axios.get(
      'https://api.coinbase.com/v2/prices/BTC-USD/spot'
    );
    return response.data;
  } catch (error) {
    logger.error('Erro ao buscar dados da Coinbase: %s', error.message);
    return null;
  }
}

// Adicione funções para as outras corretoras de forma similar

export async function fetchAllData() {
  const [binanceData, coinbaseData] = await Promise.all([
    fetchBinanceData(),
    fetchCoinbaseData(),
    // Adicione outras chamadas aqui
  ]);

  return {
    binance: binanceData,
    coinbase: coinbaseData,
    // Outras corretoras
  };
}
