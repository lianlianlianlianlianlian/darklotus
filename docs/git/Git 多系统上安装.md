---
id: git-install # 唯一ID
slug: install # URL(最多三级结构，便于seo 和理解，遵循doc/资源/具体说明项 的原则)
sidebar_position: 1  # 控制该文档在侧边栏的显示顺序
title: Git 多系统上安装
description: Git 多系统上安装# 描述
date: 2024-10-27
authors: lian
tags: [git, github]
keywords: [git, github]

---

在不同操作系统上安装 Git 的方法如下：

### macOS

1. **使用 Homebrew 安装**（推荐）：
   - 如果你还没有安装 Homebrew，可以在终端中运行以下命令：
     ```bash
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
     ```
   - 安装 Git：
     ```bash
     brew install git
     ```

2. **使用 Xcode Command Line Tools**：
   - 打开终端，运行：
     ```bash
     xcode-select --install
     ```
   - 这将安装 Xcode Command Line Tools，其中包含 Git。

3. **从 Git 官网下载**：
   - 访问 [Git 官网](https://git-scm.com/download/mac) 下载 macOS 安装包并按照提示安装。

### Linux

在 Linux 上，安装 Git 的方法取决于你使用的发行版：

1. **Debian/Ubuntu**：
   ```bash
   sudo apt update
   sudo apt install git
   ```

2. **Fedora**：
   ```bash
   sudo dnf install git
   ```

3. **CentOS/RHEL**：
   ```bash
   sudo yum install git
   ```

4. **Arch Linux**：
   ```bash
   sudo pacman -S git
   ```

### Windows

1. **使用 Git for Windows 安装程序**：
   - 访问 [Git for Windows 官网](https://gitforwindows.org/) 下载最新的安装程序。
   - 运行下载的 `.exe` 文件，按照安装向导的提示进行安装。

2. **使用 Windows Package Manager (winget)**：
   - 如果你已经安装了 Windows Package Manager，可以在 PowerShell 中运行：
     ```powershell
     winget install --id Git.Git -e --source winget
     ```

3. **使用 Chocolatey**（如果你已经安装了 Chocolatey）：
   - 在管理员模式下的命令提示符中运行：
     ```bash
     choco install git
     ```

### 验证安装

无论在哪个操作系统上安装 Git，安装完成后，你可以通过以下命令验证 Git 是否成功安装：

```bash
git --version
```

这将显示已安装的 Git 版本号。