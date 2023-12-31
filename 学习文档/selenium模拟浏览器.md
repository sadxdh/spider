# selenium模拟浏览器

## 前言

之前在异步加载（AJAX）网页爬虫的时候提到过，爬取这种ajax技术的网页有两种办法：一种就是通过浏览器审查元素找到包含所需信息网页的真实地址，另一种就是通过selenium模拟浏览器的方法[[1\]](https://zhuanlan.zhihu.com/p/88152781#ref_1)。当时爬的是豆瓣，比较容易分析出所需信息的真实地址，不过一般大点的网站像淘宝这种是不好分析的，所以利用selenium模拟浏览器的行为来爬取数据是一个比较可行的办法。

## selenium基础

> Selenium是一个用于Web应用程序测试的工具。Selenium测试直接运行在浏览器中，就像真正的用户在操作一样。支持的浏览器包括IE（7, 8, 9, 10, 11），[Mozilla Firefox](https://link.zhihu.com/?target=https%3A//baike.baidu.com/item/Mozilla%20Firefox/3504923)，Safari，Google Chrome，Opera等。这个工具的主要功能包括：**测试与浏览器的兼容性**——测试你的应用程序看是否能够很好得工作在不同浏览器和操作系统之上。**测试系统功能**——创建回归测试检验软件功能和用户需求。支持**自动录制动作和自动生成** .Net、Java、Perl等不同语言的**测试脚本**。 ——百度百科对selenium的定义

可以看到selenium最开始不是用于爬虫的而是一款web开发的测试工具，简单点解释：可以操控浏览器做人类浏览网页的动作，比如：鼠标点击、拖拽；用户输入，表单填充；Cookie；等等，当然通过它得到ajax网页的真实数据也不在话下。

**selenium教程**：[https://www.yiibai.com/selenium](https://link.zhihu.com/?target=https%3A//www.yiibai.com/selenium)

## centos安装

### selenium+chromeium+chromedriver

1. 安装selenium：这一步比较简单，直接`pip`安装就行：

```shell
pip install selenium
```

2. 安装chromium：由于谷歌chrome并不支持linux，也就更不支持centos了，所以需要安装chromium，不过不用担心，chromium也是谷歌的开源项目，与chrome并没有太大的区别

```shell
yum install chromium
```

3.检查chromium版本

```shell
yum list installed
```

![image-20231204092620546](pic/selenium%E6%A8%A1%E6%8B%9F%E6%B5%8F%E8%A7%88%E5%99%A8/image-20231204092620546.png)

4.安装适应的chromedriver

![image-20231204092703529](pic/selenium%E6%A8%A1%E6%8B%9F%E6%B5%8F%E8%A7%88%E5%99%A8/image-20231204092703529.png)

5.测试脚本

```python
from selenium import webdriver   
from selenium.webdriver.chrome.options import Options  # 导入浏览器内核设置，主要是为了设置无头（headless）模式
url = 'www.baidu.com' 
chrome_options = Options()    
chrome_options.add_argument('--headless')  # 设置Chrome为无头模式    
driver = webdriver.Chrome(options=chrome_options)    
driver.get(url)    
driver.close() 
```

可能报错

![img](pic/selenium%E6%A8%A1%E6%8B%9F%E6%B5%8F%E8%A7%88%E5%99%A8/v2-8e25906e4aeea1dcfb0d1606b4ffa3bd_1440w.webp)

添加

```python
chrome_options.add_argument('no-sandbox')    
chrome_options.add_argument('disable-dev-shm-usage')
```

可能报错

![image-20231204092913854](pic/selenium%E6%A8%A1%E6%8B%9F%E6%B5%8F%E8%A7%88%E5%99%A8/image-20231204092913854.png)

修改url，加上https://

```python
url = 'https://www.baidu.com' 
```

## xpath提取元素

```python
a_href = driver.find_elements(By.XPATH,'//*[@id="r_con"]/table/tbody/tr[2]/td[2]/table/tbody/tr/td/a/@href')
```

```python
# selenium元素
a.text # 获取标签内容
a.get_attribute("href") # 获取标签属性@href
```

## 案例

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

9. .text提取文本.get_attribute('href')提取href属性

10. .send_keys(str(p + 1),Keys.ENTER)输入并回车

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

## 无头模式抓不到数据

假设我们要从一个网页上获取特定元素的文本信息，但在无头模式下无法成功获取数据。

```python
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

# 使用Chrome无头模式
options = Options()
options.add_argument("--headless")
driver = webdriver.Chrome(options=options)

# 打开网页
driver.get("https://example.com")

# 尝试获取元素文本
element = driver.find_element_by_xpath("//div[@class='example']")
print(element.text)

# 关闭浏览器
driver.quit()
```

如果在这个例子中遇到问题，可以尝试以下解决方法：

1. **显式等待**：使用WebDriverWait来等待元素加载完成再进行操作，以增加稳定性。

   ```python
   from selenium.webdriver.common.by import By
   from selenium.webdriver.support.ui import WebDriverWait
   from selenium.webdriver.support import expected_conditions as EC
   
   # 等待元素加载
   element = WebDriverWait(driver, 10).until(
       EC.presence_of_element_located((By.XPATH, "//div[@class='example']"))
   )
   print(element.text)
   ```

2. **模拟真实浏览器环境**：设置用户代理等参数以更接近真实浏览器的行为。

   ```python
   pythonCopy code
   options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36")
   ```

3. **调试工具**：使用Chrome开发者工具等分析网页加载过程，检查元素是否正确加载。

4. **更改抓取策略**：如果无法直接从页面获取数据，考虑尝试寻找是否存在API或其他数据源进行数据获取。

记住，这只是一些可能的解决方案。对于不同的网站和情况，可能需要尝试不同的方法来成功在无头模式下抓取数据。

## quit和close的区别

在Selenium中，`quit()`和`close()`都是用于关闭WebDriver的方法，但是有一些细微的区别：

- **`quit()`**：这个方法会关闭所有相关的浏览器窗口，并且结束WebDriver的进程。它会清理所有WebDriver打开的所有窗口、选项卡和对应的进程，释放相关的资源。通常来说，推荐在测试结束后使用`quit()`来彻底关闭WebDriver，确保资源得到释放。
- **`close()`**：这个方法用于关闭当前的浏览器窗口或选项卡，但是不会关闭WebDriver的进程。如果当前WebDriver只打开了一个窗口或选项卡，使用`close()`会关闭它，但如果WebDriver打开了多个窗口或选项卡，`close()`只会关闭当前所在的窗口或选项卡，WebDriver的其他窗口仍然保持打开状态。在这种情况下，WebDriver的进程仍然在运行。

因此，如果你想关闭整个WebDriver并释放所有相关资源，使用`quit()`是更好的选择。如果只是想关闭当前窗口或选项卡而保持WebDriver进程运行，可以使用`close()`方法。