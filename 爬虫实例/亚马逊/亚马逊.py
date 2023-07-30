import requests     # 发送请求 第三方模块
import parsel
import csv
import json

with open('亚马逊.csv', mode='a', encoding='utf-8', newline='') as f:
    # 要使用csv模块去写入数据
    csv_writer = csv.writer(f)
    csv_writer.writerow(['title', 'price', 'img_src', 'detail_url', 'info_str'])
# 伪装
headers = {
    # 身份信息
    'Cookie': 'session-id=460-4132650-8765807; i18n-prefs=CNY; ubid-acbcn=457-7935785-7667244; session-id-time=2082787201l; csm-hit=adb:adblk_no&t:1652703658756&tb:13FNFW15GZHGZ54ZBFSE+s-M7TZRGA14MCCVCNBG359|1652703658756; session-token="d4TSPf2QZ74zvH5hfZyJQqPLYkve8nQ2SGBfRpDdSZpcaiuCTTCjTfsEY5U1gRZIOFCN1zhRfBsJUBS/JNV4SmNdjfrxzjql0sRGo0T1JKxLRmKw6gVzJ9fUbQWt8rYWYb8b650POop4DFf8W2nK7T1QHJsOx3YMpu9m6gvSuBPRDFOgurNx5O68NtrfjT+mNAzjRx8NzdCHFjuOoymv2Q=="',
    # 防盗链
    'Referer': 'https://www.amazon.cn/gp/browse.html?node=106200071&ref_=nav_em__pc_notebook_0_2_3_2',
    # 浏览器基本信息
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36'
}
# 链接
url = 'https://www.amazon.cn/s?rh=n%3A106200071&fs=true&ref=lp_106200071_sar'
# 1. 发送请求
response = requests.get(url=url, headers=headers)
# <Response [200]>: 请求成功
# 2. 获取数据
html_data = response.text
# 3. 解析数据
select = parsel.Selector(html_data)
divs = select.css('.a-section.a-spacing-base')
for div in divs:
    # 提取标签属性
    # img_src = div.css('.s-image::attr(src)').get()
    # title = div.css('.a-size-base-plus.a-color-base.a-text-normal::text').get()
    # 提取标签文本内容
    # price = div.css('.a-offscreen::text').get()
    detail_url = 'https://www.amazon.cn' + div.css('.a-link-normal.s-no-outline::attr(href)').get()
    # 访问详情页
    detail_html = requests.get(detail_url, headers=headers).text
    # 提取详情页数据
    detail_select = parsel.Selector(detail_html)
    title = detail_select.css('#productTitle::text').get()
    img_src = detail_select.css('#imgTagWrapperId img::attr(src)').get()
    price = detail_select.css('.a-offscreen::text').get()
    # th
    ths = detail_select.css("#productDetails_techSpec_section_1 th::text").getall()
    # td
    tds = detail_select.css("#productDetails_techSpec_section_1 td::text").getall()
    # 表格数据进行处理 方便我们之后写入到表格当中
    data_zip = zip(ths, tds)
    info_dict = {}
    for data in data_zip:
        # 去除空格
        content = data[1].strip()
        # 数据添加到字典里面
        info_dict[data[0]] = content
    print(info_dict)
    info_str = json.dumps(info_dict)
    # 4. 保存数据
    with open('亚马逊.csv', mode='a', encoding='utf-8', newline='') as f:
        # 要使用csv模块去写入数据
        csv_writer = csv.writer(f)
        csv_writer.writerow([title, price, img_src, detail_url, info_str])