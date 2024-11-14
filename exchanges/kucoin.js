import axios from 'axios';
import WebSocket from 'ws';

async function getPublicToken() {
  try {
    const response = await axios.post('https://api.kucoin.com/api/v1/bullet-public');
    return response.data.data;
  } catch (error) {
    console.error('Erro ao obter o token público:', error);
    throw error;
  }
}

async function connectWebSocket() {
  const tokenData = await getPublicToken();
  const { token, instanceServers } = tokenData;
  const { endpoint, pingInterval } = instanceServers[0];

  const ws = new WebSocket(`${endpoint}?token=${token}`);

  ws.on('open', () => {
    console.log('Conexão WebSocket estabelecida.');
    subscribeToAllTickers(ws);
  });

  ws.on('message', (data) => {
    const message = JSON.parse(data);
  
    // Verifica se o tópico e o tipo da mensagem estão corretos
    if (message.type === 'message' && message.topic === '/market/ticker:all') {
      const tickerData = message.data;
  
      // Extrai o nome da cripto removendo o sufixo "-USDT"
      const cryptoName = message.subject.replace('-', '');
  
      // Extrai o preço
      const price = tickerData.price;
  
      console.log(`Criptomoeda: ${cryptoName}, Preço atual: ${price}`);
    }
  });

  ws.on('error', (error) => {
    console.error('Erro no WebSocket:', error);
  });

  ws.on('close', () => {
    console.log('Conexão WebSocket fechada.');
    clearInterval(pingIntervalId);
  });

  const pingIntervalId = setInterval(() => {
    ws.send(JSON.stringify({ id: Date.now(), type: 'ping' }));
  }, pingInterval);
}

function subscribeToAllTickers(ws) {
  const msg = {
    id: Date.now(),
    type: 'subscribe',
    topic: '/market/ticker:all',
    privateChannel: false,
    response: true,
  };
  ws.send(JSON.stringify(msg));
}

// Executar a função de conexão
connectWebSocket();
