import {Component} from "@Core/component";
import {getTextContent} from "@Utils/getTextContent";

type ButtonText = 'Add to cart' | 'Remove';

export class InventoryItem extends Component {
    private LOCATORS = {
        image: this.locator.locator('//div[contains(@class, "img")]'),
        button: (buttonText: ButtonText) => this.locator.locator(`//button[text()="${buttonText}"]`),
        name: this.locator.locator('//a[contains(@data-test, "title-link")]'),
        price: this.locator.locator('//div[@data-test="inventory-item-price"]'),
    };

    public async clickButton(buttonText: ButtonText): Promise<void> {
        await this.LOCATORS.button(buttonText).click();
    }

    public async isVisibleButton(buttonText: ButtonText): Promise<boolean> {
        return await this.LOCATORS.button(buttonText).isVisible();
    }

    public async getName(): Promise<string> {
        return await getTextContent(this.LOCATORS.name);
    }

    public async getPrice(): Promise<number> {
        const price = await getTextContent(this.LOCATORS.price);

        return Number(price);
    }
}