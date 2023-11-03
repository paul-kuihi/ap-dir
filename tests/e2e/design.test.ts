import { expect, test } from '#tests/playwright-utils.ts'

test('Design renders as expected', async ({ page, login }) => {
	await login()
	await page.goto('/design')
	await expect(page.getByText(/businesses/i)).toBeVisible()
})
