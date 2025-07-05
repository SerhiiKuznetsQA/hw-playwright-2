import test from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";

test.use({ storageState: "./.auth/user.json" });
