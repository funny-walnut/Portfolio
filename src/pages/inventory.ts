import {Container} from "@Core/container";
import {INVENTORY_PAGE} from "@Constants/links";
import {InventoryList} from "@Components/inventory/inventoryList";
import {Header} from "@Components/shared/header";

export class InventoryPage extends Container {
    private LOCATORS = {
        inventoryList: this.page.locator('//div[@data-test="inventory-list"]'),
        headerContainer: this.page.locator('div[id="header_container"]'),
    };

    public InventoryList = new InventoryList(this.LOCATORS.inventoryList, this.page);
    public Header = new Header(this.LOCATORS.headerContainer, this.page);

    public async open(): Promise<void> {
        await this.page.goto(INVENTORY_PAGE);
    }
}