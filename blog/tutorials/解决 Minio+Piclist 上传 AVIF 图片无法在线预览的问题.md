---
slug: minioavif
title: 解决 Minio+Piclist 上传 AVIF 图片无法在线预览的问题
date: 2024-10-19 01:59
authors: [lian]
tags: [Minio,Piclist,Avif]
keywords: [教程]
image: https://oss.darklotus.cn/img/2024/10/16/202410162053664.png
---

Piclist设置Mini即可解决Minio上传 AVIF 图片无法在线预览的问题

<!-- truncate -->

以下的教程不用看了 我不删就是想让大家知道我是如何从失败到成功的 

cdn的方法行不通 看似成功了 但是你会发现xml页面也变成了image 所有的请求头都被覆盖了 

所以必须在上传阶段设置 于是我研究了下MIME到底是啥意思

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/MIME_types/Common_types

看完才知道piclist早就支持了 目前已经学会 成功解决了这个问题 大家可以放心学习！！！

## 自定义 MIME

在 piclist 的自定义 MIME 格式中，ext1、ext2、ext3 等代表文件扩展名。每个扩展名后面跟着一个冒号和对应的 MIME 类型。具体来说：

ext1：第一个文件扩展名，例如 jpg、png、avif 等。
mime1：与 ext1 对应的 MIME 类型，例如 image/jpeg、image/png、image/avif 等。
因此，整个格式的结构是：
ext1:mime1|ext2:mime2|ext3:mime3

例如，如果您想添加 .jpg、.png 和 .avif 的 MIME 类型，您可以写成：

jpg:image/jpeg|png:image/png|avif:image/avif

这样，jpg 文件会被识别为 image/jpeg，png 文件会被识别为 image/png，而 avif 文件会被识别为 image/avif。

以上只是举例 minio本身就支持jpg和png 所以只需要添加还不支持的格式就好了 

我暂时只想解决avif的在线预览 所以就填写
avif:image/avif
就完事了

## 问题描述

我是用minio+piclist来上传图片的嘛 上传avif格式的图片 大多数url打开就直接下载了 不能在线预览 然而我又有图片上传后莫名其妙能预览的 我想不通 找遍了网上都没找到解决办法 自定义MIME是啥问了也听不懂 看了piclist的配置文件也没找到相应设置Content-Type的地方。。。

问了GPT 给我的答复 说人话就是 判断在线预览的是HTTP报头 需要添加Content-Type的值为 image/avif

这样支持在线预览avif的浏览器得到这个响应报头就会变成在线预览 而不是直接下载文件

我之前莫名其妙上传后支持在线预览的avif图片 就能找到这个报头 


## 检测报头

以下图片链接是我莫名其妙上传莫名其妙自带报头的图片 但Piclist上传avif就是不带这个报头 那咋办嘛 

用curl命令查看

    ```
curl -I https://oss.darklotus.cn/img/2024/09/25/202409250237596.avif
    ```
得到
![](https://oss.darklotus.cn/img/2024/10/19/WX20241019-015048@2x.avif)
显示content-type: image/avif 就算成功了

## ~~解决方法~~

~~既然我在上传api那里找不到解决办法（真不会而且也很麻烦）那我可以在CDN那里动手脚啊~~
~~于是我在我的CDN里的HTTP报头-响应报头 添加了报头名称~~

~~Content-Type~~

~~值为~~

~~image/avif~~

~~直接就把这个问题解决了~~

~~https://oss.darklotus.cn/img/2024/09/30/QmbiPWS5eCMew41RHPrwVc2suPqdyuGJkHYBycP9ihj5r9.avif~~
~~这张图就是我之前说的不能在线预览的 通过cdn自定义报头 能预览了。。。~~

~~只要是浏览器支持在线预览的文件格式 都可以通过这个方法解决 大多数格式都是支持的 只不过新技术跟进不到位罢了~~

最后推荐一篇有点帮助的文章 说是在上传阶段解决 但我看不懂 而且不方便 就看piclist发不发力了 目前用了几款oss软件工具 就piclist最舒服

[MinIO文件上传的预览问题](https://blog.csdn.net/qq_44038822/article/details/138656016)

