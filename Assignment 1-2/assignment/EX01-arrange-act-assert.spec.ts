import { test, expect } from '@playwright/test'
import { Login } from '../pages/login'
import user from '../test-data/user.json'

test.describe('Assignment 1 - Arrange Act Assert (CURA Login)', () => {
	test('Login success with valid user', async ({ page }) => {
		// Arrange
		const login = new Login(page)
		await login.open()

		// Act
		await login.submit(user)

		// Assert
		await expect(page).toHaveURL(/#appointment/i)
		await expect(page.getByRole('heading', { level: 2 })).toContainText(
			'Make Appointment'
		)
	})

	test('Login fail with invalid password', async ({ page }) => {
		// Arrange
		const login = new Login(page)
		await login.open()

		// Act
		await login.submit({
			username: user.username,
			password: 'WrongPassword',
		})

		// Assert
		await expect(page.locator('.text-danger')).toHaveText(
			'Login failed! Please ensure the username and password are valid.'
		)
	})

	test('Login fail with invalid username', async ({ page }) => {
		// Arrange
		const login = new Login(page)
		await login.open()

		// Act
		await login.submit({
			username: 'InvalidUser',
			password: user.password,
		})

		// Assert
		await expect(page.locator('.text-danger')).toHaveText(
			'Login failed! Please ensure the username and password are valid.'
		)
	})
})
