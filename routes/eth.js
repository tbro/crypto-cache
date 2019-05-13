module.exports = (req, res, next) => {
  req.body.chain = 'ETH';
  next();
};