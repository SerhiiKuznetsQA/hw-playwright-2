import { test, expect } from '@playwright/test';
import { getAuthData } from '../helper';
import { LoginPage } from '../pages/LoginPage';

test('SK-10 auth via ui basic scenario', async({page})=>{

  const authData = getAuthData()

  await page.goto('https://demo.learnwebdriverio.com/login')
  await page.locator(`input[type='email']`).fill(authData.email)
  await page.locator(`input[type='password']`).fill(authData.password)
  await page.click('//button')
  await expect(page.locator('a[href="/@serhioramose/"]')).toBeVisible();
  await expect(page.locator(`.navbar:first-of-type a[href="/@serhioramose/"]`)).toBeVisible()
})



test("SK-11 auth use POM model",{tag:"@login"}, async({page})=>{
  const loginPage = new LoginPage(page)
  await loginPage.navigateTo()
  const userAuthData = await loginPage.login()
  console.log(userAuthData);
  const userLogin = userAuthData.userName.toLocaleLowerCase()
  await expect(page.locator(`.navbar:first-of-type a[href="/@${userLogin}/"]`)).toBeVisible()
})