import { type Locator, type Page } from "@playwright/test";

export class SearchProduct {
  searchProductAndVerify(searchQuery: string) {
    throw new Error("Method not implemented.");
  }
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchSubmitButon: Locator;
  readonly productName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('[data-test="search-query"]');
    this.searchSubmitButon = page.locator('[data-test="search-submit"]');
    this.productName = page.locator('[data-test="product-name"]');
  }
}
