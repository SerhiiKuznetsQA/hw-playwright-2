import { APIRequestContext, APIResponse } from "@playwright/test";
import { Article, ArticlesCreation, ArticlesResponse } from "./ArticleTypes";

export class ArticleController {
  private request: APIRequestContext;
  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getArticleCount(token: string) {
    const response: APIResponse = await this.request.get(
      "https://conduit-api.learnwebdriverio.com/api/articles?offset=0&limit=10",
      {
        headers: { authorization: `Token ${token}` },
      }
    );
    // get response body
    const responseJson: ArticlesResponse = await response.json();
    const articleCount = responseJson.articlesCount;

    return articleCount;
  }

  async getArticleByTitle(token: string, title: string, i: number) {
    const response: APIResponse = await this.request.get(
      `https://conduit-api.learnwebdriverio.com/api/articles?offset=${i}&limit=10`,
      {
        headers: { authorization: `Token ${token}` },
      }
    );
    // get response body
    const responseJson: ArticlesResponse = await response.json();
    const articleTitle = responseJson.articles.filter((item) =>
      item.title?.includes(title)
    );
    return articleTitle;
  }

  async createArticle(articleData: Article, token: string) {
    const requestBody: ArticlesCreation = {
      article: articleData,
    };

    const response = await this.request.post(
      "https://conduit-api.learnwebdriverio.com/api/articles",
      {
        data: requestBody,
        headers: {
          authorization: `Token ${token}`,
        },
      }
    );

    return response;
  }
}
