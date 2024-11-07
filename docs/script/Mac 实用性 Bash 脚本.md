下面是一些在 macOS 上可以直接在终端运行的 Bash 脚本：

###  **生成随机密码**
生成一个指定长度的随机密码。

```bash
generate_password() {
    LC_CTYPE=C tr -dc 'A-Za-z0-9!@#$%^&*()_+' < /dev/urandom | head -c "${1:-12}"; echo
}
generate_password 16  # 生成 16 位的随机密码
```

###  **快速统计文件夹大小**
统计当前文件夹中所有文件和子文件夹的大小。

```bash
du -sh * | sort -hr
```

###  **批量重命名文件**
将当前目录中的所有 `.txt` 文件重命名为 `file_` 开头的文件名。

```bash
count=1
for file in *.txt; do
    mv "$file" "file_${count}.txt"
    ((count++))
done
```

### **监控系统 CPU 和内存使用率**
实时查看系统的 CPU 和内存使用情况。

```bash
top -l 1 | head -n 10
```

### **自动整理下载文件夹**
按文件类型将 `~/Downloads` 中的文件自动整理到子文件夹中。

```bash
organize_downloads() {
    mkdir -p ~/Downloads/Documents ~/Downloads/Images ~/Downloads/Videos
    mv ~/Downloads/*.pdf ~/Downloads/*.docx ~/Downloads/*.txt ~/Downloads/Documents 2>/dev/null
    mv ~/Downloads/*.jpg ~/Downloads/*.png ~/Downloads/Images 2>/dev/null
    mv ~/Downloads/*.mp4 ~/Downloads/*.mov ~/Downloads/Videos 2>/dev/null
}
organize_downloads
```
以上是简单版 我觉得不好用 我给搞了个加强版 直接复制粘贴就可以执行

```bash
DOWNLOADS_DIR=~/Downloads

mkdir -p "$DOWNLOADS_DIR/Images"
mkdir -p "$DOWNLOADS_DIR/Videos"
mkdir -p "$DOWNLOADS_DIR/Music"
mkdir -p "$DOWNLOADS_DIR/Documents"
mkdir -p "$DOWNLOADS_DIR/Archives"
mkdir -p "$DOWNLOADS_DIR/ISO"
mkdir -p "$DOWNLOADS_DIR/Other"

for FILE in $DOWNLOADS_DIR/*; do
    if [[ -f "$FILE" ]]; then
        EXT="${FILE##*.}"
        FILENAME=$(basename "$FILE")
        case "$EXT" in
            jpg|jpeg|png|gif|bmp|webp|avif|tiff)
                mv "$FILE" "$DOWNLOADS_DIR/Images/$FILENAME"
                ;;
            mp4|mov|avi|mkv|flv|webm|wmv)
                mv "$FILE" "$DOWNLOADS_DIR/Videos/$FILENAME"
                ;;
            mp3|flac|aac|ogg|wav)
                mv "$FILE" "$DOWNLOADS_DIR/Music/$FILENAME"
                ;;
            pdf|docx|xlsx|pptx|txt|csv|md)
                mv "$FILE" "$DOWNLOADS_DIR/Documents/$FILENAME"
                ;;
            zip|tar|gz|rar|7z)
                mv "$FILE" "$DOWNLOADS_DIR/Archives/$FILENAME"
                ;;
            iso)
                mv "$FILE" "$DOWNLOADS_DIR/ISO/$FILENAME"
                ;;
            *)
                mv "$FILE" "$DOWNLOADS_DIR/Other/$FILENAME"
                ;;
        esac
    fi
done

echo "下载文件夹已整理完成！"
```


### **快速备份重要文件**
将指定目录中的所有 `.txt` 文件打包成一个带时间戳的 `.tar.gz` 备份文件。

```bash
backup_files() {
    tar -czvf "backup_$(date +%Y%m%d%H%M%S).tar.gz" *.txt
}
backup_files
```

### **显示网络信息**
查看 IP 地址、网关和 DNS 信息。

```bash
network_info() {
    echo "IP 地址：$(ipconfig getifaddr en0)"
    echo "网关：$(netstat -nr | grep default | awk '{print $2}')"
    echo "DNS 服务器：$(scutil --dns | grep 'nameserver' | awk '{print $3}' | paste -s -d ', ' -)"
}
network_info
```

### 清理系统缓存和日志

```bash
# 清理系统缓存和日志
clear_cache() {
  sudo rm -rf ~/Library/Caches/*
  sudo rm -rf /Library/Caches/*
  sudo rm -rf /private/var/log/*
  sudo rm -rf ~/Library/Logs/*
  echo "系统缓存和日志已清理"
}
clear_cache
```

此脚本将删除 Mac 上常见的缓存和日志文件，释放一些系统空间。


### 检查磁盘使用情况

```bash
disk_usage_report() {
  echo "磁盘使用情况报告："
  df -h | grep -E '^/dev/'
}
disk_usage_report
```

这个简单的脚本会展示每个挂载卷的磁盘使用情况，非常有助于了解剩余空间和正在使用的空间。

### 快速设置 macOS 隐藏文件显示/隐藏切换

```bash
toggle_hidden_files() {
  CURRENT_SETTING=$(defaults read com.apple.finder AppleShowAllFiles)
  if [ "$CURRENT_SETTING" = "TRUE" ]; then
    defaults write com.apple.finder AppleShowAllFiles -bool FALSE
    echo "隐藏文件已隐藏"
  else
    defaults write com.apple.finder AppleShowAllFiles -bool TRUE
    echo "隐藏文件已显示"
  fi
  killall Finder
}
toggle_hidden_files
```

运行此脚本可以快速切换隐藏文件的显示状态，并重启 Finder 应用以立即生效。

### 创建 Wi-Fi 信息快速查看脚本

```bash
wifi_info() {
  SSID=$(networksetup -getairportnetwork en0 | awk -F': ' '{print $2}')
  IP=$(ipconfig getifaddr en0)
  echo "当前连接的 Wi-Fi 网络: $SSID"
  echo "IP 地址: $IP"
}
wifi_info
```

运行这个脚本会显示当前连接的 Wi-Fi 网络的 SSID 和 IP 地址信息。




希望这些小脚本能在你的 macOS 使用中带来便利和乐趣！