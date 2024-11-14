// modules/arbitrage_detector.js
import EventEmitter from 'events';

class ArbitrageDetector extends EventEmitter {
  constructor(dataCollector) {
    super();
    this.dataCollector = dataCollector;

    this.dataCollector.on('price_update', (symbol, prices) => {
      this.detectArbitrage(symbol, prices);
    });
  }

  detectArbitrage(symbol, prices) {
    const exchanges = Object.keys(prices);

    if (exchanges.length < 2) {
      // Precisamos de pelo menos duas corretoras para comparar
      return;
    }

    exchanges.forEach((exchangeA) => {
      exchanges.forEach((exchangeB) => {
        if (exchangeA !== exchangeB) {
          const priceA = prices[exchangeA];
          const priceB = prices[exchangeB];

          const spread = ((priceB - priceA) / priceA) * 100;

          if (spread >= 2) {
            // Oportunidade de arbitragem encontrada
            const opportunity = {
              symbol,
              buyAt: exchangeA,
              buyPrice: priceA,
              sellAt: exchangeB,
              sellPrice: priceB,
              spread,
            };

            this.emit('arbitrage_opportunity', opportunity);
          }
        }
      });
    });
  }
}

export default ArbitrageDetector;
