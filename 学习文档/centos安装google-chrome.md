# centos安装google-chrome

## 更新（以前安装过）

更新成google-chrome-stable-119.0.6045.199-1.x86_64

```shell
rpm -Uvh --nosignature /var/cache/yum/x86_64/7/google-chrome/packages/google-chrome-stable-119.0.6045.199-1.x86_64.rpm
```

以前没有安装过chrome火哦其他浏览器，直接安装会报依赖缺失

![image-20231201103955881](pic/centos%E5%AE%89%E8%A3%85google-chrome/image-20231201103955881.png)

需要安装一些浏览器依赖

```shell
sudo yum install atk at-spi2-atk liberation-fonts vulkan libxkbcommon
sudo yum install gtk3 xdg-utils
```

然后再执行安装/更新命令

## yum安装

```shell
sudo yum install google-chrome-stable
```

可能会报错

![image-20231201104306149](pic/centos%E5%AE%89%E8%A3%85google-chrome/image-20231201104306149.png)

这是因为没有匹配的GPG密钥

把匹配的GPG密钥导进去就好了

```shell
sudo rpm --import https://dl.google.com/linux/linux_signing_key.pub
```

但是这个方法不一定奏效，因为chrome最新的是119的版本的，这个密钥应该是只能支持到114的版本

## 安装chromedriver

[Chrome for Testing availability (googlechromelabs.github.io)](https://googlechromelabs.github.io/chrome-for-testing/)

![image-20231201110203789](pic/centos%E5%AE%89%E8%A3%85google-chrome/image-20231201110203789.png)

### 安装119.0.6045.105

```shell
wget https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/119.0.6045.105/linux64/chrome-linux64.zip
wget https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/119.0.6045.105/linux64/chromedriver-linux64.zip
unzip chromedriver-linux64.zip
sudo mv chromedriver-linux64/chromedriver /usr/bin/
```

```shell
Chrome for Testing availability 
This page lists the latest available cross-platform Chrome for Testing versions and assets per Chrome release channel.

Consult our JSON API endpoints if you’re looking to build automated scripts based on Chrome for Testing release data.

Last updated @ 2023-09-13T02:12:00.084Z

Channel	Version	Revision	Status
Stable
117.0.5938.62	r1181205	✅
Beta
117.0.5938.62	r1181205	✅
Dev
118.0.5993.3	r1192594	✅
Canary
119.0.6005.0	r1195292	✅
Stable
Version: 117.0.5938.62 (r1181205)

Binary	Platform	URL	HTTP status
chrome	linux64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/117.0.5938.62/linux64/chrome-linux64.zip	200
chrome	mac-arm64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/117.0.5938.62/mac-arm64/chrome-mac-arm64.zip	200
chrome	mac-x64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/117.0.5938.62/mac-x64/chrome-mac-x64.zip	200
chrome	win32	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/117.0.5938.62/win32/chrome-win32.zip	200
chrome	win64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/117.0.5938.62/win64/chrome-win64.zip	200
chromedriver	linux64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/117.0.5938.62/linux64/chromedriver-linux64.zip	200
chromedriver	mac-arm64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/117.0.5938.62/mac-arm64/chromedriver-mac-arm64.zip	200
chromedriver	mac-x64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/117.0.5938.62/mac-x64/chromedriver-mac-x64.zip	200
chromedriver	win32	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/117.0.5938.62/win32/chromedriver-win32.zip	200
chromedriver	win64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/117.0.5938.62/win64/chromedriver-win64.zip	200
Beta
Version: 117.0.5938.62 (r1181205)

Binary	Platform	URL	HTTP status
chrome	linux64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/117.0.5938.62/linux64/chrome-linux64.zip	200
chrome	mac-arm64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/117.0.5938.62/mac-arm64/chrome-mac-arm64.zip	200
chrome	mac-x64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/117.0.5938.62/mac-x64/chrome-mac-x64.zip	200
chrome	win32	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/117.0.5938.62/win32/chrome-win32.zip	200
chrome	win64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/117.0.5938.62/win64/chrome-win64.zip	200
chromedriver	linux64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/117.0.5938.62/linux64/chromedriver-linux64.zip	200
chromedriver	mac-arm64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/117.0.5938.62/mac-arm64/chromedriver-mac-arm64.zip	200
chromedriver	mac-x64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/117.0.5938.62/mac-x64/chromedriver-mac-x64.zip	200
chromedriver	win32	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/117.0.5938.62/win32/chromedriver-win32.zip	200
chromedriver	win64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/117.0.5938.62/win64/chromedriver-win64.zip	200
Dev
Version: 118.0.5993.3 (r1192594)

Binary	Platform	URL	HTTP status
chrome	linux64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/118.0.5993.3/linux64/chrome-linux64.zip	200
chrome	mac-arm64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/118.0.5993.3/mac-arm64/chrome-mac-arm64.zip	200
chrome	mac-x64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/118.0.5993.3/mac-x64/chrome-mac-x64.zip	200
chrome	win32	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/118.0.5993.3/win32/chrome-win32.zip	200
chrome	win64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/118.0.5993.3/win64/chrome-win64.zip	200
chromedriver	linux64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/118.0.5993.3/linux64/chromedriver-linux64.zip	200
chromedriver	mac-arm64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/118.0.5993.3/mac-arm64/chromedriver-mac-arm64.zip	200
chromedriver	mac-x64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/118.0.5993.3/mac-x64/chromedriver-mac-x64.zip	200
chromedriver	win32	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/118.0.5993.3/win32/chromedriver-win32.zip	200
chromedriver	win64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/118.0.5993.3/win64/chromedriver-win64.zip	200
chrome-headless-shell	linux64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/118.0.5993.3/linux64/chrome-headless-shell-linux64.zip	200
chrome-headless-shell	mac-arm64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/118.0.5993.3/mac-arm64/chrome-headless-shell-mac-arm64.zip	200
chrome-headless-shell	mac-x64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/118.0.5993.3/mac-x64/chrome-headless-shell-mac-x64.zip	200
chrome-headless-shell	win32	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/118.0.5993.3/win32/chrome-headless-shell-win32.zip	200
chrome-headless-shell	win64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/118.0.5993.3/win64/chrome-headless-shell-win64.zip	200
Canary
Version: 119.0.6005.0 (r1195292)

Binary	Platform	URL	HTTP status
chrome	linux64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/119.0.6005.0/linux64/chrome-linux64.zip	200
chrome	mac-arm64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/119.0.6005.0/mac-arm64/chrome-mac-arm64.zip	200
chrome	mac-x64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/119.0.6005.0/mac-x64/chrome-mac-x64.zip	200
chrome	win32	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/119.0.6005.0/win32/chrome-win32.zip	200
chrome	win64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/119.0.6005.0/win64/chrome-win64.zip	200
chromedriver	linux64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/119.0.6005.0/linux64/chromedriver-linux64.zip	200
chromedriver	mac-arm64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/119.0.6005.0/mac-arm64/chromedriver-mac-arm64.zip	200
chromedriver	mac-x64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/119.0.6005.0/mac-x64/chromedriver-mac-x64.zip	200
chromedriver	win32	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/119.0.6005.0/win32/chromedriver-win32.zip	200
chromedriver	win64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/119.0.6005.0/win64/chromedriver-win64.zip	200
chrome-headless-shell	linux64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/119.0.6005.0/linux64/chrome-headless-shell-linux64.zip	200
chrome-headless-shell	mac-arm64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/119.0.6005.0/mac-arm64/chrome-headless-shell-mac-arm64.zip	200
chrome-headless-shell	mac-x64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/119.0.6005.0/mac-x64/chrome-headless-shell-mac-x64.zip	200
chrome-headless-shell	win32	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/119.0.6005.0/win32/chrome-headless-shell-win32.zip	200
chrome-headless-shell	win64	https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/119.0.6005.0/win64/chrome-headless-shell-win64.zip	200
```

## 安装最新的版本并配置

[谷歌浏览器各平台各版本资源 chrome及驱动在linux中的离线安装 - cknds - 博客园 (cnblogs.com)](https://www.cnblogs.com/yoyowin/p/12014014.html)

```bash
yum install https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm
google-chrome -version
wget https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/119.0.6045.105/linux64/chromedriver-linux64.zip
unzip chromedriver-linux64.zip
sudo mv chromedriver-linux64/chromedriver /usr/bin/
```