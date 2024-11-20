---
id: git-accounts 
slug: accounts 
sidebar_position: 100 
title: Configuring Multiple Git Accounts on One Host
description: Configuring multiple Git accounts on one host 
sidebar_label: Configuring Multiple Git Accounts on One Host
date: 2024-10-27
authors: lian
tags: [git, github]
keywords: [git, github]

---

Regardless of how many Git accounts are added on a single host, the ultimate goal is to interact with remote repositories. Therefore, the first step in the configuration is to generate multiple SSH keys.

- Since multiple Git accounts are allowed to log in on one host, the files storing SSH keys should not be duplicated; otherwise, the key of the former will be overwritten by the latter.
- So the first step we need to take is still to generate the "ssh key", but the commands for generating other ssh keys are a bit different from the previous one:

Configuring multiple Git accounts on the same host can mainly be achieved through the following methods:

### Method 1: Using SSH Keys
1. **Generating SSH Keys**:
Generate an SSH key pair for each Git account:
```bash
ssh-keygen -t rsa -C "your_email@example.com"
```
When the system asks for the save location, you can specify different file names, such as:
```
/home/your_user/.ssh/id_rsa_github
/home/your_user/.ssh/id_rsa_gitlab
```

2. **Adding SSH Keys to the SSH Agent**:
Start the SSH agent and add the keys:
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa_github
ssh-add ~/.ssh/id_rsa_gitlab
```

3. **Adding Public Keys to the Git Accounts**:
Add the public keys in `~/.ssh/id_rsa_github.pub` and `~/.ssh/id_rsa_gitlab.pub` to the corresponding Git accounts respectively.

4. **Configuring the SSH Configuration File**:
Create or edit the `~/.ssh/config` file and add the following content:
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

### Method 2: Configuring Multiple Users via HTTPS
1. **Setting User Information for Each Repository**:
Set the username and email address separately for each Git repository:
```bash
git config user.name "Your Name"
git config user.email "your_email@example.com"
```

2. **Entering Different Accounts When Pushing**:
When you push, you can specify different accounts:
```bash
git push https://username:token@github.com/username/repo.git
```

### Method 3: Global and Repository-Level Configuration
1. **Setting Global Configuration**:
You can configure an account globally:
```bash
git config --global user.name "Default User"
git config --global user.email "default@example.com"
```

2. **Overriding in Each Repository**:
Then use the local configuration to override the global settings in each specific repository:
```bash
git config user.name "Specific User"
git config user.email "specific@example.com"
```

### Other Precautions
- Make sure to confirm the current Git user configuration before each operation:
```bash
git config user.name
git config user.email
```