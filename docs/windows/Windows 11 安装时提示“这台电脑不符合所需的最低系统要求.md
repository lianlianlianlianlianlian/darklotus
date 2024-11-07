---
id: windows-tmp # 唯一ID
slug: tmp # URL(最多三级结构，便于seo 和理解，遵循doc/资源/具体说明项 的原则)
sidebar_position: 100  # 控制该文档在侧边栏的显示顺序
title: 安装时提示“这台电脑不符合所需的最低系统要求
description: 在安装 Windows 11 时提示“这台电脑不符合所需的最低系统要求 # 描述
date: 2024-10-27
authors: lian
tags: [windows]
keywords: [windows]

---

如果在安装 Windows 11 时提示“这台电脑不符合所需的最低系统要求”，大概率是你的硬件配置过于老旧，这时候就需要我们绕过 Windows 的硬件检测和安全检测，才能正常安装 Win11！

## 检查系统要求
   - 确保你的电脑符合 Windows 11 的最低系统要求，包括：
     - 64 位处理器
     - 4 GB RAM 或更多
     - 64 GB 存储空间或更多
     - UEFI 固件，支持安全启动
     - TPM 2.0（受信任的平台模块）

## 启用 TPM 和安全启动
   - 进入 BIOS 设置，确保 TPM 2.0 和安全启动（Secure Boot）已启用。具体步骤因电脑品牌和型号而异，通常在开机时按 `F2`、`Delete` 或 `Esc` 键进入 BIOS。



## 绕过系统检测

等提示“这台电脑不符合安装此版本的 Windows 所需的最低系统要求”无法继续安装的时候，按 **Shift + F10** 打开命令行

在命令行里输入 **regedit** 回车，打开注册表：

```
regedit
```
直接打开下面路径
```
计算机\HKEY_LOCAL_MACHINE\SYSTEM\Setup
```

1. 在 Setup 目录下 右键 → 新建项，输入 **labconfig** 回车。

2. 选中新建的 **labconfig** 在右边空白处，点右键 → 新建 → **DWORD (32 位)值(D)**，创建两个DWORD值：**BypassTPMCheck** 和 **BypassSecureBootCheck**

3. 然后把这两个的键值都改成 1：

4. 关闭注册表和命令行，在提示无法安装对话框上，点击 返回。

返回之后，再点下一步，就可以正常安装 Win11 了。

![image-20240511042151245](https://i.darklotus.cn/images/2024/05/11/image-20240511042151245.png)

完成上面步骤就关掉所有 返回上一步 再点下一步 即可安装咯

![image-20240511042400701](https://i.darklotus.cn/images/2024/05/11/image-20240511042400701.png)

