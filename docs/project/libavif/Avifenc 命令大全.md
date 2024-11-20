---
id: libavif-cmd
slug: cmd
sidebar_position: 3
title: Avifenc 命令大全
description: Avifenc 命令大全
pagination_label: Avifenc 命令大全
authors: Lian
tags:
  - Libavif
  - 命令
keywords:
  - 命令
  - Libavif
---

下面是 `avifenc` 命令的完整文档，包括各参数的详细说明和用法。这些选项涵盖了从基本质量设置到高级配置的各方面内容，适合初学者和进阶用户参考。

`avifenc` 是一个将图像文件（如 PNG、JPEG）编码为 AVIF 格式的工具，支持多种质量设置、元数据管理、动画配置等参数。

## 基础用法

```bash
avifenc [选项] 输入文件 输出文件
```

## 主要参数选项

### 质量与压缩相关
- **`-q` / `--qcolor`** `Q`  
  色彩压缩质量，范围为 `0-100`，数值越高质量越高，`100` 表示无损。
  
- **`--qalpha`** `Q`  
  透明通道的压缩质量，范围 `0-100`，`100` 表示无损。

- **`--cq-level`** `Q`  
  主要用于恒定质量模式的量化级别，范围 `0-63`，数字越低质量越高（0 表示最高质量）。

- **`--min` / `--max`** `QP`  
  色彩最小和最大量化参数，范围 `0-63`。0 表示无损，数值越高压缩越大。

- **`--minalpha` / `--maxalpha`** `QP`  
  透明通道最小和最大量化参数，范围 `0-63`，数值越低质量越高。

### 基本输出设置
- **`--output`**  
  输出文件路径。

- **`--autotiling`**  
  自动设置平铺行列数，优化文件大小。

- **`--tilerowslog2` / `--tilecolslog2`** `N`  
  手动设置平铺的行列数，`0` 表示不平铺，最大值为 `6`。

### 元数据设置
- **`--xmp`** `FILENAME`  
  指定 XMP 文件路径，将该文件的元数据嵌入图片。

- **`--icc`** `FILENAME`  
  指定 ICC 文件路径，用于嵌入色彩管理的 ICC 配置文件。

- **`--ignore-exif`**  
  忽略输入文件中的 EXIF 元数据。

- **`--ignore-xmp`**  
  忽略输入文件中的 XMP 元数据。

- **`--ignore-icc`**  
  忽略输入文件中的 ICC 配置文件。

### 动画设置
- **`--fps`** `V`  
  设置帧率，等同于 `timescale`。若未指定，默认值为 `30` fps。

- **`--keyframe`** `INTERVAL`  
  设置最大关键帧间隔。设置 `0` 可以禁用关键帧。

- **`--repetition-count`** `N` / `infinite`  
  设置动画循环次数，默认为 `infinite`。

### 画面裁剪与比例
- **`--pasp`** `H,V`  
  设置像素宽高比，`H` 表示水平间隔，`V` 表示垂直间隔。

- **`--crop`** `CROPX,CROPY,CROPW,CROPH`  
  裁剪框设置，参数依次为裁剪起始点的 x 和 y 位置以及宽度和高度。

- **`--clap`** `WN,WD,HN,HD,HON,HOD,VON,VOD`  
  设置清晰边缘（clean aperture），常用于定义图片边框区域，参数格式为宽度、高度及偏移量（分子/分母形式）。

### 高级编码选项
- **`-a` / `--advanced`** `KEY=VALUE`  
  传递高级编码器的 key-value 配置项，直接传递给编码器以调整特定编码参数。

- **`--aq-mode`** `M`  
  自适应量化模式（0：关闭，1：方差，2：复杂度，3：循环刷新）。

- **`--sharpness`** `S`  
  优化锐度（0-7），默认为 `0`。

- **`--tune`** `METRIC`  
  设置优化指标，支持 `psnr` 和 `ssim`。默认值为 `psnr`。

- **`--film-grain-test`** `TEST`  
  设置测试用的胶片颗粒效果，可用于生成测试矢量。

### 视频处理相关
- **`--scaling-mode`** `N[/D]`  
  实验性选项，设置帧（或层）的缩放模式。默认值为 `1/1`。

- **`--duration`** `D`  
  设置每帧持续时间。

## 示例

### 1. 标准转换
将 `input.png` 转换为质量为 80 的 AVIF 格式：

```bash
avifenc -q 80 input.png output.avif
```

### 2. 使用恒定质量级别压缩
将 `input.png` 转换为恒定质量模式下的 AVIF 格式，使用 `cq-level` 参数控制压缩力度：

```bash
avifenc --cq-level 30 input.png output.avif
```

### 3. 嵌入元数据
转换并添加 ICC 和 XMP 元数据：

```bash
avifenc --icc profile.icc --xmp metadata.xmp input.png output.avif
```

### 4. 动画转换
将一组图像按 `fps=24` 转换为循环播放的动画 AVIF：

```bash
avifenc --fps 24 --repetition-count infinite frame*.png animated_output.avif
```

### 5. 高级编码配置
使用 `aom` 编码器并启用色度差分量化：

```bash
avifenc -a enable-chroma-deltaq=1 -a sharpness=4 input.png output.avif
```

