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
    });
  });
});
