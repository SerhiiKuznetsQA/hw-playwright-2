import { Page , Locator} from "@playwright/test";
import { setUserData } from "../helper";


export class RegisterPage {
    page:Page;
    usernameInput:Locator;
    emailInput:Locator; 
    passwordInput:Locator; 
    singUpButton: Locator; 
    userLink:Locator;

    constructor(page:Page){
        this.page = page; 
        this.usernameInput = page.locator("input[placeholder='Username']")
        this.emailInput = page.locator("input[placeholder='Email']")
        this.passwordInput = page.locator("input[placeholder='Password']")
        this.singUpButton = page.locator("button.btn")
        this.userLink = page.locator(`.navbar:first-of-type a[href="/@segum/"]`)
    }

    async navigateTo(){
        await this.page.goto('https://demo.learnwebdriverio.com/register')
    }

    async register(){
        const userObj = setUserData()
        await this.usernameInput.click()
        await this.usernameInput.fill(userObj.userName)
        await this.emailInput.click()
        await this.emailInput.fill(userObj.email)
        await this.passwordInput.click()
        await this.passwordInput.fill(userObj.password)
        await this.singUpButton.click()

        return userObj
    }
    
}
