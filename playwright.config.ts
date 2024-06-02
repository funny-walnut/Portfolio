import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'list',
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                baseURL: 'https://www.saucedemo.com',
            },
        },
    ],
    use: {
        ...devices['Desktop Chrome'],
        launchOptions: { args: ['--start-maximized']},
        trace: 'retain-on-failure',
        viewport: {width: 1366, height: 768},
    },
});
