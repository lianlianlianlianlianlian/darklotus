---
id: docker-lookingglassserver # 唯一ID
slug: lookingglassserver # URL(最多三级结构，便于seo 和理解，遵循doc/资源/具体说明项 的原则)
sidebar_position: 100  # 控制该文档在侧边栏的显示顺序
title: Docker快速搭建Looking Glass Server
description: Docker快速搭建Looking Glass Server # 描述
date: 2024-10-27
authors: lian
tags: [docker, 快速安装]
keywords: [docker, 快速安装]

---

## 演示图

![Looking Glass Server](https://i.darklotus.cn/images/2024/05/02/Looking-Glass-Server.png)

## 自定义端口

-e HTTP_PORT=2333 \

2333修改成你想要设置的端口

运行命令即可

## 运行命令

```bash
docker run -d \
    --name looking-glass \
    -e HTTP_PORT=2333 \
    --restart always \
    --network host \
    wikihostinc/looking-glass-server
```