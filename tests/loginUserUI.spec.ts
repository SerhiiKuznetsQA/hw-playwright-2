import { test, expect } from '@playwright/test';
import { getAuthData } from '../helper';
import { LoginPage } from '../pages/LoginPage';

test('auth via ui basic scenario', async({page})=>{

  const authData = getAuthData()

  await page.goto('https://demo.learnwebdriverio.com/login')
  await page.locator(`input[type='email']`).fill(authData.email)
  await page.locator(`input[type='password']`).fill(authData.password)
  await page.click('//button')
  await expect(page.locator('a[href="/@serhioramose/"]')).toBeVisible();
  await expect(page.locator(`.navbar:first-of-type a[href="/@serhioramose/"]`)).toBeVisible()

  // await page.waitForSelector('.nav-item:first-of-type a[href="/@sergio/"]', { state: 'visible' });
  // await expect(page.locator(".nav-item:first-of-type a[href='/@sergio/']")).toBeVisible();
})



test("auth use POM model", async({page})=>{
  const loginPage = new LoginPage(page)

  await loginPage.navigateTo()
  await loginPage.login()
  await expect(page.locator(`.navbar:first-of-type a[href="/@serhioramos/"]`)).toBeVisible()
})