import { Locator, Page } from "@playwright/test";




export class HomePage{
    page:Page;
    homePage:Locator;
    myFeed:Locator;
    feedPreview:Locator;
    globalFeed: Locator;
    globalArticlesList:Locator;
    expWarningMessage:Locator;
    tagsList:Locator;
    popularTag:Locator;
    favoriteFeedByTag:Locator;
    likeFeedButton: Locator ; 

    constructor(page:Page){
        this.page = page
        this.homePage = page.locator(`//nav[@data-qa-id='site-header']//a[contains(text(),'Home')]`)
        this.myFeed = page.locator(`//div[@class='feed-toggle']//a[@href='/my-feed']`) 
        this.favoriteFeedByTag = page.locator(`//div[@class='feed-toggle']//a[@href='/tag/']`)
        this.feedPreview = page.locator(`//div[@class='article-preview']`)
        this.expWarningMessage = page.locator(`div.article-preview:has-text("No articles are here... yet.")`)
        this.globalFeed = page.locator(`//div[@class='feed-toggle']//a[@href='/']`)  ////li[@data-qa-type="feed-tab"][2]
        this.globalArticlesList = page.locator(`//div[@data-qa-type='article-list']//div[not(@data-qa-id="article-loading-indicator")] `)
        this.tagsList = page.locator(`//div[@class='tag-list']`) 
        this.likeFeedButton = page.locator(`//div[@class='article-preview']//button[@data-qa-type='article-favorite']`)

    
        

    }
    async navigateTo(){
        await this.page.goto(`https://demo.learnwebdriverio.com`)
    }

    async navigateToHomepage(){
        await this.homePage.click()
    }

    async feedObj(){
        return this.globalArticlesList.allTextContents()
    }

    

    async navigateToYourFeed(){
        await this.myFeed.click()
    }

    async getFeedPreview(){
     return await this.feedPreview.allTextContents()
    }

    async navigateToGlobalFeed(){
      await this.globalFeed.click()
    }

    async getTagItems(){
       return await this.tagsList.allTextContents()
    }

    async clickByTag(article){
        await this.page.getByRole('link', { name: `${article.tag}`, exact: true }).click()
    }
    async navigateToTagFeed(article){
         await this.page.locator(`//div[@class='feed-toggle']//a[@href='/tag/${article.tag}']`).click()
    }
    async getTagTextContent(article){
        return await this.page.locator(`//div[@class='feed-toggle']//a[@href='/tag/${article.tag}']`).textContent()
    }

    async getLikesCount(index){
        return await this.likeFeedButton.nth(index).textContent()
    }

    async likeFeed(index){
        await this.likeFeedButton.nth(index).click()
    }

    
  

}