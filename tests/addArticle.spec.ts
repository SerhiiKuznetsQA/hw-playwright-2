import test, { expect } from "@playwright/test"
import { CreaTeArticlePage } from "../pages/CreateArticlePage"

// test.use({storageState:'./.auth/user.json'})


test ("SK-11 use storage state" , async ({page})=>{

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
})



test("SK-12 new article should be create  via POM ", {tag:"@createArticle"},async ({page})=>{
    const articlePage = new CreaTeArticlePage(page)
    await articlePage.navigateTo()
    const articleData = await articlePage.createArticle()
    const articleTitleData = articleData.title
    const articleTitleFromPage = await articlePage.articleTitle.textContent()
    expect(articleTitleData).toBe(articleTitleFromPage)
    expect(page.url()).toContain(articleTitleData.toLocaleLowerCase())
})