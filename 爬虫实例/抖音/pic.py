import requests
import os
from lxml import etree
import re

headers = {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'cache-control': 'max-age=0',
    'referer': 'https://www.douyin.com/note/7196694069781794105',
    'sec-ch-ua': '"Chromium";v="106", "Microsoft Edge";v="106", "Not;A=Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'same-origin',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36 Edg/106.0.1370.42',
}


def getshareurl(sharetext):
    # 提取抖音分享中的url
    return re.findall(r'([a-zA-z]+://[^\s]*)', sharetext)[0]


def redirectDeal(url):
    resp = requests.get(url, headers=headers)
    reditList = resp.history  # 可以看出获取的是一个地址序列
    print(f"请求结果：{reditList}")
    print(f'获取重定向最终的url：{reditList[-1].headers["location"]}')
    # 返回目标地址
    return reditList[len(reditList) - 1].headers["location"]


def getModalId(douyinshareredirecturl):
    # 从抖音分享重定向的目标url提取出modal_id
    modal_id = douyinshareredirecturl.split('?')[0].split('/')[-2]
    print(f"modal_id:{modal_id}")
    return modal_id


def modalIdRequesturl(modal_id, headers):
    return requests.get(f'https://www.douyin.com/note/{modal_id}', headers=headers)


def getPicurl(html):
    page = etree.HTML(html)
    dir_title = page.xpath('//div[@class="yy223mQ8"]//text()')[0]
    url_list = page.xpath('//div[@class="_FcCU_P7"]/div[2]/div/img/@src')
    print(f"作者/文件夹名：{dir_title}")
    print(f"图片url列表：{url_list}")
    return dir_title, url_list


def picMkdir(dir_title):
    root_dir = 'pics'
    if not os.path.exists(root_dir):
        os.mkdir(root_dir)
    file_local = root_dir + '/' + dir_title
    if not os.path.exists(file_local):
        os.mkdir(file_local)
    return file_local


def picDownload(file_local, url_list):
    print(f"共{len(url_list)}张图片，开始保存。。。")
    for url in url_list:
        files = os.listdir(file_local)  # 读入文件夹
        num_pic = len(files)  # 统计文件夹中的文件个数
        url_content = requests.get(url, headers=headers).content
        with open(file_local + '/' + str(num_pic) + '.jpeg', mode='wb') as f:
            f.write(url_content)
    print(f"共{len(url_list)}张图片，保存成功")


def sharetextmain(sharetext):
    # 抖音分享链接文字--提取分享链接--获取重定向后的真实目标链接--请求目标网页--创建保存路径--保存文件
    shareurl = getshareurl(sharetext)
    realurl = redirectDeal(shareurl)
    modal_id = getModalId(realurl)
    dir_title, url_list = getPicurl(modalIdRequesturl(modal_id, headers=headers).text)
    file_local = picMkdir(dir_title)
    picDownload(file_local, url_list)


def modalidmain(modal_id):
    dir_title, url_list = getPicurl(modalIdRequesturl(modal_id, headers=headers).text)
    file_local = picMkdir(dir_title)
    picDownload(file_local, url_list)


def pageurlmain(pageurl):
    dir_title, url_list = getPicurl(requests.get(pageurl, headers=headers).text)
    file_local = picMkdir(dir_title)
    picDownload(file_local, url_list)


if __name__ == '__main__':
    # 不要求同一作者
    pageurllist = [
        'https://www.douyin.com/note/7195390564567764284',
        'https://www.douyin.com/note/7194261899452714251',
        'https://www.douyin.com/note/7144688406528871721',
        'https://www.douyin.com/note/7143874411068656936',
        'https://www.douyin.com/note/7151246568371375401',
        'https://www.douyin.com/note/7134692045804801280',
        'https://www.douyin.com/note/7143149621152468265'
    ]
    for pageurl in pageurllist:
        pageurlmain(pageurl)

    # # 使用sharetext保存
    # sharetextlist = [
    #     '0.58 ZMJ:/ 信息要发给秒回的人，笑容要留给对你好的人。# 唯美古风壁纸 # AI绘画  https://v.douyin.com/BAkBfa6/ 复制此链接，打开Dou音搜索，直接观看视频！',
    # ]
    # for sharetext in sharetextlist:
    #     sharetextmain(sharetext)

    # # 使用modal_id保存文件
    # modal_idlist = [
    #     '7196694069781794105',
    # ]
    # for modal_id in modal_idlist:
    #     modalidmain(modal_id)
