---
id: git-install 
slug: install 
sidebar_position: 1  
title: Installing Git on Multiple Operating Systems
description: Installing Git on multiple operating systems 
sidebar_label: Installing Git on Multiple Operating Systems
date: 2024-10-27
authors: lian
tags: [git, github]
keywords: [git, github]

---

The methods for installing Git on different operating systems are as follows:

### macOS

1. **Installing with Homebrew (Recommended)**:
   - If you haven't installed Homebrew yet, you can run the following command in the terminal:
     ```bash
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
     ```
   - To install Git:
     ```bash
     brew install git
     ```

2. **Using Xcode Command Line Tools**:
   - Open the terminal and run:
     ```bash
     xcode-select --install
     ```
   - This will install the Xcode Command Line Tools, which includes Git.

3. **Downloading from the Git Official Website**:
   - Visit the [Git official website](https://git-scm.com/download/mac) to download the macOS installer and follow the prompts to install it.

### Linux

On Linux, the method of installing Git depends on the distribution you are using:

1. **Debian/Ubuntu**:
   ```bash
   sudo apt update
   sudo apt install git
   ```

2. **Fedora**:
   ```bash
   sudo dnf install git
   ```

3. **CentOS/RHEL**:
   ```bash
   sudo yum install git
   ```

4. **Arch Linux**:
   ```bash
   sudo pacman -S git
   ```

### Windows

1. **Using the Git for Windows Installer**:
   - Visit the [Git for Windows official website](https://gitforwindows.org/) to download the latest installer.
   - Run the downloaded `.exe` file and follow the prompts of the installation wizard to install it.

2. **Using the Windows Package Manager (winget)**:
   - If you have already installed the Windows Package Manager, you can run the following in PowerShell:
     ```powershell
     winget install --id Git.Git -e --source winget
     ```

3. **Using Chocolatey (if you have already installed Chocolatey)**:
   - Run the following in the command prompt in administrator mode:
     ```bash
     choco install git
     ```

### Verifying the Installation

Regardless of the operating system on which Git is installed, after the installation is complete, you can verify whether Git has been successfully installed by running the following command:

```bash
git --version
```

This will display the version number of the installed Git.