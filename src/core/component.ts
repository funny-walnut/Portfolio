import {Locator, Page} from "@playwright/test";

export class Component {
    public constructor(public locator: Locator, protected page: Page) {
    }
}
