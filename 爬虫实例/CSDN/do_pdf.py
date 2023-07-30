# https://blog.csdn.net/fei347795790/article/list/1
import subprocess
import requests
import re
from bs4 import BeautifulSoup

html_str = """
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Document</title>
</head>
<body>
{article}
</body>
</html>
"""

headers = {
    'Referer': 'https://blog.csdn.net/fei347795790/article/list/1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36 Edg/100.0.1185.44'
}

response = requests.get('https://blog.csdn.net/fei347795790/article/list/1', headers=headers)
html = response.text
html_B = BeautifulSoup(response.text, "html.parser")
divs = html_B.find_all('div', {"class": "article-item-box csdn-tracking-statistics"})
# # print(divs)
# urls = []
# titles = []
for div in divs:
    url = div.find('h4').find('a')['href']
    titled = div.find('h4').find('a').get_text()
    title = re.sub("[\s原创]", '', titled)
# print(urls, '\n', len(urls))
# print(titles, '\n', len(titles))
    COMMAND = f'C:\\Users\\Administrator\\Desktop\\Python\\小爬虫\\CSDN\\wkhtmltopdf\\bin\\wkhtmltopdf.exe {url} C:\\Users\\Administrator\\Desktop\\{title}.pdf'
    subprocess.run(COMMAND, shell=True)  # 不能保存gif到pdf
