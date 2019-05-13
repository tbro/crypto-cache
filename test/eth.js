const request = require('supertest');
const { app, stop }= require('../');
const { describe, it, after, beforeEach } = require('mocha');
const { expect } = require('chai');
const db = require('../lib/db');

describe('POST request to /eth', () => {
  beforeEach((done) => {
    const node = {
      rpcPort: '8545',
      currency: 'ETH',
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
      'currency': 'ETH'
    };
    request(app)
      .post('/')
      .send(body)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.include({ jsonrpc: '2.0' });
        expect(res.body.result[0]).to.include({ balance: '100000000000000000000' });
        if (err) return done(err);
        done();
      });
  });
});
