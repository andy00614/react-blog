import { getFileInfo, Trim } from "../";
import path from "path";

test("getFileInfo-have Date", () => {
  const PATH = path.join(__dirname, "./test.md");
  const rst = getFileInfo(PATH);
  expect(rst.articleId).toBe("2020-04-18-测试文章1");
  expect(rst.time).toBe("2020-04-18");
  expect(rst.title).toBe("测试文章1");
  expect(typeof rst.content).toBe("string");
});

test("getFileInfo-don't have Date", () => {
  const PATH = path.join(__dirname, "./test2.md");
  const rst = getFileInfo(PATH);
  expect(rst.articleId).toBe("2020-04-18-测试文章2");
  expect(rst.time).toBe("2020-04-18");
  expect(rst.title).toBe("测试文章2");
  expect(typeof rst.content).toBe("string");
});

test("trimAll", () => {
  expect(Trim("  a b c  ")).toBe("abc");
});
