// const fs = require('fs')
// const path = require('path')
// const dayjs = require('dayjs')
import fs from "fs";
import path from "path";
import dayjs from "dayjs";

// fs.readFile('../articles/test.md','utf-8',(err,data) => {
//   if(err) {
//     return
//   }
//   // console.log(data);
// })

fs.stat("../articles/test.md", (err, stats) => {
  if (err) {
    return;
  }
  const time = dayjs(stats.birthtime).format("YYYY/MM/DD");
});

const articlePath = path.join(__dirname, "../articles");

// 读取每个文件 -> 拿到前两行 -> 判断前两行的格式(格式有误要报错) -> 时间信息，内容信息，id信息插入插入数组里
const mdFiles = fs.readdirSync(articlePath).filter((f) => f.endsWith(".md"));
