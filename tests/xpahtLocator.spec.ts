import { expect, Page } from "@playwright/test";
import test from "@playwright/test";
import { beforeEach } from "node:test";

let page: Page;

test.beforeEach(async ({ browser }) => {
  const context = await browser.newContext();
  page = await context.newPage();
  await page.route("**/*", (route) => {
    const testUrl = route.request().url();
    // console.log(testUrl);
    if (
      testUrl.includes("cdn.ad.plus") ||
      testUrl.includes("serving.stat-rock.co") ||
      testUrl.includes("securepubads.g.doubleclick")
    ) {
      return route.abort();
    }
    route.continue();
  });
  await page.goto(`https://demoqa.com/checkbox`);
});




test("get locator from label attribute", async () => {
  await page
    .locator(`//label[.//span[text()="Home"]]/parent::span/button`)
    .click();

  await expect(
    page.locator(`//label[.//span[text()="Desktop"]]`)
  ).toBeVisible();

  // await page
  //   .locator(`//label[.//span[text()="Desktop"]]//parent::span/button`)
  //   .click();

  // await page.locator(`//label[.//span[text()="Desktop"]]//parent::span/button`).click() // fix that locator , shoulbe click on the Arrow 
  await page.locator(`//label[.//span[text()="Desktop"]]/parent::span/button`).click()
  await page.locator(`//label[.//span[text()="Notes"]]`).click();

  const spanInfo = await page
    .locator(
      `//label[.//span[text()="Notes"]]//*[local-name()="svg"and not (contains(@class,'close'))]`
    )
    .getAttribute("class");

  expect(spanInfo).not.toContain("uncheck");

  await page
    .locator(
      `//span[text()="Commands"]/preceding-sibling::span[@class="rct-checkbox"]`
    )
    .click();
    
     await expect(
    page.locator(`//div[@id='result']`)).toBeVisible();// проверить, что результат соотвествуеют прокликаным документам
    const resultArray = await page.locator(`//div[contains(@id,'result')]/span[contains(@class,'text-success')]`).allTextContents()
    console.log(resultArray);
});
