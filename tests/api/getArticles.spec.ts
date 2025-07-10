import { APIResponse, expect, request } from "@playwright/test";
import {
  getArticleData,
  getArticlesDataForLoop,
  getAuthData,
  setUserData,
} from "../../helper";
import { test } from "./fixture";
import { ArticleController } from "./ArticleController/ArticleController";
import { Article, ArticlesResponse } from "./ArticleController/ArticleTypes";

// test.use({ userEmail: "gaetano55@gmail.com" });

test(
  "SK_API_1 get articles - articles list",
  { tag: "@get articles" },
  async ({ request }) => {
    const response: APIResponse = await request.get(
      `https://conduit-api.learnwebdriverio.com/api/articles?offset=0&limit=10`
    );

    const data = await response.json();

    const tagsArray = data.articles.filter((value) =>
      value.tagList.includes("YO-Article")
    );
    console.log(data.articles[0].slug);
  }
);

test("create user", async ({ request }) => {
  const getUserData = setUserData();
  const requestBody = {
    user: {
      email: getUserData.email,
      password: getUserData.password,
      username: getUserData.userName,
    },
  };
  await request.post(`https://conduit-api.learnwebdriverio.com/api/users`, {
    data: requestBody,
  });
});

test("login as existed user - should get token ", async ({ request }) => {
  const user = getAuthData();
  const requestBody = { user: { email: user.email, password: user.password } };
  console.log(requestBody);
  const response: APIResponse = await request.post(
    `https://conduit-api.learnwebdriverio.com/api/users/login`,
    {
      data: requestBody,
    }
  );
  const responseToken = await response.json();
  console.log(responseToken.user.token);
});

test(
  "create article - should be created",
  { tag: "@createArticle" },
  async ({ request, token }) => {
    const articleController = new ArticleController(request);
    const getArtData = getArticleData();
    const requestBody: Article = {
      title: getArtData.title,
      description: getArtData.description,
      body: getArtData.bodyArticle,
      tagList: [getArtData.tag],
    };
    console.log(token);
    const articleResponse = await articleController.createArticle(
      requestBody,
      token
    );
    await expect(articleResponse).toBeOK();
  }
);

test(
  "create articles - should be created 3 articles",
  { tag: "@createArticles" },
  async ({ request, token }) => {
    const articleController = new ArticleController(request);
    const articles = getArticlesDataForLoop();
    for (const item of articles.articles) {
      const requestBody: Article = {
        title: item.title,
        description: item.description,
        body: item.bodyArticle,
        tagList: [item.tag],
      };
      console.log(requestBody);
      const response = await articleController.createArticle(
        requestBody,
        token
      );
      await expect(response).toBeOK();
    }
  }
);

test(
  "get articles by title",
  { tag: "@find articles by title" },
  async ({ request, token }) => {
    const title = "NEW TITLE UPDATE";
    const articlesController = new ArticleController(request);
    const responseArticlesCount = await articlesController.getArticleCount(
      token
    );
    let counterOfArticlesByTitle = 0;
    let articlesMatch = [];
    for (let index = 0; index <= responseArticlesCount; index += 10) {
      const responseArticle = await articlesController.getArticleByTitle(
        token,
        title,
        index
      );

      if (responseArticle.length > 0) {
        counterOfArticlesByTitle += responseArticle.length;
        articlesMatch.push(...responseArticle);
      }
    }
    await expect(counterOfArticlesByTitle).toBeGreaterThan(0);
  }
);
