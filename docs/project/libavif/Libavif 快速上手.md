---
id: libavif-getting-started
slug: getting-started
sidebar_position: 1
title: Libavif 快速上手
description: Libavif 快速上手
pagination_label: Libavif 快速上手
authors: Lian
tags: 
  - 快速上手                     
  - Libavif
keywords:                             
  - 快速上手                     
  - Libavif
---


### 1. 什么是 libavif？

libavif 是一个开源的 AVIF 图像编码和解码库。AVIF (AV1 Image File Format) 是一种基于 AV1 视频编码格式的图像格式，旨在提供高效的图像压缩和高质量的图像显示。AVIF 格式因其出色的压缩性能和支持 HDR（高动态范围）等现代图像特性而备受关注，特别适用于网页图片、移动设备图片等需要高效传输和存储的场景。

### 2. 安装 libavif

#### 2.1 使用包管理器安装

在一些操作系统中可以通过包管理器直接安装 libavif。例如：

- **macOS**：使用 Homebrew
  ```bash
  brew install libavif
  ```

- **Debian/Ubuntu**：使用 APT
  ```bash
  sudo apt update
  sudo apt install libavif
  ```

#### 2.2 从源码构建

如果想要使用最新版本的 libavif，可以选择从源码构建。步骤如下：

1. 克隆 libavif 的 GitHub 仓库：
   ```bash
   git clone https://github.com/AOMediaCodec/libavif.git
   cd libavif
   ```

2. 构建 libavif：
   ```bash
   mkdir build
   cd build
   cmake ..
   make
   sudo make install
   ```

### 3. libavif 的基础使用

#### 3.1 加载和保存 AVIF 图像

libavif 提供了简单的编码和解码接口。以下是加载和保存 AVIF 图像的基本步骤：

```c
#include <avif/avif.h>
#include <stdio.h>
#include <stdlib.h>

// 加载 AVIF 图像
avifImage* load_avif(const char* filename) {
    FILE* file = fopen(filename, "rb");
    if (!file) {
        fprintf(stderr, "无法打开文件: %s\n", filename);
        return NULL;
    }

    fseek(file, 0, SEEK_END);
    size_t fileSize = ftell(file);
    fseek(file, 0, SEEK_SET);

    uint8_t* data = (uint8_t*)malloc(fileSize);
    fread(data, 1, fileSize, file);
    fclose(file);

    avifDecoder* decoder = avifDecoderCreate();
    avifImage* image = avifImageCreateEmpty();
    avifResult result = avifDecoderRead(decoder, image, data, fileSize);
    free(data);
    avifDecoderDestroy(decoder);

    if (result != AVIF_RESULT_OK) {
        fprintf(stderr, "解码 AVIF 图像失败: %s\n", avifResultToString(result));
        avifImageDestroy(image);
        return NULL;
    }

    return image;
}

// 保存 AVIF 图像
void save_avif(avifImage* image, const char* filename) {
    avifEncoder* encoder = avifEncoderCreate();
    encoder->maxThreads = 4;
    encoder->speed = AVIF_SPEED_FASTEST;

    avifRWData output = AVIF_DATA_EMPTY;
    avifResult result = avifEncoderWrite(encoder, image, &output);
    avifEncoderDestroy(encoder);

    if (result == AVIF_RESULT_OK) {
        FILE* file = fopen(filename, "wb");
        fwrite(output.data, 1, output.size, file);
        fclose(file);
    } else {
        fprintf(stderr, "编码 AVIF 图像失败: %s\n", avifResultToString(result));
    }

    avifRWDataFree(&output);
}
```

### 4. 图像质量和编码设置

libavif 支持多种编码参数，可以通过调节这些参数来控制图像的质量和文件大小。

- **质量控制**：可以通过 `encoder->quality` 来控制编码质量，取值范围从 0（最低质量）到 100（最高质量）。
- **压缩速度**：通过 `encoder->speed` 控制，取值范围从 0（最慢）到 10（最快）。较慢的速度通常会产生更小的文件，但需要更长的时间来编码。

```c
encoder->quality = 50; // 质量设置为 50，平衡质量和文件大小
encoder->speed = AVIF_SPEED_FASTEST; // 设置为最快速度
```

### 5. 支持的色彩特性

AVIF 格式支持广色域和 HDR。libavif 可以处理高位深度（如 10-bit 或 12-bit）的图像，并支持不同的色彩空间，如 YUV420、YUV422 和 YUV444。可以通过 `avifImageAllocatePlanes()` 函数来分配所需的色彩通道。

```c
image->depth = 10; // 设置为 10-bit 色深
image->yuvFormat = AVIF_PIXEL_FORMAT_YUV420; // 使用 YUV420 格式
avifImageAllocatePlanes(image, AVIF_PLANES_YUV); // 分配 YUV 通道
```

### 6. 高级功能：批量处理和多线程

libavif 支持多线程编码，通过 `encoder->maxThreads` 参数可以指定最大线程数，从而加速批量处理。

### 7. 常见问题和调试技巧

- **解码失败**：检查输入文件是否为正确的 AVIF 格式，确保文件没有损坏。
- **图像质量差**：尝试调整编码质量参数，如提高 `quality` 和降低 `speed`。

### 8. 参考资源

- [libavif GitHub 仓库](https://github.com/AOMediaCodec/libavif)
- [AVIF 介绍](https://aomediacodec.github.io/av1-avif/)

---

