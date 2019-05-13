const hash = require('object-hash');
const { isValid } = require('../../lib/validate');

const DB = class Backend {
  constructor() {
    this.store = {};
    this.ns = this.store['chains'] = {};
  }
  async getChain(chain) {
    const nodes = this.ns[chain];
    const id = Object.keys(nodes)[0];
    return nodes[id];
  }
  async getNodesOfChain(chain, id) {
    return this.ns[chain][id];
  }
  async drop() {
    return this.ns = {};
  }
  isValid(node) {
    return isValid({node});
  }
  async add({ chain, ...node }) {
    if (this.isValid(node)) {
      const { rpcPort, host } = node;
      const id = hash({ rpcPort, host });
      if (!this.ns.hasOwnProperty(chain)) {
        this.ns[chain] = {};
      }
      const nodeChain = this.ns[chain];
      if (nodeChain.hasOwnProperty(id)) {
        throw new Error('Duplicate node');
      }
      nodeChain[id] = node;
      return {
        ...node,
        id
      };
    }
  }
};

module.exports = DB;
