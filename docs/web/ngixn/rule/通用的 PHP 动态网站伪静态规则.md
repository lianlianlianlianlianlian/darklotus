---
id: php-htaccess-rules
slug: php
sidebar_position: 12
title: 通用的 PHP 动态网站伪静态规则
description: 介绍适用于PHP动态网站的通用伪静态规则
date: 2024-11-04
authors: lian
tags: 
  - PHP
  - Nginx
  - 伪静态
keywords: 
  - PHP
  - 动态网站
  - 伪静态
---






### 通用的 PHP 动态网站伪静态规则

- **规则内容**



```nginx
location ~ \.php$ {
    rewrite ^/(.*)\.php$ /$1.html permanent;
}
```

- 作用和适用场景
  - 适用于一般的 PHP 动态网站。当网站中有大量的 PHP 页面，但希望以.html 的静态形式呈现给用户和搜索引擎时，这条规则可以将.php 后缀的文件请求重写成.html 后缀的静态页面请求，实现基本的伪静态效果，提升网站的 SEO 表现。