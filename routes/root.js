const { CryptoRpc } = require('crypto-rpc');
const chainFromCurrency = require('../lib/util');
const db = require('../lib/db');
const { sendSuccess, sendError} = require('../lib/rpc');

const handler = async (req, res) => {
  const { method, currency } = req.body;
  const chain = chainFromCurrency(currency);
  const node = await db.getChain(chain);
  if (node) {
    node.chain = chain;
    const cryptoRpc = new CryptoRpc(node);
    try {
      const result = await cryptoRpc[method]({ ...req.body });
      return sendSuccess({ result, res });
    } catch (error) {
      // FIXME this error does not reach the response
      const message = error.message;
      return sendError({message, res});
    }
  }
  const message = `No node available for '${currency}'`;
  return sendError({message, res});
};

module.exports = handler;
