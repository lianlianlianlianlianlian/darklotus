---
id: git-accounts # 唯一ID
slug: git-accounts # URL(最多三级结构，便于seo 和理解，遵循doc/资源/具体说明项 的原则)
sidebar_position: 100  # 控制该文档在侧边栏的显示顺序
title: 一台主机配置多个Git账号
description: 一台主机配置多个Git账号 # 描述
date: 2021-10-01
authors: lian
tags: [git, github]
keywords: [git, github]

---


无论在一个主机上添加几个Git账号，最终的目的都是与远程库进行交互。所以配置的第一步需要做的就是生成多个SSH密钥。

- 因为需要在一台主机上允许登录多个Git 账号。所以存放SSH密钥的文件就不能重复了，否则前者的密钥就会被后者覆盖。
- 所以我们要做的第一步仍然是生成``ssh key``，只是生成其他ssh key的命令和上面那个有点区别：



在同一台主机上配置多个 Git 账号主要可以通过以下几种方法来实现：

### 方法 1：使用 SSH 密钥
1. **生成 SSH 密钥**：
   为每个 Git 账号生成一个 SSH 密钥对：
   ```bash
   ssh-keygen -t rsa -C "your_email@example.com"
   ```
   当系统询问保存位置时，可以指定不同的文件名，比如：
   ```
   /home/your_user/.ssh/id_rsa_github
   /home/your_user/.ssh/id_rsa_gitlab
   ```

2. **添加 SSH 密钥到 SSH agent**：
   启动 SSH agent，并添加密钥：
   ```bash
   eval "$(ssh-agent -s)"
   ssh-add ~/.ssh/id_rsa_github
   ssh-add ~/.ssh/id_rsa_gitlab
   ```

3. **在 Git 账号中添加公钥**：
   将 `~/.ssh/id_rsa_github.pub` 和 `~/.ssh/id_rsa_gitlab.pub` 中的公钥分别添加到对应的 Git 账号中。

4. **配置 SSH 配置文件**：
   创建或编辑 `~/.ssh/config` 文件，添加如下内容：
   ```plaintext
   Host github.com
       HostName github.com
       User git
       IdentityFile ~/.ssh/id_rsa_github

   Host gitlab.com
       HostName gitlab.com
       User git
       IdentityFile ~/.ssh/id_rsa_gitlab
   ```

### 方法 2：使用 HTTPS 方式配置多个用户
1. **为每个仓库设置用户信息**：
   在每个 Git 仓库中，单独设置用户名和邮箱：
   ```bash
   git config user.name "Your Name"
   git config user.email "your_email@example.com"
   ```

2. **在推送时输入不同的账号**：
   当你推送时，可以指定不同的账号：
   ```bash
   git push https://username:token@github.com/username/repo.git
   ```

### 方法 3：全局和仓库级配置
1. **设置全局配置**：
   你可以为全局配置一个账号：
   ```bash
   git config --global user.name "Default User"
   git config --global user.email "default@example.com"
   ```

2. **在每个仓库中覆盖**：
   然后在每个特定的仓库中使用局部配置覆盖全局设置：
   ```bash
   git config user.name "Specific User"
   git config user.email "specific@example.com"
   ```

### 其他注意事项
- 确保在每次操作前，确认当前的 Git 用户配置：
  ```bash
  git config user.name
  git config user.email
  ```
