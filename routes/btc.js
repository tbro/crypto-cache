module.exports = (req, res, next) => {
  req.body.chain = 'BTC';
  next();
};