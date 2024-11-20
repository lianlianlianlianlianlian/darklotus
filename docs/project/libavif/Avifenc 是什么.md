---
id: libavif-avifenc
slug: Avifenc
sidebar_position: 2
title: Avifenc 是什么
description: Avifenc 是什么
pagination_label: Avifenc 是什么
authors: Lian
tags:                  
  - Libavif
keywords:            
  - Libavif
---

`avifenc` 是一个用于将图片编码为 AVIF（AV1 Image File Format）格式的命令行工具，属于 `libavif` 库的一部分。AVIF 是一种现代图像格式，基于 AV1 视频编解码技术，具有更高的压缩效率和良好的图像质量。以下是 `avifenc` 的一些主要特点和用法介绍：

### 主要功能
1. **高压缩率和图像质量**：相比 JPEG 和 PNG，AVIF 文件通常在保持图像质量的情况下具有更小的文件大小，非常适合需要高效压缩的场景。
2. **支持有损和无损压缩**：可以选择有损或无损压缩，适应不同的需求。
3. **支持多种颜色空间**：包括 8 位、10 位、12 位颜色深度，HDR 等，用于呈现更丰富的颜色信息。
4. **透明度支持**：AVIF 支持 alpha 通道，因此可以用于存储带有透明度的图片。
5. **快速处理**：支持单线程和多线程处理，可根据需求调整速度和质量。

### 基本语法
```bash
avifenc [options] input_image output_image.avif
```

### 常用选项
- **压缩质量控制**：
  - `--min <quality>`：设置最低压缩质量，范围 0 到 63，值越高质量越好。
  - `--max <quality>`：设置最高压缩质量，范围 0 到 63。
  - `--cq-level <quality>`：设置恒定质量模式下的质量，通常在 0 到 63 之间，推荐值在 20 到 40 之间。
  
- **无损压缩**：
  - `--lossless`：启用无损压缩模式，适合对图像质量要求非常高的场景。

- **多线程处理**：
  - `--jobs <number>`：设置多线程处理的线程数，加速转换。

- **颜色深度**：
  - `--depth <bit_depth>`：设置输出图像的颜色深度（8、10、12），通常 8 位用于一般需求，10 或 12 位用于更高质量的需求。

- **速度和质量平衡**：
  - `--speed <number>`：指定编码速度，范围从 0 到 10，数字越高，速度越快但质量略低，默认值一般是 6。

- **图像尺寸调整**：
  - `--resize <width> <height>`：将图片调整为指定宽度和高度。

### 示例用法
1. **有损压缩，默认设置**：
   ```bash
   avifenc input.png output.avif
   ```

2. **指定质量范围的有损压缩**：
   ```bash
   avifenc --min 30 --max 50 input.jpg output.avif
   ```

3. **无损压缩**：
   ```bash
   avifenc --lossless input.png output.avif
   ```

4. **指定多线程和较高速度编码**：
   ```bash
   avifenc --jobs 4 --speed 8 input.png output.avif
   ```

### 性能和适用场景
`avifenc` 非常适合需要高质量和高压缩率的场景，例如网站优化、图像传输、图像存储等。尽管 AVIF 编码会比 JPEG 或 PNG 稍慢，但它能显著减少文件大小，从而加快网页加载速度和减轻存储压力。

总的来说，`avifenc` 是一个强大的工具，适合有图像压缩需求的开发者和设计师。