import { test, expect, request } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { UserController } from "../api/users/UserController";
import { setUserData } from "../../helper";
import { UserResponse } from "../api/users/UserTypes";
import fs from "fs";

test(
  "setup storage State",
  { tag: "@authToken2" },
  async ({ page, context }) => {
    const loginPage = new LoginPage(page);
    const cookieFilePath = "./.auth/user.json";
    await loginPage.navigateTo();
    const userAuthData = await loginPage.login();
    const userName = userAuthData.userName;
    await expect(
      page.locator(`.navbar:first-of-type a[href="/@${userName}/"]`)
    ).toBeVisible();
    await context.storageState({ path: cookieFilePath });
  }
);
