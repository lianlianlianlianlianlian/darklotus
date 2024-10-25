---
slug: unraidhexian
title: Unraid 开启核显 给Emby硬解 快速教程
date: 2024-01-10 00:59
authors: lian
tags: [Unraid]
keywords: [教程]
image: https://i.darklotus.cn/images/2024/04/17/202404171651264.jpg
---

我的大部分教程都是自己在网上学的 然后再结合自己的理解 精简掉繁琐难懂的过程 直接达成目的！

<!-- truncate -->

## 第一种方法

### 开启核显

```bash
modprobe i915
```

![打开ssh 输入开启核显命令](https://i.darklotus.cn/images/2024/04/17/202404171651740.jpg)

### 检查核显开启状态

```bash
ls /dev/dri
```

### 成功驱动核显

![显示箭头所示即代表开启成功](https://i.darklotus.cn/images/2024/04/17/202404171651011.jpg)

### 设置开机启动项

```bash
cd /boot/config
vi go
```

键盘输入 i 复制粘贴添加以下命令

```bash
modprobe i915
chmod -R 777 /dev/dri
chown -R nobody:users /dev/dri
```

![键盘输入 i 复制粘贴添加以下命令](https://i.darklotus.cn/images/2024/04/17/202404171651219.jpg)

esc键退出

直接输入“:wq”

## 第二种方法

### 打开u盘引导“Flash”的SMB共享

我们直接在 windows 上修改！

![打开unraid界面里的Flash引导设备](https://i.darklotus.cn/images/2024/04/17/202404171651693.jpg)

![设置如图](https://i.darklotus.cn/images/2024/04/17/202404171651043.jpg)

### 打开路径：flash—config—go“

用记事本打开

![打开路径：flash—config—go“](https://i.darklotus.cn/images/2024/04/17/202404171651313.jpg)

![打开路径：flash—config—go“](https://i.darklotus.cn/images/2024/04/17/202404171651099.jpg)

### 复制粘贴开启开机自启的核显代码

```bash
modprobe i915
chmod -R 777 /dev/dri
chown -R nobody:users /dev/dri
```

这样你每次开机核显都会开启了

### 给Emby Jellyfin Plex docker添加核显设备

在流媒体软件的docker编辑页面添加设备

```bash
/dev/dri
```

![在流媒体软件的docker编辑页面添加设备](https://i.darklotus.cn/images/2024/04/17/202404171651332.jpg)

![在流媒体软件的docker编辑页面添加设备](https://i.darklotus.cn/images/2024/04/17/202404171651441.jpg)

打开

> 在流媒体软件的转码里即可看到设备已经添加成功

![核显设备已出现](https://i.darklotus.cn/images/2024/04/17/202404171651264.jpg)

教程结束。
