import requests

headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.42'
}
url = 'https://cn.bing.com/images/search?q=%E7%8B%97%E5%A4%B4%E8%90%9D%E8%8E%89&form=HDRSC2&first=1&tsc=ImageHoverTitle&cw=1177&ch=952'


resp = requests.get(url)

print(resp.text)