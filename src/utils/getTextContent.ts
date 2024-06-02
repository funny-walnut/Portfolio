import {Locator} from "@playwright/test";

export async function getTextContent(locator: Locator, options?: { timeout?: number }): Promise<string> {
    const textContent = await locator.textContent(options);
    if (textContent === null) {
        throw new Error('Cannot get textContent');
    }

    return textContent;
}
