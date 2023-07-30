import queue
from ip_spider import kuai_dai_li
import time
import random
import threading


def do_craw(url_queue: queue.Queue, html_queue: queue.Queue):  # 生产者
    while True:
        url = url_queue.get()  # 获取元素
        ip_list, port_list = kuai_dai_li.craw(url)  # 产出的中间数据
        html_queue.put(ip_list, port_list)  # 添加元素
        print(threading.current_thread().name, f"craw {url}", "url_queue.size=", url_queue.qsize())  # 线程名、url及其数量
        time.sleep(random.randint(1, 2))


def do_parse(html_queue: queue.Queue, fout):
    while True:
        ip_list, port_list = html_queue.get()  # 获取数据
        results = kuai_dai_li.parse(ip_list, )  # 处理数据
        for result in results:
            fout.write(str(result) + "\n")  # 保存数据
        print(threading.current_thread().name, f"results.size", len(results), "html_queue.qsize=", html_queue.qsize())
        time.sleep(random.randint(1, 2))


if __name__ == "__main__":
    url_queue = queue.Queue()  # 创建Queue
    html_queue = queue.Queue()  # 创建Queue
    for url in kuai_dai_li.urls:
        url_queue.put(url)  # 添加元素      添加后调用do_craw

    for idx in range(3):
        t = threading.Thread(target=do_craw, args=(url_queue, html_queue), name=f"craw{idx}")
        t.start()

    fout = open("02.data.txt", "w") # r+：insert覆盖、w+：清空内容后输入、a+：追加输入
    for idx in range(2):
        t = threading.Thread(target=do_parse, args=(html_queue, fout), name=f"parse{idx}")
        t.start()
