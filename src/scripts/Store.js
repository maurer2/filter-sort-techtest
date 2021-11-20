import Observable from "./Observable";

/**
 * @typedef Deal
 * @type {object}
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
      /**
       * @type number
       */
      providerFilter: null,
      /**
       * @typedef {{string, string}} productTypeReplacements
       */
      productTypeReplacements: {
        "Fibre Broadband": "Broadband",
        "Phone": ''
      }
    };
  }

  /**
   * @returns {Deal[]}
   */
  get deals() {
    const unfilteredDeals = this.state.deals;
    const filteredDeals = this.filterByProductFilter(unfilteredDeals);

    return filteredDeals;
  }

  /**
   * @returns {boolean}
   */
  get hasProductFilters () {
    return Boolean(this.state.productFilters.length);
  }

  /**
   * @returns {string[]}
   */
  get getProductFiltersSorted () {
    const productFiltersLowerCaseSorted = [...this.state.productFilters]
        .map((productFilter) => productFilter.toLowerCase())
        .sort();

    return productFiltersLowerCaseSorted;
  }

  /**
   * @param {Deal[]} preFilterDeals
   * @returns {Deal[]}
   */
  filterByProductFilter(preFilterDeals) {
    if (!this.hasProductFilters) {
      return preFilterDeals;
    }

    const {productTypeReplacements} = this.state;
    const productFiltersSorted = this.getProductFiltersSorted;

    const dealsMatchingProductFilters = preFilterDeals.filter((deal) => {
      const productTypesSorted = [...deal.productTypes]
        .map((productType) => {
          /**
           * @type string
           */
          const transformedProductType = (productType in productTypeReplacements)
            ? productTypeReplacements[productType]
            : productType;

          return transformedProductType.toLowerCase();
        })
        .filter((productType) => productType !== '')
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

  /**
   * @param {number} value
   * @returns {void}
   */
  setProviderFilter(value = null) {
    this.state.providerFilter = value;
    this.notify(this.state);
  }
}

export default Store;
