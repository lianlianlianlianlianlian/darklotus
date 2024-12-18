---
id: git-gitignore # 唯一ID
slug: gitignore # URL(最多三级结构，便于seo 和理解，遵循doc/资源/具体说明项 的原则)
sidebar_position: 20  # 控制该文档在侧边栏的显示顺序
title: Git 文件忽略规则
description: Git 文件忽略规则 # 描述
date: 2024-10-27
authors: lian
tags: [git, github]
keywords: [git, github, gitignore]

---

在一个完整的项目中，通常是包含着一个名为`.gitignore`的文件。

这个文件是用来管理配置那些不需要加入版本管理的文件。

### 配置语法
* 以井号`#`开头的行视为注释
* 以斜杠`/`开头表示目录
* 以星号`*`通配多个字符
* 以问号`?`通配单个字符
* 以方括号`[]`包含单个字符的匹配列表
* 以感叹号`!`表示不忽略先前模式排除的文件或目录，如果排除该文件的父目录，则无法重新包括该文件。

### 示例1
```
规则：test/*
说明：忽略 test 目录下的全部内容；注意，不管是根目录下的 /test/ 目录，还是某个子目录 /child/test/ 目录，都会被忽略

规则：/test/*
说明：忽略根目录下的 /test/ 目录的全部内容

规则：test
说明：忽略 test 文件和 test 目录

规则：test/
说明：只忽略 test 目录，不忽略 test 文件

规则：test
!test/
说明：只忽略 test 文件，不忽略 test 目录

规则：/test
说明：只忽略当前目录下的 test 文件和目录，子目录的 test 不在忽略范围内

规则：*.[oa]
说明：忽略所有以 .o 或 .a 结束的文件

规则：**/node_modules/
说明：忽略所有文件夹下命名为 node_modules 的文件夹，和直接写 node_modules/ 一样


```

### 示例2
```

规则：
/*
!/test
/test/*
!/test/inner.js

说明：忽略全部内容，但是不忽略根目录下的 /test 目录和 /test/inner.js 文件
```

### .gitignore文件未生效问题
#### 问题描述
> 在 .gitignore 文件生成之前，本地仓库中就已经存在了部分文件，而纳入 .gitignore 文件中的规则并不会对那些文件产生作用。

#### 产生原因：

是因为该文件是在忽略文件的前面创建并提交至本地仓库的，所以**导致本地缓存**中已经有了该文件。

这样就会让 .gitignore 的规则未直接影响到了该文件，导致未生效。

#### 解决方法：
从本地缓存中删除该文件，使用命令：`git rm --cached <file>`
```
# <file> 前面的--可以省略
$ git rm --cached -- <file>
rm '<file>'
$ git commit -m "删除缓存文件"
```
该命令表示：从缓存区中删除文件，但是保留物理文件，所以当你执行完该命令并提交之后，就会发现本地文件还是存在的，同时里面的内容也是没有任何变化的。
只是整个过程中多了一次提交。


### 参考链接：
* [Git忽略提交规则](https://www.cnblogs.com/kevingrace/p/5690241.html)
* [Git忽略提交](https://www.cnblogs.com/youyoui/p/8337147.html)