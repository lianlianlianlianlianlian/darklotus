---
slug: hypervzhitong
title: Hyperv直通代码及简单教程
date: 2024-07-30 20:43
authors: lian
tags: [Windows,HyperV]
keywords: [Windows,HyperV,教程]
image: https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2022/01/enable-hyper-v-windows-11.jpg
---

Hyperv直通代码及简单教程

<!-- truncate -->

原本只是记录下来供自己参考 所以没有把问题说明白

直通系统：windows server 2025

经过朋友提醒 dda直通好像只能用server的系统 我属于歪打正着成功了。。所以回来在此提醒一下 如果看不懂还请百度搜完整教程
我这个完全是缩写版的教程 因为我觉得hyperv对比esxi pve的直通 算简单的了

以nvme驱动器为参考
## 直通关键代码

Power Shelll 管理员模式执行下面代码 下线设备跟分配虚拟机都没报错就对了
如果报错 就是你没去禁用存储控制器 最好把存储控制器跟硬盘驱动器一起禁用了 再来执行下面的代码
我遇到过一次需要重新启动才生效的。。。

### 下线设备

```bash
Dismount-VMHostAssignableDevice -Force -LocationPath "位置路径"
```

### 将下线后的设备分配给虚拟机

```bash
Add-VMAssignableDevice -VMName "虚拟机名称" -LocationPath "位置路径"
```


### 查看设备

```bash
Get-VMAssignableDevice -VMName "虚拟机名称"
```

禁用不禁用都没事 主要是我直通的时候报错了 所以我自己排错的时候禁用后成功了而已 不要纠结为什么右键驱动器有些有禁用有些没有！！！

![202410180411182.png](https://oss.darklotus.cn/img/2024/10/18/202410180411182.png)

执行了未报错 就代表直通成功了 直接就可以开虚拟机用起来了 其他硬件设备直通 一个道理 