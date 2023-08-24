import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './tests',
	/* Run tests in files in parallel */
	// fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	// forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	// retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	// workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	// testMatch: ['tests/pieChart.spec.ts'],
	use: {
		headless: true,
		screenshot: 'only-on-failure',
		video: 'retain-on-failure',
		baseURL: 'https://telerik.github.io/react-admin-dashboard',
	},
	reporter: [['dot'], ['html', { open: 'never' }]],

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},

		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},

		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
		},
	],
});
