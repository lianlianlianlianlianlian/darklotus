---
id: git-ssh # 唯一ID
slug: git-ssh # URL(最多三级结构，便于seo 和理解，遵循doc/资源/具体说明项 的原则)
sidebar_position: 1  # 控制该文档在侧边栏的显示顺序
title: git使用ssh密钥推送
description: git使用ssh密钥推送教程 # 描述
date: 2021-10-01
authors: lian
tags: [git, github, ssh]
keywords: [git, github, ssh]

---


description: 文档首页介绍 # 描述
title: 文档介绍 # 页面标题
sidebar_label: 文档介绍

适用于大多数 Git 平台，包括 GitHub 和 Gitee。以下是对每个步骤的简要说明，以及它们在不同平台上的适用性：

### 1. 生成 SSH 密钥

```bash
ssh-keygen -t rsa -b 4096 -C "lian@darklotus.cn"
```
- 这一步骤在所有 Git 平台中都是相同的。确保用你自己的邮箱替换 `"lian@darklotus.cn"`。（为了方便自己复制粘贴填的我自己的）

### 2. 添加 SSH 密钥到 SSH 代理

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
```
- 这个步骤也适用于所有 Git 平台，确保 SSH 代理正在运行并添加你的密钥。

### 3. 将 SSH 公钥添加到 GitHub 或 Gitee

- **复制公钥到剪贴板**：
  ```bash
  cat ~/.ssh/id_rsa.pub
  ```

- **GitHub**：
  - 登录到 GitHub，进入 `Settings > SSH and GPG keys > New SSH key`，粘贴公钥并保存。

- **Gitee**：
  - 登录到 Gitee，进入 `设置 > SSH公钥`，粘贴公钥并保存。

### 4. 使用 SSH URL 进行推送

- **修改远程仓库的 URL 为 SSH 格式**：
  ```bash
  git remote set-url origin git@github.com:username/repository.git
  ```
  - 或者对于 Gitee：
  ```bash
  git remote set-url origin git@gitee.com:username/repository.git
  ```

### 5. 推送代码

```bash
git push -u origin main
```
- 这一步对于所有 Git 平台都是相同的。

### 总结

- 使用 SSH 密钥推送代码的步骤在 GitHub 和 Gitee 中是类似的，都是通过 SSH 公钥进行认证，避免每次推送时输入用户名和密码的麻烦。
- 只需注意在不同平台上可能会有些许界面差异，但整体流程是一致的。
