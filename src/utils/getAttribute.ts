import {Locator} from "@playwright/test";

export async function getAttribute(locator: Locator, name: string, options?: { timeout?: number }): Promise<string> {
    const attributeValue = await locator.getAttribute(name, options);
    if (attributeValue === null) {
        throw new Error(`Cannot get attribute ${name}`);
    }
    return attributeValue;
}