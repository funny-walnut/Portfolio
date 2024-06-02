import {Container} from "@Core/container";
import {INVENTORY_PAGE} from "@Constants/links";

export class InventoryPage extends Container {
    private LOCATORS = {
        // loginForm: this.page.locator('//form')
    }

    // public LoginForm = new LoginFrom(this.LOCATORS.loginForm, this.page);

    public async open(): Promise<void> {
        await this.page.goto(INVENTORY_PAGE);
    }
}