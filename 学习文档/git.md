# git

## 设置代理

```shell
//http || https
git config --global http.proxy 127.0.0.1:7890
git config --global https.proxy 127.0.0.1:7890

//sock5代理
git config --global http.proxy socks5 127.0.0.1:7891
git config --global https.proxy socks5 127.0.0.1:7891
```

## 取消代理

```shell
git config --global --unset http.proxy
git config --global --unset https.proxy
```

## 查看配置

```shell
git config --list
```

