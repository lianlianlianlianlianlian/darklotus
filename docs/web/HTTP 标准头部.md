# HTTP 标准头部

#### **1. 请求头部**
这些头部字段由客户端在发起 HTTP 请求时发送，描述了请求的元数据。

| **字段**          | **说明**                                               | **示例**                                                |
| ----------------- | ------------------------------------------------------ | ------------------------------------------------------- |
| `Accept`          | 指定客户端能够处理的内容类型（MIME 类型）。            | `Accept: text/html,application/json`                    |
| `Accept-Charset`  | 指定客户端能够理解的字符集。                           | `Accept-Charset: utf-8, iso-8859-1`                     |
| `Accept-Encoding` | 指定客户端可以接受的内容编码方式（如 gzip、deflate）。 | `Accept-Encoding: gzip, deflate, br`                    |
| `Authorization`   | 包含认证信息，用于验证客户端的身份。                   | `Authorization: Bearer <token>`                         |
| `Cache-Control`   | 指定请求和响应中的缓存控制策略。                       | `Cache-Control: no-cache`                               |
| `Connection`      | 控制连接的管理方式。                                   | `Connection: keep-alive`                                |
| `Content-Type`    | 指定请求体的 MIME 类型。                               | `Content-Type: application/json`                        |
| `Cookie`          | 客户端发送的 Cookie 信息。                             | `Cookie: sessionId=abc123; theme=light`                 |
| `Host`            | 指定请求目标的主机名和端口号。                         | `Host: www.example.com`                                 |
| `User-Agent`      | 描述客户端的类型、版本等信息。                         | `User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)` |

---

#### **2. 响应头部**
这些头部字段由服务器在响应 HTTP 请求时发送，描述了响应的元数据。

| **字段**                    | **说明**                                  | **示例**                                                     |
| --------------------------- | ----------------------------------------- | ------------------------------------------------------------ |
| `Content-Length`            | 响应体的字节长度。                        | `Content-Length: 1024`                                       |
| `Content-Type`              | 指定响应内容的 MIME 类型。                | `Content-Type: application/json`                             |
| `Date`                      | 服务器生成响应的时间（GMT 格式）。        | `Date: Fri, 15 Nov 2024 09:00:00 GMT`                        |
| `Server`                    | 表明服务器软件的名称和版本。              | `Server: Apache/2.4.41 (Ubuntu)`                             |
| `Set-Cookie`                | 服务器返回给客户端的 Cookie 信息。        | `Set-Cookie: sessionId=xyz123; Path=/; Secure; HttpOnly`     |
| `Location`                  | 指定资源的重定向地址（适用于 3xx 响应）。 | `Location: https://www.example.com/new-url`                  |
| `Cache-Control`             | 指定响应的缓存控制策略。                  | `Cache-Control: max-age=3600, must-revalidate`               |
| `ETag`                      | 资源的唯一标识符，用于缓存验证。          | `ETag: "abc123etagvalue"`                                    |
| `Last-Modified`             | 资源最后一次修改的时间。                  | `Last-Modified: Wed, 13 Nov 2024 12:00:00 GMT`               |
| `Content-Encoding`          | 指定响应体的编码方式。                    | `Content-Encoding: gzip`                                     |
| `Strict-Transport-Security` | 强制浏览器通过 HTTPS 访问资源。           | `Strict-Transport-Security: max-age=31536000; includeSubDomains` |

---

#### **3. 通用头部**
这些头部字段可用于请求和响应，描述了与资源或服务器相关的通用信息。

| **字段**            | **说明**                                           | **示例**                              |
| ------------------- | -------------------------------------------------- | ------------------------------------- |
| `Cache-Control`     | 控制缓存策略（可用于请求和响应）。                 | `Cache-Control: no-store`             |
| `Connection`        | 控制是否保持连接打开。                             | `Connection: close`                   |
| `Date`              | 表示请求或响应的创建时间（GMT 格式）。             | `Date: Tue, 14 Nov 2024 10:00:00 GMT` |
| `Pragma`            | HTTP/1.0 的缓存控制字段，与 `Cache-Control` 类似。 | `Pragma: no-cache`                    |
| `Transfer-Encoding` | 指定传输编码方式（如分块传输）。                   | `Transfer-Encoding: chunked`          |

---

#### **4. 常见的自定义和扩展头部**
这些头部是非标准的，但被广泛使用，通常以 `X-` 开头或为具体服务扩展的字段。

| **字段**                 | **说明**                                                 | **示例**                          |
| ------------------------ | -------------------------------------------------------- | --------------------------------- |
| `X-Powered-By`           | 指定服务器使用的框架或语言。                             | `X-Powered-By: Express`           |
| `X-Content-Type-Options` | 防止浏览器推断内容类型，增强安全性。                     | `X-Content-Type-Options: nosniff` |
| `X-Frame-Options`        | 控制页面是否允许通过 `<iframe>` 加载，防止点击劫持攻击。 | `X-Frame-Options: SAMEORIGIN`     |
| `X-XSS-Protection`       | 控制浏览器的 XSS 防护机制。                              | `X-XSS-Protection: 1; mode=block` |

---

#### **HTTP 标准头部的使用场景**
1. **缓存控制**
   - 利用 `Cache-Control` 和 `ETag` 提高资源加载速度，减少带宽使用。
2. **安全增强**
   - 使用 `Strict-Transport-Security` 强制 HTTPS，`X-Frame-Options` 防止点击劫持。
3. **性能优化**
   - 通过 `Accept-Encoding` 和 `Content-Encoding` 支持压缩传输内容。
4. **跨域资源共享（CORS）**
   - 通过 `Origin`、`Access-Control-Allow-Origin` 配置跨域策略。

