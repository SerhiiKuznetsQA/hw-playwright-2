import { Page , Locator} from "@playwright/test";


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

    async register(userName,email,password){
        
        await this.usernameInput.click()
        await this.usernameInput.fill(userName)
        await this.emailInput.click()
        await this.emailInput.fill(email)
        await this.passwordInput.click()
        await this.passwordInput.fill(password)
        await this.singUpButton.click()
    }
}
