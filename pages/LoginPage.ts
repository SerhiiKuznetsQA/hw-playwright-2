import { Page } from "@playwright/test";
import { getAuthData, setUserData } from "../helper";

export class LoginPage{
    private page:Page;
    
    constructor(page:Page){
    this.page= page
    }
    async navigateTo(){
        await this.page.goto('https://demo.learnwebdriverio.com/login')
    }

    async login(){
        // const authData = getAuthData()
        const authData = getAuthData()
        await this.page.locator(`input[type='email']`).fill(authData.email)
        await this.page.locator(`input[type='password']`).fill(authData.password)
        await this. page.click('//button')

        return authData
    }
}