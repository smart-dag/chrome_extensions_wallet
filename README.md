# chrome_extensions_wallet

关键知识点：

1）安全策略，配置如下，否则vue无法工作。

```
<meta http-equiv="Content-Security-Policy" content="default-src * 'unsafe-inline' data: gap: * 'unsafe-eval'; style-src 'self' 'unsafe-inline'; script-src * 'self' 'unsafe-inline' 'unsafe-eval';">
```

2）设置最小尺寸，否则popup只能弹出一个特别小的页面。

```
<style>
    body {
        min-width: 500px;
        min-height: 600px;
    }
</style>
```

3) demo 

```
cd demo

openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem

http-server -S -C cert.pem -o
```