import {Component} from "@Core/component";
import {getTextContent} from "@Utils/getTextContent";

export class ErrorMessage extends Component {
    private LOCATORS = {
        text: this.locator.locator('//h3'),
        xButton: this.locator.getByRole('button'),
    }

    public async getText(): Promise<string> {
        return await getTextContent(this.LOCATORS.text);
    }

    public async isVisible(): Promise<boolean> {
        return await this.locator.isVisible();
    }

    public async clickXButton(): Promise<void> {
        return await this.LOCATORS.xButton.click();
    }
}