import pymongo
import requests
from lxml import etree
import time

# while True:
client = pymongo.MongoClient(host='localhost', port=27017)
db = client['news']
headers = {
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Cookie': 'scene_id=36044319',
    'Host': 'www.jsrank.cn',
    'Pragma': 'no-cache',
    'Referer': 'http://www.jsrank.cn/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36 Edg/106.0.1370.42',
    'X-Requested-With': 'XMLHttpRequest',
}
proxy = requests.get('http://47.115.205.147:5555/random').text.strip()
proxies = {
    'http': 'http://' + proxy,
    'https': 'https://' + proxy,
}
nowtime = str(time.time())
urllist = ['http://www.jsrank.cn/']
urllist = urllist + [
    f'http://www.jsrank.cn/c/news.html?type=hot&p={page}'
    for page in range(2, 10)
]
for url in urllist:
    html = requests.get(url, headers=headers, proxies=proxies).text
    page = etree.HTML(html)
    hotlist = page.xpath('//div[@class="platform-list"]/div')
    collection = db[f'{nowtime}-{str(urllist.index(url))}']
    for hot in hotlist:
        try:
            ranktitle1 = hot.xpath('./div[1]/span[1]/a/text()')[0]
            ranktitle2 = hot.xpath('./div[1]/span[2]/text()')[0]
            ranknum = hot.xpath('./div[2]/div[1]/div/span[1]/text()')
            newslist = hot.xpath('./div[2]/div[1]/div/span/a/text()')
            hotdegree = hot.xpath('./div[2]/div[1]/div/span[3]/text()')
            onenews = [{'ranknum': r, 'news': n, 'hotdegree': h} for r, n, h in zip(ranknum, newslist, hotdegree)]
            totalnews = {
                'rankname': ranktitle1 + ranktitle2,
                'onenews': onenews
            }
            result = collection.insert_one(totalnews)
            # print(result)
        except Exception:
            continue
# time.sleep(3600)
