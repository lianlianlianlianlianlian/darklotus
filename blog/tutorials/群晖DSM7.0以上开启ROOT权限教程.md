---
slug: qunhuiroot
title: 群晖DSM7.0以上开启ROOT权限教程
date: 2024-08-02 10:05
authors: lian
tags: [Synology,Nas]
keywords: [Synology,Nas,教程]
image: https://docs.unity3d.com/cn/2022.1/uploads/Main/ScriptingIntroPic.jpg

---

不想每次崩了重装都网上搜 自己简化一下操作 

<!-- truncate -->



1. 登录群晖 控制面板 终端机和SNMP 勾选启动ssh功能

2. 打开ssh工具 连接群晖

3. 输入群晖账号密码

   ```
   sudo -i
   ```

4. 输入以下命令

   ```
   vi /etc/ssh/sshd_config
   ```

   

5. i键进入编辑模式 找到图片这个位置

   ![直接粘贴到这个地方][1]


[1]: https://i.darklotus.cn/2024/gjksmb.webp

6. 粘贴以下命令

   ```
   PermitRootLogin yes
   ```

   

7. 按键盘的ESC按键 输入

   ```
   wq:
   ```

   保存退出

   

8. 继续输入以下命令 后面的xxxxx更换成你自己的密码

   ```
   synouser --setpw root xxxxxx
   
   ```

9. 重启群晖

   ```
   reboot
   ```

   