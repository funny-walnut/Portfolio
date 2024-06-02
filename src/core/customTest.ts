import {Page, test as baseTest, expect} from "@playwright/test";
import {HomePage} from "@Pages/home";
import {InventoryPage} from "@Pages/inventory";

type Options = {
    homePage: HomePage;
    inventoryPage: InventoryPage;
    page: Page;
};

const test = baseTest.extend<Options>({
    homePage: async ({page}, use) => {
        await use(new HomePage(page));
    },
    inventoryPage: async ({page}, use) => {
        await use(new InventoryPage(page));
    },
})

export {test, expect};