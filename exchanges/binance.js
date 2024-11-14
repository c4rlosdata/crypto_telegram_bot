// exchanges/binance.js
import WebSocket from 'ws';
import EventEmitter from 'events';

class Binance extends EventEmitter {
  constructor() {
    super();
    this.ws = null;
    this.connect();
  }

  connect() {
    const streamName = '!ticker@arr'; // Stream para todos os tickers

    this.ws = new WebSocket(`wss://stream.binance.com:9443/ws/${streamName}`);

    this.ws.on('open', () => {
      console.log('Conectado ao Binance WebSocket');
    });

    this.ws.on('message', (data) => {
      this.handleMessage(data);
    });

    this.ws.on('error', (error) => {
      console.error('Erro no WebSocket da Binance:', error);
      this.reconnect();
    });

    this.ws.on('close', () => {
      console.log('WebSocket da Binance desconectado. Reconectando...');
      this.reconnect();
    });
  }

  handleMessage(data) {
    try {
      const json = JSON.parse(data);

      // `json` é um array de tickers
      json.forEach((ticker) => {
        const normalizedData = {
          exchange: 'Binance',
          symbol: ticker.s,             // Símbolo, e.g., 'BTCUSDT'
          price: parseFloat(ticker.c),  // Último preço
          timestamp: Date.now(),
        };

        // Emitir um evento 'update' com os dados normalizados
        this.emit('update', normalizedData);
      });
    } catch (error) {
      console.error('Erro ao processar mensagem da Binance:', error);
    }
  }

  reconnect() {
    if (this.ws) {
      this.ws.removeAllListeners();
      this.ws = null;
    }

    setTimeout(() => {
      console.log('Tentando reconectar ao Binance WebSocket...');
      this.connect();
    }, 5000);
  }
}

export default Binance;
