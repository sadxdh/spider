import time
import requests
import random

rnd = 'callbackdata' + str(random.randint(1, 10000000))

headers = {
    'Accept': '*/*',
    'Accept-Language': 'en-US,en;q=0.9,zh;q=0.8',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    # 'Cookie': 'qgqp_b_id=625dbb8b4141ccdc7443576664d69c77; emshistory=%5B%22688180%22%2C%22600225%22%2C%22%E4%B8%9C%E6%96%B9%E8%B4%A2%E5%AF%8C%22%2C%22%E7%BB%B4%E8%BF%9C%E8%82%A1%E4%BB%BD%22%2C%22%E4%B9%85%E5%85%B6%E8%BD%AF%E4%BB%B6%22%2C%22%E6%B5%B7%20%E5%88%A9%20%E5%BE%97%22%2C%22%E9%A6%96%E5%88%9B%E8%AF%81%E5%88%B8%22%2C%22%E5%90%91%E6%97%A5%E8%91%B5%22%2C%22%E5%BE%AE%E7%94%B5%E7%94%9F%E7%90%86%22%2C%22%E5%BE%AE%E7%94%B5%E7%94%9F%E7%90%86-U%22%5D; websitepoptg_api_time=1706190422301; st_si=28229475543494; HAList=ty-1-603958-%u54C8%u68EE%u80A1%u4EFD%2Cty-0-000068-%u534E%u63A7%u8D5B%u683C%2Cty-0-300059-%u4E1C%u65B9%u8D22%u5BCC%2Cty-1-688195-%u817E%u666F%u79D1%u6280%2Cty-90-BK1002-%u6FC0%u5149%u96F7%u8FBE; st_pvi=30794749421861; st_sp=2023-12-05%2019%3A24%3A38; st_inirUrl=https%3A%2F%2Fwww.bing.com%2F; st_sn=6; st_psi=20240125215830803-113200354966-3366382716; st_asi=20240125215830803-113200354966-3366382716-web.xgnhqdy.zx.ggzx-qh-10',
    'Pragma': 'no-cache',
    'Referer': 'https://quote.eastmoney.com/ztb/detail',
    'Sec-Fetch-Dest': 'script',
    'Sec-Fetch-Mode': 'no-cors',
    'Sec-Fetch-Site': 'same-site',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
    'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Microsoft Edge";v="120"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
}

params = {
    'cb': rnd,
    'ut': '7eea3edcaed734bea9cbfc24409ed989',  # 写死的
    'dpt': 'wz.ztzt',
    'Pageindex': '0',
    'pagesize': '20',
    'sort': 'fbt:asc',
    'date': '20240125',
    '_': round(time.time() * 1000),
}

response = requests.get('https://push2ex.eastmoney.com/getTopicZTPool', params=params, headers=headers)

print(response.status_code)
print(response.text)
