import path from "path";

const { generateJson } = require("../config/index.ts");

const articlePath = path.join(__dirname);

generateJson(articlePath, path.join(__dirname, "../__mocks__/article.json"));
