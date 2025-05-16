import { Page , Locator, expect} from "@playwright/test";
import { getArticleData } from "../helper";


export class CreaTeArticlePage {
    page:Page;
    newArticLeBtn:Locator;
    formArticle:Locator;
    titleInput:Locator;
    descriptionInput:Locator;
    fontStyleBtn:Locator;
    bodyArticle:Locator;
    readContentArticle:Locator;
    tagInpt:Locator;
    publishBtn:Locator;
    articleTitle:Locator;


    constructor(page:Page){
        this.page = page;
        this.newArticLeBtn = page.locator(`a[href='/editor']`)
        this.formArticle = page.getByRole('group').first()
        this.titleInput = page.locator(`input[data-qa-id="editor-title"]`)
        this.descriptionInput = page.locator(`input[data-qa-id="editor-description"]`)
        this.fontStyleBtn = page.locator(`button[class="op-icon fa fa-mavon-italic"]`)
        this.bodyArticle = page.locator(`textarea[spellcheck='false']`)
        this.readContentArticle = page.locator(`div[class*="v-note-read-content"]`)
        this.tagInpt = page.locator(`input[data-qa-id="editor-tags"]`)
        this.publishBtn = page.locator(`button[type='submit'][data-qa-id="editor-publish"]`)
        this.articleTitle = page.locator(`h1[data-qa-id="article-title"]`)
    }

    async navigateTo(){
        await this.page.goto('https://demo.learnwebdriverio.com/editor/')
    
    }


    async createArticle(){
        const articleData = getArticleData()
        await this.newArticLeBtn.click()
        await this.titleInput.click()
        await this.titleInput.fill(articleData.title)
        await this.descriptionInput.click()
        await this.descriptionInput.fill(articleData.description)
        await this.fontStyleBtn.click()
        await this.bodyArticle.click()
        await this.bodyArticle.focus()
        await this.bodyArticle.clear()
        await this.bodyArticle.fill(articleData.bodyArticle)
        await this.tagInpt.click()
        await this.tagInpt.fill(articleData.tag)
        await this.page.keyboard.press('Enter')
        await this.publishBtn.click()

        return articleData
    }



}
