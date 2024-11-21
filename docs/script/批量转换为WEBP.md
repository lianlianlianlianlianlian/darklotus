### 图片批量转换脚本文档

#### 脚本功能
该脚本用于批量将当前目录下的 PNG、JPEG（.jpg、.jpeg）文件转换为 WebP 格式，并将转换后的文件保存到 `output` 目录中。对于转换失败的文件，脚本会记录日志到 `output/error_log.txt` 文件中。

#### 依赖
- **ImageMagick**：该脚本使用 `magick` 命令（ImageMagick 工具集的一部分）进行图像格式转换。需要先安装 ImageMagick。
  
#### 安装 ImageMagick
在 macOS 或 Linux 系统上，可以通过以下命令安装 ImageMagick：

```bash
# macOS（使用 Homebrew）
brew install imagemagick

# Ubuntu / Debian（使用 apt）
sudo apt update
sudo apt install imagemagick
```

#### 使用方法
1. 将脚本保存为一个 `.sh` 文件（例如 `web.sh`）。
2. 确保脚本所在目录中有 PNG 和 JPEG 文件。
3. 打开终端，进入脚本所在目录。
4. 给脚本执行权限：
   ```bash
   chmod +x web.sh
   ```
5. 运行脚本：
   ```bash
   ./web.sh
   ```
6. 脚本会：
   - 在当前目录下创建一个名为 `output` 的文件夹（如果文件夹不存在）。
   - 将所有 PNG 和 JPEG 文件转换为 WebP 格式，并保存到 `output` 文件夹中。
   - 如果转换失败，脚本会将失败的文件路径记录到 `output/error_log.txt` 中。

#### 脚本工作流程
1. **创建 `output` 目录**：
   脚本首先创建一个名为 `output` 的目录，用于保存转换后的 WebP 文件。
   
2. **清空错误日志**：
   如果存在之前的错误日志文件，脚本会清空它，确保日志内容是最新的。

3. **遍历图像文件**：
   脚本会遍历当前目录中的所有 PNG 和 JPEG 文件（包括大小写不同的扩展名），并进行以下操作：
   - 如果该文件已经转换过（`output` 文件夹中已存在同名 `.webp` 文件），跳过该文件。
   - 使用 `magick` 命令将文件转换为 `.webp` 格式，并保存到 `output` 文件夹中。

4. **错误处理**：
   如果 `magick` 命令执行失败或转换后的 `.webp` 文件未成功生成，脚本会将失败的文件记录到 `output/error_log.txt` 中。

5. **完成通知**：
   在所有文件处理完成后，脚本会输出“转换完成。”并提醒用户检查 `output` 文件夹和 `error_log.txt` 文件。

#### 输出说明
- `output/`：包含转换后 WebP 格式图片的文件夹。
- `output/error_log.txt`：包含所有转换失败文件路径的日志文件。

#### 脚本示例

假设当前目录包含以下文件：

```
image1.png
image2.jpg
image3.jpeg
image4.PNG
image5.JPG
```

运行脚本后，`output` 目录将包含对应的 `.webp` 文件：

```
output/
  image1.webp
  image2.webp
  image3.webp
  image4.webp
  image5.webp
```

如果有文件转换失败，`output/error_log.txt` 中将记录出错文件的路径：

```
转换失败: image2.jpg
转换失败: image4.PNG
```

#### 注意事项
- 如果要转换的图片文件较多，脚本执行可能需要一些时间。
- 确保 `magick` 命令在你的系统中可用。如果没有安装 ImageMagick，脚本将无法正常运行。
- 如果你需要支持更多图片格式，可以修改脚本中的文件类型过滤规则。