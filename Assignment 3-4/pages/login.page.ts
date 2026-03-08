import { Page, expect } from '@playwright/test'

type User = {
	username: string
	password: string
}

export class LoginPage {
	constructor(private page: Page) {}

	async login(user: User) {
		await this.page.goto('/')
		await this.page.getByRole('link', { name: /make appointment/i }).click()
		await expect(this.page).toHaveURL(/profile\.php#login/i)
		await this.page.getByLabel('Username').fill(user.username)
		await this.page.getByLabel('Password').fill(user.password)
		await this.page.getByRole('button', { name: /login/i }).click()
	}
}
