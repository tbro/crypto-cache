const hash = require('object-hash');
const { Etcd3 } = require('etcd3');
const { isValid } = require('../../lib/validate');
// const connection = process.env.ETCD_URI;

const DB = class Backend {
  constructor() {
    this.store = new Etcd3();
    this.ns = this.store.namespace('chains/');
  }
  async getChain(chain) {
    const ns = this.ns.namespace(`${chain}/`);
    const garbage = await ns.getAll();
    const node = {};
    for (const [key, value] of Object.entries(garbage)) {
      const nodeKey = key.split('/')[1];
      node[nodeKey] = value;
    }
    return node;
  }
  async getNodesOfChain(chain, id) {
    const ns = this.ns.namespace(`${chain}/`);
    const garbage = await ns.getAll();
    const node = {};
    for (const [key, value] of Object.entries(garbage)) {
      const [ _id, nodeKey ] = key.split('/');
      if (_id === id) {
        node[nodeKey] = value;
      }
    }
    return node;
  }
  async drop() {
    return await this.store.delete().all();
  }
  isValid(node) {
    return isValid({ node });
  }
  async add({ chain, ...node }) {
    if (this.isValid(node)) {
      // use hash of rpcPort and rpcHost as identifier
      // so any combination of them must be unique among nodes
      const { rpcPort, host } = node;
      const id = hash({ rpcPort, host });
      const nodeChain = this.ns.namespace(`${chain}/`);
      const ns = nodeChain.namespace(`${id}/`);
      for (const [key, value] of Object.entries(node)) {
        await ns.put(key).value(value);
      }
      const o = await ns.getAll();
      return {
        ...o,
        id
      };
    }
  }
};

module.exports = DB;
