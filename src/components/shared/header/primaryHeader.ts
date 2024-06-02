import {Component} from "@Core/component";
import {CartContainer} from "@Components/shared/header/primaryHeader/cartContainer";

export class PrimaryHeader extends Component{
    private LOCATORS = {
        cartContainer: this.locator.locator('//div[@id="shopping_cart_container"]'),
    };

    public CartContainer = new CartContainer(this.LOCATORS.cartContainer, this.page);
}