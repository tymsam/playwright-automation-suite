import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('https://telerik.github.io/react-admin-dashboard/');
	await page.getByRole('button', { name: 'Sign In' }).click();
});

test.describe('Tests for Module 4: Settings', () => {
	test('Scenario 1: a user cannot update their account information without providing a password', async ({
		page,
	}) => {
		page.getByText('Settings').click();
		await expect(page).toHaveURL(
			'https://telerik.github.io/react-admin-dashboard/#/home/account'
		);

		const buttonSaveChanges = page
			.getByRole('button')
			.getByText('Save changes');
		const inputUsername = page.locator('[name="username"]');
		const inputPhone = page.locator('[name="phone"]').first();
		const dropdownCountry = page.getByRole('combobox');
		const dropdownOptionUK = page.getByRole('option', {
			name: '​United Kingdom',
		});

		const inputBirthdate = page.getByTitle('month/day/year');

		await inputUsername.clear();
		await inputUsername.fill('Anthony');
		await expect(buttonSaveChanges).toBeDisabled();

		await inputPhone.clear();
		await inputPhone.fill('+44 1632 960110');
		await expect(buttonSaveChanges).toBeDisabled();

		await dropdownCountry.click();
		await dropdownOptionUK.click();
		await expect(buttonSaveChanges).toBeDisabled();

		await inputBirthdate.clear();
		await page.waitForTimeout(100);
		await page.keyboard.press('Home', { delay: 20 });
		await page.keyboard.type('06', { delay: 20 });
		await page.keyboard.press('ArrowRight', { delay: 20 });
		await page.keyboard.type('07', { delay: 20 });
		await page.keyboard.press('ArrowRight', { delay: 20 });
		await page.keyboard.type('1998', { delay: 20 });
		await expect(buttonSaveChanges).toBeDisabled();
	});

	test('Scenario 2:  a user can update their account information only after providing a password', async ({
		page,
	}) => {
		page.getByText('Settings').click();
		await expect(page).toHaveURL(
			'https://telerik.github.io/react-admin-dashboard/#/home/account'
		);

		const buttonSaveChanges = page
			.getByRole('button')
			.getByText('Save changes');
		const inputUsername = page.locator('[name="username"]');
		const inputPhone = page.locator('[name="phone"]').first();
		const dropdownCountry = page.getByRole('combobox');
		const dropdownOptionBG = page.getByRole('option', {
			name: 'Bulgaria',
		});
		const inputBirthdate = page.getByTitle('month/day/year');
		const inputNewPassword = page.locator('[type="password"]').nth(1);

		await inputUsername.clear();
		await inputUsername.fill('Bernard');
		await expect(buttonSaveChanges).toBeDisabled();

		await inputPhone.clear();
		await inputPhone.fill('+44 1736 90234');
		await expect(buttonSaveChanges).toBeDisabled();

		await dropdownCountry.click();
		await dropdownOptionBG.click();
		await expect(buttonSaveChanges).toBeDisabled();

		await inputBirthdate.clear();
		await page.waitForTimeout(100);
		await page.keyboard.press('Home', { delay: 20 });
		await page.keyboard.type('02', { delay: 20 });
		await page.keyboard.press('ArrowRight', { delay: 20 });
		await page.keyboard.type('17', { delay: 20 });
		await page.keyboard.press('ArrowRight', { delay: 20 });
		await page.keyboard.type('1986', { delay: 20 });
		await expect(buttonSaveChanges).toBeDisabled();

		await inputNewPassword.type('Secret123');
		await expect(buttonSaveChanges).toBeEnabled();
	});
});
