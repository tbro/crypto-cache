const request = require('supertest');
const { app, stop }= require('../');
const { describe, it, after, beforeEach } = require('mocha');
const { expect } = require('chai');
const db = require('../lib/db');

describe('POST request to /bch', () => {
  beforeEach((done) => {
    const node = {
      rpcPort: '30101',
      rpcUser: 'bitpaytest',
      rpcPass: 'local321',
      currency: 'BCH',
      host: 'localhost',
      protocol: 'http'
    };
    const body = {
      jsonrpc: '2.0',
      method: 'addNode',
      node
    };
    request(app)
      .post('/')
      .send(body)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
  after((done) => {
    db.drop().then(done());
    stop();
  });

  it('gets the balance', (done) => {
    const body = {
      'jsonrpc': '2.0',
      'method': 'getBalance',
      'id': 1,
      'currency': 'BCH'
    };
    const testResult = { jsonrpc: '2.0', result: 0 };
    request(app)
      .post('/')
      .send(body)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.include(testResult);
        done();
      });
  });
});
