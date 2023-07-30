import pandas as pd
import os
import requests
import concurrent.futures
import time
import urllib3
urllib3.disable_warnings()


def handle_data(filename):
    df = pd.read_csv(filename)
    lit = list(df['图片链接'])
    print(f"共得到{len(lit)}条图片链接")
    return lit  # 返回列表


def mkdir(dir_name):
    if not os.path.exists(dir_name):
        os.mkdir(dir_name)
    print("文件夹名称为：", dir_name)


def download(num, url):
    # num = len(os.listdir(dir_name))  # 统计文件夹中的文件个数
    with open(f'{dir_name}/{num}.jpg', 'wb') as f:
        f.write(requests.get(url, verify=False).content)


def threads(dir_name, urls):
    num = len(os.listdir(dir_name))  # 统计文件夹中的文件个数
    start_time_2 = time.time()
    # 线程池 避免创建过多线程
    with concurrent.futures.ThreadPoolExecutor(max_workers=50) as executor:  # 56秒
        for url in urls:
            executor.submit(download, num, url)
            num = num + 50
    print("线程池计算的时间：" + str(time.time() - start_time_2), "秒")


if __name__ == '__main__':
    filename = '狗头萝莉.csv'  # 文件名  最后使用命令行参数获取
    dir_name = filename.split('.')[-2]  # 提取文件名
    urls = handle_data(filename)  # 提取链接
    mkdir(dir_name)  # 判断是否创建文件夹
    download(dir_name, urls)
    threads(dir_name, urls)
