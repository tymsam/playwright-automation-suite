import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('https://telerik.github.io/react-admin-dashboard/');
	await page.getByRole('button', { name: 'Sign In' }).click();
});

test.describe('Tests for Module 1: Team Table', () => {
	test('Scenario 1: Verify sorting of table columns', async ({ page }) => {
		await test.step('Column 1: Contact Name', async () => {
			const columnHeader = page.locator('th.k-first.k-header');
			const columnContents = page.locator(
				"//table[@class='k-grid-table']/tbody[1]/tr/td[2]"
			);
			let actualColumnContent = await columnContents.allTextContents();

			await assertSortingOrder(); // expect: none

			await columnHeader.click();
			await assertSortingOrder(); // expect: ascending

			await columnHeader.click();
			await assertSortingOrder(); // expect: descending

			await columnHeader.click();
			await assertSortingOrder(); // expect: none

			async function assertSortingOrder() {
				const sort = await columnHeader.getAttribute('aria-sort');
				if (sort === 'ascending') {
					// console.log(
					// 	'Actual sorting type: ' +
					// 		(await columnHeader.getAttribute('aria-sort'))
					// );
					expect(await columnHeader.getAttribute('aria-sort')).toEqual(
						'ascending'
					);
					actualColumnContent = await columnContents.allTextContents();
					let columnContentSorted = actualColumnContent.sort();
					expect(await columnContents.allTextContents()).toEqual(
						columnContentSorted
					);
					// console.log(
					// 	'Contact Names (expected sorting: ascending): ' +
					// 		actualColumnContent
					// );
				} else if (sort === 'descending') {
					// console.log(
					// 	'Actual sorting type: ' +
					// 		(await columnHeader.getAttribute('aria-sort'))
					// );
					expect(await columnHeader.getAttribute('aria-sort')).toEqual(
						'descending'
					);
					actualColumnContent = await columnContents.allTextContents();
					let columnContentSorted = actualColumnContent.sort((a, b) =>
						b.localeCompare(a)
					);
					expect(await columnContents.allTextContents()).toEqual(
						columnContentSorted
					);
					// console.log(
					// 	'Contact Names (expected sorting: descending): ' +
					// 		actualColumnContent
					// );
				} else {
					// console.log(
					// 	'Actual sorting type: ' +
					// 		(await columnHeader.getAttribute('aria-sort'))
					// );
					expect(await columnHeader.getAttribute('aria-sort')).toEqual('none');
					actualColumnContent = await columnContents.allTextContents();
					// console.log(
					// 	'Contact Names (expected sorting: none): ' + actualColumnContent
					// );
				}
			}
		});

		await test.step('Column 2: Job Title', async () => {
			const columnHeader = page.locator("(//th[@colspan='1'])[3]");
			const columnContents = page.locator(
				"//table[@class='k-grid-table']/tbody[1]/tr/td[3]"
			);
			let actualColumnContent = await columnContents.allTextContents();

			await assertSortingOrder(); // expect: none

			await columnHeader.locator('.k-link').click();
			await assertSortingOrder(); // expect: ascending

			await columnHeader.locator('.k-link').click();
			await assertSortingOrder(); // expect: descending

			await columnHeader.locator('.k-link').click();
			await assertSortingOrder(); // expect: none

			async function assertSortingOrder() {
				const sort = await columnHeader.getAttribute('aria-sort');
				if (sort === 'ascending') {
					// console.log(
					// 	'Actual sorting type: ' +
					// 		(await columnHeader.getAttribute('aria-sort'))
					// );
					expect(await columnHeader.getAttribute('aria-sort')).toEqual(
						'ascending'
					);
					actualColumnContent = await columnContents.allTextContents();
					let columnContentSorted = actualColumnContent.sort();
					expect(await columnContents.allTextContents()).toEqual(
						columnContentSorted
					);
					// console.log(
					// 	'Job Title (expected sorting: ascending): ' + actualColumnContent
					// );
				} else if (sort === 'descending') {
					// console.log(
					// 	'Actual sorting type: ' +
					// 		(await columnHeader.getAttribute('aria-sort'))
					// );
					expect(await columnHeader.getAttribute('aria-sort')).toEqual(
						'descending'
					);
					actualColumnContent = await columnContents.allTextContents();
					let columnContentSorted = actualColumnContent.sort((a, b) =>
						b.localeCompare(a)
					);
					expect(await columnContents.allTextContents()).toEqual(
						columnContentSorted
					);
					// console.log(
					// 	'Job Title (expected sorting: descending): ' + actualColumnContent
					// );
				} else {
					// console.log(
					// 	'Actual sorting type: ' +
					// 		(await columnHeader.getAttribute('aria-sort'))
					// );
					expect(await columnHeader.getAttribute('aria-sort')).toEqual('none');
					actualColumnContent = await columnContents.allTextContents();
					// console.log(
					// 	'Job Title (expected sorting: none): ' + actualColumnContent
					// );
				}
			}
		});

		await test.step('Column 3: Rating', async () => {
			const columnHeader = page.locator(
				"//th[@class='k-first k-header']/following-sibling::th[1]"
			);
			const columnContents = page.locator(
				"//table[@class='k-grid-table']/tbody[1]/tr/td[4]/span[1]"
			);

			let actualColumnContent: any[] = [];

			await assertSortingOrder(); // expect: none

			await columnHeader.click();
			await assertSortingOrder(); // expect: ascending

			await columnHeader.click();
			await assertSortingOrder(); // expect: descending

			await columnHeader.click();
			await assertSortingOrder(); // expect: none

			async function assertSortingOrder() {
				const sort = await columnHeader.getAttribute('aria-sort');
				if (sort === 'ascending') {
					// console.log(
					// 	'Actual sorting type: ' +
					// 		(await columnHeader.getAttribute('aria-sort'))
					// );
					expect(await columnHeader.getAttribute('aria-sort')).toEqual(
						'ascending'
					);
					actualColumnContent = [];
					for (let i = 0; i < (await columnContents.count()); i++) {
						const element = columnContents.nth(i);
						const rating = await element.getAttribute('aria-valuenow');
						actualColumnContent.push(rating);
					}
					let columnContentSorted = actualColumnContent.sort();
					expect(await actualColumnContent).toEqual(columnContentSorted);
					// console.log(
					// 	'Rating (expected sorting: ascending): ' + actualColumnContent
					// );
				} else if (sort === 'descending') {
					// console.log(
					// 	'Actual sorting type: ' +
					// 		(await columnHeader.getAttribute('aria-sort'))
					// );
					expect(await columnHeader.getAttribute('aria-sort')).toEqual(
						'descending'
					);
					actualColumnContent = [];
					for (let i = 0; i < (await columnContents.count()); i++) {
						const element = columnContents.nth(i);
						const rating = await element.getAttribute('aria-valuenow');
						actualColumnContent.push(rating);
					}
					let columnContentSorted = actualColumnContent.sort((a, b) =>
						b.localeCompare(a)
					);
					expect(await actualColumnContent).toEqual(columnContentSorted);
					// console.log(
					// 	'Rating (expected sorting: descending): ' + actualColumnContent
					// );
				} else {
					// console.log(
					// 	'Actual sorting type: ' +
					// 		(await columnHeader.getAttribute('aria-sort'))
					// );
					expect(await columnHeader.getAttribute('aria-sort')).toEqual('none');
					actualColumnContent = [];
					for (let i = 0; i < (await columnContents.count()); i++) {
						const element = columnContents.nth(i);
						const rating = await element.getAttribute('aria-valuenow');
						actualColumnContent.push(rating);
					}
					// console.log(
					// 	'Rating (expected sorting: none): ' + actualColumnContent
					// );
				}
			}
		});

		await test.step('Column 4: Budget', async () => {
			const columnHeader = page.locator("(//th[@rowspan='2'])[3]");
			const columnContents = page.locator(
				"//table[@class='k-grid-table']/tbody[1]/tr/td[5]"
			);
			let actualColumnContent = await columnContents.allTextContents();
			let actualColumnContentNumbers: any[] = [];

			await assertSortingOrder(); // expect: none

			await columnHeader.locator('.k-link').click();
			await assertSortingOrder(); // expect: ascending

			await columnHeader.locator('.k-link').click();
			await assertSortingOrder(); // expect: descending

			await columnHeader.locator('.k-link').click();
			await assertSortingOrder(); // expect: none

			async function assertSortingOrder() {
				const sort = await columnHeader.getAttribute('aria-sort');
				if (sort === 'ascending') {
					// console.log(
					// 	'Actual sorting type: ' +
					// 		(await columnHeader.getAttribute('aria-sort'))
					// );
					expect(await columnHeader.getAttribute('aria-sort')).toEqual(
						'ascending'
					);
					actualColumnContent = await columnContents.allTextContents();
					actualColumnContentNumbers = [];
					for (let index = 0; index < (await columnContents.count()); index++) {
						const amount = actualColumnContent[index].slice(1).replace(',', '');
						const number: number = parseFloat(amount);
						actualColumnContentNumbers.push(number);
					}
					let columnContentSorted = actualColumnContentNumbers.sort();
					expect(await actualColumnContentNumbers).toEqual(columnContentSorted);
					// console.log(
					// 	'Budget (expected sorting: ascending): ' + actualColumnContent
					// );
				} else if (sort === 'descending') {
					// console.log(
					// 	'Actual sorting type: ' +
					// 		(await columnHeader.getAttribute('aria-sort'))
					// );
					expect(await columnHeader.getAttribute('aria-sort')).toEqual(
						'descending'
					);
					actualColumnContent = await columnContents.allTextContents();
					actualColumnContentNumbers = [];
					for (let index = 0; index < (await columnContents.count()); index++) {
						const amount = actualColumnContent[index].slice(1).replace(',', '');
						const number: number = parseFloat(amount);
						actualColumnContentNumbers.push(number);
					}
					let columnContentSorted = actualColumnContentNumbers.sort().reverse();
					expect(await actualColumnContentNumbers).toEqual(columnContentSorted);

					// console.log(
					// 	'Budget (expected sorting: descending): ' + actualColumnContent
					// );
				} else {
					// console.log(
					// 	'Actual sorting type: ' +
					// 		(await columnHeader.getAttribute('aria-sort'))
					// );
					expect(await columnHeader.getAttribute('aria-sort')).toEqual('none');
					actualColumnContent = await columnContents.allTextContents();
					actualColumnContentNumbers = [];
					for (let index = 0; index < (await columnContents.count()); index++) {
						const amount = actualColumnContent[index].slice(1).replace(',', '');
						const number: number = parseFloat(amount);
						actualColumnContentNumbers.push(number);
					}
					// console.log(
					// 	'Budget (expected sorting: none): ' + actualColumnContent
					// );
				}
			}
		});
	});

	test('Scenario 2: Verify persistent column sorting', async ({ page }) => {
		await test.step('Column 1: Contact Name Ascending', async () => {
			const columnHeader = page.locator('th.k-first.k-header');
			const columnContents = page.locator(
				"//table[@class='k-grid-table']/tbody[1]/tr/td[2]"
			);
			let actualColumnContent = await columnContents.allTextContents();
			const pagination = page.locator('.k-pager-numbers');
			const paginationPage = pagination.locator('li');

			await columnHeader.click();

			for (let index = 0; index < (await paginationPage.count()); index++) {
				await paginationPage.nth(index).click();
				const sort = await columnHeader.getAttribute('aria-sort');
				// console.log(
				// 	'Actual sorting type: ' +
				// 		(await columnHeader.getAttribute('aria-sort'))
				// );
				expect(await columnHeader.getAttribute('aria-sort')).toEqual(
					'ascending'
				);
				actualColumnContent = await columnContents.allTextContents();
				let columnContentSorted = actualColumnContent.sort();

				expect(await columnContents.allTextContents()).toEqual(
					columnContentSorted
				);
				// console.log(
				// 	'Contact Names (expected sorting: ascending): ' + actualColumnContent
				// );
			}
		});

		await test.step('Column 1: Contact Name Descending', async () => {
			await page.reload();
			const columnHeader = page.locator('th.k-first.k-header');
			const columnContents = page.locator(
				"//table[@class='k-grid-table']/tbody[1]/tr/td[2]"
			);
			let actualColumnContent = await columnContents.allTextContents();
			const pagination = page.locator('.k-pager-numbers');
			const paginationPage = pagination.locator('li');

			await columnHeader.click();
			await columnHeader.click();

			for (let index = 0; index < (await paginationPage.count()); index++) {
				await paginationPage.nth(index).click();
				const sort = await columnHeader.getAttribute('aria-sort');
				// console.log(
				// 	'Actual sorting type: ' +
				// 		(await columnHeader.getAttribute('aria-sort'))
				// );
				expect(await columnHeader.getAttribute('aria-sort')).toEqual(
					'descending'
				);
				actualColumnContent = await columnContents.allTextContents();
				let columnContentSorted = actualColumnContent.sort().reverse();

				expect(await columnContents.allTextContents()).toEqual(
					columnContentSorted
				);
				// console.log(
				// 	'Contact Names (expected sorting: descending): ' + actualColumnContent
				// );
			}
		});
	});
});
