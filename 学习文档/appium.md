# appium

## 安装教程

[appium环境配置（史上最全详细）_appium安装及环境配置-CSDN博客](https://blog.csdn.net/u013302168/article/details/122475805)

[【k.11】python+appium+雷电模拟器 app自动化测试 demo 教学-CSDN博客](https://blog.csdn.net/u010442381/article/details/114479291)

[Appium+Python+雷电模拟器自动化测试 - hao_guo - 博客园 (cnblogs.com)](https://www.cnblogs.com/1527275083gj/p/15032138.html)

## 链接报错

![image-20231126200922634](pics/appium/image-20231126200922634.png)

![image-20231126200850979](pics/appium/image-20231126200850979.png)

![image-20231126200830470](pics/appium/image-20231126200830470.png)

### server-client连接报错

```bash
appium --base-path /wd/hub 
```

![And use this setting in the Appium inspector](pics/appium/9wOT7.png)

[如何找到要测试的apk的包名和主类名-CSDN博客](https://blog.csdn.net/zhangchaoy/article/details/42744485)

### adb连接不到夜神模拟器

[解决adb连接夜神模拟器报错adb server version (36) doesn‘t match this client (41)； killing..._adb server version (36) doesn't match this client -CSDN博客](https://blog.csdn.net/qq_45015629/article/details/117950170)

### 查看app包名和启动类名

[查看Android应用包名、Activity的几个方法 - CodeAntenna](https://codeantenna.com/a/ro9mFhHMKK#:~:text=android adb查看应用,(adbshellamstart-n包名%2F包名＋类名)adbshellamstart-ncom.android.fcc.espressif%2Fcom.android.fcc_app.MainActivity查看activity名： (1)启动要查看的程序； (2)命令行输入：adbshelldumpsyswindoww|findstr%2F|findst)

## 抖音案例

```json
// path = '/data/app/com.ss.android.ugc.aweme-1/base.apk'
// path "D:\Downloads\aweme_aweGW_v1015_270801_2fbe_1700577420.apk"
```



