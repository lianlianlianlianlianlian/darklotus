### 规则内容

```nginx
# Chevereto for nginx rules

location ~* /(importing|app|content|lib)/.*\.(po|php|lock|sql)$ {
  deny all;
}

location ~ \.(jpe?g|png|gif|webp)$ {
    log_not_found off;
    error_page 404 /content/images/system/default/404.gif;
}

location ~* /.*\.(ttf|ttc|otf|eot|woff|woff2|font.css|css|js)$ {
  add_header Access-Control-Allow-Origin "*";
}

location / {
  index index.php;
  try_files $uri $uri/ /index.php$is_args$query_string;
}


# END Chevereto nginx rules
```



### 整体概述

这段配置主要是针对名为 Chevereto 的应用程序（可能是图片分享、管理类应用等，从规则推测与资源管理和访问控制相关）在 Nginx 服务器上进行的一系列路径和资源访问相关的设置，通过不同的`location`块来定义对不同类型的文件、目录路径以及整体请求的处理方式。

### 具体规则解释

#### 1. 禁止访问特定目录下特定类型文件的规则

```nginx
location ~* /(importing|app|content|lib)/.*\.(po|php|lock|sql)$ {
  deny all;
}
```

- `location ~*`：这是一个使用了不区分大小写匹配（`~*`）的`location`指令。它会匹配满足后面正则表达式条件的请求路径。
- `/(importing|app|content|lib)/.*\.(po|php|lock|sql)$`：这是一个正则表达式，用于匹配请求路径。它表示匹配以`importing`、`app`、`content`或`lib`这几个目录之一开头（因为在括号内使用了`|`进行多选），然后接着任意字符（`.*`），最后以`.po`、`.php`、`.lock`或`.sql`这些文件扩展名之一结尾的请求路径。
- `deny all;`：一旦请求路径匹配到上述正则表达式，就会执行这个操作，即拒绝所有对这些匹配路径下对应文件的访问请求。这可能是出于安全考虑，防止对这些关键目录下特定类型的文件进行不当访问。

#### 2. 处理图片文件相关的规则

```nginx
location ~ \.(jpe?g|png|gif|webp)$ {
    log_not_found off;
    error_page 404 /content/images/system/default/404.gif;
}
```

- `location ~`：这里使用了区分大小写的正则表达式匹配（`~`）的`location`指令，用于匹配特定扩展名的图片文件请求路径。
- `\.(jpe?g|png|gif|webp)$`：这是一个正则表达式，用于匹配以`.jpg`、`.jpeg`（`jpe?g`表示`jpeg`的`e`可有可无，匹配`jpg`和`jpeg`两种扩展名）、`.png`、`.gif`或`.webp`这些图片文件扩展名结尾的请求路径。
- `log_not_found off;`：当请求的图片文件不存在时，关闭记录 “文件未找到” 的日志信息。这样可以避免在大量图片请求中，因为个别不存在的图片导致日志文件被大量无用信息填满。
- `error_page 404 /content/images/system/default/404.gif;`：如果请求的图片文件不存在（触发 404 错误），则将错误页面重定向到`/content/images/system/default/404.gif`这个图片文件，以向用户展示一个自定义的 404 图片提示。

#### 3. 处理字体及样式、脚本文件相关的规则



```nginx
location ~* /.*\.(ttf|ttc|otf|eot|woff|woff2|font.css|css|js)$ {
  add_header Access-Control-Allow-Origin "*";
}
```

- `location ~*`：同样是不区分大小写的正则表达式匹配的`location`指令，用于匹配特定类型文件的请求路径。
- `/.*\.(ttf|ttc|otf|eot|woff|woff2|font.css|css|js)$`：这个正则表达式匹配以任意字符开头（`.*`），然后接着以`.ttf`、`.ttc`、`.otf`、`.eot`、`.woff`、`.woff2`、`font.css`、`.css`或`.js`这些字体、样式文件（如`.css`）或脚本文件（如`.js`）扩展名结尾的请求路径。
- `add_header Access-Control-Allow-Origin "*";`：对于匹配到上述路径的请求，会在响应头中添加一个`Access-Control-Allow-Origin`字段，并设置其值为`*`。这意味着允许来自任何源的跨域请求，通常用于处理字体、样式和脚本文件在不同域名或源之间的正确加载和使用，防止出现跨域访问限制导致的加载问题。

#### 4. 处理根目录及其他未匹配请求的规则



```nginx
location / {
  index index.php;
  try_files $uri $uri/ /index.php$is_args$query_string;
}
```

- `location /`：定义了对根目录（以及所有子目录，因为是根目录的设置）下请求的处理规则。
- `index index.php;`：指定当请求的是一个目录时，默认查找并使用`index.php`作为该目录的索引文件来提供服务。例如，当用户访问一个目录路径且未指定具体文件时，Nginx 会尝试提供`index.php`文件的内容。
- `try_files $uri $uri/ /index.php$is_args$query_string;`：这部分和前面介绍过的`try_files`指令类似。首先尝试查找`$uri`对应的文件，如果不存在就尝试查找`$uri/`对应的目录（并查找目录下的默认文件，这里默认是`index.php`），如果还是找不到，就将请求重写为指向`/index.php`并带上原始请求的参数（`$is_args`表示是否有查询参数，如果有则带上`$query_string`，即完整的查询参数内容），以便由`index.php`来处理请求，可能是由基于 PHP 的 Chevereto 应用程序核心代码来处理动态请求并生成相应内容。

通过以上这些不同的`location`块设置，Nginx 可以针对 Chevereto 应用程序的各种资源类型、访问场景等进行精细化的管理和处理，以确保应用程序的正常运行、资源的合理访问以及提供较好的用户体验等。