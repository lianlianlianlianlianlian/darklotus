---
slug: cheveretozidongshanchu
title: Chevereto开启上传的照片自动删除
date: 2024-04-19 00:00
authors: lian
tags: [Chevereto,图床,脚本]
keywords: [教程]
image: https://chevereto.com/src/img/screens/version/4.0/user-listing-selected.webp
---

网上翻遍了教程 连官方文档都扒了 硬是没找到解决办法 我直接上干货 我的解决办法也不知道是从哪儿问到的了 我怕忘记 所以直接发计划任务的命令 

<!-- truncate -->

## 计划任务脚本命令

```
sudo -u www php /www/wwwroot/i.darklotus.cn/app/legacy/entrypoints/cli.php -C cron
```

/www/wwwroot/i.darklotus.cn/app/legacy/entrypoints/cli.php

换成你自己的chevereto v4程序的cli.php的路径

![image-20240419012024824](https://i.darklotus.cn/images/2024/04/19/202404190120907.png)

宝塔计划任务里添加一个shell脚本 设置1分钟执行一次就完事了



![image-20240419012254056](https://i.darklotus.cn/images/2024/04/19/202404190122122.png)

## 执行脚本并测试

执行一次 查看日志显示Successful就代表成功了 然后自己去随便上传一张图片 设置5分钟后删除 等五分钟去看照片是不是自动删除了



![image-20240419012430160](https://i.darklotus.cn/images/2024/04/19/202404190124227.png)



同时在仪表盘里也可以看到 但这个我觉得不准 之前也遇到过他这依旧提示报错 但上传的图片依旧自动删除了的 只是做个参考 能自动删除照片就不管他