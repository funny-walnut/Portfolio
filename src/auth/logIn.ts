import {HomePage} from "@Pages/home";
import {UserData} from "@Types";

export const logIn = async (homePage: HomePage,
                            userData?: UserData): Promise<void> => {
    await homePage.open()
    const loginForm = homePage.LoginForm;
    await loginForm.fill(userData);
    await loginForm.submit();
}
