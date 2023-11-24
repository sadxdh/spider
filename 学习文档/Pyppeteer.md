# Pyppeteer

Pyppeteer其实是Puppeteer的Python版本，下面简单介绍下Pyppeteer的两大特点，chromium浏览器和asyncio框架：

1).chromium
Chromium是一款独立的浏览器，是Google为发展自家的浏览器Google Chrome而开启的计划，相当于	Chrome的实验版，Chromium的稳定性不如Chrome但是功能更加丰富，而且更新速度很快，通常每隔数小时	就有新的开发版本发布。
 Pyppeteer的web自动化是基于chromium来实现的，由于chromium中某些特性的关系，Pyppeteer的安	装配置非常简单，关于这一点稍后我们会详细介绍。

2).asyncio
asyncio是Python的一个异步协程库，自3.4版本引入的标准库，直接内置了对异步IO的支持，号称是	Python最有野心的库，官网上有非常详细的介绍。
由于Pyppeteer是	基于asyncio实现的，所以它本身就支持异步操作，执行效率得到大幅提升。

3).安装
使用pip install pyppeteer命令就能完成pyppeteer库的安装，至于chromium浏览器，只需要一条	pyppeteer-install命令就会自动下载对应的最新版本chromium浏览器到pyppeteer的默认位置。
如果不运行pyppeteer-install命令，在第一次使用pyppeteer的时候也会自动下载并安装chromium浏览器，效果是一样的。总的来说，pyppeteer比起selenium省去了driver配置的环节。
当然，出于某种原因，也可能会出现chromium自动安装无法顺利完成的情况，这时可以考虑手动安装：首先，从下列网址中找到自己系统的对应版本，下载chromium压缩包；
1、'linux': 'https://storage.googleapis.com/chromium-browser-snapshots/Linux_x64/575458/chrome-linux.zip'
2、'mac': 'https://storage.googleapis.com/chromium-browser-snapshots/Mac/575458/chrome-mac.zip'
3、'win32': 'https://storage.googleapis.com/chromium-browser-snapshots/Win/575458/chrome-win32.zip'
4、'win64': 'https://storage.googleapis.com/chromium-browser-snapshots/Win_x64/575458/chrome-win32.zip'

```python
import asyncio
import time
from pyppeteer import launch

async def main():
    url = 'http://bond.sse.com.cn/data/statistics/monthly/mainbond/'
    browser = await launch()
    page = await browser.newPage()
    await page.goto(url)
    
    for lyear in range(2016, 2024):  # Loop through years from 2016 to 2023
        for month in range(1, 13):
            print(f'{lyear}-{month}')
            await page.select('#year', f'{lyear}')
            await page.select('#month', f'{month}')
            
            element = await page.waitForXPath('//*[@id="wrap"]/input')
            box = await element.boundingBox()
            target_x = box['x'] + box['width'] // 2
            target_y = box['y'] + box['height'] // 2
            await page.mouse.click(target_x, target_y)
            
            time.sleep(2)
            html = await page.content()
            with open(f'{lyear}-{month}.html', 'w', encoding='utf-8') as f:
                f.write(html)
    
    await browser.close()

asyncio.get_event_loop().run_until_complete(main())
```

引自：http://test.blog2019.net:84/post/10