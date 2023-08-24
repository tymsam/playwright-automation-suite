import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('https://telerik.github.io/react-admin-dashboard/');
	await page.getByRole('button', { name: 'Sign In' }).click();
});

test.describe('Tests for Module 2: Date picker', () => {
	test('Scenario 1: the date picker can be used and displays a selected date range', async ({
		page,
	}) => {
		const calendarWidget = page.locator('.k-widget.k-calendar');

		await test.step("from: 'January 1st, 2021', to: 'January 8th, 2021'", async () => {
			const startDate = 'January 1, 2021';
			const endDate = 'January 8, 2021';

			const startDatePicker = page.locator("(//input[@role='combobox'])[1]");
			const endDatePicker = page.locator("(//input[@role='combobox'])[2]");

			await startDatePicker.click();
			expect(calendarWidget).toBeVisible;
			await page.getByText(/\w+ \d\d\d\d - \w+ \d\d\d\d/).click();
			await page.getByText(/\d\d\d\d - \d\d\d\d/i).click();
			await page.getByText('2021').click();
			await page.getByText('Jan').nth(1).click();

			await page.getByTitle(startDate).click();
			await page.getByTitle(endDate).click();
			await page.getByText('Total Points').click();
			expect(calendarWidget).not.toBeVisible;

			await expect(startDatePicker).toHaveValue('1/1/2021');
			await expect(endDatePicker).toHaveValue('1/8/2021');
		});

		await test.step("from: 'January 1st, 2023', to: 'January 8th, 2023'", async () => {
			const startDate = 'January 1, 2023';
			const endDate = 'January 8, 2023';

			const startDatePicker = page.locator("(//input[@role='combobox'])[1]");
			const endDatePicker = page.locator("(//input[@role='combobox'])[2]");

			await startDatePicker.click();
			expect(calendarWidget).toBeVisible;
			await page.getByText(/\w+ \d\d\d\d - \w+ \d\d\d\d/).click();
			await page.getByText(/\d\d\d\d - \d\d\d\d/i).click();
			await page.getByText('2023').click();
			await page.getByText('Jan').nth(1).click();

			await page.getByTitle(startDate).click();
			await page.getByTitle(endDate).click();
			await page.getByText('Total Points').click();
			expect(calendarWidget).not.toBeVisible;

			await expect(startDatePicker).toHaveValue('1/1/2023');
			await expect(endDatePicker).toHaveValue('1/8/2023');
		});

		await test.step("from: 'January 1st, 2077', to: 'January 8th, 2077'", async () => {
			const startDate = 'January 1, 2077';
			const endDate = 'January 8, 2077';

			const startDatePicker = page.locator("(//input[@role='combobox'])[1]");
			const endDatePicker = page.locator("(//input[@role='combobox'])[2]");

			await startDatePicker.click();
			expect(calendarWidget).toBeVisible;
			await page.getByText(/\w+ \d\d\d\d - \w+ \d\d\d\d/).click();
			await page.getByText(/\d\d\d\d - \d\d\d\d/i).click();
			await page.getByText(/\d\d\d\d - \d\d\d\d/i).click();
			await page.getByText('2070').click();
			await page.getByText('2077').click();
			await page.getByText('Jan').nth(1).click();

			await page.getByTitle(startDate).click();
			await page.getByTitle(endDate).click();
			await page.getByText('Total Points').click();

			expect(calendarWidget).not.toBeVisible;
			await expect(startDatePicker).toHaveValue('1/1/2077');
			await expect(endDatePicker).toHaveValue('1/8/2077');
		});
	});
});
