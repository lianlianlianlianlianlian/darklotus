---
slug: dsmdockerminio
title: 群晖NAS Docker命令部署Minio 解决闪退问题
date: 2024-09-20 05:28
authors: lian
tags: [Synology,Nas,Docker,Minio]
keywords: [Synology,Nas,Docker,Minio,教程]
image: https://ts1.cn.mm.bing.net/th/id/R-C.df6070e7f9867d103c0051bd8a3a5109?rik=NW%2f9mdowN6LtZQ&riu=http%3a%2f%2fdevopshub.cn%2fwp-content%2fuploads%2f2016%2f07%2fdocker-logo.png&ehk=6b6lMd8pD60BnZejGC06xcVPXvbZaqGptnCJrkR43fk%3d&risl=&pid=ImgRaw&r=0


---

真是服了 网上一大堆教程都有问题 手动创建明明设置 哪儿哪儿都对 但就是一直开机就闪退 最终在这位大佬的博客看到 用计划命令创建的方式解决了问题

<!-- truncate -->



原文地址：https://wp.gxnas.com/14001.html

官方文档：https://min.io/docs/minio/linux/reference/minio-mc.html

多的我就不说了 不懂直接去看原博主的教程 最终对比发现 配置文件压根就无需映射
直接映射data目录就行了 端口啥的可以自行修改 无需一样

![image](https://i.darklotus.cn/2024/8ph9pt.webp)


执行命令改为下面的 网上排在前面的那些教程都是失效了的 日志报错也说那不是minio的命令
```bash
server /data --console-address :9090
```

计划任务命令创建如下：

```dockerfile
docker run \
-p 9000:9000 \
-p 9090:9090 \
--name minio \
-v /volume1/docker/Minio:/data \
-e "MINIO_ROOT_USER=admin" \
-e "MINIO_ROOT_PASSWORD=密码不少于八位数" \
minio/minio server /data --console-address ":9090"
```



可能用到的环境变量：

MINIO_SERVER_URL

MINIO_BROWSER_REDIRECT_URL