// modules/data_collector.js
import EventEmitter from 'events';
import Binance from '../exchanges/binance.js';
// Importar outros módulos de corretoras conforme forem implementados

class DataCollector extends EventEmitter {
  constructor() {
    super();
    this.exchanges = {};
    this.prices = {}; // { 'BTC/USDT': { Binance: 60000, ... }, ... }

    this.init();
  }

  init() {
    // Instanciar e conectar à Binance
    const binance = new Binance();
    this.exchanges['Binance'] = binance;

    binance.on('update', (data) => {
      this.updatePrice(data);
    });

    // Repetir para outras corretoras
  }

  updatePrice(data) {
    const { exchange, symbol, price } = data;

    if (!this.prices[symbol]) {
      this.prices[symbol] = {};
    }

    this.prices[symbol][exchange] = price;

    // Emitir um evento 'price_update' com o símbolo atualizado
    this.emit('price_update', symbol, this.prices[symbol]);
  }
}

export default DataCollector;
