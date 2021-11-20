import Observable from "./Observable";

/**
 * @typedef Deal
 * @type {Object}
 * @property {number} id
 * @property {string} title
 * @property {object} provider
 * @property {number} provider.id
 * @property {string} provider.name
 * @property {object} cost
 * @property {number} cost.upfrontCost
 * @property {number} cost.totalContractCost
 * @property {string[]} productTypes
 * @property {number} contractLength
 */

class Store extends Observable {
  constructor() {
    super();
    this.state = {
      /**
       * @type Deal[]
       */
      dealsOrg: [],
      /**
       * @type Deal[]
       */
      deals: [],
      /**
       * @type string[]
       */
      productFilters: [],
      providerFilter: null
    };
  }

  get deals() {
    return this.filter();
  }

  filter() {
    return this.state.deals;
  }

  setDeals(data) {
    this.state.deals = data;
    this.notify(this.state);
  }

  setProductFilter(value) {
    const filter = value.trim().toLowerCase();
    const index = this.state.productFilters.indexOf(filter);
    if (index === -1) {
      this.state.productFilters.push(filter);
    } else {
      this.state.productFilters.splice(index, 1);
    }
    this.notify(this.state);
  }

  setProviderFilter(value = null) {
    this.state.providerFilter = value;
    this.notify(this.state);
  }
}

export default Store;
