---
slug: nginxrealip
title: Nginx获取用户真实IP的简单方法
date: 2024-07-30 19:01
authors: lian
tags: [Nginx]
keywords: [Nginx,教程]
image: https://ubiq.co/tech-blog/wp-content/uploads/2020/12/nginx-increase-worker-connections.png

---

有些网站套了cdn 就获取不到真实ip了 其实解决起来很简单

<!-- truncate -->


    set_real_ip_from 0.0.0.0/0;
    real_ip_header X-Forwarded-For;

 


在nginx的配置文件里 找个顺眼的地方插入就完事了

