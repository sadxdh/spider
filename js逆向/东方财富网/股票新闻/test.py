import time

import requests


headers = {
    'Accept': '*/*',
    'Accept-Language': 'en-US,en;q=0.9,zh;q=0.8',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    # 'Cookie': 'qgqp_b_id=625dbb8b4141ccdc7443576664d69c77; HAList=ty-1-688195-%u817E%u666F%u79D1%u6280%2Cty-90-BK1002-%u6FC0%u5149%u96F7%u8FBE; emshistory=%5B%22%E4%B9%85%E5%85%B6%E8%BD%AF%E4%BB%B6%22%2C%22%E6%B5%B7%20%E5%88%A9%20%E5%BE%97%22%2C%22%E9%A6%96%E5%88%9B%E8%AF%81%E5%88%B8%22%2C%22%E5%90%91%E6%97%A5%E8%91%B5%22%2C%22%E5%BE%AE%E7%94%B5%E7%94%9F%E7%90%86%22%2C%22%E5%BE%AE%E7%94%B5%E7%94%9F%E7%90%86-U%22%2C%22603863%22%2C%22%E8%AF%BA%E8%AF%9A%E5%81%A5%E5%8D%8E-U%22%2C%22%E8%85%BE%E6%99%AF%E7%A7%91%E6%8A%80%22%5D; st_si=94507543172056; st_asi=delete; st_pvi=30794749421861; st_sp=2023-12-05%2019%3A24%3A38; st_inirUrl=https%3A%2F%2Fwww.bing.com%2F; st_sn=8; st_psi=20231224172547814-118000300905-1985459039',
    'Pragma': 'no-cache',
    'Referer': 'https://so.eastmoney.com/news/s?keyword=%E8%85%BE%E6%99%AF%E7%A7%91%E6%8A%80&type=title',
    'Sec-Fetch-Dest': 'script',
    'Sec-Fetch-Mode': 'no-cors',
    'Sec-Fetch-Site': 'same-site',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
    'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Microsoft Edge";v="120"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
}

params = {
    'cb': f'jQuery35105665421069276979_{round(time.time()*1000)}',
    'param': '{"uid":"","keyword":"腾景科技","type":["cmsArticleWebOld"],"client":"web","clientType":"web",'
             '"clientVersion":"curr","param":{"cmsArticleWebOld":{"searchScope":"title","sort":"default",'
             '"pageIndex":1,"pageSize":20,"preTag":"<em>","postTag":"</em>"}}}',
    '_': round(time.time()*1000),
}

response = requests.get('https://search-api-web.eastmoney.com/search/jsonp', params=params, headers=headers)

print(response.status_code)
print(response.text)