---
slug: randomimg
title: DarkLotus随机图API食用方法
date: 2024-08-27 17:42
authors: lian
tags: [随机图,Api]
keywords: [随机图,Api,教程]
image: https://i.darklotus.cn/2024/imph2v.webp
---

此API是参考学习其他大佬做出来的 虽技不如人 但还是有一些个人想法需要做一下介绍 

<!-- truncate -->

## 个人想法

我发现调用api时 如果直接内嵌调用图片


比如 https://img.darklotus.cn/random 这个地址一直刷新 每次图片不同 这种情况下 是没法被cdn缓存到的 所以导致每次加载速度都从源站获取 而我又不知道咋解决 所以改成了跳转（很多大佬已经采用这种方式了）实际情况是不受影响的

## 在线预览

![](https://i.darklotus.cn/2024/imph2v.webp)

https://img.darklotus.cn/live.html

这里有更多API接口 可以在线预览刷新 同时还会自动复制好API的URL地址！

这个页面是我一个通宵写出来的 调试了弹窗 发现bug解决不了 就把复制按钮改为卡片抖动跟语音提示了 复制成功就会听到wow 如果复制失败则双倍wow 抖动更厉害 点击食用后 预览图片会页内刷新 同时复制 同时播放音乐 同时卡片抖动 感觉还挺好玩的 图片都是我从别人那批量下载的 然后每一张图过目挑选 再分类 因为我发现很多随机图api接口 不知道是审美还是啥 一堆优质图片里 总会偶尔插入几张不太行的 我不喜欢我就删掉了 自己做的东西就是好 愉悦自己





##使用教程：

### 同一个页面的url 拉取不同的图片

https://img.darklotus.cn/random?postId=1

https://img.darklotus.cn/random?postId=2

https://img.darklotus.cn/random?postId=3

比如这三个链接同一次加载中 可以请求回来三张不一样的图片。


### json调用

所有的分类API已支持输出json

示例:

https://img.darklotus.cn/random?json

可获取的参数为

```bash
{
"code": 200,
"url": "https://img.darklotus.cn/Random/260.webp",
"width": 2800,
"height": 1575
}
```


## 使用声明

1. API公益免费健康

2. 禁止用于违法网站

3. 图片如有侵权 请主动联系 会道歉下架

