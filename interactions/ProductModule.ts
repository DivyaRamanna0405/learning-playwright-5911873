import { NavigationMenus } from "../pages/NavigationMenus";
import { SearchProduct } from "../pages/SearchProduct";
import { Page, expect } from "@playwright/test";

export class ProductModule {
  private navigationOptions: NavigationMenus;
  private searchProduct: SearchProduct;

  constructor(page: Page) {
    this.navigationOptions = new NavigationMenus(page);
    this.searchProduct = new SearchProduct(page);
  }

  // Combined method for searching, verifying results, and opening product details
  public async searchProductAndVerify(searchQuery: string) {
    // Navigate to home and perform the search
    await this.navigationOptions.home.click();
    await this.searchProduct.searchInput.fill(searchQuery);
    await this.searchProduct.searchSubmitButon.click();

    // Verify product name appears in search results
    await this.searchProduct.productName.waitFor({ state: "visible" });
    await expect(this.searchProduct.productName).toHaveText(searchQuery);

    // Open product details page and verify product name
    await this.searchProduct.productName.click();
    await this.searchProduct.productName.waitFor({ state: "visible" });
    await expect(this.searchProduct.productName).toHaveText(searchQuery);
  }
}
