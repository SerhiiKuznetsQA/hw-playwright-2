import { Page, test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
test.use({ storageState: "./.auth/user.json" });

test("My Feed Tab", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateTo();
  await homePage.navigateToYourFeed();
  await homePage.getFeedPreview();
  const expMessage = homePage.expWarningMessage;
  await expect(expMessage).toBeVisible();
});

test("Global Feed Tab", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateTo();
  await homePage.navigateToGlobalFeed();
  await expect(homePage.globalArticlesList).toBeVisible();
});

test("Get Tag list", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateTo();
  await homePage.clickByTag();
  const tag = await homePage.popularTag.textContent();
  const tagFeeds = homePage.globalArticlesList;
  console.log(tag);
  console.log(page.url());
  await expect(tagFeeds).toBeVisible();
  expect(page.url()).toContain(`tag/${tag?.trim()}`);
  const tagByFeed = await homePage.getTagItems();
  // console.log(tagByFeed);
});


test("Get Feeds by Tag on Tags Tab", async({page})=>{
  const homePage = new HomePage(page)
  const loadingText = `Loading articles...`
  await homePage.navigateTo();
  await homePage.clickByTag()
  await homePage.navigateToTagFeed()
  const tagsFeeds =homePage.globalArticlesList
   const tagsObj = await homePage.feedObj()
   const tag = (await homePage.popularTag.textContent()) ?? "" ;
   console.log(tag);
  expect(tagsFeeds).not.toContainText(loadingText)
// console.log(tagsObj);
for (const element of tagsObj) {
  expect(element).toContain(tag.trim());
}
  expect(tagsFeeds).toBeVisible()
})
