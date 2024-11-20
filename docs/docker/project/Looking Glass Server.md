---
id: docker-lookingglassserver # 唯一ID
slug: lookingglassserver # URL(最多三级结构，便于seo 和理解，遵循doc/资源/具体说明项 的原则)
sidebar_position: 100  # 控制该文档在侧边栏的显示顺序
title: Docker 搭建 Looking Glass Server
description: Docker 搭建 Looking Glass Server # 描述
date: 2024-10-27
authors: lian
tags: [docker]
keywords: [docker]

---

## 演示图

![Looking Glass Server](../img/Looking-Glass-Server.webp)


## 自定义端口

-e HTTP_PORT=2333 \

2333修改成你想要设置的端口

运行命令即可

## 拉取镜像
```bash
docker pull wikihostinc/looking-glass-server
```

## 运行命令

```bash
docker run -d \
    --name looking-glass \
    -e HTTP_PORT=2333 \
    --restart always \
    --network host \
    wikihostinc/looking-glass-server
```