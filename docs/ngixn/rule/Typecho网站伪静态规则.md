### Typecho网站伪静态规则

- **规则内容**



```nginx
if (-f $request_filename/index.html){
    rewrite (.*) $1/index.html break;
    }
if (-f $request_filename/index.php){
    rewrite (.*) $1/index.php;
    }
if (!-e $request_filename){
    rewrite (.*) /index.php;
    }
```

- 作用和适用场景
  - 