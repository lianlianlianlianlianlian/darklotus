# DDNS-Go 使用指南

本指南将指导您如何使用 Docker 拉取并运行 DDNS-Go。

## 1. 拉取镜像

首先，您需要在终端运行以下命令以拉取最新的 DDNS-Go 镜像：

```bash
docker pull jeessy/ddns-go
```

此命令将从 Docker Hub 下载 DDNS-Go 镜像。

## 2. 创建容器

下载完成后，您可以通过以下命令创建并启动 DDNS-Go 容器：

```bash
docker run -d --name ddns-go --restart=always --net=host -v /opt/ddns-go:/root jeessy/ddns-go
```

### 参数说明：

- `-d`：在后台运行容器。
- `--name ddns-go`：为创建的容器指定一个名称。
- `--restart=always`：确保容器在退出后自动重启。
- `--net=host`：使用主机的网络模式。
- `-v /opt/ddns-go:/root`：将主机的 `/opt/ddns-go` 目录挂载到容器的 `/root` 目录。

## 3. 访问 DDNS-Go

容器启动后，您可以通过浏览器访问 DDNS-Go 的 Web 界面。默认情况下，DDNS-Go 在端口 9876 上运行。请在浏览器中输入以下地址：

```
http://<your-ip>:9876
```

将 `<your-ip>` 替换为您的主机 IP 地址。

## 4. 配置文件

您可以在 `/opt/ddns-go` 目录中找到 DDNS-Go 的配置文件。根据您的需求进行编辑，并确保在修改后重启容器：

```bash
docker restart ddns-go
```

## 5. 管理容器

以下是一些常用的 Docker 命令，用于管理 DDNS-Go 容器：

- 查看正在运行的容器：

   ```bash
   docker ps
   ```

- 停止容器：

   ```bash
   docker stop ddns-go
   ```

- 启动容器：

   ```bash
   docker start ddns-go
   ```

- 查看容器日志：

   ```bash
   docker logs ddns-go
   ```

## 结论

通过上述步骤，您已成功使用 Docker 拉取并运行 DDNS-Go。根据需要配置相关设置，以满足您的动态 DNS 需求。如需更多信息，请参考 [DDNS-Go 官方文档](https://github.com/jeessy/ddns-go)。