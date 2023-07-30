# _--------------------爬取百度贴吧搜索某个贴吧的前十页
import requests, os

base_url = 'https://tieba.baidu.com/f?'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36',
}
dirname = './tieba/woman/'
if not os.path.exists(dirname):
    os.makedirs(dirname)
for i in range(0, 10):
    params = {
        'ie': 'utf-8',
        'kw': '美女',
        'pn': str(i * 50)
    }
    response = requests.get(base_url, headers=headers, params=params)
    with open(dirname + '美女第%s页.html' % (i + 1), 'w', encoding='utf-8') as file:
        file.write(response.content.decode('utf-8'))