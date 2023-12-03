import requests

cookies = {
    '_ga_GXTG7MZQ87': 'GS1.1.1701603005.1.0.1701603005.0.0.0',
    '_ga': 'GA1.1.1106621574.1701603005',
}

headers = {
    'Host': 'www.tinghaolook.com',
    'Connection': 'keep-alive',
    'Cache-Control': 'max-age=0',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 7.1.2; SM-G977N Build/LMY48Z; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/92.0.4515.131 Mobile Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'X-Requested-With': 'com.android.browser',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-User': '?1',
    'Sec-Fetch-Dest': 'document',
    # 'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
    # 'Cookie': '_ga_GXTG7MZQ87=GS1.1.1701603005.1.0.1701603005.0.0.0; _ga=GA1.1.1106621574.1701603005',
}

response = requests.get(
    'https://www.tinghaolook.com/book/258018574614597/258018579501126.html',
    cookies=cookies,
    headers=headers,
    verify=False,
)
response.encoding = 'utf-8'

# with open('firstpage.html', 'w', encoding='utf-8') as f:
#     f.write(response.text)
