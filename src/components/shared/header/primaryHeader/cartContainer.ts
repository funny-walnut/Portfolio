import {Component} from "@Core/component";
import {getTextContent} from "@Utils/getTextContent";

export class CartContainer extends Component {
    private LOCATORS = {
        badge: this.locator.locator('//span'),
    };

    public async isVisibleBadge(): Promise<boolean> {
        if (!(await this.isCartEmpty())) {
            return await this.LOCATORS.badge.isVisible();
        }

        throw Error('Cart is empty.')
    }

    public async getBadgeContent(): Promise<string> {
        if (!(await this.isCartEmpty())) {
            return await getTextContent(this.LOCATORS.badge);
        }

        throw Error('Cart is empty.')
    }

    public async isCartEmpty(): Promise<boolean> {
        return await this.LOCATORS.badge.count() === 0;
    }
}