import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { faker } from "@faker-js/faker";


test('test', async ({ page }) => {
  await page.goto('https://demo.learnwebdriverio.com/register');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('Segum1');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test@mail.com');
  await page.getByRole('textbox', { name: 'Email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('qweasd');
  await page.getByRole('textbox', { name: 'Password' }).press('Enter');
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page.locator(`.navbar:first-of-type a[href="/@segum/"]`)).toBeVisible()

});


test('register user uses POM via UI', async ({page})=>{
  const registerPage = new RegisterPage(page)
  const userNameDirty = faker.internet.username();
  const email = faker.internet.email();
  const password = faker.internet.password();
  const userNameClear = userNameDirty.slice(0,5).toLocaleLowerCase()
  await registerPage.navigateTo()
  await registerPage.register(userNameClear,email,password)
  await expect(page.locator(`.navbar:first-of-type a[href="/@${userNameClear}/"]`)).toBeVisible()
})