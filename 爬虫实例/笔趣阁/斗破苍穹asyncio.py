# requests main_page 获取cid
# 异步请求子页面 下载小说
import asyncio
import aiofiles
import aiohttp
import requests
from lxml import etree


async def child_page(title, url):
    url = f'http://m.cits0871.com{url}'
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as resp:
            result = await resp.text()  # 定义协程第二步   # 获取结果
            page_html = etree.HTML(result)
            content = page_html.xpath('/html/body/div[1]/div[4]/div/div[3]/p/text()')
            # content = '\n'.join([c.strip('\r\n\xa0\xa0\xa0\xa0') for c in content])
            content = ''.join(content)
            # print(content)
            async with aiofiles.open('斗破苍穹_asyncio/' + title + '.txt', 'w') as f:
                await f.write(content)


async def main_page(url):  # 获取cid  返回cid_list
    main_resp = requests.get('http://www.cits0871.com/booktxt/25521/')
    # print(main_resp.text)
    href = etree.HTML(main_resp.text)
    tasks = []
    titles = href.xpath('/html/body/div[1]/div[6]/div/dl/dd/a/text()')
    urls = href.xpath('/html/body/div[1]/div[6]/div/dl/dd/a/@href')
    for i in range(len(titles)):
        # print(titles[i], urls[i])
        tasks.append(child_page(titles[i], urls[i]))
    await asyncio.wait(tasks)


if __name__ == '__main__':
    headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Connection': 'keep-alive',
        'Cookie': 'Hm_lvt_b79131adbb7e493f7cf85bcdce9a0983=1650685512,1650685527,1650721544; SL_G_WPT_TO=zh; SL_GWPT_Show_Hide_tmp=1; SL_wptGlobTipTmp=1; Hm_lpvt_b79131adbb7e493f7cf85bcdce9a0983=1650721553',
        'Host': 'www.cits0871.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36'
    }
    url = 'http://www.cits0871.com/booktxt/25521/'
    asyncio.run(main_page(url))
