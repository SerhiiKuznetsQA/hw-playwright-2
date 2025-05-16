import {test, expect } from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"

test("setup storage State", async({page,context})=>{
  const loginPage = new LoginPage(page)
  const cookieFilePath = './.auth/user.json'
  await loginPage.navigateTo()
  await loginPage.login()
  await expect(page.locator(`.navbar:first-of-type a[href="/@serhioramos/"]`)).toBeVisible()
  await context.storageState({path:cookieFilePath})

})