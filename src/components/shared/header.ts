import {Component} from "@Core/component";
import {PrimaryHeader} from "@Components/shared/header/primaryHeader";
import {SecondaryHeader} from "@Components/shared/header/secondaryHeader";

export class Header extends Component {
    private LOCATORS = {
        primaryHeader: this.locator.locator('//div[@data-test="primary-header"]'),
        secondaryHeader: this.locator.locator('//div[@data-test="secondary-header"]'),
    };

    public PrimaryHeader = new PrimaryHeader(this.LOCATORS.primaryHeader, this.page);
    public SecondaryHeader = new SecondaryHeader(this.LOCATORS.secondaryHeader, this.page);
}