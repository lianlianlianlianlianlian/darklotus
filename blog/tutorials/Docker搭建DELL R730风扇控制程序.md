---
slug: dellfancontroldocker
title: Docker搭建DELL R730风扇控制程序
date: 2024-09-27 08:36
authors: lian
tags: [Server,Docker]
keywords: [Server,Docker,教程]
image: https://pic.vjshi.com/2020-05-31/6aa830ca2ed8378f8c35ef34e0de668e/online/main.jpg?x-oss-process=style/video_cover_20231101
---

原本想自己写一个 没想到已经有大佬做好发布到dockerhub了 还把环境变量写得清清楚楚 一次成功 所以我就直接分享啦


<!-- truncate -->

对比脚本按照时间自动调速 这个是根据温度调速 个人觉得 只适用于春秋冬 夏天太热了就不要用这个方式了 要么就改参数 虽然前面的硬盘跟cpu稳定控制下来了 但是后置扩展的2硬盘跟显卡跟m2那些温度因为风扇转速低了 热量是很难排出去的 导致设备温度爆烫 夏天老老实实把风扇调高

原文地址：

[我编写的一个DELL R730风扇控制程序推荐给大家](https://www.dell.com/community/zh/conversations/poweredge%E6%9C%8D%E5%8A%A1%E5%99%A8/%E6%88%91%E7%BC%96%E5%86%99%E7%9A%84%E4%B8%80%E4%B8%AAdell-r730%E9%A3%8E%E6%89%87%E6%8E%A7%E5%88%B6%E7%A8%8B%E5%BA%8F%E6%8E%A8%E8%8D%90%E7%BB%99%E5%A4%A7%E5%AE%B6/663086ef831a4d706f251a4c)

[syangtechcn/dell-fan-control](https://registry.hub.docker.com/r/syangtechcn/dell-fan-control)



## 快速创建docker
```bash
docker run -d \
  --name dell-fan-control \
  -e target_temperature=68 \
  -e failsafe_temperature=88 \
  -e debug=true \
  -e server_ip=idrac的IP \
  -e server_user=root \
  -e server_password=idrac密码 \
  -e server_port=623 \
  -e minFanSpeed=20 \
  -e TZ=Asia/Shanghai \
  --restart=always \
  syangtechcn/dell-fan-control:2024-04-25
```


## 注意事项

1. 请将 idrac的IP 替换为实际的 iDRAC IP 地址。
2. 请将 idrac密码 替换为实际的 iDRAC 密码。
3. 该程序用于控制DELL 服务器风扇转速，程序会根据CPU温度自动调整风扇转速。注意：程序会忽略其他硬件的温度。如果服务器上有其他无风扇硬件，可以将风扇最低转速设置为一个较大值。
4. 该程序只适用于DELL R730,R730XD服务器，也只在该服务器上测试过，有可能在R740和R720服务器上也可以运行。
5. 启用该程序前，需要先设置启用 "启用 LAN 上的 IPMI" ，该配置在IDRAC中。
6. 该程序或docker容器必须正常结束，如果异常结束后，需要再次启动程序或docker容器，然后正常停止程序或容器。在正常停止容器时，程序会将服务器风扇的控制权退还给服务器。异常结束情况下，服务器的风扇会以固定转速运行不会响应CPU温度变化，有可能烧毁服务器硬件。
7. 设置好目标温度后，程序会控制风扇转速，让CPU温度在目标温度附近浮动，目标温度越高，风扇转速越低，建议设置最高温度不超过75度。
8. 不建议在生产环境使用该程序



## 环境变量说明

在运行时通过配置环境变量来设置程序

target_temperature 设置风扇控制目标温度 默认68.

server_user 登录idrac使用的账号 ipmi 工具使用

server_password 登录idrac使用的密码 ipmi工具使用

server_ip 服务器控制台IP（idrac IP地址）

server_port 服务器 IPMI 工作端口 默认 623

debug 值为 true/false 启用或停用温度变化显示

failsafe_temperature 安全温度，当CPU温度超过该值时,程序放弃风扇控制,由服务器本身控制风扇.默认88摄氏度.

minFanSpeed 最小风扇转速. 默认 8 也就是8%的风扇转速.


