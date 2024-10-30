---
id: nginx-windows # 唯一ID
slug: windows # URL(最多三级结构，便于seo 和理解，遵循doc/资源/具体说明项 的原则)
sidebar_position: 1  # 控制该文档在侧边栏的显示顺序
title: Windows 安装 Nginx
description: Windows 安装 Nginx # 描述
date: 2024-10-27
authors: lian
tags: [ngixn,windows]
keywords: [ngixn,windows]

---



## Windows 上安装 Nginx

1. **下载 Nginx**:
   - 访问 [Nginx 官方网站](https://nginx.org/en/download.html) 下载 Windows 版本的 Nginx。

2. **解压文件**:
   - 将下载的压缩文件解压到你希望安装 Nginx 的目录，例如 `C:\nginx`。

3. **启动 Nginx**:
   - 打开命令提示符（cmd），导航到 Nginx 的安装目录：
     ```cmd
     cd C:\nginx
     ```
   - 运行以下命令启动 Nginx：
     ```cmd
     start nginx
     ```

4. **访问 Nginx**:
   - 在浏览器中输入 `http://localhost`，如果看到 Nginx 欢迎页面，说明安装成功。

