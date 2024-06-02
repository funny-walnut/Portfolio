import {Component} from "@Core/component";
import {PrimaryHeader} from "@Components/shared/header/primaryHeader";

export class Header extends Component {
    private LOCATORS = {
        primaryHeader: this.locator.locator('//div[@data-test="primary-header"]'),
    };

    public PrimaryHeader = new PrimaryHeader(this.LOCATORS.primaryHeader, this.page);
}