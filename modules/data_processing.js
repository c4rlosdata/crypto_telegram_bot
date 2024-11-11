// modules/data_processing.js
export function processData(data) {
    // Exemplo de processamento simples
    const binancePrice = data.binance ? parseFloat(data.binance.price) : null;
    const coinbasePrice = data.coinbase
      ? parseFloat(data.coinbase.data.amount)
      : null;
  
    // Calcular média de preços (se ambos disponíveis)
    const averagePrice =
      binancePrice && coinbasePrice
        ? ((binancePrice + coinbasePrice) / 2).toFixed(2)
        : null;
  
    // Formatar a mensagem
    const message = `
  *Atualização de Preços do Bitcoin*
  
  _Binance_: ${binancePrice ? `$${binancePrice}` : 'Dados indisponíveis'}
  _Coinbase_: ${coinbasePrice ? `$${coinbasePrice}` : 'Dados indisponíveis'}
  
  *Média de Preços*: ${
      averagePrice ? `$${averagePrice}` : 'Não foi possível calcular'
    }
  `;
    return message;
  }
  