---
slug: cloudflaretunnel
title: Cloudflare Tunnel 内网穿透之Nas常用服务
date: 2024-03-07 18:26
authors: lian
tags: [Cloudflare,Tunnel]
keywords: [Cloudflare,Tunnel,教程]
image: https://i.darklotus.cn/images/2024/04/17/202404171654260.png
---

本文将教大家如何使用CloudflareTunnel 进行内网穿透教程简单易懂

<!-- truncate -->

### 为什么出这个教程？

这个教程网上已经很多很详细了 我再次来写 自然是考虑到还有一大部分人不知道 而我重新写也自然要把关键的地方提出来单独说 让所有人知道这个玩意 简单方便 实际效果又是如何 而我主要教学也是根据nas用户的角度来讲解 所以我的教程主要讲解的东西 就算你已经会了 也会学到其他的东西

### 这项技术的优缺点？

这个教程主要适合没有v4v6公网的用户 主打就是简单方便快捷 但是体验感很差 很烂 一些静态网页的体验感还可以 你可以不再需要购买服务器 用家里的nas即可实现https带证书 网上搭建自己的一个网站 动态的只要不是有大量图片那种 其实也还可以 综合体验来说这个功能是不好用的 但他免费不要钱啊 安全稳定靠谱啊 人家不嫌弃你白嫖 能让你用上 你就不要嫌弃好坏！

### 为什么图片加载很慢？

是因为内网穿透是实时同步的 cf的边缘节点丝毫没有缓存一点静态资源 他的好处就是内网的服务实时更新 每次访问都得重新拉取一遍 而且这种方式是点对点加密的（具体原理没了解过 个人感觉是十分安全的） cf解析的地址你ping是ping不通的 也就是通过这个内网穿透 任何人 哪怕是你自己登录了cf的后台 也是获取不到你自己的真实ip的

### 实际测试速度在多少？

我利用群晖Nas下载文件测试了一下 凌晨三点钟最快在2-8m/s之间飘忽不定（idm多线程下载）当时还挺满意的 速度什么的都很快 结果一到白天 或则晚上 就慢得要死 完全没法用的状态 我觉得综合速度大概就是2mbps，200kb/s 这样子。此回答只能作为参考 实际以自己测试为准。

### 推荐部署哪些服务？

1. Hugo，Hexo 等静态博客

必须生成静态文件后 内网nginx给这个网站分配一个内网ip和端口 确保内网ip可以直接打开访问

Halo跟WordPress这样的动态博客和群晖Nas体验感就很差了！但也是能用的 就是慢得要死！

我的文档就是这个方式部署的 大家可以体验一下：docs.darklotus.cn

2. qBittorrent Web UI和Transmission

我只用qb 所以测试也只有qb 效果很不错 用自己的域名就能打开qb网页的后台 即可远程下载资源 公司下好自己想看的 下班回家直接看！

tr我不用 以我猜测 效果差不多 因为这些面板其实没有太多大文件加载 所以访问的体验可以得到保证！

身为qb用户 我一定要给兄弟们提个醒：

![image-20240307183148432](https://i.darklotus.cn/images/2024/04/17/202404171657537.png)

3. 最牛逼的媒体库管理软件：MoviePilot

为啥我一直主推安利这个软件 是因为我最开始玩的就是nastools 我算是资深老用户了 这软件不仅功能屌炸天 而且还不要你钱 创作团队人也很nice 谁做危害mp项目的人 谁就该死 我说的 我之所以变得收敛很多 很大部分原因就是不想危及伤害到这个软件的团队 我也会通过自己的一点点努力 为这个项目出一份自己力所能及的力量。

这个穿透后的效果不是很好 感觉跟穿透群晖nas差不多 一到晚上打开面板就很慢 需要等很久 但还是那句话 又不是不能用 而且咱们穿透这个的目的主要还是让那些没有v4v6公网的用户 用上微信通知！通过这个方法 企业微信那边的api回调地址 就可以获取到 就可以保存成功 微信应用就可以进行操作！

实际打开就是很慢 不信自己试试就知道了

![image-20240307191839248](https://i.darklotus.cn/images/2024/04/17/202404171657606.png)

4. VuePress或Hugo的文档主题

这个我非常推荐 因为本身访问的速度就很快 所以无须多言 体验感很棒 修改任何东西都能实时的看到变化

5. YesPlayMusic

高颜值的第三方网易云播放器 支持 Windows / macOS / Linux 有软件版本 也有docker网页版 我是在1panel里面部署的docker网页版 因为歌曲调用的还是网易云的 所以体验感还行～

其他的暂时想不到了 大家可以自己动脑筋思考可以穿透一些什么服务能获得一个不错的体验感

切记以上服务在内网访问全是http 这样才能无损的套上cf的自签证书 https会出问题 解决办法我没有研究 因为没必要 我自己本人还是自己买服务器来frp穿透 效果会好很多～



## 注册Cloudflare

 https://dash.cloudflare.com/sign-up, https://www.vectorlogo.zone/logos/cloudflare/cloudflare-icon.svg

我推荐所有人都把域名托管到cf 甚至直接在cf花钱注册域名 不要问我为什么 照做就行了

以下教程全部都是需要你的域名在cf解析才能做到的 所以连这个都不懂的 百度搜 这个太基础的 我真的不愿意讲。

## 创建Cloudflare Tunnel

![image-20240307203648921](https://i.darklotus.cn/images/2024/04/17/202404171657616.png)

![image-20240307203731624](https://i.darklotus.cn/images/2024/04/17/202404171657621.png)

![image-20240307204049426](https://i.darklotus.cn/images/2024/04/17/202404171657643.png)



### 以群晖Docker举例

直接复制粘贴docker的安装代码就行了 我把的token给删了 你们自己复制粘贴你自己的运行就行了 需要注意的就是 cf给的命令没有添加自动重启参数的：

```
docker run cloudflare/cloudflared:latest tunnel --no-autoupdate run --token
```

群晖可以自己去docker那里勾选上 其他linux用户就自行在docker run 后面添加 --restart always 即可

```
docker run --restart always cloudflare/cloudflared:latest tunnel --no-autoupdate run --token
```



群晖运行docker命令的方法还是老方法 所有人都必须学会的一个东西 这里就不细致的重述了



![image-20240307195002802](https://i.darklotus.cn/images/2024/04/17/202404171657624.png)



![image-20240307195214441](https://i.darklotus.cn/images/2024/04/17/202404171657956.png)



## 添加要穿透的内网服务





![image-20240306034913821](https://i.darklotus.cn/images/2024/04/17/202404171657151.png)

### 举例

我的qb内网地址为：

http://192.168.31.1:8080

我的MP内网地址为：

http://192.168.31.1:3000

我的nas地址为：

http://192.168.31.1:5000

切记内网必须保持http nas别开https！！！！！！

![image-20240307200018714](https://i.darklotus.cn/images/2024/04/17/202404171657384.png)

挨个添加就完事了 就这么简单 添加完了 你直接访问 https://qb.xxx.com 就能https带证书 去端口访问了

mp nas 按照上面图片自己添加就完了 这教程就这么简单 更进阶的教程 我得动动脑子再来写了 我语言组织能力还是不太强 

cf的内网穿透服务还可以给自己穿透的域名上一层验证 必须自己才能访问打开面板 这个网上教程也很多 我有点懒得讲了 看想学的人多不多吧 多的话我再写 不多就懒得写