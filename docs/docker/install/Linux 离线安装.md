---
id: docker-install-linuxlixian # 唯一ID
slug: linuxlixian # URL(最多三级结构，便于seo 和理解，遵循doc/资源/具体说明项 的原则)
sidebar_position: 200  # 控制该文档在侧边栏的显示顺序
title: Linux 离线安装
description: Linux 离线安装 Docker # 描述
date: 2024-10-27
authors: lian
tags: [docker,linux]
keywords: [docker.linux]

---

在 Linux 系统上离线安装 Docker 通常涉及下载 Docker 的安装包和依赖项，然后在没有互联网连接的环境中进行安装。以下是一个详细的步骤指南，适用于大多数 Linux 发行版（如 Ubuntu、CentOS 等）。

### 步骤 1: 下载 Docker 安装包

1. **在有互联网连接的机器上**，访问 Docker 的官方网站或使用以下命令下载 Docker 的安装包。
2. 您可以在 [Docker GitHub Releases](https://github.com/docker/docker-ce/releases) 页面上找到最新版本。

   对于 **Ubuntu**:
   ```bash
   wget https://download.docker.com/linux/static/stable/x86_64/docker-<VERSION>.tgz
   ```

   对于 **CentOS**:
   ```bash
   wget https://download.docker.com/linux/static/stable/x86_64/docker-<VERSION>.tgz
   ```

   请将 `<VERSION>` 替换为您需要的 Docker 版本号，例如 `20.10.7`。

3. **解压下载的文件**:
   ```bash
   tar xzvf docker-<VERSION>.tgz
   ```

4. **将 Docker 二进制文件移动到系统路径**:
   ```bash
   sudo cp docker/* /usr/bin/
   ```

### 步骤 2: 下载 Docker 依赖项

Docker 可能需要一些依赖项，您可以在有互联网连接的机器上使用以下命令下载这些依赖项。

对于 **Ubuntu**:
```bash
sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
```

对于 **CentOS**:
```bash
sudo yum install -y \
    yum-utils \
    device-mapper-persistent-data \
    lvm2
```

您可以使用 `dpkg` 或 `rpm` 命令下载这些依赖项的 `.deb` 或 `.rpm` 文件，并将它们复制到离线机器上进行安装。

### 步骤 3: 在离线机器上安装 Docker

1. **将下载的 Docker 安装包和依赖项复制到离线机器**。

2. **在离线机器上安装依赖项**:
   对于 **Ubuntu**:
   ```bash
   sudo dpkg -i <依赖项文件名>.deb
   ```

   对于 **CentOS**:
   ```bash
   sudo rpm -ivh <依赖项文件名>.rpm
   ```

3. **安装 Docker**:
   ```bash
   sudo cp docker/* /usr/bin/
   ```

### 步骤 4: 启动 Docker 服务

1. **启动 Docker**:
   ```bash
   sudo systemctl start docker
   ```

2. **设置 Docker 开机自启**:
   ```bash
   sudo systemctl enable docker
   ```

3. **验证 Docker 是否安装成功**:
   ```bash
   docker --version
   ```

### 注意事项

- 确保您下载的 Docker 版本与您的 Linux 发行版兼容。
- 如果您在安装过程中遇到依赖项问题，您可能需要手动下载并安装缺失的依赖项。
- 在某些情况下，您可能需要配置 Docker 的用户组，以便非 root 用户可以运行 Docker 命令。