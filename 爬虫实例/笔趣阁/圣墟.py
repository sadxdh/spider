import re
import requests
from lxml import etree
import parsel
import os
import time

headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Cookie': 'Hm_lvt_ca8920a71f6d98be8dd66f93f0ec3af0=1650472302,1650534094,1650540624; fikker-XaXo-BmJs=8aRLfeB909TcI9Km4UrWJu2uL98Gb9D3; fikker-XaXo-BmJs=8aRLfeB909TcI9Km4UrWJu2uL98Gb9D3; Hm_lpvt_ca8920a71f6d98be8dd66f93f0ec3af0=1650548713; security_session_verify=7f8ac6880fe4154946b98721ea39a21b',
    'Host': 'www.qbiqu.com',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36'
}
url = 'https://www.qbiqu.com/0_264/'
response = requests.get(url, headers=headers)
response.encoding = 'gbk'
html = response.text
# print(html)
# sa = re.findall('<dd>(.*?)</a></dd>', html)   # 正则匹配主页面
# print(sa)
main_page = etree.HTML(html)
name = main_page.xpath('//*[@id="info"]/h1/text()')[0]
print(name)
# if not os.path.exists(name):          # 创建小说文件夹
#     os.mkdir(name)
div = main_page.xpath('//*[@id="list"]/dl/dd')[9:]  # 异常章节数，减一
# print(div)  # https://www.qbiqu.com/
href = ["https://www.qbiqu.com" + d.xpath('./a/@href')[0] for d in div]
title = [d.xpath('./a/text()')[0] for d in div]
# print(href, title, sep='\n')
# print(len(href), len(title), sep='\n')
for h, t in zip(href, title):
    time.sleep(1)
    print("开始爬取\t", t)
    response = requests.get(h, headers=headers)
    response.encoding = 'gbk'  # 解码
    page = response.text
    # print(page)
    p = etree.HTML(page)
    page = p.xpath('//*[@id="content"]/text()')
    # print(page)
    txt = ''.join(page[::2])
    # print(txt)
    # t = re.sub(r'[\\\/\:\*\?\"\<\>\|\n]', '_', t)         # 去除不符合win10命名规范的字符
    # with open(name + '/' + t + '.txt', 'w', encoding='utf-8') as f:  # 写入编码   # 保存章节到文件夹
    #     f.write(txt)
    with open(name + '.txt', 'a', encoding='utf-8') as f:  # 写入编码   # 将所有章节保存到一个文件
        f.write(t + '\n')
        f.write(txt)
        f.write('===============================================================\n')
print("爬取结束")
