const express = require('express');
const bodyParser = require('body-parser');
const btc = require('./lib/btc');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.post('/btc', btc);
app.listen(5000);
