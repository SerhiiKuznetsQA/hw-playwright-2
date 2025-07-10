import { expect } from "@playwright/test";
import { setUserData } from "../../helper";
import { UserController } from "./users/UserController";
import { UserResponse } from "./users/UserTypes";
import { test } from "./fixture/fixture";
import fs from "fs";

test(
  "set token via api",
  { tag: "@authToken" },
  async ({ request, userController }) => {
    const getUserData = setUserData();
    const requestBody = {
      username: getUserData.userName,
      email: getUserData.email,
      password: getUserData.password,
    };
    console.log(getUserData);
    const tokenFilePath = `./.auth/token_${getUserData.userName}.json`;

    const response = await userController.createUser(requestBody);
    const responseJson: UserResponse = await response.json();
    console.log(responseJson);
    const token = responseJson.user.token;
    expect(token).toBeTruthy();
    fs.writeFileSync(tokenFilePath, JSON.stringify(token, null, 2), "utf-8");
  }
);
