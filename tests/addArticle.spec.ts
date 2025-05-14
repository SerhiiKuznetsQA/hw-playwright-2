import test, { expect } from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"

test.use({storageState:'./.auth/user.json'})


test ("use storage state" , async ({page})=>{
    await page.goto('https://demo.learnwebdriverio.com/@sergio/')
    await expect(page.locator(`.navbar:first-of-type a[href="/@sergio/"]`)).toBeVisible()
})
