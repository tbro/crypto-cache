const request = require('supertest');
const { app, stop }= require('../');
const { describe, it, after, before } = require('mocha');
const { expect } = require('chai');
const db = require('../lib/db');

describe('POST node to backend', () => {
  before((done) => {
    db.drop().then(done());
  });
  after((done) => {
    db.drop().then(done());
    stop();
  });

  it('adds a node', (done) => {
    const node = {
      name: 'BTCNode',
      rpcPort: '20001',
      rpcUser: 'bitpaytest',
      rpcPass: 'local321',
      currency: 'BTC',
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
        const { id } = res.body.result;
        expect(res.body).to.include({jsonrpc: '2.0'});
        expect(res.body.result).to.include({rpcPort: '20001'});
        db.getNodesOfChain(node.currency, id).then((res) => {
        // make sure the node was stored
          expect(res).to.include({rpcPort: '20001'});
        });
        if (err) return done(err);
        done();
      });
  });
  it('it fails to add a malformed node', (done) => {
    const node = {
      rpcPort: '20001',
      rpcUser: 'bitpaytest',
      rpcPass: 'local321',
      currency: 'BTC',
      host: 'localhost',
      proto: 'http'
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
      .expect(400)
      .end((err, res) => {
        const expected = {
          jsonrpc: '2.0',
          error: 'child "node" fails because ["proto" is not allowed]'
        };
        expect(res.body).to.include(expected);
        if (err) return done(err);
        done();
      });
  });
  if (process.env.CRYPTO_STORE !== 'etcd') {
    it('fails to add a duplicate node', (done) => {
      const node = {
        rpcPort: '20001',
        rpcUser: 'bitpaytest',
        rpcPass: 'local321',
        currency: 'BTC',
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
        .expect(500)
        .end((err, res) => {
          const expected = {jsonrpc: '2.0', error: 'Duplicate node'};
          expect(res.body).to.include(expected);
          if (err) return done(err);
          done();
        });
    });
  }
});
