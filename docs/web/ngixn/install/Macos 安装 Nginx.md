---
id: nginx-macos # 唯一ID
slug: macos # URL(最多三级结构，便于seo 和理解，遵循doc/资源/具体说明项 的原则)
sidebar_position: 1  # 控制该文档在侧边栏的显示顺序
title: Macos 安装 Nginx
description: Macos 安装 Nginx # 描述
date: 2024-10-27
authors: lian
tags: [ngixn,mac]
keywords: [ngixn,mac]

---


## macOS 上安装 Nginx

1. **使用 Homebrew 安装**:
   - 如果没有安装 Homebrew，可以先安装 Homebrew：
     ```bash
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
     ```

2. **安装 Nginx**:
   ```bash
   brew install nginx
   ```

3. **启动 Nginx**:
   ```bash
   brew services start nginx
   ```

4. **访问 Nginx**:
   - 在浏览器中输入 `http://localhost:8080`，如果看到 Nginx 欢迎页面，说明安装成功。

## 默认安装目录

在 macOS 中，默认情况下，Homebrew 会将 Nginx 安装在 `/usr/local/Cellar/nginx/` 目录下，而其配置文件和文档根目录分别位于 `/usr/local/etc/nginx/` 和 `/usr/local/var/www/`。如果你想打开这些文件夹，可以按照以下步骤进行：

### 通过终端打开文件夹

1. **打开终端**：
   - 可以通过 Spotlight（按下 Command + Space，然后输入 "Terminal"）找到并打开终端。

2. **打开 Nginx 配置文件夹**：
   在终端中输入以下命令并按 Enter：
   ```bash
   open /usr/local/etc/nginx/
   ```

3. **打开 Nginx 文档根目录**：
   在终端中输入以下命令并按 Enter：
   ```bash
   open /usr/local/var/www/
   ```

### 通过 Finder 打开文件夹

1. **打开 Finder**。
2. **在菜单栏中选择 “前往” > “前往文件夹...”**。
3. **输入路径**：
   - 对于 Nginx 配置文件夹，输入 `/usr/local/etc/nginx/`。
   - 对于文档根目录，输入 `/usr/local/var/www/`。
4. **点击 “前往”**，你将会看到相应的文件夹。

### 注意事项

- 如果你在使用 macOS 的新版本，可能需要在系统偏好设置中允许终端或其他应用程序访问这些文件夹。
- 确保你有适当的权限来查看和编辑这些文件夹中的内容。