const { CryptoRpc } = require('crypto-rpc');
const chainFromCurrency = require('./util');

const defaults = {
  chain: 'BTC',
  host: 'localhost',
  protocol: 'http',
  rpcPort: '8001',
  rpcUser: 'bitpaytest',
  rpcPass: 'local321',
};

// HDR='Content-type: application/json'
// MSG='{"jsonrpc": "2.0", "method": "getBalance", "id": 1, "rpcPort": 20001, "currency": "BTC"}'
// curl -H "$HDR" -d "$MSG" http://localhost:5000/btc

const methods = {
  getBalance: async ({ currency, cryptoRpc }) => {
    return await cryptoRpc.getBalance({ currency });
  }
} 

const btc = async (req, res) => {
  const { method, id, jsonrpc, ...config } = {
    ...defaults,
    ...req.body,
  }
  const cryptoRpc = new CryptoRpc(config);
  try {
    const result = await methods[method]({ ...req.body, cryptoRpc });
    return res.send({"jsonrpc":"2.0","id": id,"result": result});
  } catch (error) {
    return res.send({"jsonrpc":"2.0","id": id,"result": error.message});
  }
};

module.exports = btc;