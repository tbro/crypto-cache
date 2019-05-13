module.exports = (req, res, next) => {
  req.body.chain = 'BCH';
  next();
};