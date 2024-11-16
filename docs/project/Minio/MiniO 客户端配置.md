---
id: minio-client-setup
slug: setup
sidebar_position: 36
title: MinIO Client 配置
description: 介绍如何配置 MinIO 客户端工具
date: 2024-11-16
authors: lian
tags: 
  - MinIO
  - 客户端
  - 配置
keywords: 
  - MinIO
  - 客户端
  - 配置
---


### **配置 MinIO 客户端**

通过 `mc alias` 命令为你的 MinIO 服务添加别名。

#### 配置本地服务器

假设你的本地 MinIO 服务运行在 `http://localhost:9000`，配置命令如下：

```bash
mc alias set myminio http://localhost:9000 <ACCESS_KEY> <SECRET_KEY>
```

其中 ACCESS_KEY 跟 SECRET_KEY 可以替换成console的账号密码 

也就是环境变量里的MINIO_ROOT_USER和MINIO_ROOT_PASSWORD
#### 配置云服务器

假设你的云服务器 MinIO 地址为 `https://cloud.example.com`，配置如下：

```bash
mc alias set cloudminio https://cloud.example.com <ACCESS_KEY> <SECRET_KEY>
```

可以通过 `mc alias ls` 查看已配置的别名：

```bash
mc alias ls
```

输出示例：

```
myminio    http://localhost:9000
cloudminio https://cloud.example.com
```

