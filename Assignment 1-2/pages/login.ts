import { Page, expect } from '@playwright/test'

type Credentials = {
	username: string
	password: string
}

export class Login {
	constructor(private page: Page) {}

	async open() {
		await this.page.goto('https://katalon-demo-cura.herokuapp.com/')
		await this.page.getByRole('link', { name: /make appointment/i }).click()
		await expect(this.page).toHaveURL(/profile\.php#login/i)
	}

	async submit(credentials: Credentials) {
		await this.page.getByLabel('Username').fill(credentials.username)
		await this.page.getByLabel('Password').fill(credentials.password)
		await this.page.getByRole('button', { name: /login/i }).click()
	}
}
