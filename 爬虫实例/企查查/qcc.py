import requests
from lxml import etree

headers = {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'cache-control': 'max-age=0',
    'cookie': 'qcc_did=1e2974218871425881f8846292274d32; acw_tc=a3b523ac16726556783761763e236635964664490a9fb51b5da66f2bb4; QCCSESSID=5286068e6a146f9b23cc9749c8',
    'referer': 'https://www.qcc.com/',
    'sec-ch-ua': '"Chromium";v="106", "Microsoft Edge";v="106", "Not;A=Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36 Edg/106.0.1370.42',
}
resp = requests.get('https://www.qcc.com/web/search?key=%E6%AF%94%E4%BA%9A%E8%BF%AA', headers=headers)
resp.encoding = 'utf-8'
# print(resp.text)
html = etree.parse(resp.text, etree.HTMLParser())
result = html.xpath('')
print(result)


