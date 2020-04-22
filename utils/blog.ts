import { List } from "../pages/index";
import allArticles from "../__mocks__/article.json";
import dayjs from "dayjs";

interface Articles {
  articleId: string;
  content: string;
  time: number;
  title: string;
}

function transferDate(date: string | number) {
  typeof date === "number" ? date.toString() : date;
  return new Date(date).getTime();
}

export function getHomeList(): List[] {
  return ((allArticles as any) as Articles[])
    .map((article) => ({
      title: article.title,
      time: article.time,
      articleId: article.articleId,
    }))
    .sort((a, b) => transferDate(b.time) - transferDate(a.time));
}

export function getTargetArticle(articleId: string): Articles {
  return ((allArticles as any) as Articles[]).filter(
    (item) => item.articleId === articleId
  )[0];
}
