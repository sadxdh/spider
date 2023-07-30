import os
import re
import requests

# https://i0.hdslb.com/bfs/article/7cf642a91b9e489465664d51e83d3f92ebc1c13b.jpg

resp = requests.get('https://www.bilibili.com/read/cv12457768')
html = resp.text
# print(resp.text)

data_src = re.findall('<img data-src="(.*?)"', html)
data_title = re.findall('<title data-vue-meta="true">(.*?)</title>', html)[0]
data_title = re.sub(r'[\\\/\:\*\?\"\<\>\|\n\s]', '', data_title)
# print(data_src)
if not os.path.exists("b站图片"):
    os.mkdir("b站图片")
if not os.path.exists("b站图片/" + data_title):
    os.mkdir("b站图片/" + data_title)
for data in data_src:
    file_name = data.split('/')[-1]
    data = 'https:' + data
    content = requests.get(data).content
    print(data)
    with open("b站图片/" + data_title + '/' + file_name, 'wb') as f:
        f.write(content)
