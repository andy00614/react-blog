[![Build Status](https://travis-ci.org/andy00614/react-blog.svg?branch=master)](https://travis-ci.org/andy00614/react-blog)

# React-blog
## 技术栈
### 语言/框架：
next + ts 
### 规范
eslint + prettier + husky + react-testing-library
### CI
travis + docker

## 使用方法

a. 在articles目录下新建markdown文件
其中，文件前两行:
`%title:` 后为文章的标题
`%date:` 后为文章的日期(可不写，不写默认为创建时间的日期)

b.执行脚本 `npm run generator` 会将目录下所有的markdown文件生成json文件(本地serverless化)

c.git push后触发travis将最新的docker包发布到dockerhub上

d.登录远程服务器
`docker-compose pull blog`
`docker-compose up blog`


