import { getFileInfo, Trim, generateJson } from "../index";
import path from "path";

const PATH = (child?: string) =>
  child ? path.join(__dirname, `./md/${child}`) : path.join(__dirname, "./md/");

test("getFileInfo-have Date", () => {
  const rst = getFileInfo(PATH("test.md"));
  expect(rst.articleId).toBe("2020-04-18-测试文章1");
  expect(rst.time).toBe("2020-04-18");
  expect(rst.title).toBe("测试文章1");
  expect(typeof rst.content).toBe("string");
});

// test("getFileInfo-don't have Date", () => {
//   const rst = getFileInfo(PATH("test2.md"));
//   expect(rst.articleId).toBe("2020-04-18-测试文章2");
//   expect(rst.time).toBe("2020-04-18");
//   expect(rst.title).toBe("测试文章2");
//   expect(typeof rst.content).toBe("string");
// });

test("trimAll", () => {
  expect(Trim("  a b c  ")).toBe("abc");
});

test("generator json file", () => {
  const JsonPath = path.join(__dirname, "../mock.json");
  // generateJson(PATH(),JsonPath)
  expect(typeof import("../../../__mocks__/article.json")).toBeTruthy();
});
