import {test, expect } from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"

test("setup storage State",{tag:"@authToken"}, async({page,context})=>{
  const loginPage = new LoginPage(page)
  const cookieFilePath = './.auth/user.json'
  await loginPage.navigateTo()
  const userAuthData = await loginPage.login()
  const userName = userAuthData.userName
  await expect(page.locator(`.navbar:first-of-type a[href="/@${userName}/"]`)).toBeVisible()
  await context.storageState({path:cookieFilePath})
})