import test, { expect } from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"
import { CreaTeArticlePage } from "../pages/CreateArticlePage"
import { Aircraft } from "@faker-js/faker"

test.use({storageState:'./.auth/user.json'})


test ("use storage state" , async ({page})=>{

    await page.goto('https://demo.learnwebdriverio.com/editor/')
    await page.locator(`a[href='/editor']`).click()
    await page.locator(`input[data-qa-id="editor-title"]`).click()
    await page.locator(`input[data-qa-id="editor-title"]`).pressSequentially('Post via Playwtight')
    await page.locator(`input[data-qa-id="editor-description"]`).fill('Post via Playwtight')
    await page.locator(`button[class="op-icon fa fa-mavon-italic"]`).click()
    await page.locator(`textarea[spellcheck='false']`).click()
    await page.locator(`textarea[spellcheck='false']`).focus();
    await page.locator((`textarea[spellcheck='false']`)).clear()
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    await page.locator(`textarea[spellcheck='false']`).pressSequentially('*Post via Playwtight*')
    const previewWindow  = await page.locator(`div[class*="v-note-read-content"]`).textContent()
    console.log(previewWindow);
    await page.locator(`input[data-qa-id="editor-tags"]`).fill("SK_TAG")
    await page.keyboard.press("Enter")
    await page.locator(`button[type='submit'][data-qa-id="editor-publish"]`).click()
    // await page.waitForSelector(`textarea[spellcheck='true']`)
   
    // await expect(page.getByRole('group').first()).toBeVisible()

})



test("new article should be create POM ", async ({page})=>{
    const articlePage = new CreaTeArticlePage(page)
    await articlePage.navigateTo()
    console.log(articlePage);
    const articleData = await articlePage.createArticle()
    const articleTitleData = articleData.title
    const articleTitleforMatch = await articlePage.articleTitle.textContent()
    expect(articleTitleData).toBe(articleTitleforMatch)
    console.log(page.url);
    expect(articlePage).not.toBe(page.url)
})