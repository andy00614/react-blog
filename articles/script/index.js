const fs = require("fs");
const path = require("path");
const dayjs = require("dayjs");

function getFileInfo(path) {
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

function isRegularMdFile(content) {
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

// 读取每个文件 -> 拿到前两行 -> 判断前两行的格式(格式有误要报错) -> 时间信息，内容信息，id信息插入插入数组里
function generateJson(articleDir, path) {
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
  /* eslint-disable */
  console.log(`✅更新完成！已插入${rst.length}条文章`);
}

function Trim(str) {
  return str.replace(/\s*/g, "");
}

module.exports = {
  Trim,
  generateJson,
  isRegularMdFile,
  getFileInfo,
};
