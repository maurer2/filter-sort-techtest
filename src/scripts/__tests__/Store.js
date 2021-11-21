import Store from "../Store";
import mockData from "../../../public/db.json";

const deals = mockData.deals.map((deal) => ({
  title: deal.title,
  cost: deal.cost
}));

const getProviderIdByName = (providerName) => {
  const providers = mockData.deals.map((deal) => deal.provider);
  const entry = providers.find((provider) => provider.name === providerName);

  return entry.id;
};

const getDealsOrderedByUpfrontCost = () => {
  const sortedDeals = deals.sort((dealOne, dealTwo) => {
    const costDealOne = dealOne.cost.upfrontCost;
    const costDealTwo = dealTwo.cost.upfrontCost;

    if (costDealOne > costDealTwo) {
      return 1;
    }

    if (costDealOne < costDealTwo) {
      return -1;
    }

    return 0;
  });

  return sortedDeals;
};

const getDealsOrderedByAllCosts = () => {
  const sortedDeals = deals.sort((dealOne, dealTwo) => {
    const costDealOne = dealOne.cost.upfrontCost + dealOne.cost.totalContractCost;
    const costDealTwo = dealTwo.cost.upfrontCost + dealTwo.cost.totalContractCost;

    if (costDealOne > costDealTwo) {
      return 1;
    }

    if (costDealOne < costDealTwo) {
      return -1;
    }

    return 0;
  });

  return sortedDeals;
};

let result;
let store;

describe("Filtering", () => {
  beforeEach(() => {
    store = new Store();
    store.setDeals(mockData.deals);
  });

  describe("GIVEN no filters applied", () => {
    beforeEach(() => {
      result = store.deals;
    });

    it("THEN should return all deals", () => {
      expect(result).toEqual(mockData.deals);
      expect(result.length).toBe(11);
    });

    it("THEN hasProductFilters should be false", () => {
      expect(store.hasProductFilters).toEqual(false);
    });

    it("THEN hasProductFilters should be empty", () => {
      expect(store.getProductFiltersSorted).toEqual([]);
    });

    it("THEN hasProviderFilters should be false", () => {
      expect(store.hasProviderFilters).toEqual(false);
    });
  });

  describe("GIVEN that broadband product filter is enabled and provider filters are disabled", () => {
    beforeEach(() => {
      store.setProductFilter('broadband');

      result = store.deals;
    });

    it("THEN should return 4 deals", () => {
      expect(result.length).toBe(4);
    });

    it("THEN should only contain broadband deals", () => {
      const productTypesBag = result.flatMap((resultEntry) => resultEntry.productTypes);
      const productTypes = [...new Set(productTypesBag)];
      const targetProductTypes = [
        'Broadband',
        'Phone',
        'Fibre Broadband'
      ];

      const hasEveryTargetType = productTypes.every((productTyp) => targetProductTypes.includes(productTyp));
      expect(hasEveryTargetType).toBe(true);

      const hasOtherProductType = productTypes.find((productTyp) => !targetProductTypes.includes(productTyp));
      expect(hasOtherProductType).toBeFalsy();
    });
  });

  describe("GIVEN that broadband and tv product filters are enabled and provider filters are disabled", () => {
    beforeEach(() => {
      store.setProductFilter('broadband');
      store.setProductFilter('tv');

      result = store.deals;
    });

    it("THEN should return 4 deals", () => {
      expect(result.length).toBe(4);
    });

    it("THEN should only contain broadband and tv deals", () => {
      const productTypesBag = result.flatMap((resultEntry) => resultEntry.productTypes);
      const productTypes = [...new Set(productTypesBag)];
      const targetProductTypes = [
        'Broadband',
        'Phone',
        'Fibre Broadband',
        'TV'
      ];

      const hasEveryTargetType = productTypes.every((productTyp) => targetProductTypes.includes(productTyp));
      expect(hasEveryTargetType).toBe(true);

      const hasOtherProductType = productTypes.find((productTyp) => !targetProductTypes.includes(productTyp));
      expect(hasOtherProductType).toBeFalsy();
    });
  });

  describe("GIVEN that broadband and mobile product filters are enabled and provider filters are disabled", () => {
    beforeEach(() => {
      store.setProductFilter('broadband');
      store.setProductFilter('mobile');

      result = store.deals;
    });

    it("THEN should return 1 deal", () => {
      expect(result.length).toBe(1);
    });

    it("THEN should only contain broadband and mobile deals", () => {
      const productTypesBag = result.flatMap((resultEntry) => resultEntry.productTypes);
      const productTypes = [...new Set(productTypesBag)];
      const targetProductTypes = [
        'Broadband',
        'Phone',
        'Fibre Broadband',
        'Mobile'
      ];

      const hasEveryTargetType = productTypes.every((productTyp) => targetProductTypes.includes(productTyp));
      expect(hasEveryTargetType).toBe(true);

      const hasOtherProductType = productTypes.find((productTyp) => !targetProductTypes.includes(productTyp));
      expect(hasOtherProductType).toBeFalsy();
    });
  });

  describe("GIVEN that sky provider filter is enabled and product filters are disabled", () => {
    beforeEach(() => {
      const idSky = getProviderIdByName('Sky');
      store.setProviderFilter(idSky);

      result = store.deals;
    });

    it("THEN should return 1 deal", () => {
      expect(result.length).toBe(1);
    });

    it("THEN should only contain sky deal", () => {
      const providerTypesBag = result.map((resultEntry) => resultEntry.provider.id);
      const providerTypes = [...new Set(providerTypesBag)];
      const targetProviderTypes = [getProviderIdByName('Sky')];

      const hasEveryTargetType = providerTypes.every((providerType) => targetProviderTypes.includes(providerType));
      expect(hasEveryTargetType).toBe(true);
    });
  });

  describe("GIVEN that broadband and tv product filters are enabled and provider filter is set to BT", () => {
    beforeEach(() => {
      const idBT = getProviderIdByName('BT');
      store.setProviderFilter(idBT);

      store.setProductFilter('broadband');
      store.setProductFilter('tv');

      result = store.deals;
    });

    it("THEN should return 2 deals", () => {
      expect(result.length).toBe(2);
    });

    it("THEN should only contain broadband and mobile and BT deals", () => {
      const productTypesBag = result.flatMap((resultEntry) => resultEntry.productTypes);
      const productTypes = [...new Set(productTypesBag)];
      const targetProductTypes = [
        'Broadband',
        'Phone',
        'Fibre Broadband',
        'TV'
      ];

      const hasEveryTargetType = productTypes.every((productTyp) => targetProductTypes.includes(productTyp));
      expect(hasEveryTargetType).toBe(true);

      const hasOtherProductType = productTypes.find((productTyp) => !targetProductTypes.includes(productTyp));
      expect(hasOtherProductType).toBeFalsy();
    });

    it("THEN should contain BT deals", () => {
      const providerTypesBag = result.map((resultEntry) => resultEntry.provider.id);
      const providerTypes = [...new Set(providerTypesBag)];
      const targetProviderTypes = [getProviderIdByName('BT')];

      const hasEveryTargetType = providerTypes.every((providerType) => targetProviderTypes.includes(providerType));
      expect(hasEveryTargetType).toBe(true);
    });
  });
});

describe("Filtering", () => {
  beforeEach(() => {
    store = new Store();
    store.setDeals(mockData.deals);
  });

  describe("GIVEN default sort is enabled", () => {
    beforeEach(() => {
      store.setSortFilter('default');
      result = store.deals;
    });

    it("THEN sorting should not change number of deals", () => {
      expect(result.length).toBe(11);
    });

    it("THEN order of should be identical to order in json files", () => {
      const [
        firstDeal,
        secondDeal,
        thirdDeal,
        ...rest
      ] = result;
      const [lastDeal] = rest.reverse();

      expect(firstDeal.title).toBe(mockData.deals[0].title);
      expect(secondDeal.title).toBe(mockData.deals[1].title);
      expect(thirdDeal.title).toBe(mockData.deals[2].title);
      expect(lastDeal.title).toBe(mockData.deals[mockData.deals.length - 1].title);
    });
  });

  describe("GIVEN upfrontCost sort is enabled", () => {
    beforeEach(() => {
      store.setSortFilter('upfrontCost');
      result = store.deals;
    });

    it("THEN sorting should not change number of deals", () => {
      expect(result.length).toBe(11);
    });

    it("THEN order should be upfront cost ascending", () => {
      const [
        firstDeal,
        secondDeal,
        thirdDeal,
        ...rest
      ] = result;
      const [lastDeal] = rest.reverse();

      expect(firstDeal.title).toBe(getDealsOrderedByUpfrontCost()[0].title);
      expect(secondDeal.title).toBe(getDealsOrderedByUpfrontCost()[1].title);
      expect(thirdDeal.title).toBe(getDealsOrderedByUpfrontCost()[2].title);
      expect(lastDeal.title).toBe(getDealsOrderedByUpfrontCost()[getDealsOrderedByUpfrontCost().length - 1].title);

      expect(firstDeal.cost.upfrontCost).toBeLessThan(secondDeal.cost.upfrontCost);
      expect(secondDeal.cost.upfrontCost).toBeLessThan(thirdDeal.cost.upfrontCost);
      expect(thirdDeal.cost.upfrontCost).toBeLessThan(lastDeal.cost.upfrontCost);
    });
  });

  describe("GIVEN totalContractCost sort is enabled", () => {
    beforeEach(() => {
      store.setSortFilter('totalContractCost');
      result = store.deals;
    });

    it("THEN sorting should not change number of deals", () => {
      expect(result.length).toBe(11);
    });

    it("THEN order should be upfront and total cost ascending", () => {
      const [
        firstDeal,
        secondDeal,
        thirdDeal,
        ...rest
      ] = result;
      const [lastDeal] = rest.reverse();

      expect(firstDeal.title).toBe(getDealsOrderedByAllCosts()[0].title);
      expect(secondDeal.title).toBe(getDealsOrderedByAllCosts()[1].title);
      expect(thirdDeal.title).toBe(getDealsOrderedByAllCosts()[2].title);
      expect(lastDeal.title).toBe(getDealsOrderedByAllCosts()[getDealsOrderedByAllCosts().length - 1].title);

      expect(firstDeal.cost.upfrontCost + firstDeal.cost.upfrontCost).toBeLessThan(secondDeal.cost.totalContractCost + secondDeal.cost.upfrontCost);
      expect(secondDeal.cost.upfrontCost + secondDeal.cost.upfrontCost).toBeLessThan(thirdDeal.cost.totalContractCost + thirdDeal.cost.upfrontCost);
      expect(thirdDeal.cost.upfrontCost + thirdDeal.cost.upfrontCost).toBeLessThan(lastDeal.cost.totalContractCost + lastDeal.cost.upfrontCost);
    });
  });
});
