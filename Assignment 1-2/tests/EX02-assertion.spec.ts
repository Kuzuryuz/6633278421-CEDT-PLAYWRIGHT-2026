import { test, expect } from '@playwright/test'

const BASE_URL = 'https://katalon-demo-cura.herokuapp.com/'
const VALID_USERNAME = 'John Doe'
const VALID_PASSWORD = 'ThisIsNotAPassword'

test.describe('Assignment 2 - Assertion (CURA Make Appointment)', () => {
	test('Verify assertions on Make Appointment page', async ({ page }) => {
		// ========== Arrange ==========
		await page.goto(BASE_URL)
		await page.getByRole('link', { name: /make appointment/i }).click()

		await expect(page).toHaveURL(/profile\.php#login/i)
		await page.getByLabel('Username').fill(VALID_USERNAME)
		await page.getByLabel('Password').fill(VALID_PASSWORD)
		await page.getByRole('button', { name: 'Login' }).click()

		await expect(page).toHaveURL(/#appointment/i)

		// 1) Verify h2 shows "Make Appointment"
		await expect(page.locator('h2')).toHaveText(/make appointment/i)

		// 2) Verify can select all facility combo boxes (dropdown)
		const facility = page.getByLabel('Facility')
		await expect(facility).toBeVisible()
		await facility.selectOption('Tokyo CURA Healthcare Center')
		await expect(facility).toHaveValue('Tokyo CURA Healthcare Center')

		await facility.selectOption('Hongkong CURA Healthcare Center')
		await expect(facility).toHaveValue('Hongkong CURA Healthcare Center')

		await facility.selectOption('Seoul CURA Healthcare Center')
		await expect(facility).toHaveValue('Seoul CURA Healthcare Center')

		// 3) Verify can select apply for hospital readmission checkbox
		const readmission = page.getByLabel('Apply for hospital readmission')
		await expect(readmission).toBeVisible()
		await readmission.check()
		await expect(readmission).toBeChecked()

		// 4) Verify can select health care program radio button
		const programMedicare = page.getByLabel('Medicare')
		const programMedicaid = page.getByLabel('Medicaid')
		const programNone = page.getByLabel('None')

		await programMedicare.check()
		await expect(programMedicare).toBeChecked()

		await programMedicaid.check()
		await expect(programMedicaid).toBeChecked()

		await programNone.check()
		await expect(programNone).toBeChecked()

		// 5) Verify can input current date on Visit Date
		const visitDate = page.getByLabel('Visit Date (Required)')
		const today = new Date()
		const dd = String(today.getDate()).padStart(2, '0')
		const mm = String(today.getMonth() + 1).padStart(2, '0')
		const yyyy = String(today.getFullYear())
		const todayText = `${dd}/${mm}/${yyyy}`

		await visitDate.fill(todayText)
		await expect(visitDate).toHaveValue(todayText)

		// 6) Verify can input comment
		const comment = page.getByLabel('Comment')
		await comment.fill('Automated test comment')
		await expect(comment).toHaveValue('Automated test comment')

		// 7) Verify book appointment button is displayed and enabled
		const bookBtn = page.getByRole('button', { name: /Book Appointment/i })
		await expect(bookBtn).toBeVisible()
		await expect(bookBtn).toBeEnabled()
	})
})
