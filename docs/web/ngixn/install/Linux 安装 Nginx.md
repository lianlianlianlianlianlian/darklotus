---
id: nginx-linux 
slug: linux 
sidebar_position: 1  
title: Linux 安装 Nginx
description: Linux 安装 Nginx
date: 2024-10-27
authors: lian
tags: [ngixn,linux]
keywords: [ngixn,linux]

---


## Linux 上安装 Nginx

1. **更新包管理器**:
   ```bash
   sudo apt update
   ```

2. **安装 Nginx**:
   - 对于基于 Debian 的系统（如 Ubuntu）：
     ```bash
     sudo apt install nginx
     ```
   - 对于基于 Red Hat 的系统（如 CentOS）：
     ```bash
     sudo yum install nginx
     ```

3. **启动 Nginx**:
   ```bash
   sudo systemctl start nginx
   ```

4. **设置开机自启**:
   ```bash
   sudo systemctl enable nginx
   ```

5. **访问 Nginx**:
   - 在浏览器中输入 `http://localhost`，如果看到 Nginx 欢迎页面，说明安装成功。

