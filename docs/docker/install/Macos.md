---
id: docker-install-macos # 唯一ID
slug: macos # URL(最多三级结构，便于seo 和理解，遵循doc/资源/具体说明项 的原则)
sidebar_position: 1  # 控制该文档在侧边栏的显示顺序
title: Macos
description: Windows 上安装 Docker # 描述
date: 2024-10-27
authors: lian
tags: [docker,macos]
keywords: [docke,macos]

---

在 macOS 上安装 Docker 的详细步骤如下：


## 系统要求

- macOS 10.14 或更高版本
- 支持硬件虚拟化

### 步骤 1: 下载 Docker Desktop

1. **访问 Docker 官方网站**：
   打开浏览器，访问 [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop) 页面。

2. **下载 Docker Desktop**：
   点击“Download for Mac”按钮，下载最新版本的 Docker Desktop 安装包（通常是 `.dmg` 文件）。

### 步骤 2: 安装 Docker Desktop

1. **打开下载的 `.dmg` 文件**：
   双击下载的 Docker Desktop `.dmg` 文件，打开安装程序。

2. **拖动 Docker 图标到应用程序文件夹**：
   在弹出的窗口中，将 Docker 图标拖动到“Applications”文件夹中。

3. **启动 Docker Desktop**：
   打开“Applications”文件夹，找到 Docker 图标，双击启动 Docker Desktop。

4. **授权 Docker**：
   第一次启动时，Docker 可能会请求您输入 macOS 的管理员密码以进行必要的系统配置。

### 步骤 3: 配置 Docker Desktop

1. **接受许可协议**：
   启动后，Docker Desktop 会显示许可协议，您需要接受该协议才能继续。

2. **选择使用的资源**：
   您可以在 Docker Desktop 的设置中配置 CPU、内存和磁盘等资源的使用情况。点击 Docker 图标，选择“Preferences”进行设置。

### 步骤 4: 验证安装

1. **打开终端**：
   您可以通过 Spotlight 搜索“Terminal”来打开终端。

2. **运行 Docker 版本命令**：
   在终端中输入以下命令以验证 Docker 是否安装成功：

   ```bash
   docker --version
   ```

   如果安装成功，您将看到 Docker 的版本信息。

3. **运行 Hello World 容器**：
   您可以运行一个简单的 Docker 容器来测试 Docker 是否正常工作：

   ```bash
   docker run hello-world
   ```

   如果一切正常，您将看到一条消息，说明 Docker 已成功安装并可以运行容器。

### 步骤 5: 更新 Docker Desktop

Docker Desktop 会定期发布更新，您可以在 Docker Desktop 的设置中检查更新并进行安装。

### 常见问题

- **Docker 启动失败**：如果 Docker Desktop 无法启动，请确保您的 macOS 版本符合 Docker 的系统要求，并检查是否有其他虚拟化软件（如 VirtualBox）正在运行。
- **性能问题**：您可以在 Docker Desktop 的设置中调整资源分配，以提高性能。
