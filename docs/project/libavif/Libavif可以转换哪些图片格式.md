---
id: libavif-geshi
slug: geshi
sidebar_position: 10
title: Libavif可以转换哪些图片格式
description: Libavif可以转换哪些图片格式
pagination_label: Libavif可以转换哪些图片格式
authors: Lian
tags: 
  - 快速上手                     
  - Libavif
keywords:                             
  - 快速上手                     
  - Libavif
---

`avifenc` 是 libavif 的命令行工具，专门用于将图像转换为 AVIF 格式。**但是 `avifenc` 本身仅支持特定格式的输入**，它无法直接处理所有图像格式。因此，通常只支持以下几种格式：

### 1. `avifenc` 直接支持的格式

`avifenc` 主要支持以下格式作为输入源：

- **PNG**：无损压缩的常见格式，`avifenc` 可以直接读取。
- **JPEG**：有损压缩的常见格式，`avifenc` 也能直接读取。
- **Y4M**：用于 YUV 格式的图像序列文件，一种无压缩的视频图像格式。

对于这些格式，`avifenc` 可以直接读取并进行转换。

### 2. 间接支持的格式

对于其他图像格式（如 **TIFF、BMP、GIF、DNG、HEIF** 等），`avifenc` 无法直接处理，因为它缺少直接支持的解码器。这些格式可以通过 **ImageMagick** 等工具先转换为 PNG 或 JPEG 格式，再通过 `avifenc` 进行编码。如下是一些常见格式的处理方式：

- **TIFF、BMP**：可用 `convert` 命令先转为 PNG 格式，然后通过 `avifenc` 编码为 AVIF。
- **HEIF**：HEIF 文件包含 HEIC 编码或其他压缩图像，需先解码为 PNG，再使用 `avifenc`。
- **DNG 和其他 RAW 格式**：建议使用专门的 RAW 处理工具（如 dcraw、Adobe DNG Converter）解码为 PNG 或 JPEG，再使用 `avifenc` 进行 AVIF 转换。

### 3. 转换其他格式为 PNG 再编码为 AVIF

假设你有一个 TIFF 图像，使用 ImageMagick 转换为 PNG，再使用 `avifenc`：

```bash
# 使用 ImageMagick 将 TIFF 转换为 PNG
convert input.tiff temp.png

# 使用 avifenc 将 PNG 编码为 AVIF
avifenc temp.png output.avif

# 删除临时 PNG 文件
rm temp.png
```

### 总结

`avifenc` 仅直接支持 PNG、JPEG 和 Y4M 格式输入。对于其他格式，需借助 ImageMagick 或其他工具进行中间格式转换。