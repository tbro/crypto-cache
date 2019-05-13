const rpcObject = {
  jsonrpc: '2.0'
};

function sendSuccess({result, res}) {
  return res.send({
    ...rpcObject,
    result
  });
}

function sendError({message, status, res}) {
  const code = (status) ? status : 500;
  return res.status(code).send({
    ...rpcObject,
    error: message
  });
}

module.exports = {
  sendSuccess,
  sendError
};