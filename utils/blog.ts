import { List } from "../pages/index";
import allArticles from "../__mocks__/article.json";

interface Articles {
  articleId: string;
  content: string;
  time: number;
  title: string;
}

export function getHomeList(): List[] {
  return ((allArticles as any) as Articles[]).map((article) => ({
    title: article.title,
    time: article.time,
    articleId: article.articleId,
  }));
}

export function getTargetArticle(articleId: string): Articles {
  return ((allArticles as any) as Articles[]).filter(
    (item) => item.articleId === articleId
  )[0];
}
