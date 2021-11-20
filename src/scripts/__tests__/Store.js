import Store from "../Store";
import mockData from "../../../public/db.json";

const getProviderIdByName = (providerName) => {
  const providers = mockData.deals.map((deal) => deal.provider);
  const entry = providers.find((provider) => provider.name === providerName);

  return entry.id;
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
