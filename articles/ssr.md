% title: ssr
% date: 2019-02-07

# 服务端渲染 vs 客户端渲染

## 什么是服务端渲染？

就是将html通过服务器返回了，页面的产生又服务器决定。它的特性是从鼠标右键看网页源代码，和spa是不一样的

![1.png](https://i.loli.net/2020/04/21/lDe8UiTmh6HIbco.png)

![2.png](https://i.loli.net/2020/04/21/VOFx476e9Cbdzik.png)

## 什么是客户端渲染(传统的React之类)

就是将bundle.js返回到客户端，然后通过从客户端加载js文件的方式来进行渲染，可以做一个测试，就是将浏览器设置中禁用JavaScript，网页就打不开了,所以网页完全由js渲染

## 他俩的优缺点：

### csr优点：

前后端分离架构，开发效率高

![3.png](https://i.loli.net/2020/04/21/o1TMFuWHqklUX9d.png)

### csr缺点：

![4.png](https://i.loli.net/2020/04/21/Y7vwIiPGjd6BE3T.png)

1. csr看到页面内容的时间以来于整个js，所以首屏加载时间慢
2. seo不行，因为他只认识html上的文本内容，不认识js里面的

## ssr的缺点：

csr消耗的是客户端的性能，而ssr消耗的是服务器的性能，要付出增加服务器的代价

# ssr和csr的渲染区别

![5.png](https://i.loli.net/2020/04/21/VMWv6K3ali4gjt8.png)
![6.png](https://i.loli.net/2020/04/21/O79EgNAriVPxLbH.png)
**相当于将React代码从后端运行，将结果通过response返回去**

## 步骤

先创建一个服务器

用express

## 配置webapck

需要告诉打包的是服务器端还是浏览器端的代码

### 配置babel-loader

将js的文件通过babel-loader进行打包

将js的文件通过babel-loader进行打包

![7.png](https://i.loli.net/2020/04/21/DWsxnr9lPO74Tb2.png)

配置webpack的文件如下：

    const path = require('path')
    module.exports = {
      target: 'node', // 需要告诉webpack打包的是服务器端还是浏览器端的代码
      entry: './src/index.js',
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'build')
      },
      module: { // 配置规则
        rules: [
          {
            test: '/\.js?$/',
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
              presets: [ // 设置编译规则
                'react', // 这里设置了react，那必须要安装 npm install babel-presets-react --save
                'stage-0' // 这里应该是更高级的js语法支持, npm install babel-preset-stage-0 --save
                ['env',{
                  targets: {
                    browsers: ['last 2 versions'] // 兼容主流浏览器的最后两个版本
                  }
                }]
              ]
            }
          }
        ]
      }
    }

运行webpack: `webpack —config webpack.server.js`

在node环境下，webpack的target光是node不行，还要

![8.png](https://i.loli.net/2020/04/21/EoMRSyvnwrOAKkP.png)

# 服务器端渲染的原理和流程

因为react组件实际上是虚拟dom,因此ReactDom方法能够把虚拟dom转化成字符串形势的dom,通过response来返回

[https://github.com/andy00614/react-ssr/commit/e5ddac546d5f70e8f3e0b7047a545bbbf4718868](https://github.com/andy00614/react-ssr/commit/e5ddac546d5f70e8f3e0b7047a545bbbf4718868)

## 服务器的自动打包和重启(webpack)

![9.png](https://i.loli.net/2020/04/21/2cFveqnRw1azNdM.png)

下一步，怎么监听并**重启呢？**

配置nodemon, 下面commit里面有详细描述

[https://github.com/andy00614/react-ssr/commit/bff3adf7154f5c57961366b7fc7cc10fc57e2a14](https://github.com/andy00614/react-ssr/commit/bff3adf7154f5c57961366b7fc7cc10fc57e2a14)

### npm run all来提升开发效率(对上面再进行优化)

现在的问题是启动了两个窗口，而且浏览器还不会自动刷新(当然这个不一定是缺点)


并行的(—parallel)运行dev为开头的所有命令

# 同构

## 什么是同构


服务端渲染后click并没有生效，查看源代码，发现button的事件没有渲染出来，

原因是ReactDom的`renderToString`事件是不会被渲染出来的，因此没有事件


所以讲React代码再从客户端运行一次，就可以了(第一感觉这个方案有点不好啊)

## 思路

所以通过上面所说，还需要加载js静态文件，那可以用express的static中间件(如果路由是一个静态文件，直接会在public里面拿)

[https://github.com/andy00614/react-ssr/commit/c97552d929a98adf42c3aa94d827918cb9096691](https://github.com/andy00614/react-ssr/commit/c97552d929a98adf42c3aa94d827918cb9096691)

## 同构

将这个文件同构在public的index.js里面

    import React from 'react'
    import ReactDom from 'react-dom'
    import Home from '../container/Home'
    
    ReactDom.render(<Home />,document.getElementById('root'))

但是public的index.js在浏览器上并不支持esmodule

之后就要配置webpack了。

### 构建client的webpack

用webpack-merge合并webpack配置

[https://github.com/andy00614/react-ssr/commit/56f0e65181117d60c1fd1d58bca774683f06faf8](https://github.com/andy00614/react-ssr/commit/56f0e65181117d60c1fd1d58bca774683f06faf8)

## 同构总的路由

### 客户端路由流程

→broser-router

### 服务器端路由

StaticRouter

- 也属于react-router

    `import {StaticRouter} from 'react-router-dom'`

- 加context
- 不能感知路径的变化，只能通过req来告诉，所以也要加req


## 服务器渲染只发生在第一次进入页面的时候
