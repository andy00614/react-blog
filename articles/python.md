% title: python-notes
% date: 2020-01-23

# 运行时做了什么

**解释器**会读取整个程序，将内容解析

## python的变量是可以随时被赋值的

    msg = "hello world"
    print(msg)
    
    msg = "andy"
    print(msg)

## python的报错在vscode下只有保存的那一刻才生效

# 字符串

`.title()`:能让首字母大写

`.upper()`

`.lower()`

## 去除空白

### 左空白

lstrip()

### 右空白

rstrip()

### 同时剔除两端空白

strip()

### 中间空白

正则吧~~

# 数字类型

数字类型和字符串不能联用(链接)，需要将数字转化成字符串: `str(number)`

# 索引可以从-1倒数开始

    names=['andy','meng','hah','cccc']
    print(names[-2])

# 增

# 删

# 改

# 查

# 排序

## 会改变原数组

sort

sort(reverse=True)

## 不会改变原数组

sorted

## 翻转(也是会永久改变的)

arr.reverse()

## 打印长度

len(arr)

# 索引超长会报错

# 循环

    magicians = ['alice','david','carlina']
    for magicians in magicians:
      print(magicians)

这种循环的空间复杂度是O1因为magicians只是一个变量，每次都会给它重新赋值

在for 循环后面，没有缩进的代码都只执行一次

## 数字列表

`range(start,end,step[步长])`

但是range产生的值并不是数组类型，如果要数组，需要转化一下 `list(range(1,5))`

## 列表解析

    squares = [number for number in range(1,5)]
    squares = [value for value in range(1,11)]

## 切片

### 基本形式

    players = ['charles', 'martina', 'michael', 'florence', 'eli']
    print(players[:2])
    print(players[-2:])
    print(players)

可以复数切

**分页的时候用切片是个不错的选择**

### 用于复制列表(和js没啥区别)

`players[:]`

## 包含操作

in

not in

# 元组和数组区别

元组不可修改

但所有的变量都可以重新复制

## 规则

key必须要是双引号

# 遍历

## 遍历键值对

    favorite_language = {
      'andy': 'js',
      'meng': 'python'
    }
    for k,v in favorite_language.items():
      print(k,v)

键值对的顺序不一定按照字典的顺序

## 遍历键

    favorite_language = {
      'andy': 'js',
      'meng': 'python'
    }
    for k in favorite_language.keys():
      print(k)

## 遍历键

    favorite_language = {
      'andy': 'js',
      'meng': 'python'
    }
    for k in favorite_language.values():
      print(k)

# 函数
虽然向函数传递列表的副本可保留原始列表的内容，但除非有充分的理由需要传递副本，否则还是应该将原始列表传递给函数，因为让函数使用现成列表可避免花时间和内存创 建副本，从而提高效率，在处理大型列表时尤其如此。
