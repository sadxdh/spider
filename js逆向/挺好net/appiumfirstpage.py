# This sample code supports Appium Python client >=2.3.0
# pip install Appium-Python-Client
# Then you can paste this into a file and simply run with Python
import time

from appium import webdriver
from appium.options.common.base import AppiumOptions
from appium.webdriver.common.appiumby import AppiumBy
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# For W3C actions
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.actions import interaction
from selenium.webdriver.common.actions.action_builder import ActionBuilder
from selenium.webdriver.common.actions.pointer_input import PointerInput

options = AppiumOptions()
options.load_capabilities({
    "platformName": "Android",
    "appium:platformVersion": "7.1.2",
    "appium:deviceName": "127.0.0.1:62025",
    "appium:appPackage": "com.android.browser",
    "appium:appActivity": "com.android.browser.BrowserActivity",
    "appium:ensureWebviewsHavePages": True,
    "appium:nativeWebScreenshot": True,
    "appium:newCommandTimeout": 3600,
    "appium:connectHardwareKeyboard": True,
    'chromedriverExecutable': 'D:/个人数据/spider/js逆向/挺好net/chromedriver.exe'
})

driver = webdriver.Remote("http://127.0.0.1:4723/wd/hub", options=options)

# 打开指定的URL
driver.get("https://www.tinghaolook.com/book/258018574614597/258018579501126.html")
# 获取所有可用的上下文
contexts = driver.contexts

# 打印所有上下文
print(contexts)

# 切换到WebView上下文
webview_context = None
for context in contexts[:-1]:
    if "WEBVIEW" in context:
        webview_context = context
        break

if webview_context:
    driver.switch_to.context(webview_context)

    # 获取 WebView 页面的源码
    webview_source = driver.page_source
    print(webview_source)
else:
    print("未找到 WebView 上下文")

# 关闭驱动程序
driver.quit()
