import Store from "../Store";
import mockData from "../../../public/db.json";

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
});
