import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('https://telerik.github.io/react-admin-dashboard/');
	await page.getByRole('button', { name: 'Sign In' }).click();
});

test.describe('Tests for Module 3: Pie Chart', () => {
	test('Scenario 1:  the chart is updated when de-/selecting categories', async ({
		page,
	}) => {
		test.slow();
		const timeout = 20;
		page.getByText('Performance and sales').click();
		await expect(page).toHaveURL(
			'https://telerik.github.io/react-admin-dashboard/#/home/performance-and-sales'
		);
		const categoryNames = [
			'Infrastructure',
			'Services',
			'R&D',
			'Outsourcing',
			'Marketing',
			'Strategy',
		];
		const categoryColors = [
			'#4B5FFA',
			'#2196F3',
			'#43A047',
			'#FFC107',
			'#FF5722',
			'#E91E63',
		];
		const categorySelector: any = [];
		categorySelector[0] = page
			.locator(
				'.total-cost-container > .k-chart > .k-chart-surface > svg > g > g:nth-child(5) > g > g > path:nth-child(3)'
			)
			.first();
		categorySelector[1] = page.locator(
			'.total-cost-container > .k-chart > .k-chart-surface > svg > g > g:nth-child(5) > g > g:nth-child(2) > path:nth-child(3)'
		);
		categorySelector[2] = page.locator(`g:nth-child(3) > path:nth-child(3)`);
		categorySelector[3] = page.locator(`g:nth-child(4) > path:nth-child(3)`);
		categorySelector[4] = page.locator(`g:nth-child(5) > path:nth-child(3)`);
		categorySelector[5] = page.locator(`g:nth-child(6) > path:nth-child(3)`);

		const pieChartWidget = page.locator('.k-chart.k-widget').nth(3);
		expect(pieChartWidget).toBeVisible;

		let pieElemnts: any = [];
		let pieElementsColors: any = [];

		let arrayBinary: any = [];

		generateBinaryArray(); //Generates an array of all possible combinations for 6 categories

		for (let combination = 1; combination < arrayBinary.length; combination++) {
			// console.log(arrayBinary[combination]);
			for (let index = 0; index < arrayBinary[combination].length; index++) {
				if (arrayBinary[combination][index] === '1') {
					await disableCategory(index);
				}
			}
			for (let index = 0; index < arrayBinary[combination].length; index++) {
				if (arrayBinary[combination][index] === '1') {
					await enableCategory(index);
				}
			}
		}

		async function generateBinaryArray() {
			for (let indexDecimal = 1; indexDecimal < 64; indexDecimal++) {
				let indexBinary = indexDecimal.toString(2);
				while (indexBinary.length < 6) {
					indexBinary = '0' + indexBinary;
				}
				arrayBinary[indexDecimal] = indexBinary.split('');
			}
		}

		async function enableCategory(index: number) {
			pieElementsColors = [];
			// console.log(
			// 	'Click on: ' +
			// 		categoryNames[index] +
			// 		' (' +
			// 		categoryColors[index] +
			// 		') to enable'
			// );
			await categorySelector[index].click();
			await page.waitForTimeout(timeout);
			pieElemnts = await page
				.locator('g:nth-child(6) > g > g > path:nth-child(1)')
				.all();

			for (let element of pieElemnts)
				pieElementsColors.push(await element.getAttribute('fill'));

			expect(pieElementsColors).toContain(categoryColors[index]);
		}

		async function disableCategory(index: number) {
			pieElementsColors = [];
			// console.log(
			// 	'Click on: ' +
			// 		categoryNames[index] +
			// 		' (' +
			// 		categoryColors[index] +
			// 		') to disable'
			// );
			await categorySelector[index].click();
			await page.waitForTimeout(timeout);

			pieElemnts = await page
				.locator('g:nth-child(6) > g > g > path:nth-child(1)')
				.all();

			for (let element of pieElemnts)
				pieElementsColors.push(await element.getAttribute('fill'));

			expect(pieElementsColors).not.toContain(categoryColors[index]);
		}
	});
});
