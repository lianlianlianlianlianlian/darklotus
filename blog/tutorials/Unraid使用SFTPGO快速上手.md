---
slug: sftogo
title: Unraid使用SFTPGO快速上手（Docker通用）
date: 2024-01-10 00:59
authors: lian
tags: [Unraid,Sftpgo]
keywords: [Unraid,Sftpgo,教程]
image: https://pic.imgdb.cn/item/64c2bacc1ddac507cc27082d.jpg
---

这篇文章我将带领大家快速上手Sftpgo！虽然是Unraid的教程，但Docker通用哦～

<!-- truncate -->

##  在 Unraid 上安装 SFTPGo

- 登录到 Unraid 的 Web 界面。

- 点击左侧导航栏中的 "Apps"（应用）选项。

- 在 "Apps" 页面上，您可以搜索并找到 "SFTPGO" 应用程序。点击进入安装界面。
  ![安装SFTPGO](https://i.darklotus.cn/images/2024/04/17/202404170522156.jpg)
- 参数全部默认就好
  ![参数全部默认就好](https://i.darklotus.cn/images/2024/04/17/202404170522753.jpg)
- 配置完成后，点击 "Add"（添加）按钮创建容器。

- Unraid 将会下载并配置 SFTPGo 容器。您可以在 Docker 管理界面的容器列表中看到新创建的容器。

- 启动 SFTPGo 容器，并等待一段时间，直到容器状态显示为 "Healthy"（正常）。

- 现在，您可以使用注册的管理员账号连接上SFTPGo的管理后台，进行参数配置。
  ![登录后台](https://i.darklotus.cn/images/2024/04/17/202404170522949.jpg)

---

##  SFTPGO映射文件夹

- 第一步肯定是映射文件夹啦
  ![映射文件夹](https://i.darklotus.cn/images/2024/04/17/202404170522291.jpg)

![映射文件夹](https://i.darklotus.cn/images/2024/04/17/202404170522603.jpg)

- 新手需要注意的地方 就在/unraid这里 熟悉docker的老手自然懂 un应用下载的sftpgo已经给你把- 参数配置好了直接抄就是了 其他例如群晖的nas用户就按照这个参数配置就好了 docker里自然是走的- 是容器路径 这个你想怎么改就怎么改 主机路径你改成你想要映射的那个盘或者阵列池就好
  ![映射文件夹](https://i.darklotus.cn/images/2024/04/17/202404170522751.jpg)

![映射文件夹](https://i.darklotus.cn/images/2024/04/17/202404170522787.jpg)

- 比如我的Music路径在unraid里的/mnt/user/Music里 在这个界面就填写/unraid/Music

- 其他文件映射你就在这个界面挨个添加就好了 添加完就完事了

- 当然了你如果...

>不需要部署到公网进行远程访问
>
>>不担心安全火葬场问题
>
>>>作为管理员内网自己用

你可以直接映射/mnt/user/里所有的共享文件夹 像我这样设置：
![unraid目录全映射](https://i.darklotus.cn/images/2024/04/17/202404170522905.jpg)

---

##  SFTPGO添加用户

![SFTPGO添加用户](https://i2.100024.xyz/2024/01/12/hcwjus.webp)

- 点击➕添加用户 设置用户名和密码 其他全部默认
  ![SFTPGO添加用户](https://i.darklotus.cn/images/2024/04/17/202404170522977.jpg)

ps:上面映射文件夹的时候说的不够严谨 设置用户这边的文件夹名字才是最终连上sftp文件夹显示的名字 都可以随便改的 我只是把大伙的想法都考虑到了 正常思维 肯定还是音乐对音乐 软件对软件 但我提一嘴是想告诉大家这个容器的灵活性 我描述可能有问题 你只需要知道 你主机路径设置对了 不管是创建容器共享文件夹映射主机时 容器的共享文件夹可以自定义 在用户里也可以自定义就行了！脑子转不过弯的 就别想太多！一一对应就好！

![设置权限](https://i.darklotus.cn/images/2024/04/17/202404170522136.jpg)

![设置权限](https://i.darklotus.cn/images/2024/04/17/202404170522954.jpg)

ps：上面说的list是只读的意思也不严谨。。。应该是读取文件列表的意思 说的时候站在自己的角度考虑了 当你赋予上传跟删除等权限时 就不是只读了 所以正确意思为读取列表权限 但对于我这样只需要只读效果的 就按照我这样设置就好~

---

##  公网端口转发实现外网访问

- 以上设置好了就可以点确认了
- SFTPGO这边的设置就完事了
- 接下来我们要去路由器里的端口转发 把内网ip+端口转发到外网
- 公网设置了ddns的 服务器地址肯定就是你的域名地址了~
- 我的sftp的端口设置的是2022（可以在容器里修改）
  ![路由器转发SFTPGO端口](https://i.darklotus.cn/images/2024/04/17/202404170522052.jpg)

- Windows这边我们用RaiDrive这个免费软件即可远程连接上Sftp服务器即可访问其中的文件夹

- 以上就是我实现目的的经验 如果有疑问评论区提问就好

- 忽略的很多细节 可以下面的大佬 直接把原理都研究出来了 我不想知道原理 多得也无需了解 我只需要满足我自己的需求就好了。

参考文章：

https://zhuanlan.zhihu.com/p/570104861

https://post.smzdm.com/p/a60gd28g/