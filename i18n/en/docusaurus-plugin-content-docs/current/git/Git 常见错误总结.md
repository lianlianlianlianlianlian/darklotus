---
id: git-error 
slug: error 
sidebar_position: 10  
title: Summary of Common Git Errors
description: Summary of common Git errors 
sidebar_label: Summary of Common Git Errors
date: 2024-10-27
authors: lian
tags: [git, github]
keywords: [git, github]

---

The purpose of this note is to record various problems encountered during the use of `Git` and organize them together for easy reference in the future.

## `git push` Denied
Problem Description: When doing `git push`, a prompt like `Permission denied (publickey)` is received.

The full error content is as follows:
```
git@gitlab.com: Permission denied (publickey).
fatal: Could not read from remote repository.
```

### Error Cause
Usually, there are two reasons for encountering this error:
1. Abnormal `ssh config` configuration.
2. The remote repository does not exist.

And most of the time, it is the first situation.

### Solution
On the premise that there are already `id_rsa` and `id_rsa.pub` files, please check the configuration in the `~/.ssh/config` file.

And ensure that the key in the `id_rsa` file has been uploaded to source code hosting service platforms like `Gitlab` or `Github`.
```
Host gitlab.com
    User username                      // Username
    HostName gitlab.com                // Address of the remote repository
    IdentityFile ~/.ssh/id_rsa_gitlab  // Directory where the id_rsa.pub file is located
    PreferredAuthentications publickey
```

## Domain Name Not Resolved

The full error content is as follows:
```
ssh: Could not resolve hostname gitlab.com: nodename nor servname provided, or not known  
fatal: Could not read from remote repository.
```

### Error Cause
`gitlab.com` has not been resolved by the host.

### Solution
```
$ ping gitlab.com
192.30.253.112

// Add the obtained IP to the hosts file
$ sudo vim /etc/hosts
192.30.253.112 gitlab.com
```
It is not necessarily required to restart the computer, but for me, the problem was only solved after restarting the computer.

## fatal: refusing to merge unrelated histories

The full error message is as follows:
```
$ git pull origin master
From gitlab.com:options/bustabit
 * branch            master     -> FETCH_HEAD
fatal: refusing to merge unrelated histories
```

This error message is actually quite clear, and the solution is also simple.

```
$ git pull origin master --allow-unrelated-histories
```
Add a `--allow-unrelated-histories` parameter to the basic command. However, it should be noted that Git refuses to merge for security reasons. If you insist on merging, you need to be prepared to resolve merge conflicts.