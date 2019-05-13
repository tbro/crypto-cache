const db = require('./db');
const { sendError, sendSuccess } = require('../lib/rpc');
const chainFromCurrency = require('../lib/util');

module.exports = async (req, res, next) => {
  const { method, node } = req.body;
  if (method === 'addNode') {
    if (!node.chain) {
      node.chain = chainFromCurrency(node.currency);
    }
    try {
      const result = await db.add(node);
      return sendSuccess({result, res});
    } catch (error) {
      const message = error.message;
      return sendError({message, res});
    }
  }
  return next();
};