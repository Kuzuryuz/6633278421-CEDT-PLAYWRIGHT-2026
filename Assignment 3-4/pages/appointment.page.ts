import { Page, expect } from '@playwright/test'

type AppointmentInfo = {
	facility: string
	applyReadmission: boolean
	program: 'Medicare' | 'Medicaid' | 'None'
	comment: string
}

export class AppointmentPage {
	constructor(private page: Page) {}

	async verifyAppointmentPage() {
		await expect(this.page).toHaveURL(/#appointment/i)
		await expect(
			this.page.getByRole('heading', { name: /make appointment/i })
		).toBeVisible()
	}

	async makeAppointment(data: AppointmentInfo) {
		await this.page.getByLabel('Facility').selectOption(data.facility)

		const checkbox = this.page.getByLabel(/readmission/i)
		if (data.applyReadmission) {
			await checkbox.check()
		} else {
			await checkbox.uncheck()
		}

		await this.page.getByLabel(data.program).check()

		await this.page.getByLabel(/visit date/i).click()
		await this.page.getByRole('cell', { name: '5', exact: true }).click()

		await this.page.getByLabel('Comment').fill(data.comment)

		await this.page.getByRole('button', { name: /book/i }).click()
	}

	async verifyConfirmationPage() {
		await expect(this.page).toHaveURL(/#summary/i)
		await expect(
			this.page.getByRole('heading', { name: /appointment confirmation/i })
		).toBeVisible()
	}
}
