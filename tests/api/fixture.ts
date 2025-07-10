import { test as baseTest, expect } from "@playwright/test";
import { getAuthData, getTokenAuth, setUserData } from "../../helper";
import fs from "fs";
import { UserController } from "./users/UserController";
import { UserResponse } from "./users/UserTypes";
export * from "@playwright/test";

type Fixture = {
  token: string;
};

export const test = baseTest.extend<Fixture>({
  token: async ({ request }, use) => {
    const userAuthData = getAuthData();
    const tokeFilePath = `.auth/token_${userAuthData.userName}.json`;

    if (fs.existsSync(tokeFilePath)) {
      const token = getTokenAuth();
      await use(token);
    } else {
      const userController = new UserController(request);
      const getUserData = setUserData();
      const requestBody = {
        username: getUserData.userName,
        email: getUserData.email,
        password: getUserData.password,
      };
      const tokenFilePath = `./.auth/token_${getUserData.userName}.json`;

      const response = await userController.createUser(requestBody);
      const responseJson: UserResponse = await response.json();
      const token = responseJson.user.token;
      expect(token).toBeTruthy();
      fs.writeFileSync(tokenFilePath, JSON.stringify(token, null, 2), "utf-8");
      await use(token!);
    }
  },
});
