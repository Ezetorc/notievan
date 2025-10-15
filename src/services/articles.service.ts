import { ARTICLES } from "../mocks/articles.mock";
import type { Article } from "../models/article.model";

export class ArticlesService {
  static async getById(id: string): Promise<Article | undefined> {
    return ARTICLES.find((article) => article.id === id);
  }

  static async getMostRecent(amount: number = 4): Promise<Article[]> {
    return ARTICLES.toSorted(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    ).slice(0, amount);
  }

  static async getMostPopular(): Promise<Article[]> {
    return ARTICLES.toSorted(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    ).slice(0, 5);
  }
}
