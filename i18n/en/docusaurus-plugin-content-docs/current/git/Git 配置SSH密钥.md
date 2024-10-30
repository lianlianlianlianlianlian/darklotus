---
id: git-ssh 
slug: ssh 
sidebar_position: 2 
title: Configuring SSH Keys for Git
description: Configuring SSH keys for Git 
sidebar_label: Configuring SSH Keys for Git
date: 2024-10-27
authors: lian
tags: [git, github]
keywords: [git, github, ssh]

---

This method is applicable to most Git platforms, including GitHub and Gitee. The following is a brief description of each step and their applicability on different platforms.

```bash
ssh-keygen -t rsa -b 4096 -C "lian@darklotus.cn"
```
- This step is the same for all Git platforms. Make sure to replace `"lian@darklotus.cn"` with your own email address. (I filled in my own for the convenience of copying and pasting.)

### 2. Adding the SSH Key to the SSH Agent

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
```
- This step is also applicable to all Git platforms. Make sure that the SSH agent is running and your key is added.

### 3. Adding the SSH Public Key to GitHub or Gitee

- **Copying the Public Key to the Clipboard**:
```bash
cat ~/.ssh/id_rsa.pub
```

- **GitHub**:
- Log in to GitHub, go to `Settings > SSH and GPG keys > New SSH key`, paste the public key and save it.

- **Gitee**:
- Log in to Gitee, go to `Settings > SSH Public Key`, paste the public key and save it.

### 4. Pushing with the SSH URL

- **Modifying the URL of the Remote Repository to the SSH Format**:
```bash
git remote set-url origin git@github.com:username/repository.git
```
- Or for Gitee:
```bash
git remote set-url origin git@gitee.com:username/repository.git
```

### 5. Pushing the Code

```bash
git push -u origin main
```
- This step is the same for all Git platforms.

### Summary

- The steps for pushing code using SSH keys are similar on GitHub and Gitee. Authentication is done through the SSH public key, avoiding the hassle of entering the username and password each time you push.
- Git platforms allow you to add multiple keys. Suppose you have several computers. You can submit code from your company computer sometimes and from your home computer at other times. As long as you add the keys of each computer to the Git platform, you can push code to the Git platform from each computer.