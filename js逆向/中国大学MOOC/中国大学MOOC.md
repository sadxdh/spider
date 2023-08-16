# 中国大学MOOC

## 目标

视频内容

## 网页解析

![image-20230808210241251](pics/image-20230808210241251.png)

网页禁止我们调试，我们选择抓包的方式，看看是否能够直接得到数据包

![image-20230808210428901](pics/image-20230808210428901.png)

![image-20230808210639016](pics/image-20230808210639016.png)

我们仍然需要返回浏览器，看看是否能提取到一些js代码

网页仍然是处于一个禁止调试的情况，我们需要想办法解开禁止调试

我在网上找了一些方法

[Selenium+代理=教你解决禁止F12、调试Debugger、丑化JS等反爬 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/379321563)

[爬网站时禁止调试模式（F12）处理方法_html网站被禁止f12调用控制台还有什么办法_凉云半的博客-CSDN博客](https://blog.csdn.net/weixin_46155246/article/details/108594993)

第一种办法：禁用调试模式

网站直接报错了

![image-20230808211307865](pics/image-20230808211307865.png)

第二种办法：添加断点，并将断点标记为false，但是没有办法点击网页按钮了，调试终止

![image-20230808211736815](pics/image-20230808211736815.png)

![image-20230808212055364](pics/image-20230808212055364.png)

![image-20230808212237062](pics/image-20230808212237062.png)

![image-20230808212524304](pics/image-20230808212524304.png)

看着非常像二进制文件

## 解除无限debugger

[爬网站时禁止调试模式（F12）处理方法_html网站被禁止f12调用控制台还有什么办法_凉云半的博客-CSDN博客](https://blog.csdn.net/weixin_46155246/article/details/108594993)

[利用js去除无限debugger_火浴R的博客-CSDN博客](https://blog.csdn.net/qq_39799322/article/details/119275806)

```js
//去除无限debugger
Function.prototype.__constructor_back = Function.prototype.constructor ;
Function.prototype.constructor = function() {
    if(arguments && typeof arguments[0]==='string'){
        //alert("new function: "+ arguments[0]);
        if( "debugger" === arguments[0]){
            //arguments[0]="consoLe.Log(\"anti debugger\");";
            //arguments[0]=";";
            return
    }
    }
    return Function.prototype.__constructor_back.apply(this,arguments);
}
```

有效果，网页只出现了一次debugger，然后可以继续运行调试代码

![image-20230808214341315](pics/image-20230808214341315.png)

跟进调试，network抓到了数据包，并且调试并没有出现debugger，但是在调试的过程中上一个视频段播放完成后会暂停，直到收到下一段视频的数据包

![image-20230808214648965](pics/image-20230808214648965.png)

此处发现了一个可能有用的csrfKey，或许是视频包解码的密钥

![image-20230808214927017](pics/image-20230808214927017.png)

![image-20230808215853829](pics/image-20230808215853829.png)

## m3u8

![image-20230808232708042](pics/image-20230808232708042.png)

![image-20230808232902603](pics/image-20230808232902603.png)

![image-20230808233115359](pics/image-20230808233115359.png)

![image-20230808233243572](pics/image-20230808233243572.png)

要拿到m3u8文件

确定m3u8文件解密位置

![image-20230808233921014](pics/image-20230808233921014.png)

可以根据右侧时间可以看到m3u8文件传输完之后，过一点时间发送了token请求获取key

获取到key后非常短的时间内开始第一个ts文件

## 任务

1. 使用token获取key，并找到加密解密js代码
2. 找到m3u8文件，对m3u8文件解密，还原文件内容
3. 下载m3u8视频，完成拼接

![image-20230808235227046](pics/image-20230808235227046.png)

![image-20230808235559525](pics/image-20230808235559525.png)

![image-20230809001921937](pics/image-20230809001921937.png)

当var d = l.secondaryDecrypt(e.data, t.videoId);运行完成时，得到了d，即m3u8文件的明文

![image-20230809002550228](pics/image-20230809002550228.png)

格式化后

![image-20230809003200462](pics/image-20230809003200462.png)

该M3U8文件中包含了加密处理的信息。以下是关键部分的解释：

```reStructuredText
#EXT-X-KEY:METHOD=AES-128,URI="https://vod.study.163.com/video/1217754807/hls/key?token=6595b54244c6d574038f...
```

在这行中，`#EXT-X-KEY` 指示视频流使用 AES-128 加密方法进行加密，并且指定了密钥的获取位置，即 `URI="https://vod.study.163.com/video/1217754807/hls/key?token=6595b54244c6d574038f`...。这个链接应该返回包含用于解密视频的密钥。

因此，视频流中的每个切片（`#EXTINF` 行后的 `.ts` 文件）都被使用 AES-128 加密，而解密密钥位于提供的 URI 中。

![image-20230809004133755](pics/image-20230809004133755.png)

执行if ("manifest" !== s && /hls\/key/.test(a.url))，然而并没有进入判断体内部，而是直接到达r函数，说明我们前面的猜测是错误的，我们之前认为的是在外部对ts文件内容进行了加密，而实际上是在m3u8文件对视频进行了加密

![image-20230809004314387](pics/image-20230809004314387.png)

r和i对cookie日志进行了检查，获取到结束时的播放位置，准备接上去播放

至此，解析完成

## 关键代码

![image-20230809005350786](pics/image-20230809005350786.png)

![image-20230809010943577](pics/image-20230809010943577.png)

![image-20230809011039888](pics/image-20230809011039888.png)

![image-20230809011501277](pics/image-20230809011501277.png)

根据解密代码生成js文件

![image-20230809040736362](pics/image-20230809040736362.png)

任务二完成，接下来就是使用token获取

多次测试，发现token的前半部分是会变化的，猜测为前半部分为随机生成的，后半部分为固定不变的，考虑根据时间戳变化

复制token到search搜索一下

搜不到，并且发现m3u8文件内的解码url的token是不同的，即每次刷新都会更新token，m3u8文件内容是服务器即时生成的

想办法直到token是如何生成的