import { test } from '@playwright/test'
import { LoginPage } from '../pages/login.page'
import { AppointmentPage } from '../pages/appointment.page'

test.describe('EX03 - Page Object Model', () => {
	test('make appointment success using POM', async ({ page }) => {
		const loginPage = new LoginPage(page)
		const appointmentPage = new AppointmentPage(page)

		await loginPage.login({
			username: 'John Doe',
			password: 'ThisIsNotAPassword',
		})

		await appointmentPage.verifyAppointmentPage()

		await appointmentPage.makeAppointment({
			facility: 'Tokyo CURA Healthcare Center',
			applyReadmission: true,
			program: 'Medicare',
			comment: 'Created by Playwright with POM',
		})

		await appointmentPage.verifyConfirmationPage()
	})
})
