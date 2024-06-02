import {expect, test} from "@Core/customTest";
import {ProductInfo, Sortings} from "@Types";

const data = [
    [
        Sortings.Cba,
        (productInfo: ProductInfo): string | number => productInfo.name,
        (a: string | number, b: string | number): number => (a < b ? -1 : a > b ? 1 : 0),
    ],
    [
        Sortings.LowestPrice,
        (productInfo: ProductInfo): number => productInfo.price,
        (a: string | number, b: string | number): number => (a < b ? -1 : a > b ? 1 : 0),
    ],
    [
        Sortings.HighestPrice,
        (productInfo: ProductInfo): number => productInfo.price,
        (a: string | number, b: string | number): number => (a > b ? -1 : a < b ? 1 : 0),
    ],
] as const;

test.describe('Inventory page. Products sorting', () => {
    test.beforeEach('Precondition steps. Log in.', async ({auth}) => {
        await auth();
    });

    for (const [sortingType, mapFunction, sortingFunction] of data) {
        test(`Products sorting by ${sortingType}`, async ({inventoryPage}) => {
            const sortingContainer = inventoryPage.Header.SecondaryHeader.SortingContainer;

            await expect.poll(async () => await sortingContainer.getActiveOption()).toStrictEqual(Sortings.Abc);
            expect(await sortingContainer.isHiddenAllOptions()).toBe(true);

            await sortingContainer.click();
            await sortingContainer.selectOption(sortingType);

            await expect(async () => {
                const products = (await inventoryPage.InventoryList.getProductsInfo())
                    .map(mapFunction);
                expect(products.sort(sortingFunction)).toEqual(products);
            }).toPass();
        });
    }
});