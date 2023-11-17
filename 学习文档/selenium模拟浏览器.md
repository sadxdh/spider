# selenium模拟浏览器

## 前言

之前在异步加载（AJAX）网页爬虫的时候提到过，爬取这种ajax技术的网页有两种办法：一种就是通过浏览器审查元素找到包含所需信息网页的真实地址，另一种就是通过selenium模拟浏览器的方法[[1\]](https://zhuanlan.zhihu.com/p/88152781#ref_1)。当时爬的是豆瓣，比较容易分析出所需信息的真实地址，不过一般大点的网站像淘宝这种是不好分析的，所以利用selenium模拟浏览器的行为来爬取数据是一个比较可行的办法。

## selenium基础

> Selenium是一个用于Web应用程序测试的工具。Selenium测试直接运行在浏览器中，就像真正的用户在操作一样。支持的浏览器包括IE（7, 8, 9, 10, 11），[Mozilla Firefox](https://link.zhihu.com/?target=https%3A//baike.baidu.com/item/Mozilla%20Firefox/3504923)，Safari，Google Chrome，Opera等。这个工具的主要功能包括：**测试与浏览器的兼容性**——测试你的应用程序看是否能够很好得工作在不同浏览器和操作系统之上。**测试系统功能**——创建回归测试检验软件功能和用户需求。支持**自动录制动作和自动生成** .Net、Java、Perl等不同语言的**测试脚本**。 ——百度百科对selenium的定义

可以看到selenium最开始不是用于爬虫的而是一款web开发的测试工具，简单点解释：可以操控浏览器做人类浏览网页的动作，比如：鼠标点击、拖拽；用户输入，表单填充；Cookie；等等，当然通过它得到ajax网页的真实数据也不在话下。

**selenium教程**：[https://www.yiibai.com/selenium](https://link.zhihu.com/?target=https%3A//www.yiibai.com/selenium)

## 利用selenium+Chromedriver模拟操作

```python
from selenium import webdriver # 从selenium导入webdriver
import time
url = 'https://www.jd.com/'
driver = webdriver.Chrome()  # 声明调用Chrome
driver.get(url) # 获取京东页面

input = driver.find_element_by_xpath('//*[@id="key"]')#获取输入框
input.send_keys('iphone')#输入搜索关键词
driver.find_element_by_xpath('//*[@id="search"]/div/div[2]/button').click()#点击搜索按钮

js="var q=document.documentElement.scrollTop=100000"#将滚动条移动到页面底部的js语句
driver.execute_script(js)#执行上面移动滚动条的js语句
time.sleep(5)#睡眠，等待异步加载的数据加载完成

#获取文本信息时selenium中的xpath语法与之前区别：前面是在xpath路径后加/text()，而selenium是整个语句后面加.text
prices = driver.find_elements_by_xpath('//*[@id="J_goodsList"]/ul/li/div/div[3]/strong/i')
names = driver.find_elements_by_xpath('//*[@id="J_goodsList"]/ul/li/div/div[4]/a/em')
print(len(names))#京东每页有60个商品信息，检查爬取数据是否完整

for name,price in zip(names,prices):
    print(name.text.replace('\n',''),price.text)
driver.quit()#退出
```

## 常用方法

1. find_elements_by_id # ID
2. find_elements_by_class_name # class
3. find_elements_by_tag_name # 标签名
4. find_elements_by_name # name
5. find_elements_by_link_text # a标签中的text查找（精确匹配）
6. find_elements_by_partial_link_text #a标签中的text查找（部分匹配即可）
7. find_elements_by_css_selector # css选择器查找
8. find_elements_by_xpath # **find_elements_by_xpath("//input")**

## 自动下拉操作

若要对页面中的内嵌窗口中的多个滚动条进行操作，要先定位到该内嵌窗口，在进行滚动条操作
使用这个方法：（其中，scall是这个div的class的名字，如过就一个这种div，直接中括号后面用0就可以，如果多个滑动div的class的name一样，需要先找找你需要下拉的div是第几个，如果是第三个，把下面[0],改为[2]）

```python
js='document.getElementsByClassName("scroll")[0].scrollTop=10000' 
# 就是这么简单，修改这个元素的scrollTop就可以
driver.execute_script(js)
```

或者

```python
js="var q=document.getElementById('id').scrollTop=100000" 
driver.execute_script(js) 
time.sleep(3) 
```

![在这里插入图片描述](pic/selenium%E6%A8%A1%E6%8B%9F%E6%B5%8F%E8%A7%88%E5%99%A8/20190418153104477.png)

图上是js的获得元素的方法都可以使用，比如div的name，tagname
JavaScript学习链接http://www.runoob.com/jsref/dom-obj-document.html

### 滑动整个大的页面到底部

方法1

```python
driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
```

方法2

```python
#将滚动条移动到页面的底部
js="var q=document.documentElement.scrollTop=100000"  
driver.execute_script(js)  
time.sleep(3)  
```

### 滚动条移动到页面的顶部

```python
js="var q=document.documentElement.scrollTop=0"  
driver.execute_script(js)  
time.sleep(3)  
```



## 小结

本文只是对selenium+webdriver爬虫做了一个简单的介绍及应用，起到一个抛砖引玉的作用，要想利用好这个工具还需要后期查看更多的资料进行补充学习，上面介绍的**Chromedriver爬虫效率还很低**，后期可以使用**Chrome的无头浏览器模式**即**headless模式**，设置**无图属性**不用加载图片等方法，提升selenium模拟浏览器爬虫效率。