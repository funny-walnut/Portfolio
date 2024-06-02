import {Component} from "@Core/component";
import {getTextContent} from "@Utils/getTextContent";
import {Sortings} from "@Types";
import {everySeries} from "p-iteration";

export class SortingContainer extends Component {
    private LOCATORS = {
        activeOption: this.locator.locator('//span'),
        option: this.locator.locator('//option'),
        selector:   this.locator.locator('//select'),
    };

    public async click(): Promise<void> {
        await this.locator.click();
    }

    public async selectOption(sortingType: Sortings): Promise<void> {
        await this.LOCATORS.selector.selectOption({label:sortingType});
    }

    public async getActiveOption(): Promise<string> {
        return await getTextContent(this.LOCATORS.activeOption);
    }

    public async isHiddenAllOptions(): Promise<boolean> {
        const locators = await this.LOCATORS.option.all();

        return await everySeries(locators, async (locator) => !(await locator.isVisible()));
    }
}