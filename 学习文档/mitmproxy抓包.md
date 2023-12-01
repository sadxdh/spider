# mitmproxy抓包

## 一、mitmproxy介绍

mitmproxy是一款开源的抓包工具，支持SSL的HTTP代理，它可以用于调试HTTP通信，发起中间人攻击等，还可以配合自定义python脚本使用，不同于 fiddler 或 wireshark 等抓包工具，mitmproxy 不仅可以截获请求帮助开发者查看、分析，更可以通过自定义脚本进行二次开发。

**三、mitmproxy 构成**

1、mitmproxy：是一个控制台工具，允许交互式检查和修改 HTTP 流量（不支持湾环境，支持os和linux）

2、mitmweb：mitmproxy 是基于 Web 的用户界面，它允许交互式检查和修改 HTTP 流量；

3、mitmdump：mitmproxy 的命令行版本。它提供了类似 tcpdump 的功能，可查看、记录和以编程方式转换 HTTP 流量。

## 二、mitmproxy官网

https://www.mitmproxy.org

mitmproxy 官网：https://www.mitmproxy.org/

mitmproxy 官方文档：https://docs.mitmproxy.org/stable/

mitmproxy 官方脚本 demo：https://docs.mitmproxy.org/stable/addons-examples/



## 三、mitmproxy的特点

- 快速拦截和修改HTTP流量

- 保存HTTP对话以供以后重播和分析

- 重播HTTP客户端和服务器

- 使用Python对HTTP流量进行脚本化更改

- 即时生成SSL拦截证书


## 四、下载win环境 mitmproxy安装包

![Image](https://mmbiz.qpic.cn/mmbiz_png/BPQvGfAUIWvhic2yiar2t2jP7b5m0dWLjia8UlVfrOcOGiax42dqPksrFBvBORhKibR795g4aLkIRdJG1icUrJWFQNCg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 五、安装包安装mitmproxy

1、默认点下一步去安装，记得最后1步要勾选Launch mitmproxy ui now

![Image](https://mmbiz.qpic.cn/mmbiz_png/BPQvGfAUIWvhic2yiar2t2jP7b5m0dWLjia7DXus3oVxSUhgJY0rafCuKE6BzbKbrCd5W9YgmEg4kP3m9AOWKKhEg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![Image](https://mmbiz.qpic.cn/mmbiz_png/BPQvGfAUIWvhic2yiar2t2jP7b5m0dWLjia3TIes4R5Rg2TQyzBWWr3lJ9yZKf4oUMX3kIL83bdF8e1JpVLPnXJng/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

2、点Finish自动启动mitmproxy服务和mitmproxy web页面，可以看到端口号是8080

![Image](https://mmbiz.qpic.cn/mmbiz_png/BPQvGfAUIWvhic2yiar2t2jP7b5m0dWLjiahr79rJayo6LGY4rULsibGHMHJJdiblovh8CicVbzWTvNX8bjN9NiacDEOw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![Image](https://mmbiz.qpic.cn/mmbiz_png/BPQvGfAUIWvhic2yiar2t2jP7b5m0dWLjiavtiaIXXsSH3NiaEIWcWS1FTAcsVufAVK3xWyFIDX3GmHPhLSnzsHssTA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 六、pip安装mitmproxy，确保有python环境

1、pip install mitmproxy安装依赖包

2、启动服务mitmweb -p 8989，设置端口为8989

![Image](https://mmbiz.qpic.cn/mmbiz_png/BPQvGfAUIWvhic2yiar2t2jP7b5m0dWLjiaVFlvAvDBmWBlhWgIoFEknHqgiahmjvmdT1pb2G9DGx1pN54oqmibqZxA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

3、访问http://127.0.0.1:8081/#/flows打开抓包页面

## 七、手机设置代理安装证书

1、查看当前电脑ip 192.1168.0.107

![Image](https://mmbiz.qpic.cn/mmbiz_png/BPQvGfAUIWvhic2yiar2t2jP7b5m0dWLjiaicYibxnpke6zYiavms7mpia9mzGfic5MzjAhPjsWvyowxctwJeaSjibxMpibA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

2、手机与电脑处于同一网段内，设置代理ip192.1168.0.107和端口号8080（安卓和苹果一样）

![Image](https://mmbiz.qpic.cn/mmbiz_png/BPQvGfAUIWvhic2yiar2t2jP7b5m0dWLjia2qErcGaWiabuRicd5xNvSu9ExDzDoSJgeiajOTq8C76u6Q6fKHCbSicHvg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

3、浏览器输入mitm.it打开页面，根据当前手机系统选择去安装证书（苹果机）

安卓用百度下载是pem.crt文件

![Image](https://mmbiz.qpic.cn/mmbiz_png/BPQvGfAUIWvhic2yiar2t2jP7b5m0dWLjiahENdYb54UcrkVhG7ibc9HUfNsA5HAz7vicbBETd7Y3LfEa2hCibp16aWA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

4、安装证书

设置-找到已经下载描述文件，安装（苹果机）

安卓找到已下载的pem.crt文件，安装并命名，可以去设置-安全和隐私-更多安全设置-加密和凭据查看已安装并信任的证书

![Image](https://mmbiz.qpic.cn/mmbiz_png/BPQvGfAUIWvhic2yiar2t2jP7b5m0dWLjiaOvBnVh9P4bibbbtcrk2ACGRJJcwmXYDDG23sxnJF9LnD1IcuOry62hw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![Image](https://mmbiz.qpic.cn/mmbiz_png/BPQvGfAUIWvhic2yiar2t2jP7b5m0dWLjiaqscUf1yFe9aJV9kWRAUiaAQkQ33fVMIxpzM6FdfvT3RiaXrIP3iaLwe8g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)



5、信任证书

关于本机-证书信任设置，开启（苹果机）

![Image](https://mmbiz.qpic.cn/mmbiz_png/BPQvGfAUIWvhic2yiar2t2jP7b5m0dWLjiak2j9ib1rW16AKy61tiaVtlVJZxUWVX0MsFbEGGm2YTNhSTXlDRXBXwCA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 八、手机抓包

**启动抓包服务**

1、cmd下mitmweb，默认端口是8080

2、cmd下mitmweb -p 8999，端口为8999

![Image](pic/mitmproxy%E6%8A%93%E5%8C%85/640)

启动 mitmweb 命令后，会有一个类似Chrome开发者工具的Web页面，功能上类似mitmroxy，一样可以查看每个请求的详情，包括请求、响应，还可以对请求和响应内容进行修改，包括过滤、重新发送请求等常用功能

设置好后，进入app进行抓包，这时去**mitmproxy** web页，已经抓到app接口数据了

![Image](https://mmbiz.qpic.cn/mmbiz_png/BPQvGfAUIWvhic2yiar2t2jP7b5m0dWLjiaicWKTVlm3yDAR9uCVj9E4yf2bAte5erpunMgOIozDapyTKZ4g45rTrQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)



![Image](https://mmbiz.qpic.cn/mmbiz_png/BPQvGfAUIWvhic2yiar2t2jP7b5m0dWLjiaETLaLxqkrrfbDoApkWy3dwteiboU2Xg9BGcGYCNLGbl7FDXdlJrX0pw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

**mitmweb基本使用**

1、抓包信息主面板页（抓包接口信息、请求页、响应页）

![Image](pic/mitmproxy%E6%8A%93%E5%8C%85/640)

2、关键字搜索匹配显示指定接口，关键字匹配指定接口高亮显示

![Image](pic/mitmproxy%E6%8A%93%E5%8C%85/640)

3、清除当前所有接口、打开文件、保存当前接口文件

![Image](pic/mitmproxy%E6%8A%93%E5%8C%85/640)



4、篡改请求

关键字匹配接口请求拦截，篡改请求数据

![Image](pic/mitmproxy%E6%8A%93%E5%8C%85/640)

![Image](pic/mitmproxy%E6%8A%93%E5%8C%85/640)



5、接口测试

编辑接口请求和响应数据，点replay重新进行接口请求

![Image](pic/mitmproxy%E6%8A%93%E5%8C%85/640)

![Image](pic/mitmproxy%E6%8A%93%E5%8C%85/640)



6、篡改响应

拦截请求，点 Resume，再次拦截到响应，修改响应值为“王大力测试进阶之路”，再点Resume释放响应，发现前端展示为修改后的值

![Image](pic/mitmproxy%E6%8A%93%E5%8C%85/640)

![Image](pic/mitmproxy%E6%8A%93%E5%8C%85/640)



7、还有很多过滤器表达式，这里就不一一列举了，可以参考官网文档https://docs.mitmproxy.org/stable/concepts-filters/

![Image](pic/mitmproxy%E6%8A%93%E5%8C%85/640)

![Image](pic/mitmproxy%E6%8A%93%E5%8C%85/640)