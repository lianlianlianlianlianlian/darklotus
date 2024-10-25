---
slug: centosipv4youxian
title: Centos双栈网络时开启IPv4优先
date: 2024-05-07 00:00
authors: lian
tags: [Linux,Centos,Debian]
keywords: [教程]
image: https://i.darklotus.cn/images/2024/04/17/linux.webp
---

因为的vps小鸡喜欢装centos 家用高性能linux才喜欢用debian这些 所以就只记录这一个方法咯

debian ubuntu更简单 直接修改/etc/gai.conf替换下面的文本就完事了

<!-- truncate -->

Centos终端运行以下命令

```
cp -p /usr/share/doc/glibc-common-2.17/gai.conf /etc/
```

编辑 /etc/gai.conf 文件 把里面的全删了替换成以下

```
label       ::1/128        0
label       ::/0           1
label       2002::/16      2
label       ::/96          3
label       ::ffff:0:0/96  4
precedence  ::1/128        50
precedence  ::/0           40
precedence  2002::/16      30
precedence  ::/96          20
precedence  ::ffff:0:0/96  100
```

保存即可