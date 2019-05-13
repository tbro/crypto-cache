let DB;
const BACKEND = process.env.CRYPTO_STORE;
switch (BACKEND) {
  case 'etcd':
    DB = require('./backends/etcd');
    break;
  default:
    DB = require('./backends/fake');
}

module.exports = new DB();