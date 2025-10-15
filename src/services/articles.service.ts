import { getArticleFromEndpoint } from "../adapters/article.adapter";
import { supabase } from "../configuration/supabase.configuration";
import type { Article } from "../models/article.model";

export class ArticlesService {
  static async getById(id: string): Promise<Article | undefined> {
    const { data: articleEndpoint, error } = await supabase
      .from("articles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    const article = getArticleFromEndpoint(articleEndpoint);

    return article;
  }

  static async getMostRecent(amount: number = 4): Promise<Article[]> {
    const { data: articleEndpoints, error } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(amount);

    if (error) throw error;

    const articles = articleEndpoints.map((endpoint) =>
      getArticleFromEndpoint(endpoint)
    );

    return articles as Article[];
  }

  static async getMostPopular(): Promise<Article[]> {
    const { data: articleEndpoints, error } = await supabase
      .from("articles")
      .select("*")
      // .order("views", { ascending: false })
      .limit(5);

    if (error) throw error;

    const articles = articleEndpoints.map((endpoint) =>
      getArticleFromEndpoint(endpoint)
    );

    return articles as Article[];
  }
}
