---
id: install-ssh-linux
slug: ssh-install
sidebar_position: 8
title: Linux 安装SSH和开启SSH服务
description: 介绍如何在Linux上安装SSH并开启SSH服务
date: 2024-11-04
authors: lian
tags: 
  - Linux
  - SSH
keywords: 
  - Linux
  - SSH
  - 安装
  - 服务
---


折腾ubuntu老是遇到默认没有ssh 于是有了这篇学习笔记



#### 查看ssh服务的状态

输入以下命令：

```
sudo service sshd status
```

如果出现

Loaded: error (Reason: No such file or directory)

提示的话，说名没有安装ssh服务，按照第二步：安装ssh服务。

如果出现

Active: inactive (dead)

说明已经安装了ssh服务，但是没有开启。按照第三步：开启ssh服务。

 

#### 安装ssh服务

安装ssh命令：

如果你用的是redhat，fedora，centos等系列linux发行版，那么敲入以下命令：

```
sudo yum install sshd
```



或者



```
sudo yum install openssh-server
```



如果你使用的是debian，ubuntu，linux mint等系列的linux发行版，那么敲入以下命令：



```
sudo apt-get install sshd
```



或者



```
sudo apt-get install openssh-server
```



然后按照提示，安装就好了。

 

#### 开启ssh服务

在终端敲入以下命令：



```
sudo service sshd start
```



执行完命令后，用第一步：查看ssh服务状态的命令，如果出现以下提示

Active: active (running) since Sun 2013-04-07 13:43:11 CST; 15s ago

说明你的ssh服务已经启动了。

 

#### 卸载ssh服务

如果你用的是redhat，fedora，centos等系列linux发行版，那么敲入以下命令：



```
sudo yum remove sshd
```



如果你使用的是debian，ubuntu，linux mint等系列的linux发行版，那么敲入以下命令：



```
sudo apt-get –purge remove sshd
```



然后就会提示卸载完成。