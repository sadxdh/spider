import multiprocessing
import time
import threading
import requests
import re
import os

headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.66 Safari/537.36 Edg/103.0.1264.44'
}

proxies_dict = {
    "http": "http://183.247.199.126:30001",
    "https": "https://183.247.199.126:30001"
}
'''
103.37.141.69:80
183.247.199.120:30001
47.106.105.236:80
111.3.118.247:30001
183.247.199.126:30001
'''
urls = [
    f"https://www.wonderpi.com/2/30/{page}.html"  # 22 26.252297401428223
    for page in range(1, 2 + 1)
]

url = "https://www.wonderpi.com/2/30/1.html"

root_dir = "喵糖映画"
if not os.path.exists(root_dir):
    os.mkdir(root_dir)


def craw(url):
    r = requests.get(url, headers, proxies=proxies_dict)
    html = r.text
    file_names = []
    pic_urls = re.findall('data-src="(.*?)"', html)  # 正则提取所有src
    for picUrl in pic_urls:
        file_names.append(picUrl.split('/')[-1])  # 提取文件名（包含后缀名）
    return pic_urls, file_names


def parser(pic_url, file_name):
    file_local = "喵糖映画/" + file_name
    with open(file_local, "wb") as fout:  # r+：insert覆盖、w+：清空内容后输入、a+：追加输入
        response = requests.get(pic_url, headers)
        fout.write(response.content)  # 保存数据


# def single_thread():
#     for url in urls:
#         print(url)
#         craw(url)


# def multi_thread():
#     threads = []  # 线程列表
#
#     for url in urls:
#         print(url)
#         threads.append(  # 添加线程
#             threading.Thread(target=craw, args=(url,))  # 参数为元组类型，此处不加逗号则为字符串，加逗号使其表示为元组
#         )
#     for thread in threads:
#         thread.start()
#
#     for thread in threads:
#         thread.join()  # 等待结束


if __name__ == '__main__':

    pic_urls, file_names = craw(url)
    start_time = time.time()
    for url, filename in zip(pic_urls, file_names):
        parser(url, filename)
    print("single_thread\t", time.time() - start_time)  # 13

    # pic_urls, file_names = craw(url)
    # start_time = time.time()
    # for url, filename in zip(pic_urls, file_names):
    #     threading.Thread(target=parser, args=(url, filename)).start()
    # while len(threading.enumerate()) > 1:
    #     time.sleep(0.005)
    # print("multi_thread\t", time.time() - start_time)  # 19

    # pic_urls, file_names = craw(url)
    # start_time = time.time()
    # for url, filename in zip(pic_urls, file_names):
    #     print(url, filename)
    #     multiprocessing.Process(target=parser, args=(url, filename)).start()
    # print("multi_process\t", time.time() - start_time)  # 24
