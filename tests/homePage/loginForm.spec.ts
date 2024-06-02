import {test, expect} from '@Core/customTest';
import {INVENTORY_PAGE} from "@Constants/links";
import {LoginFormPlaceholders} from "@Components/home/loginFrom";
import {LOCKED_OUT_USER_DATA, VALID_USER_DATA} from "@Constants/userData";

const LOCKED_OUT_USER_ERROR_MESSAGE = 'Epic sadface: Sorry, this user has been locked out.';
const CANNOT_ACCESS_USER_ERROR_MESSAGE = 'Epic sadface: You can only access \'/inventory.html\' when you are logged in.';
const FIELD_IS_REQUIRED = (fieldName: string) => `Epic sadface: ${fieldName} is required`;

test.describe('login form testing', () => {
    test.beforeEach(async ({homePage}) => {
        await homePage.open()
    });

    test('login by mouse click', async ({homePage, page, baseURL}) => {
        const loginForm = homePage.LoginForm;

        expect(await loginForm.isVisible()).toBe(true);
        expect(await loginForm.isVisibleAllInputs()).toBe(true);
        expect(await loginForm.isVisibleLoginButton()).toBe(true);

        await loginForm.fill();
        await expect.poll(async () => await loginForm.getItputsContent()).toStrictEqual(VALID_USER_DATA);
        await loginForm.clickLoginButton();

        await expect.poll(() => page.url()).toStrictEqual(`${baseURL}${INVENTORY_PAGE}`);
    });

    test('login by press Enter', async ({homePage, page, baseURL}) => {
        const loginForm = homePage.LoginForm;

        await loginForm.fill();
        await loginForm.pressButton('Enter');

        await expect.poll(() => page.url()).toStrictEqual(`${baseURL}${INVENTORY_PAGE}`);
    });

    test('Try to log in as locked_out_user', async ({homePage}) => {
        const loginForm = homePage.LoginForm;

        await loginForm.fill(LOCKED_OUT_USER_DATA);
        await loginForm.pressButton('Enter');

        const errorMessage = loginForm.ErrorMessage;
        expect(await errorMessage.isVisible()).toBe(true);
        expect(await errorMessage.getText()).toBe(LOCKED_OUT_USER_ERROR_MESSAGE);

        await errorMessage.clickXButton();
        expect(await errorMessage.isVisible()).toBe(false);
    });

    test('Try to go to inventory by guest', async ({homePage, inventoryPage}) => {
        await inventoryPage.open();
        const errorMessage = homePage.LoginForm.ErrorMessage;
        expect(await errorMessage.isVisible()).toBe(true);
        expect(await errorMessage.getText()).toStrictEqual(CANNOT_ACCESS_USER_ERROR_MESSAGE);
    });

    const data = [
        {
            placeholder: LoginFormPlaceholders.Password,
            value: VALID_USER_DATA.password,
            requiredField: LoginFormPlaceholders.UserName
        },
        {
            placeholder: LoginFormPlaceholders.UserName,
            value: VALID_USER_DATA.userName,
            requiredField: LoginFormPlaceholders.Password
        }
    ] as const;

    for (const {placeholder, value, requiredField} of data) {
        test(`Fill only ${placeholder} field and click login button`, async ({homePage, page, baseURL}) => {
            const loginForm = homePage.LoginForm;

            await loginForm.fillInputByName(placeholder, value);
            await loginForm.clickLoginButton();

            const errorMessage = homePage.LoginForm.ErrorMessage;
            expect(await errorMessage.isVisible()).toBe(true);
            expect(await errorMessage.getText()).toStrictEqual(FIELD_IS_REQUIRED(requiredField));
        });
    }
});
