---
slug: cloudflaretunnelsmb
title: Cloudflare Tunnel 内网穿透SMB
date: 2024-03-06 18:26
authors: lian
tags: [Cloudflare,Smb]
keywords: [Cloudflare,Smb,教程]
image: https://i.darklotus.cn/images/2024/04/17/202404171654260.png

---

这是我边学边写的教程 最终效果并不好 所以大家不必认真 随便看看 想想怎么抛砖引玉吧～

<!-- truncate -->

参考官方文档

[Connect to SMB server with cloudflared access](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/use-cases/smb/#connect-to-smb-server-with-cloudflared-access)

## 为SMB创建Cloudflare Tunnel

![image-20240306031838506](https://i.darklotus.cn/images/2024/04/17/202404171653782.png)



![image-20240306032000119](https://i.darklotus.cn/images/2024/04/17/202404171653822.png)

![image-20240306032214363](https://i.darklotus.cn/images/2024/04/17/202404171653859.png)

![image-20240306034913821](https://i.darklotus.cn/images/2024/04/17/202404171653863.png)

![image-20240306032631269](https://i.darklotus.cn/images/2024/04/17/202404171653873.png)

其实不加端口只填写ip也没事 只不过我先前失败了 所以排错的时候 加上试了下 这里大家就记一下smb的端口是445吧～

## 安装Cloudflared

[Cloudflare Zero Trust 文档](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/)



![image-20240306033301419](https://i.darklotus.cn/images/2024/04/17/202404171653870.png)



Macos：

```
brew install cloudflared
```

Windows：

```
winget install --id Cloudflare.cloudflared
```

其他的自己去文档看 linux 我也不会



Macos安装完成界面：

![image-20240306033430359](https://i.darklotus.cn/images/2024/04/17/202404171653033.png)



## 将目标Tunnel转发到本地

将下面的 smb.example.com 改成刚刚你添加穿透的域名 然后复制以下代码 在Macos终端里粘贴运行

```Bash
cloudflared access tcp --hostname smb.example.com --url localhost:8445
```

成功界面：

![image-20240306034300297](https://i.darklotus.cn/images/2024/04/17/202404171653069.png)

（这个界面不能关 关了就失效 得重新运行 ）



## 后台运行命令

切记：以下smb.example.com都自行替换成自己的域名 别一股脑复制粘贴！

在macOS终端中，要让`cloudflared access tcp --hostname smb.darklotus.cn --url localhost:8445`命令在后台运行，并且即使关闭终端也能保持运行，你可以使用`nohup`命令与`&`符号。`nohup`命令可以防止命令在终端关闭时被挂起，而`&`会将命令放入后台执行。

执行以下命令：

```
nohup cloudflared access tcp --hostname smb.example.com --url localhost:8445 &
```

这条命令会执行以下操作：

- `nohup`确保即使关闭终端窗口，`cloudflared`进程也不会被终止。
- `&`将命令放到后台执行，这样你就可以继续在同一个终端窗口中执行其他命令。
- `nohup`默认会将输出重定向到`nohup.out`文件中，除非另外指定。

如果你想要在后台运行的命令有特定的日志文件，可以通过重定向输出来实现，例如：

```
nohup cloudflared access tcp --hostname smb.example.com --url localhost:8445 > cloudflared.log 2>&1 &
```

这样，标准输出（stdout）和标准错误（stderr）都会被重定向到`cloudflared.log`文件中。

如果你想要停止在后台运行的`cloudflared`进程，可以使用`ps`命令查找进程ID，然后使用`kill`命令停止它。例如：

```
ps aux | grep 'cloudflared access tcp'
```

找到对应的进程ID后，使用：

```
kill -9 [进程ID]
```

将`[进程ID]`替换为实际的进程ID号。这将会终止`cloudflared`进程。

## 设置开机自启

如果你的目标是在 macOS 开机后自动在终端运行特定的命令，而不是在后台运行，那么可以采用一个稍微不同的方法，通过添加一个启动脚本到你的 shell 配置文件中。这种方法简单直接，适用于当你打开一个新的终端会话时自动执行特定命令。

假设你使用的是 bash 或 zsh（在 macOS Catalina 及更高版本中，zsh 是默认的 shell），你可以按照以下步骤操作：

### 对于 bash 用户：

1. 打开你的 home 目录下的 `.bash_profile` 文件。如果你使用的是 Terminal.app，可以通过执行以下命令来编辑这个文件：

```bash
open -e ~/.bash_profile
```

2. 在文件的末尾添加以下行：

```bash
cloudflared access tcp --hostname smb.example.com --url localhost:8445
```

3. 保存并关闭文件。下次你打开一个新的终端窗口时，这个命令将自动执行。

### 对于 zsh 用户：

1. 打开你的 home 目录下的 `.zshrc` 文件。可以通过以下命令来编辑这个文件：

```bash
open -e ~/.zshrc
```

2. 在文件的末尾添加同样的行：

```bash
cloudflared access tcp --hostname smb.example.com --url localhost:8445
```

3. 保存并关闭文件。下次你打开一个新的终端窗口时，这个命令将自动执行。

### 注意：

- 这种方法的一个潜在缺点是，每次你打开一个新的终端窗口或标签页时，这个命令都会执行。如果你希望它只在开机时运行一次，而不是每次打开终端时都运行，那么使用 `launchd` 或其他类似的系统级解决方案可能更合适。
- 确保 `cloudflared` 命令的路径在你的 `$PATH` 环境变量中，或者在脚本中使用完整的路径。

如果你的 macOS 系统中不存在 `.bash_profile` 文件，这可能是因为你的默认 shell 是 zsh，特别是在 macOS Catalina 及更高版本中。在这种情况下，你应该修改 `.zshrc` 文件。如果你确实想要在 bash 中执行这个操作（例如，如果你切换回了 bash），你可以创建一个新的 `.bash_profile` 文件。但对于大多数 macOS 用户，修改 `.zshrc` 文件是更常见的做法。

### 修改 `.zshrc` 文件

1. 打开终端。
2. 输入以下命令来编辑 `.zshrc` 文件：

```
open -e ~/.zshrc
```

如果 `.zshrc` 文件不存在，这个命令将会创建一个新的文件。

1. 在文件的末尾添加你的命令：

```
cloudflared access tcp --hostname smb.example.com --url localhost:8445
```

1. 保存并关闭文件。

现在，每次你打开一个新的终端窗口时，这个命令将自动执行。

### 创建 `.bash_profile` 文件（如果你确实需要）

如果你有特定的理由需要使用 bash 并创建一个 `.bash_profile` 文件，你可以按照以下步骤操作：

1. 在终端中，输入以下命令来创建一个新的 `.bash_profile` 文件并打开它进行编辑：

```
touch ~/.bash_profile && open -e ~/.bash_profile
```

1. 现在你可以在文件中添加任何需要在 bash shell 启动时执行的命令。
2. 保存并关闭文件。

记住，如果你的 macOS 使用的是 zsh 作为默认 shell（从 Catalina 开始是这样），修改 `.zshrc` 文件是更直接的方法。



以上是gpt4给的方法 我照做后 实现了开机自启 如果想要开机自动挂载 需要再配合其他软件 这个自行去搜 蛮多的

我用的这个：AutoMounter

![image-20240306050236399](https://i.darklotus.cn/images/2024/04/17/202404171653177.png)

## 连接服务器

```
smb://localhost:8445
```

![image-20240306034333439](https://i.darklotus.cn/images/2024/04/17/202404171653370.png)



如果你跟我一样是微软账号密码登录的话就直接输入你的微软账号跟密码就行了

出现smb映射的盘符表示成功

![image-20240306034419064](https://i.darklotus.cn/images/2024/04/17/202404171653804.png)

![image-20240306034506715](https://i.darklotus.cn/images/2024/04/17/202404171653404.png)



教程结束 够细致吧？这都看不懂那我就没办法了



最后吐槽一下cf内网穿透的这个速度 慢得要死 别指望传输什么大文件了 但是搭一个静态文件的网站还是很好使的 因为太过简单而且速度拉垮 所以我在这里不推荐大家使用 学这个主要还是给那些实在是没v4v6的用户一个机会 像调用moviepilot api接口这种 还是没啥问题的

smb的速度我也测试了 传输一些文档呀 图片呀 还是没啥问题的 看视频就是ppt 别指望了 总之很垃圾 不过不必担心 接下来就是进阶教程