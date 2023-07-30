import re
from concurrent.futures import ThreadPoolExecutor
import requests
from lxml import etree


def page(url):
    response = requests.get(url)
    html = response.text
    page_html = etree.HTML(html)
    # print(page_html)                   # div[5] 索引起始为0 解决方法：输出标签名，到原网页查找
    bookname = page_html.xpath('/html/body/div[1]/div[4]/div/div[2]/h1/text()')[0]
    content = page_html.xpath('/html/body/div[1]/div[4]/div/div[3]/p/text()')
    # content = '\n'.join([c.strip('\r\n\xa0\xa0\xa0\xa0') for c in content])
    content = ''.join(content)
    print(bookname)
    # print(content)
    with open('斗破苍穹/' + bookname + '.txt', 'w', encoding='utf-8') as f:
        f.write(content)


if __name__ == "__main__":
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36'
    }
    main_resp = requests.get('http://www.cits0871.com/booktxt/25521/')
    # print(main_resp.text)
    urls = re.findall('<dd><a href="(.*?)">', main_resp.text)
    urls = ['http://www.cits0871.com' + url for url in urls]
    # print(urls)
    for url in urls:
        page(url)
    print("开始下载")
    with ThreadPoolExecutor(50) as t:
        for url in urls:
            t.submit(page, urls[i])
    print("下载完毕")
    # page('http://www.cits0871.com/booktxt/25521/14437301.html')
