**BiliLiveGo** 是一个支持直播流转发和录制的开源项目，通常用于 B站直播录制或推流到其他平台。使用 Docker 安装和运行 BiliLiveGo 是一个简便的方式。以下是具体安装方法：  

---

### **1. 环境准备**
确保系统已安装 Docker 和 Docker Compose：
- 安装 Docker：[Docker 官方文档](https://docs.docker.com/get-docker/)。
- 如果需要 Docker Compose，[安装指南](https://docs.docker.com/compose/install/)。

---

### **2. 拉取 BiliLiveGo 镜像**
在终端中运行以下命令：
```bash
docker pull yangsijia/bililive-go:latest
```

---

### **3. 配置 BiliLiveGo**
BiliLiveGo 使用配置文件管理，你需要准备一个 `config.yml` 文件来定义工作参数。

#### **示例配置文件（config.yml）：**
```yaml
# 监听地址和端口
server:
  addr: ":8080" 

# 日志设置
logger:
  level: "info" 

# 任务列表
tasks:
  - room_id: 123456 # B站直播间 ID
    record: true   # 是否录制直播
    output: /data  # 存储录制文件的路径
    danmaku: true  # 是否保存弹幕
```

---

### **4. 运行容器**
运行容器时挂载配置文件和录制存储目录：
```bash
docker run -d \
  --name bililivego \
  -p 8080:8080 \
  -v $(pwd)/config.yml:/app/config.yml \
  -v $(pwd)/data:/app/data \
  yangsijia/bililive-go:latest
```

#### 参数说明：
- `-p 8080:8080`：将容器的 8080 端口映射到主机。
- `-v $(pwd)/config.yml:/app/config.yml`：将当前目录下的 `config.yml` 文件挂载到容器。
- `-v $(pwd)/data:/app/data`：将录制文件保存到主机的 `data` 目录。

---

### **5. 查看运行状态**
检查容器运行状态：
```bash
docker ps
```
如果容器运行正常，访问 `http://localhost:8080` 可以查看 BiliLiveGo 的 Web 界面（如果配置了服务端界面）。

---

### **6. 日志查看**
实时查看容器日志以调试：
```bash
docker logs -f bililivego
```

---

### **7. 停止与删除容器**
- 停止容器：
  ```bash
  docker stop bililivego
  ```
- 删除容器：
  ```bash
  docker rm bililivego
  ```

---

### **8. 使用 Docker Compose 管理（可选）**
如果有多个配置任务，可以使用 `docker-compose.yml` 管理。

#### **示例 `docker-compose.yml` 文件：**
```yaml
version: '3.8'
services:
  bililivego:
    image: yangsijia/bililive-go:latest
    container_name: bililivego
    ports:
      - "8080:8080"
    volumes:
      - ./config.yml:/app/config.yml
      - ./data:/app/data
    restart: unless-stopped
```

运行 Docker Compose：
```bash
docker-compose up -d
```

---

### **更多配置**
BiliLiveGo 支持的功能较多（如推流到其他平台、弹幕收集），你可以根据项目的 [官方文档](https://github.com/sundayfun/bililive-go) 或配置文件说明进一步自定义。