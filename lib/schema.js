const Joi = require('joi');

const nodeSchema = Joi.object().keys({
  name: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/),
  chain: Joi.string().regex(/^[A-Z]{3}$/),
  currency: Joi.string().regex(/^[A-Z]{3,4}$/),
  rpcPass: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/),
  rpcPort: Joi.string().regex(/^[0-9]{2,6}$/),// number().integer().min(10).max(99999),
  rpcUser: Joi.string(),
  host: Joi.string(),
  protocol: Joi.string().regex(/^(?:https?|ws)$/),
});

const bodySchema = Joi.object().keys({
  jsonrpc: Joi.string().valid('2.0').required(),
  method: Joi.string().alphanum().required(),
  currency: Joi.string().regex(/^[A-Z]{3,4}$/),
  id: Joi.number().integer(),
  node: Joi.object().when('method', {
    is: 'addNode',
    then: nodeSchema
  })
});

module.exports = {
  nodeSchema,
  bodySchema
};