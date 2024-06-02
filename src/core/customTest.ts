import {Page, test as baseTest, expect} from "@playwright/test";
import {HomePage} from "@Pages/home";
import {InventoryPage} from "@Pages/inventory";
import {UserData} from "@Types";
import {logIn} from "../auth/logIn";

type Options = {
    homePage: HomePage;
    inventoryPage: InventoryPage;
    page: Page;
    auth: (userData?: UserData) => Promise<void>;
};

const test = baseTest.extend<Options>({
    auth: async ({homePage}, use) => {
        await use(
            async (userData?: UserData) =>
                await logIn(homePage, userData)
        );
    },
    homePage: async ({page}, use) => {
        await use(new HomePage(page));
    },
    inventoryPage: async ({page}, use) => {
        await use(new InventoryPage(page));
    },
})

export {test, expect};