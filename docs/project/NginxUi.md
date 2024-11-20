

## Nginx UI 使用指南

## 引言

Nginx 是一款广受欢迎的 Web 服务器，作为后端程序员，我们经常需要手动编辑 Nginx 配置文件。最近，我发现了一款名为 Nginx UI 的可视化管理工具，它极大地简化了这一过程。本指南将以我的电商实战项目“Mall”为例，介绍 Nginx UI 的使用。

## Nginx UI 简介

Nginx UI 是一款全新的 Nginx 可视化管理工具，旨在简化 Nginx 服务器的管理和配置，目前在 GitHub 上已有 4.4k+ Stars。

### 主要功能

- **服务器指标监控**：实时监控 CPU、内存、平均负载和磁盘使用情况。
- **证书管理**：一键部署和自动续期 SSL 证书。
- **配置管理**：在线编辑 Nginx 配置，支持代码高亮显示。
- **日志管理**：在线查看 Nginx 日志。
- **主题模式**：提供暗黑和浅色两种主题模式。
- **用户管理**：支持用户登录认证和管理。

## 安装

使用 Docker 安装 Nginx UI 非常方便。以下是安装步骤：

1. 下载 Nginx UI 的 Docker 镜像：
   ```bash
   docker pull uozi/nginx-ui:latest
   ```

2. 启动 nginx-ui 容器：
   ```bash
   docker run -p 80:80 -p 443:443 --name=nginx-ui \
   --restart=always \
   -v /mydata/nginx-ui/ngetc:/etc/nginx \
   -v /mydata/nginx-ui/uietc:/etc/nginx-ui \
   -v /mydata/nginx-ui/www:/var/www \
   -e TZ=Asia/Shanghai \
   -dit uozi/nginx-ui:latest
   ```

启动成功后，可以通过浏览器访问 Nginx UI，首次访问需要注册账号，访问路径：http://192.168.3.101。

## 使用示例

### 项目简介

“Mall”项目是基于 SpringBoot3 + Vue 的电商系统，后端支持多模块和最新的微服务架构，采用 Docker 和 K8S 部署，包括前台商城和后台管理系统，支持完整的订单流程，涵盖商品、订单、购物车等功能。

- **项目地址**：
  - [Boot 项目](https://github.com/macrozheng/mall)
  - [Cloud 项目](https://github.com/macrozheng/mall-swarm)
  - [教程网站](https://www.macrozheng.com)

### 仪表盘

登录后，可以访问 Nginx UI 的仪表盘，查看服务器的各种指标信息，如 CPU、网络和磁盘 IO 等。

### 静态代理

以 mall 项目的后台管理系统为例：

1. 修改本机的 Hosts 文件，将 Nginx UI 服务器地址设为 192.168.3.101：
   ```
   192.168.3.101 mall.macrozheng.com
   ```

2. 添加站点信息并配置 Location：
   ```nginx
   location /admin {
       alias  /var/www/admin;
       index  index.html index.htm;
   }
   ```

3. 将 mall-admin-web 的打包代码上传至 `/mydata/nginx-ui/www` 目录并解压，即可访问后台管理系统：http://mall.macrozheng.com/admin/

4. 对于前台商城系统 mall-app-web，添加另一个 Location：
   ```nginx
   location /app {
       alias  /var/www/app;
       index  index.html index.htm;
   }
   ```

5. 上传 mall-app-web 的代码并解压后，访问地址为：http://mall.macrozheng.com/app/

### 动态代理

以 mall 项目的后端 API 为例：

1. 修改 Hosts 文件：
   ```
   192.168.3.101 api.macrozheng.com
   ```

2. 添加站点并配置动态代理：
   ```nginx
   location / {
       proxy_pass   https://admin-api.macrozheng.com; # 修改为代理服务地址
       index  index.html index.htm;
   }
   ```

访问地址：http://api.macrozheng.com/swagger-ui/

### 其他功能

- **配置管理**：方便地修改 Nginx 配置，无需登录服务器。
- **证书管理**：一键部署和自动续期 SSL 证书。
- **用户管理**：管理 Nginx UI 用户。
- **主题切换**：支持在暗黑主题和默认主题之间切换。

## 总结

今天我们体验了 Nginx UI 的基本使用，它解决了手动编辑 Nginx 配置的烦恼，同时提供了多种便捷功能。感兴趣的小伙伴可以尝试一下！

- **项目地址**：[Nginx UI GitHub](https://github.com/0xJacky/nginx-ui)

