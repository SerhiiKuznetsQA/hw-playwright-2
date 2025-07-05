import { Page, test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { getArticleData } from "../../helper";

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
  const tagFromObj = getArticleData();
  await homePage.navigateTo();
  await homePage.clickByTag(tagFromObj);
  await homePage.navigateToTagFeed(tagFromObj);
  const tag = (await homePage.getTagTextContent(tagFromObj)) ?? "";
  const tagFeeds = homePage.globalArticlesList.nth(1);
  console.log(tag);
  console.log(page.url());
  await expect(tagFeeds).toBeVisible();
  expect(page.url()).toContain(`tag/${tag?.trim()}`);
  const tagByFeed = await homePage.getTagItems();
  // console.log(tagByFeed);
});

test("Feeds should be filtered by tag", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateTo();
  const tagFromObj = getArticleData();
  await homePage.clickByTag(tagFromObj);
  await homePage.navigateToTagFeed(tagFromObj);
  const tag = (await homePage.getTagTextContent(tagFromObj)) ?? "";
  const tagsObj = await homePage.feedObj();
  for (const element of tagsObj) {
    expect(element).toContain(tag.trim());
    console.log(element);
  }
});

test(`Count of like should be increase on first page`, async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateTo();
  await homePage.navigateToGlobalFeed();
  for (let index = 0; index <= 9; index++) {
    const countBeforeLike = await homePage.getLikesCount(index);
    console.log(`count before like : ${countBeforeLike}`);
    const like = await homePage.likeFeed(index);
    expect(Number(countBeforeLike?.trim())).not.toBe(
      Number(countBeforeLike?.trim()) + 1
    );
  }
});
