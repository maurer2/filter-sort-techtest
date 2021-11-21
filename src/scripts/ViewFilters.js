class ViewFilters {
  constructor(store) {
    this.store = store;
    this.productFilters = Array.from(
      document.getElementsByClassName("js-filter-product")
    );
    this.providerFilters = Array.from(
      document.getElementsByClassName("js-filter-provider")
    );
    this.sortFilters = Array.from(
      document.getElementsByClassName("js-filter-sorting")
    );
    this.onProductFilterChange = this.onProductFilterChange.bind(this);
    this.onProviderFilterChange = this.onProviderFilterChange.bind(this);
    this.onSortFilterChange = this.onSortFilterChange.bind(this);
    this.addFilterEventHandlers();
  }

  addFilterEventHandlers() {
    if (this.productFilters.length) {
      this.productFilters.forEach(element => {
        element.addEventListener("change", this.onProductFilterChange);
      });
    }
    if (this.providerFilters.length) {
      this.providerFilters.forEach(element => {
        element.addEventListener("change", this.onProviderFilterChange);
      });
    }
    if (this.sortFilters.length) {
      this.sortFilters.forEach(element => {
        element.addEventListener("change", this.onSortFilterChange);
      });
    }
  }

  removeFilterEventHandlers() {
    if (this.productFilters.length) {
      this.productFilters.forEach(element => {
        element.removeEventListener("change", this.onProductFilterChange);
      });
    }
    if (this.providerFilters.length) {
      this.providerFilters.forEach(element => {
        element.removeEventListener("change", this.onProviderFilterChange);
      });
    }
    if (this.sortFilters.length) {
      this.sortFilters.forEach(element => {
        element.removeEventListener("change", this.onSortFilterChange);
      });
    }
  }

  onProductFilterChange(event) {
    this.store.setProductFilter(event.target.value);
  }

  onProviderFilterChange(event) {
    const value = parseInt(event.target.value, 10)
    this.providerFilters.forEach(element => (element.checked = false));
    if (this.store.state.providerFilter === value) {
      this.store.setProviderFilter();
    } else {
      this.store.setProviderFilter(value);
      event.target.checked = true;
    }
  }

  onSortFilterChange(event) {
    const {value} = event.target;
    this.store.setSortFilter(value);
  }

  update(state) {
    if (state.deals.length) {
      this.providerFilters.forEach(element => {
        element.hasAttribute("disabled") && element.removeAttribute("disabled");
      });
      this.productFilters.forEach(
        element =>
          element.hasAttribute("disabled") &&
          element.removeAttribute("disabled")
      );
      this.sortFilters.forEach(
        element => element.hasAttribute("disabled") && element.removeAttribute("disabled")
      );
    } else {
      this.providerFilters.forEach(
        element =>
          !element.hasAttribute("disabled") &&
          element.setAttribute("disabled", "disabled")
      );
      this.productFilters.forEach(
        element =>
          !element.hasAttribute("disabled") &&
          element.setAttribute("disabled", "disabled")
      );
      this.sortFilters.forEach(
        element => !element.hasAttribute("disabled") && element.setAttribute("disabled", "disabled")
      );
    }
  }
}

export default ViewFilters;
