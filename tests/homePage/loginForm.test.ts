import {expect, test} from '@Core/customTest';
import {INVENTORY_PAGE} from "@Constants/links";
import {LoginFormPlaceholders} from "@Components/home/loginFrom";
import {LOCKED_OUT_USER_DATA, VALID_USER_DATA} from "@Constants/userData";

const LOCKED_OUT_USER_ERROR_MESSAGE = 'Epic sadface: Sorry, this user has been locked out.';
const CANNOT_ACCESS_USER_ERROR_MESSAGE = 'Epic sadface: You can only access \'/inventory.html\' when you are logged in.';
const FIELD_IS_REQUIRED = (fieldName: LoginFormPlaceholders) => `Epic sadface: ${fieldName} is required`;

test.describe('Home page', () => {
    test.beforeEach(async ({homePage}) => {
        await homePage.open()
    });

    const submitTypesData = ['by Enter', 'by click'] as const;

    for (const submitType of submitTypesData) {
        test(`Submit log in form ${submitType}`, async ({homePage, inventoryPage, page, baseURL}) => {
            const loginForm = homePage.LoginForm;

            expect(await loginForm.isVisible()).toBe(true);
            expect(await loginForm.isVisibleAllInputs()).toBe(true);
            expect(await loginForm.isVisibleLoginButton()).toBe(true);

            await loginForm.fill();
            await expect.poll(async () => await loginForm.getItputsContent()).toStrictEqual(VALID_USER_DATA);
            await loginForm.submit(submitType);

            await expect.poll(() => page.url()).toStrictEqual(`${baseURL}${INVENTORY_PAGE}`);
            expect(await inventoryPage.Header.SecondaryHeader.isVisibleTitle('Products')).toBe(true);
        });
    }

    test('Try to log in as locked_out_user', async ({homePage}) => {
        const loginForm = homePage.LoginForm;

        await loginForm.fill(LOCKED_OUT_USER_DATA);
        await loginForm.submit('by Enter');

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

    test('Try to submit empty form', async ({homePage}) => {
        const loginForm = homePage.LoginForm;
        await loginForm.submit();

        const errorMessage = loginForm.ErrorMessage;
        expect(await errorMessage.isVisible()).toBe(true);
        expect(await errorMessage.getText()).toStrictEqual(FIELD_IS_REQUIRED(LoginFormPlaceholders.UserName));
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
        test(`Fill only ${placeholder} field and click login button`, async ({homePage}) => {
            const loginForm = homePage.LoginForm;

            await loginForm.fillInputByName(placeholder, value);
            await loginForm.submit();

            const errorMessage = homePage.LoginForm.ErrorMessage;
            expect(await errorMessage.isVisible()).toBe(true);
            expect(await errorMessage.getText()).toStrictEqual(FIELD_IS_REQUIRED(requiredField));
        });
    }
});
