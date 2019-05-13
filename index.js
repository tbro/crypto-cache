const express = require('express');
const bodyParser = require('body-parser');
const root = require('./routes/root');
const btc = require('./routes/btc');
const bch = require('./routes/bch');
const eth = require('./routes/eth');
const { validate } = require('./lib/validate');
const localMethods = require('./lib/node');

const port = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(validate);
app.use(localMethods);
app.post('/btc', btc);
app.post('/bch', bch);
app.post('/eth', eth);
app.post('/', root);
const server = app.listen(port);

function stop() {
  server.close();
}
module.exports = {
  app,
  stop
};