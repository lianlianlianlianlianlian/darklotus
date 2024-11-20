---
id: docker-emby
slug: emby 
sidebar_position: 100  
title: Docker 部署 Emby
description: Docker 部署 Emby
date: 2024-10-27
authors: lian
tags: [docker]
keywords: [docker]

---


Docker 部署 Emby 服务器的步骤如下：

### 前提条件

在开始安装 Emby 之前，确保你的系统已经安装了 Docker。如果尚未安装，可以根据你的操作系统类型（如 Ubuntu、CentOS、MacOS 等），在 Docker 官方网站（https://docs.docker.com/engine/install/） 
找到相应的安装指南进行安装。

在 Docker 中部署 Emby 服务器相对简单。以下是一个基本的步骤指南，可以帮助你快速设置 Emby：


### 拉取镜像
打开终端或命令提示符，运行以下命令以拉取最新的 Emby Server 镜像：

```bash
docker pull emby/embyserver
```

### 创建 Emby 数据目录

为了持久化数据，你需要为 Emby 创建一个目录。例如，在 Linux 上可以使用以下命令：

```bash
mkdir -p ~/emby/config
mkdir -p ~/emby/media
```

### 运行 Emby 容器

运行以下命令来启动 Emby Server 容器。请根据你的需求修改路径和端口号。

```bash
docker run -d \
  --name=emby \
  -p 8096:8096 \
  -p 8920:8920 \
  -v ~/emby/config:/config \
  -v ~/emby/media:/mnt/media \
  --restart unless-stopped \
  emby/embyserver
```

### 参数说明

- `-d`: 后台运行容器。
- `--name=emby`: 给容器指定一个名称。
- `-p 8096:8096`: 将主机的 8096 端口映射到容器的 8096 端口（HTTP）。
- `-p 8920:8920`: 将主机的 8920 端口映射到容器的 8920 端口（HTTPS）。
- `-v ~/emby/config:/config`: 持久化配置文件。
- `-v ~/emby/media:/mnt/media`: 持久化媒体文件。
- `--restart unless-stopped`: 确保容器在 Docker 重启时自动重启。

### 步骤 5：访问 Emby

在浏览器中访问 `http://<你的服务器IP>:8096`，你应该能够看到 Emby 的设置界面。

### 步骤 6：完成设置

按照界面上的提示完成初始设置，包括添加媒体库等。

### 注意事项

- 确保你的防火墙允许通过 8096 和 8920 端口的流量。
- 根据需要调整 Docker 运行参数，例如 CPU 和内存限制。

