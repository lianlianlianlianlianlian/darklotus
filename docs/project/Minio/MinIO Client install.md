---
id: minio-client-install
slug: client
sidebar_position: 35
title: MinIO Client 安装
description: 介绍如何安装 MinIO Client 工具
date: 2024-11-16
authors: lian
tags: 
  - MinIO
  - 安装
  - 客户端
keywords: 
  - MinIO
  - 客户端
  - 安装
---



要在不同操作系统上安装 MinIO Client（`mc`），你可以按照以下步骤进行操作。`mc` 工具支持多种操作系统，包括 Linux、macOS 和 Windows。

### 在 Linux 上安装 `mc`

#### 使用 `curl` 命令

```bash
curl -O https://dl.min.io/client/mc/release/linux-amd64/mc
chmod +x mc
sudo mv mc /usr/local/bin/
```

#### 使用 `wget` 命令

```bash
wget https://dl.min.io/client/mc/release/linux-amd64/mc
chmod +x mc
sudo mv mc /usr/local/bin/
```

### 在 macOS 上安装 `mc`

#### 使用 `brew`
有可能安装失败 如果失败建议二进制安装

如果你使用 Homebrew，可以通过以下命令安装：

```bash
brew install minio/stable/mc
```

#### 手动安装

你也可以手动下载并安装：

```bash
curl -O https://dl.min.io/client/mc/release/darwin-amd64/mc
chmod +x mc
sudo mv mc /usr/local/bin/
```

### 在 Windows 上安装 `mc`

#### 使用 PowerShell

打开 PowerShell，并运行以下命令：

```powershell
Invoke-WebRequest https://dl.min.io/client/mc/release/windows-amd64/mc.exe -OutFile mc.exe
Move-Item mc.exe C:\Windows\System32\
```

#### 手动下载安装

1. 从 [MinIO 官方下载页面](https://min.io/download#/minio-client) 下载 Windows 版本的 `mc.exe`。
2. 将下载的 `mc.exe` 移动到一个路径中，例如 `C:\Program Files\` 或 `C:\Windows\System32\`，以便可以在命令行中直接使用。

### 验证安装

安装完成后，你可以通过以下命令验证 `mc` 是否安装成功：

```bash
mc --version
```

这条命令将显示 `mc` 的版本信息。

