import {Component} from "@Core/component";
import {InventoryItem} from "@Components/inventory/inventoryList/inventoryItem";

export class InventoryList extends Component {
    private LOCATORS = {
        item: this.locator.locator('//div[@data-test="inventory-item"]')
    };

    public async getItems(): Promise<InventoryItem[]> {
        const locatorList = await this.LOCATORS.item.all();

        return locatorList.map(item => new InventoryItem(item, this.page));
    }

    public async getSlicedItemList(amount: number): Promise<InventoryItem[]> {
        const items = await this.getItems();

        return items.slice(0, amount);
    }
}