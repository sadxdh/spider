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

## 查看commit历史

```shell
git log
```

## 撤销commit保留修改

```shell
git reset --soft HEAD~5 # 最近5次
```

## 文件过大异常

```shell
remote: Powered by GITEE.COM [GNK-6.4]
remote: error: File: 540619c2e86624fa968f085e45b8efe9d4fc572c 107.83 MB, exceeds 100.00 MB.        
remote: Use command below to see the filename:        
remote: git rev-list --objects --all | grep 540619c2e86624fa968f085e45b8efe9d4fc572c
remote: Please remove the file from history and try again. (https://gitee.com/help/articles/4232)        
error: failed to push some refs to 'https://gitee.com/team-six/sp-spider.git'
```

清理本地commit

找到该文件，删除该文件

```shell
# Linux/Mac
git rev-list --objects --all | grep 540619c2e86624fa968f085e45b8efe9d4fc572c
# Win
git rev-list --objects --all | Select-String "540619c2e86624fa968f085e45b8efe9d4fc572c"
```

重新提交