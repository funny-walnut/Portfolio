import {Component} from "@Core/component";

type ButtonText = 'Add to cart' | 'Remove';

export class InventoryItem extends Component {
    private LOCATORS = {
        image: this.locator.locator('//div[contains(@class, "img")]'),
        button: (buttonText: ButtonText) => this.locator.locator(`//button[text()="${buttonText}"]`),
    };

    public async clickButton(buttonText: ButtonText): Promise<void> {
        await this.LOCATORS.button(buttonText).click();
    }

    public async isVisibleButton(buttonText: ButtonText): Promise<boolean> {
        return await this.LOCATORS.button(buttonText).isVisible();
    }
}