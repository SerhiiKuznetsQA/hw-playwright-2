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

test('SK-9 register user uses POM via UI',{tag:"@auth"}, async ({page})=>{
  // test.use({ storageState: undefined })
  const registerPage = new RegisterPage(page)
  // const userName = faker.person.firstName().toLocaleLowerCase();
  // console.log(userName);
  // const email = faker.internet.email();
  // const password = faker.internet.password();
  await registerPage.navigateTo()
  const userData = await registerPage.register()
  const accountName = await userData.userName.toLocaleLowerCase()
  // console.log(userName2);
  await expect(page.locator(`.navbar:first-of-type a[href="/@${accountName}/"]`)).toBeVisible()
})