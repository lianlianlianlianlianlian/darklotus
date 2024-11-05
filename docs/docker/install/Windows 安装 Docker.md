---
id: windows-install-docker
slug: windows
sidebar_position: 26
title: Windows 安装 Docker
description: 介绍如何在 Windows 系统上安装 Docker 的步骤
date: 2024-11-04
authors: lian
tags: 
  - Windows
  - Docker
keywords: 
  - Windows
  - 安装
  - Docker
---


Windows 上安装 Docker

### 1.1 系统要求

- Windows 10 64-bit: Pro, Enterprise, or Education (Build 15063 or later)
- 启用 Hyper-V 和容器功能

### 1.2 安装步骤

1. **下载 Docker Desktop**
   - 访问 [Docker 官网](https://www.docker.com/products/docker-desktop)。
   - 点击“Download for Windows”按钮下载 Docker Desktop 安装程序。

2. **运行安装程序**
   - 双击下载的 `.exe` 文件。
   - 在安装向导中，选择“使用 WSL 2 作为后端”选项（推荐）。
   - 点击“Install”开始安装。

3. **启动 Docker Desktop**
   - 安装完成后，启动 Docker Desktop。
   - 根据提示完成初始设置。

4. **验证安装**
   - 打开命令提示符或 PowerShell，输入以下命令：
     ```bash
     docker --version
     ```
   - 如果显示 Docker 的版本号，则安装成功。

