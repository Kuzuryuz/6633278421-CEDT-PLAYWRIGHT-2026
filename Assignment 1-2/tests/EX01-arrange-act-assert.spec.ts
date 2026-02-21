import { test, expect } from '@playwright/test'

const BASE_URL = 'https://katalon-demo-cura.herokuapp.com/'
const VALID_USERNAME = 'John Doe'
const VALID_PASSWORD = 'ThisIsNotAPassword'
const LOGIN_FAIL_TEXT =
	'Login failed! Please ensure the username and password are valid.'

test.describe('Assignment 1 - Arrange Act Assert (CURA Login)', () => {
	test('Verify login pass with valid user', async ({ page }) => {
		// ========== Arrange ==========
		await page.goto(BASE_URL)
		await page.getByRole('link', { name: /make appointment/i }).click()
		await expect(page).toHaveURL(/profile\.php#login/i)

		// ========== Act ==========
		await page.getByLabel('Username').fill(VALID_USERNAME)
		await page.getByLabel('Password').fill(VALID_PASSWORD)
		await page.getByRole('button', { name: 'Login' }).click()

		// ========== Assert ==========
		await expect(page).toHaveURL(/#appointment/i)
		await expect(
			page.getByRole('heading', { name: /make appointment/i })
		).toBeVisible()
	})

	test('Verify login fail with invalid password', async ({ page }) => {
		// ========== Arrange ==========
		await page.goto(BASE_URL)
		await page.getByRole('link', { name: /make appointment/i }).click()
		await expect(page).toHaveURL(/profile\.php#login/i)

		// ========== Act ==========
		await page.getByLabel('Username').fill(VALID_USERNAME)
		await page.getByLabel('Password').fill('WrongPassword123!')
		await page.getByRole('button', { name: 'Login' }).click()

		// ========== Assert ==========
		await expect(page).toHaveURL(/profile\.php#login/i)
		await expect(page.locator('.text-danger')).toHaveText(LOGIN_FAIL_TEXT)
	})

	test('Verify login fail with invalid username', async ({ page }) => {
		// ========== Arrange ==========
		await page.goto(BASE_URL)
		await page.getByRole('link', { name: /make appointment/i }).click()
		await expect(page).toHaveURL(/profile\.php#login/i)

		// ========== Act ==========
		await page.getByLabel('Username').fill('Invalid User')
		await page.getByLabel('Password').fill(VALID_PASSWORD)
		await page.getByRole('button', { name: 'Login' }).click()

		// ========== Assert ==========
		await expect(page).toHaveURL(/profile\.php#login/i)
		await expect(page.locator('.text-danger')).toHaveText(LOGIN_FAIL_TEXT)
	})
})
