import { test as base, expect } from '@playwright/test'
import { Login } from '../pages/login'

import user from '../test-data/user.json'
import facilities from '../test-data/facilities.json'
import programs from '../test-data/programs.json'
import comment from '../test-data/comment.json'

type User = {
	username: string
	password: string
}

const test = base.extend<{ loginUser: User }>({
	loginUser: async ({}, use) => {
		await use(user as User)
	},
})

const today = () => new Date().toLocaleDateString('en-US')

test.describe('Assignment 2 - Assertion (CURA Make Appointment)', () => {
	test.beforeEach(async ({ page, loginUser }) => {
		const login = new Login(page)
		await login.open()
		await login.submit(loginUser)
		await expect(page).toHaveURL(/#appointment/i)
	})

	test('Make appointment page displays "Make Appointment" in h2', async ({
		page,
	}) => {
		await expect(page.getByRole('heading', { level: 2 })).toHaveText(
			/Make Appointment/i
		)
	})

	test('Can select all facility combo boxes', async ({ page }) => {
		const dropdown = page.getByLabel('Facility')

		for (const item of facilities) {
			await dropdown.selectOption(item)
			await expect(dropdown).toHaveValue(item)
		}
	})

	test('Can select apply for hospital readmission checkbox', async ({
		page,
	}) => {
		const checkbox = page.getByLabel(/readmission/i)
		await checkbox.check()
		await expect(checkbox).toBeChecked()
	})

	test('Can select health care program radio button', async ({ page }) => {
		for (const program of programs) {
			const radio = page.getByLabel(program)
			await radio.check()
			await expect(radio).toBeChecked()
		}
	})

	test('Can input current date on Visit Date', async ({ page }) => {
		const dateInput = page.getByLabel(/visit date/i)
		const current = today()

		await dateInput.fill(current)
		await expect(dateInput).toHaveValue(current)
	})

	test('Can input comment', async ({ page }) => {
		const commentBox = page.getByLabel('Comment')

		await commentBox.fill(comment.text)
		await expect(commentBox).toHaveValue(comment.text)
	})

	test('Book appointment button is displayed and enabled', async ({ page }) => {
		const button = page.getByRole('button', { name: /book/i })

		await expect(button).toBeVisible()
		await expect(button).toBeEnabled()
	})
})
