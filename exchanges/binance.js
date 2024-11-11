// exchanges/binance.js
import WebSocket from 'ws';
import EventEmitter from 'events';

class Binance extends EventEmitter {
  constructor() {
    super();
    this.ws = null;
  }

  connect() {
    this.ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');

    this.ws.on('message', (data) => {
      const json = JSON.parse(data);
      // Processar e emitir dados normalizados
      this.emit('update', {
        exchange: 'Binance',
        symbol: 'BTC/USDT',
        price: parseFloat(json.p),
        // Outros dados necessários
      });
    });

    this.ws.on('error', (error) => {
      // Tratar erros e reconectar se necessário
    });
  }

  // Métodos adicionais para reconexão, etc.
}

export default Binance;
