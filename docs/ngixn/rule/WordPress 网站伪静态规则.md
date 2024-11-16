

### WordPress 网站伪静态规则



- **规则内容**



```nginx
location / {
    try_files $uri $uri/ /index.php?$args;
}
```

- 作用和适用场景
  - 此规则适用于 WordPress 搭建的网站。WordPress 是一款非常流行的内容管理系统，在默认情况下，它的 URL 可能包含一些不友好的参数。通过这条伪静态规则，可以将动态的 PHP 请求转换为更简洁、搜索引擎友好的静态化 URL 形式，从而提高网站在搜索引擎中的排名和用户体验。