import time

from selenium import webdriver

# Add your cookies and headers to the webdriver
headers = {
    'Host': 'www.tinghaolook.com',
    'Connection': 'keep-alive',
    'Cache-Control': 'max-age=0',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 7.1.2; SM-G977N Build/LMY48Z; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/92.0.4515.131 Mobile Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'X-Requested-With': 'com.android.browser',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-User': '?1',
    'Sec-Fetch-Dest': 'document',
    'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
}

mobileEmulation = {"deviceMetrics": {"width": 375, "height": 667, "pixelRatio": 2.0},
                   "userAgent": "Mozilla/5.0 (Linux; U; Android 4.0.4; en-gb; GT-I9300 Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30"}
options = webdriver.ChromeOptions()
options.binary_location = 'D:\\Program Files\\chrome-win64\\chrome.exe'
options.add_experimental_option('mobileEmulation', mobileEmulation)
options.add_argument('--disable-gpu')
options.add_argument('--window-size=1280,1024')
driver = webdriver.Chrome(options=options)

# Set the headers
driver.execute_cdp_cmd('Network.setUserAgentOverride', {"userAgent": headers['User-Agent']})

# Navigate to the URL
url = 'https://www.tinghaolook.com/book/258018574614597/258018579501126.html'
driver.get(url)

time.sleep(20)  # 5 秒钟等待页面加载

# 获取渲染后的源码
rendered_html = driver.page_source

# 打印渲染后的源码
print(rendered_html)

# Close the WebDriver
driver.quit()
