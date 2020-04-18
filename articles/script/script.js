const path = require("path");

const { generateJson } = require("./index");

const articlePath = path.join(__dirname, "../");

generateJson(articlePath, path.join(__dirname, "../../__mocks__/article.json"));
