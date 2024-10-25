---
slug: cloudflarewaf
title: CloudFlare的防火墙配置教程
date: 2024-08-05 15:00
authors: lian
tags: [Cloudflare,Waf]
keywords: [Cloudflare,Waf,教程]
image: https://i.darklotus.cn/images/2024/04/17/202404171654260.png


---

之所以会有这一篇文章 还得感谢黑客破费打我网站 当时最高的日请求达到了两个亿 我的i3 12100 全天满负载

<!-- truncate -->

当天功耗都上升了一度 这全都因为 我一个站长 居然连防火墙都不会开 所以当时被某些人嘲笑 我心里一点都不生气 反而更来劲了 让我把cf的防火墙规则从头到底的研究了一遍 直到现在 我可以把我的经验分享给大伙了 大家也都清楚我只分享干货 详细的原理请参考其他科普型博主 他们都比我更加专业 我的分享主要还是以实用为主 直接从根源上把问题解决了。

## 简单配置

最简单的就是开质询了 也是很多站长无脑使用这种方法来拦截恶意请求的手段 但是我真的不推荐用质询 超级影响用户体验 我寻思你网站性能差 就想办法提升 而不是靠这种手段来拦截正常用户 所以我找到几处 基础简单过滤恶意请求 又不需要配置复杂的防火墙规则



1. 安全性 -自动程序

没啥好讲的 其实没啥用

![image](https://i.darklotus.cn/2024/khvqw4.webp)



2. 安全性- DDOS-部署ddos替代

我还不知道具体干啥用的 反正打开就完事了 黑客打我的时候 这几个都没起啥作用



![image](https://i.darklotus.cn/2024/kbuef2.webp)

规则集操作选择 阻止 

规则集名感度选择 高

然后保存

![image](https://i.darklotus.cn/2024/kdl8os.webp)



3. 安全性-设置

这个我就不多说了 全开就行了 这里的设置就属于偷懒性质 享受cf最基础 给你配置好的规则 

经测试 只要是正常用户 这里的设置是压根吃不到质询的 可以适当把质询通过期 调高

我部署了防火墙规则 这里就设置的1天 因为我真的很不想用户吃到cf的质询 很烦 很恶心 我宁愿提升服务器性能硬扛 

![image](https://i.darklotus.cn/2024/ker567.webp)



以上就是简单配置了 属于cf最无脑的操作 打开就完事了 实际作用很小 简单过一遍就行了 接下来看我用过且真正有效果的配置 才是抵御攻击。



## 高级配置

cf默认给免费用户分配了五条规则 这对中小型网站来说完全够用了 高级配置都在WAF这里面

![image](https://i.darklotus.cn/2024/k1otih.webp)

## 允许规则

我设置的第一条规则就是允许 他的优先级最高 跳过了所有的设置 应用场景就是一些特殊路径或则特殊用户代理 因为我们拦截恶意请求的同时 很多时候会把正常请求也一并给拦截了 所以我第一条就是把我站点监控的ua 也就是UptimeRobot/2.0 给跳过了 这样我用uptime这个监控站点的服务下的所有ip 都不会被我防火墙规则误伤 

而第二条跟第三条 当时为了不影响用户 特意把一些路径给放行了 如果想要设定完善的防火墙规则 哪怕没有黑客打你网站 你自己也要想办法给自己做压测 才知道从何下手 而cf的防火墙字段跟运算符都很好理解 我用的最多的就是用户代理 跟URL 包含跟不包含 运算符用等于不等于有时候并不能生效 我也不知道为啥 所以就不展开说了  

![image](https://i.darklotus.cn/2024/k2w4fg.webp)

这里全部勾选就代表无视一切规则 优先级最高 一般允许的请求肯定都是信得过的 所以无需纠结 直接全部勾选就完事

![image](https://i.darklotus.cn/2024/k7a8kz.webp)



## 阻止规则

第一条就是威胁分数 以下是gpt的简单科普 有必要了解一下 我当时因为被攻击 所以填写的5分 当时也有用户反馈说被误伤 所以建议把这个分数还是填写高一点 我们主要还是拦截恶意请求 而不是误伤真实用户。

### 威胁分数

Cloudflare 的威胁分数是一个用来衡量 IP 地址潜在风险的系统，分数范围从 0 到 100。分数越高，表示该 IP 地址被认为越有可能从事恶意活动。这个分数基于多种因素，包括 IP 地址的历史行为、已知的恶意行为以及其他安全数据。

- **0-14 分**：通常认为是低风险，这些 IP 地址没有明显的恶意行为。
- **15-29 分**：中等风险，可能有一些可疑行为，但不一定是恶意的。
- **30-59 分**：高风险，这些 IP 地址有较高的可能性从事恶意活动。
- **60-100 分**：非常高风险，这些 IP 地址很可能参与了严重的恶意活动，如 DDoS 攻击、垃圾邮件发送等。

### 推荐的威胁分数设置

推荐的威胁分数设置取决于您的网站或应用的安全需求。如果您希望平衡安全性和用户访问性，可能会设置一个中等的阈值，如30分。如果您的网站经常遭受攻击，或者安全需求非常高，您可能会选择一个更低的分数，如15分，以更严格地限制潜在的威胁。

### 查询威胁 IP 地址

GPT没给我查询地址 所是我去找到并测试可用才放进来的！！！！

威胁 IP 地址可以通过多个在线服务查询，例如：

- **Project Honey Pot**：一个免费的 IP 地址检查工具，可以提供 IP 地址的恶意活动历史。

  查询地址：https://www.projecthoneypot.org/search_ip.php 

- **AbuseIPDB**：提供一个广泛的数据库，用户可以查询 IP 地址的恶意报告和历史。

  查询地址：https://www.abuseipdb.com/

- **Cloudflare Radar**：Cloudflare 提供的工具，可以查看 IP 地址的信誉和其他相关信息。

       查询地址：https://radar.cloudflare.com/

但是这一项我没找到哪里可以查ip信誉分 ip信息可以查出来 雷达跟cf的主页里的安全中心调查里 都可以查ip信息 就是没看到信誉分。。。

![image](https://i.darklotus.cn/2024/kmm54u.webp)

下面的规则就是tracker路径跟其他几个我还在测试的路径 忘记是搜索还是rss的路径了 效果就是除了通用标记Mozilla/5.0 以外的ua全部阻挡 最开始我不懂啊 一直在想该如何配置规则 期间也导致了大批量的误伤 阻挡规则就被我给关了 所以大家无需在意后面这几条 经过我的研究 慎用阻挡规则  质询还允许用户访问 阻挡是完全不给用户留后路 所以防恶意攻击优先还是采用质询 阻止这条规则就给个威胁分数就行了 还有一个应用场景就是 tracker地址 我专门研究了bt的tracker地址 基本都是套了cf 且防火墙屏蔽了Mozilla/5.0 也就是你用浏览器打开都会被阻挡 但是其他工具请求tracker路径 却不受影响 这样针对性的设置了 能拦截大量恶意请求的！



## 质询规则

这里的规则当时花了我很多精力去思考和测试 因为完全不会 自己本来就是门外汉 没人帮我 也没人指导我 这对我来说就是天书般的存在 学这些全靠自己 当时还有大量看我笑话的人 别提多无语了 现在我直接把规则分享出来 哪怕是新手也能一看就懂 不需要再去求人了 而且恶意攻击也基本全是国外ip 所以我这条规则针对性非常强 如果国内有那么多ip打你的网站 你就可以报警了（前提是你自己本身就没干坏事 当时的我并不具备这个条件）



![image](https://i.darklotus.cn/2024/mfjc3g.webp)

![image](https://i.darklotus.cn/2024/nibi5j.webp)

![image](https://i.darklotus.cn/2024/njkg81.webp)

表达式如下 嫌麻烦可以直接复制粘贴添加和我相同的规则。 

```
(http.request.uri contains "/complains.php") or (http.host contains "i.tuchuang.com" and not ip.geoip.country in {"CN" "HK" "TW" "MO"}) or (not ip.geoip.country in {"CN" "HK" "MO" "TW"} and not http.request.uri contains "/announce" and not http.request.uri contains "/announce.php" and not http.request.uri contains "/index.php" and not http.request.uri contains "/torrents.php" and not http.request.uri contains "/scrape.php" and not http.request.uri contains "/upload.php" and not http.request.uri contains "/torrentrss.php" and not http.request.uri contains "/api" and not http.request.uri contains "/favicon.ico" and not http.request.uri contains "/attendance.php" and not http.host contains "/index.html" and not http.host contains "img.ptlsp.com" and not http.user_agent contains "python-urllib3" and not http.user_agent contains "UptimeRobot/2.0")
```



## Tracker规则

前面的阻止规则是我当时做测试用的 所以并没有开启 而且攻击者的方式也是针对tracker路径来的 一开始还是Mozilla/5.0 的UA 攻击tracker路径 后来直接伪装成qb tr那些UA 伪装成正常用户 我才去开启速率限制规则（其实开启这一条就能拦截大量cc了 因为一般网站的请求也不会这么高。。。）

![image](https://i.darklotus.cn/2024/nqh7sw.webp)



## 微信代理服务器规则

这个东西 只能说我尽力了 本来就是免费为爱发电 当时大概免费服务了四五百人吧 直到现在我都想不通 攻击者为什么要来攻击我提供的这个免费服务 当时指着这个攻击 针对性极强 这也是彻底激怒我的原因 多的不说了 现在我有条件也只给我信任的小伙伴使用 本来也不是啥高门槛的东西 但是人家免费给你用 你不感恩就算了 还要破坏 我真的不觉得有什么好笑的 攻击的人也得逞了 我不做这样费力不讨好的事就行了呗

![image](https://i.darklotus.cn/2024/nukw4x.webp)

## 速率规则限制

其实这一条应该放在简单配置里 为什么单独拿出来说 就是这一条是最管用的 因为没有哪个正常人能做到 10秒内请求300次 当然不包括有些网站数据太多 比如说我群晖nas 真的有可能在10秒内请求那么多次的 所以这一条其实大家可以拿来做一个上限 具体还是根据你自己的网站来说 网站多的情况 我这边推荐设置高一点 避免误伤 我设置300基本没啥误伤 如果你是博客类型的网站 服务器又是很弱的 我推荐填写30-100 具体还是看你网站加载的内容数量 会不会影响哈！一定要多多关注拦截的日志 因为这一条规则是全局规则 是最容易误伤的！！！！**单独拿出来说就是要提醒大伙 这条规则很容易误伤！！！！！！**

![image](https://i.darklotus.cn/2024/o1cos5.webp)



我会的差不多就这些了 不专业 很业余 但是管用 cf的防火墙这边可以拦截大部分攻击了 如果想要更稳 建议在源服务器再部署一个防火墙 经过cf过滤一遍后 源服务器的压力就会小很多 这样双重防护 不给黑客任何机会！！！！



此文为原创 转载请保留本文地址！！！