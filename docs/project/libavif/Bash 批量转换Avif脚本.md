---
id: bash-batch-avif-conversion
slug: bash
sidebar_position: 4 
title: Bash 批量转换Avif脚本
description: 使用Bash脚本批量转换图像为AVIF格式的方法
date: 2024-11-04
authors: lian
tags: 
  - Avif
  - Avifenc
  - Bash
keywords: 
  - AVIF
  - Avifenc 
  - Bash
  - 图像转换
---


`avifenc` 只支持直接将 PNG 和 JPEG 转换为 AVIF。其他格式需先转为 PNG 或 JPEG 才能被 `avifenc` 处理。

下面是一个 Bash 脚本，它会在当前目录中寻找所有 `.png` 和 `.jpg`/`.jpeg` 文件，尝试将它们转换为 AVIF，所有成功转换的 AVIF 文件将存储在 `output` 文件夹中。

### 脚本代码

```bash
#!/bin/bash

# 创建 output 目录
mkdir -p output

# 遍历当前目录下的各种大小写形式的 PNG 和 JPEG 文件
for file in *.png *.PNG *.jpg *.JPG *.jpeg *.JPEG; do
    # 检查文件是否存在（避免没有匹配的文件时报错）
    if [[ -f "$file" ]]; then
        # 获取文件名（不含扩展名）用于输出文件名
        filename="${file%.*}"
        # 设定输出文件路径
        avif_output="output/$filename.avif"

        # 检查是否已存在转换后的文件，若存在则跳过
        if [[ -f "$avif_output" ]]; then
            echo "文件已转换，跳过: $file"
            continue
        fi

        # 使用 avifenc 进行转换
        avifenc "$file" "$avif_output" 2> /dev/null
    fi
done

echo "转换完成。"

```

### 脚本说明

1. **`mkdir -p output`**：创建一个 `output` 文件夹，用于存放生成的 AVIF 文件。
2. **`for file in *.png *.PNG *.jpg *.JPG *.jpeg *.JPEG`**：遍历当前目录中的所有 PNG 和 JPEG 图像文件，支持大小写格式。
3. **跳过已转换文件**：如果 `output` 目录中已经存在对应的 AVIF 文件，脚本将跳过该文件的转换，并在终端中输出跳过的文件名称。
4. **`avifenc "$file" "$avif_output"`**：使用 `avifenc` 命令将当前图像文件转换为 AVIF 格式，生成的文件将保存到 `output` 目录中。

### 运行脚本

将此脚本保存为 `avif.sh` 并赋予执行权限：

```bash
chmod +x avif.sh
./avif.sh
```

### 结果

- **成功转换的文件**：位于 `output` 文件夹中。
- **失败的文件**：因得知avif只能转换这两格式的文件 测试过后发现一般都不会报错 日志里空空如也 所以我把转换失败记录日志给删了
- **默认力度**：之前GPT给我说 不指定是无损 但我测试了默认转换压缩力度就是中等力度 再去问他他又改口了 个人觉得不指定无损参数 默认就是中等质量 所以无需纠结 以上脚本可以适量的减少图片大小 画质损失也小 直接用就好了 如果需要自定义参数的 用另外一个脚本 

请参阅 [绕过登陆账号教程](../) 获取更多信息。


请参阅 [可自定义压缩力度的批量压缩脚本](可自定义压缩力度的批量压缩脚本.md)。


