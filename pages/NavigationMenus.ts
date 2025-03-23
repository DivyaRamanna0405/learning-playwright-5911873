import { type Locator, type Page } from "@playwright/test";

export class NavigationMenus {
  readonly page: Page;
  readonly home: Locator;

  constructor(page: Page) {
    this.page = page;
    this.home = page.locator('[data-test="nav-home"]');
  }
}
