import test from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";

test.use({ storageState: "./.auth/user.json" });

//треба бути обережним при логауті
//видаляти файли сесіі
//може бути протухання сессії
