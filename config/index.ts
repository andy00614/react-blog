import fs from "fs";
import path from "path";
import dayjs from "dayjs";

export function getFileInfo(path: string) {
  try {
    const stats = fs.statSync(path);
    const article = fs.readFileSync(path, "utf-8");
    const articleLine = article.split("\n");
    const articleInfoFromFile = isRegularMdFile(articleLine);
    const date = articleInfoFromFile.date
      ? articleInfoFromFile.date
      : dayjs(stats.birthtime).format("YYYY-MM-DD");
    return {
      articleId: `${date}-${articleInfoFromFile.title}`,
      content: articleInfoFromFile.document,
      time: date,
      title: articleInfoFromFile.title,
    };
  } catch (e) {
    throw e;
  }
}

export function isRegularMdFile(content: string[]) {
  if (!content[0]) {
    throw "缺少标题";
  }
  const date = Trim(content[1]).split("%date:")[1];
  const title = Trim(content[0]).split("%title:")[1];
  if (!title) {
    throw "请正确填写标题或信息";
  }
  const document = content.reduce((content, cur, index) => {
    if (index < 2) {
      return content;
    }
    return content + cur + "\n";
  }, "");
  return {
    date,
    title,
    document,
  };
}

export function generateJson(articleDir: string, path: string) {
  const mdFiles = fs.readdirSync(articleDir).filter((f) => f.endsWith(".md"));
  const rst = [];
  if (mdFiles) {
    // todo:这块写文件可不可以考虑流的方式
    mdFiles.forEach((item) => {
      const addr = articleDir + item;
      rst.push(getFileInfo(addr));
    });
  }
  fs.writeFileSync(path, JSON.stringify(rst));
}

export function Trim(str) {
  return str.replace(/\s*/g, "");
}
