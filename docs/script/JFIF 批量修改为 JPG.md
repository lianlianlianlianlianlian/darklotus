---
id: jfif-to-jpg-batch
slug: jfifjpg
sidebar_position: 31
title: JFIF 批量修改为 JPG
description: 介绍如何批量将 JFIF 文件修改为 JPG 格式的方法
date: 2024-11-07
authors: lian
tags: 
  - JFIF
  - JPG
  - 批量转换
keywords: 
  - JFIF
  - JPG
  - 批量修改
---

直接在终端中运行以下单行脚本，将当前目录下的所有 `.jfif` 文件扩展名批量改为 `.jpg`，无需保存为文件。

### 单行命令

```bash
for file in *.jfif; do mv "$file" "${file%.jfif}.jpg"; done
```

### 使用说明

1. 打开终端并导航到包含 `.jfif` 文件的目录，或直接进入包含文件的目录。
2. 复制粘贴上述命令并按 **Enter**。
3. 脚本会将当前目录下所有 `.jfif` 文件的扩展名批量修改为 `.jpg`。

这个命令完成以下操作：
- 遍历当前目录中的每个 `.jfif` 文件。
- 使用 `mv` 命令将文件名中的 `.jfif` 扩展名替换为 `.jpg`。

### 脚本内容

```bash
#!/bin/bash

# 批量将当前目录下的 .jfif 文件扩展名改为 .jpg

for file in *.jfif; do
    # 检查文件是否存在
    if [[ -f "$file" ]]; then
        # 获取文件名（不带扩展名）
        base="${file%.jfif}"
        # 重命名文件，将扩展名改为 .jpg
        mv "$file" "$base.jpg"
        echo "Renamed '$file' to '$base.jpg'"
    else
        echo "No .jfif files found."
    fi
done
```

### 使用方法

1. 打开 **终端**。
2. 将脚本保存为 `rename_jfif_to_jpg.sh`，并确保它在你要操作的文件夹中。
3. 运行以下命令将脚本变为可执行：

   ```bash
   chmod +x rename_jfif_to_jpg.sh
   ```

4. 执行脚本：

   ```bash
   ./rename_jfif_to_jpg.sh
   ```

### 脚本说明
- 该脚本会遍历当前目录下所有 `.jfif` 文件，将其扩展名修改为 `.jpg`。
- 重命名的同时会输出成功提示，如果找不到 `.jfif` 文件则提示无文件。




