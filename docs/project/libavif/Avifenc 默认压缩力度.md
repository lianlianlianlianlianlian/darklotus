---
id: avifenc-default-compression 
slug: compression 
sidebar_position: 5
title: Avifenc 默认压缩力度
description: 介绍Avifenc工具的默认压缩力度设置
date: 2024-11-04
authors: lian
tags: 
  - Avif
  - Avifenc
keywords: 
  - Avif
  - Avifenc
  - 压缩力度
---


`avifenc` 默认情况下（不带 `-q` 参数）会使用以下设置进行压缩：

- 默认的色彩质量（color quality）参数是 **50**。这个值意味着中等质量，文件大小适中，既保留了一定的细节，又不会过于浪费存储空间。
  
也就是说，`avifenc` 在没有 `-q` 指定的情况下，采用的是一种平衡文件体积和图像质量的中等压缩力度，这个默认值通常可以生成较小的文件，同时提供较好的视觉效果。

