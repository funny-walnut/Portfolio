import {Component} from "@Core/component";
import {SortingContainer} from "@Components/shared/header/secondaryHeader/sortingContainer";

type SecondaryTitleType = 'Products' | 'Your Cart' | 'Checkout: Your Information';

export class SecondaryHeader extends Component {
    private LOCATORS = {
        sortingContainer: this.locator.locator('//span[@class="select_container"]'),
        title: (title: SecondaryTitleType) => this.locator.locator(`//span[text()='${title}']`),
    };

    public SortingContainer = new SortingContainer(this.LOCATORS.sortingContainer, this.page);

    public async isVisibleTitle(pageTitle: SecondaryTitleType): Promise<boolean> {
        return await this.LOCATORS.title(pageTitle).isVisible();
    }
}