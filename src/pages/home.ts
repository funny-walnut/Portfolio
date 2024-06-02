import {Container} from "@Core/container";
import {LoginFrom} from "@Components/home/loginFrom";

export class HomePage extends Container {
    private LOCATORS = {
        loginForm: this.page.locator('//form')
    }

    public LoginForm = new LoginFrom(this.LOCATORS.loginForm, this.page);

    public async open(): Promise<void> {
        await this.page.goto('');
    }
}