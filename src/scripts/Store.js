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

  /**
   * @returns {Deal[]}
   */
  get deals() {
    return this.filterByProductFilter();
  }

  /**
   * @returns {boolean}
   */
  get hasProductFilters () {
    return Boolean(this.state.productFilters.length);
  }

  /**
   * @returns {Deal[]}
   */
  filterByProductFilter() {
    const {productFilters, deals} = this.state;
    if (!this.hasProductFilters) {
      return deals;
    }

    const productFiltersSorted = [...productFilters]
        .map((productFilter) => productFilter.toLowerCase())
        .sort();
    const productTypeReplacements = {
      "Fibre Broadband": "Broadband"
    };

    const dealsMatchingProductFilters = deals.filter((deal) => {
      const productTypesSorted = [...deal.productTypes]
        .map((productType) => {
          const transformedProductType = (productType in productTypeReplacements)
            ? productTypeReplacements[productType]
            : productType;

          return transformedProductType.toLowerCase();
        })
        .filter((productType) => productType !== 'phone')
        .sort();

      const typesAndFiltersAreMatching = JSON.stringify(productTypesSorted) === JSON.stringify(productFiltersSorted);

      return typesAndFiltersAreMatching;
    });

    return dealsMatchingProductFilters;
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
