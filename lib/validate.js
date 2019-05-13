const { nodeSchema, bodySchema } = require('./schema');
const { sendError} = require('../lib/rpc');

const validate =  (req, res, next) => {
  const { error } = bodySchema.validate(req.body);
  if (error) {
    const message = error.message;
    const status = 400;
    return sendError({ message, status, res });
  }
  return next();
};

const isValid = ({ body, node}) => {
  let error = false;
  if (body) {
    ({ error } = bodySchema.validate(body));
  }
  if (node) {
    ({ error } = nodeSchema.validate(node));
  }
  return !error;
};

module.exports = {
  validate,
  isValid
};