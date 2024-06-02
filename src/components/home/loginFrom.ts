import {Component} from "@Core/component";
import {ErrorMessage} from "./loginForm/errorMessage";
import {everySeries} from 'p-iteration';
import {VALID_USER_DATA} from "@Constants/userData";
import {getAttribute} from "@Utils/getAttribute";

export enum LoginFormPlaceholders {UserName = 'Username', Password = 'Password'}

export class LoginFrom extends Component {
    private LOCATORS = {
        input: (placeholder: LoginFormPlaceholders) => this.locator.getByPlaceholder(placeholder),
        loginButton: this.locator.locator('//input[@value="Login"]'),
        errorMessageContainer: this.locator.locator('//div[h3]')
    }

    public ErrorMessage = new ErrorMessage(this.LOCATORS.errorMessageContainer, this.page);

    private async clickLoginButton(): Promise<void> {
        await Promise.all([
            this.LOCATORS.loginButton.click(),
            this.page.waitForLoadState('domcontentloaded')
        ])
    }

    private async pressEnterButton(): Promise<void> {
        await Promise.all([
            this.locator.press('Enter'),
            this.page.waitForLoadState('load'),
        ]);
    }

    public async fillInputByName(inputName: LoginFormPlaceholders, value: string): Promise<void> {
        await this.LOCATORS.input(inputName).click();
        await this.LOCATORS.input(inputName).fill(value);
    }

    public async fill(data = VALID_USER_DATA): Promise<void> {
        await Promise.all([
            this.fillInputByName(LoginFormPlaceholders.UserName, data.userName),
            this.fillInputByName(LoginFormPlaceholders.Password, data.password)
        ]);
    }

    public async getItputsContent(): Promise<{ userName: string, password: string }> {
        return {
            userName: await getAttribute(this.LOCATORS.input(LoginFormPlaceholders.UserName), 'value'),
            password: await getAttribute(this.LOCATORS.input(LoginFormPlaceholders.Password), 'value')
        };
    }

    public async submit(submitType: 'by Enter' | 'by click' = 'by click'): Promise<void> {
        submitType === 'by Enter' ? await this.pressEnterButton() : await this.clickLoginButton()
    }

    public async isVisibleAllInputs(): Promise<boolean> {
        return await everySeries(
            Object.values(LoginFormPlaceholders),
            async (inputPlaceholder) => await this.LOCATORS.input(inputPlaceholder).isVisible(),
        );
    }

    public async isVisibleLoginButton(): Promise<boolean> {
        return await this.LOCATORS.loginButton.isVisible();
    }

    public async isVisible(): Promise<boolean> {
        return await this.locator.isVisible();
    }
}