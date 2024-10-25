---
slug: gitgeturl
title: 批量获取Git仓库目录下的文件脚本
date: 2024-08-27 21:40
authors: lian
tags: [脚本]
keywords: [脚本,教程]
image: https://cdn-icons-png.flaticon.com/512/52/52040.png

---

先把仓库clone到本地 然后在本地找文件名字 然后再给文件名字加上gitee仓库的网址前缀 这样是最快 最稳的

<!-- truncate -->

## 脚本

前三个注释的参数 自行修改

```bash
#!/bin/bash

base_url="https://gitee.com/Darklotus/img/raw/master/Avatar/"  # 网址前缀
directory="/www/wwwroot/GItee/img/Avatar"  # 获取该路径下的文件名
output_file="/www/wwwroot/GItee/img/avatar.txt"  # 输出文件名

# 遍历目录下的文件
for file in "$directory"/*; do
    if [ -f "$file" ]; then  # 只处理文件，不处理目录
        filename=$(basename "$file")  # 获取文件名
        url="$base_url$filename"  # 构建完整的 URL
        echo "$url" >> "$output_file"  # 输出 URL到文件
    fi
done
```