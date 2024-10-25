---
slug: moviepilotwechat
title: MoviePilot企业微信推送之新手喂饭教程
date: 2024-02-01 08:07
authors: lian
tags: [Moviepilot,微信推送]
keywords: [教程]
image: https://i.darklotus.cn/2024/j06jhc.webp
---

如遇到请求能收到 但是没法收到返回信息 看看自己是不是用了加密DNS 浏览器里去关掉加密DNS试试

<!-- truncate -->

## 教学指引

期间参考：

<https://pt-helper.notion.site/50a7b44e255d40109bd7ad474abfeba5>

<https://github.com/Putarku/MoviePilot-Help?tab=readme-ov-file#%E5%BE%AE%E4%BF%A1%E9%80%9A%E7%9F%A5%E9%97%AE%E9%A2%98>

大家点进去看 了解各个信息 代表什么意思 网上教程已经很详细了 基础的我就不再过多的重述 直接看我的截图 找到以下几个关键点 我用数字代表各个参数 大家理解起来事半功倍

以下为windows的配置文件参数 docker用户无需担心 对号入座进群晖docker 其实是一样的 主要就是这几个环境变量 别害怕 我会带领大家一步一步的操作并理解。

## 配置变量

- WeChat企业ID
  WECHAT_CORPID=①
- WeChat应用Secret
  WECHAT_APP_SECRET=②
- WeChat应用ID
  WECHAT_APP_ID=③
- WeChat代理服务器
  WECHAT_PROXY=④
- WeChat Token
  WECHAT_TOKEN=⑤
- WeChat EncodingAESKey
  WECHAT_ENCODING_AESKEY=⑥

### # WeChat企业ID

![image](https://i.darklotus.cn/images/2024/04/17/202404171642856.png)

### # WeChat应用Secret

![image-20240417214238365](https://i.darklotus.cn/images/2024/04/17/202404172142598.png)

![image-20240417214310388](https://i.darklotus.cn/images/2024/04/17/202404172143437.png)

贴心附上MP的LOGO:

![image](https://i.darklotus.cn/images/2024/04/17/202404171642941.webp)

![image](https://i.darklotus.cn/images/2024/04/17/202404171642924.png)

![image](https://i.darklotus.cn/images/2024/04/17/202404171642945.png)

### # WeChat应用ID

![image](https://i.darklotus.cn/images/2024/04/17/202404171642954.png)

### # WeChat代理服务器

免费微信代理地址：<https://wx.darklotus.cn/>

使用指南：<https://blog.darklotus.cn/tutorials/freewechatpush.html>

避免期间大家翻车 我把细节交代清楚 看下面截图 准确填入！！！

![image](https://i.darklotus.cn/images/2024/04/17/202404171642962.png)

ps：如果你是老版本 配置文件提示微信代理服务器最后面不需要添加 “/”  你都加不加都试一下嘛 这东西说不清楚
我参考网上教程看到别人是加上的 我也加上的 我没问题 不行都试试 这个是个排错点 参考起来

### WECHAT_TOKEN 跟 WeChat EncodingAESKey

![image](https://i.darklotus.cn/images/2024/04/17/202404171642212.png)

![image](https://i.darklotus.cn/images/2024/04/17/202404171642654.png)

## 注意事项

期间tg用户反馈 跟着我的教程使用 <http://ip:3000/api/v1/message/?token=moviepilot> 这个接口导致MP开机即死机 连日志都看不到
他的环境为：群晖6.2 Docker
在我的建议下 他使用官方提供的第二个接口地址就成功了 所以我之前的教程也明说了 未知bug我也不懂 这两换着来 不要纠结！

```url
http://ip:3000/api/v1/message/?token=moviepilot
```

```url
http://ip:3000/api/v1/message/
```

切记二选一！！！！

### 官方解释

![image](https://i.darklotus.cn/images/2024/04/17/202404171642987.png)

### 填写可信IP

```IP
148.135.46.230
```

![image](https://i.darklotus.cn/images/2024/04/17/202404171642079.png)

自此 教程结束 完成以上步骤基本没问题了

![image](https://i.darklotus.cn/images/2024/04/17/202404171642119.png)

![image](https://i.darklotus.cn/images/2024/04/17/202404171642187.png)

![image](https://i.darklotus.cn/images/2024/04/17/202404171642018.png)

MP系统版本参考：

![image](https://i.darklotus.cn/images/2024/04/17/202404171642253.png)

## 声明

此教程仅供学习参考！

截止到2024.2.1 我未更新系统 依旧有效 如有问题 及时反馈！
