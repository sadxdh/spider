import requests
from bs4 import BeautifulSoup
import os
import concurrent.futures
import time


def crawl():
    page_urls = []
    lst = [''] + [f'/{i}' for i in range(1, 36)]
    urls = [
        f'https://www.mastc.edu.cn/xyxw{page}.htm'
        for page in lst
    ]
    for i in urls:
        page = requests.get(i)
        page.encoding = 'utf-8'
        soup = BeautifulSoup(page.text, 'html.parser')
        news_list = soup.find_all('div', {"class": "news_list"})
        for new in news_list:
            las = new.find_all('a', {"target": "_blank"})
            # print(las)
            page_urls = page_urls + ["https://www.mastc.edu.cn/" + a.attrs['href'] for a in las][::2]
    return page_urls


def parse(url):
    page = requests.get(url)
    page.encoding = 'utf-8'
    soup = BeautifulSoup(page.text, 'html.parser')
    h3 = soup.find('h3').text
    print(h3)
    if not os.path.exists(h3):
        os.mkdir(h3)

    pg = soup.find('div', {"class": "v_news_content"}).find_all('p')
    for p in pg:
        with open(f'{h3}/{h3}.txt', 'a') as f:
            f.write(p.text + '\n')

    pg = soup.find('div', {"class": "v_news_content"}).find_all('p', {"style": "text-align: center"})
    n = 0
    for p in pg:
        pic_url = 'https://www.mastc.edu.cn/' + p.img.attrs['src']
        with open(f'{h3}/{n}.jpg', 'wb') as f:
            f.write(requests.get(pic_url).content)
        n = n + 1


if __name__ == '__main__':
    urls = crawl()
    # 线程池 避免创建过多线程
    start_time_2 = time.time()
    with concurrent.futures.ThreadPoolExecutor(max_workers=50) as executor:  # 227秒
        for url in urls:
            executor.submit(parse, url)
    print("线程池计算的时间：" + str(time.time() - start_time_2), "秒")
