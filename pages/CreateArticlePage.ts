import { Page , Locator, expect} from "@playwright/test";
import { getArticleData, getArticlesDataForLoop } from "../helper";


export class CreaTeArticlePage {
    page:Page;
    newArticLeBtn:Locator;
    formArticle:Locator;
    titleInput:Locator;
    descriptionInput:Locator;
    fontStyleBtn:Locator;
    content:Locator;
    readContentArticle:Locator;
    tagInput:Locator;
    publishBtn:Locator;
    articleTitle:Locator;


    constructor(page:Page){
        this.page = page;
        this.newArticLeBtn = page.locator(`a[href='/editor']`)
        this.formArticle = page.getByRole('group').first()
        this.titleInput = page.locator(`input[data-qa-id="editor-title"]`)
        this.descriptionInput = page.locator(`input[data-qa-id="editor-description"]`)
        this.fontStyleBtn = page.locator(`button[class*="fa-mavon-italic"]`)
        this.content = page.locator(`textarea[spellcheck='false']`)
        this.readContentArticle = page.locator(`div[class*="v-note-read-content"]`)
        this.tagInput = page.locator(`input[data-qa-id="editor-tags"]`)
        this.publishBtn = page.locator(`button[type='submit'][data-qa-id="editor-publish"]`)
        this.articleTitle = page.locator(`h1[data-qa-id="article-title"]`)
    }

    async navigateTo(){
        await this.page.goto('https://demo.learnwebdriverio.com/editor/')
    
    }

    async createArticle(article){
        await this.newArticLeBtn.click()
        await this.titleInput.click()
        await this.titleInput.fill(article.title)
        await this.descriptionInput.click()
        await this.descriptionInput.fill(article.description)
        await this.fontStyleBtn.click()
        await this.content.click()
        await this.content.focus()
        await this.content.clear()
        await this.content.fill(article.bodyArticle)
        await this.tagInput.click()
        await this.tagInput.fill(article.tag)
        await this.page.keyboard.press('Enter')
        await this.publishBtn.click()

        // return articleData
    }



//розбити на більше методів по інпутам

}


