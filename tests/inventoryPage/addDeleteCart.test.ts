import {expect, test} from "@Core/customTest";

test.describe('Inventory page', () => {
    test('Add/delete to cart 1st product', async ({inventoryPage, auth}) => {
        await test.step('Precondition steps. Log in.', async () => {
            await auth();
        });

        const {firstItem, cartContainer} = await test.step('Add first product to the cart.', async () => {
            const [firstItem] = await inventoryPage.InventoryList.getItems();

            expect(await firstItem.isVisibleButton('Add to cart')).toBe(true);
            expect(await firstItem.isVisibleButton('Remove')).toBe(false);

            const cartContainer = inventoryPage.Header.PrimaryHeader.CartContainer;
            expect(await cartContainer.isCartEmpty()).toBe(true);
            await firstItem.clickButton('Add to cart');

            expect(await firstItem.isVisibleButton('Add to cart')).toBe(false);
            expect(await firstItem.isVisibleButton('Remove')).toBe(true);

            expect(await cartContainer.isVisibleBadge()).toBe(true);
            expect(await cartContainer.getBadgeContent()).toStrictEqual('1');

            return {firstItem, cartContainer};
        });

        await test.step('Delete added product from the cart.', async () => {
            await firstItem.clickButton('Remove');

            expect(await firstItem.isVisibleButton('Add to cart')).toBe(true);
            expect(await firstItem.isVisibleButton('Remove')).toBe(false);
            expect(await cartContainer.isCartEmpty()).toBe(true);
        });
    });
});