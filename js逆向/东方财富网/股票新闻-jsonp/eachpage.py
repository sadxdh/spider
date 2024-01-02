import json
import time
import execjs
import requests


def getexpando():
    # 读取 JavaScript 文件内容
    with open('generate_expando.js', 'r', encoding='utf-8') as file:
        js_code = file.read()
    # 创建一个 PyExecJS 上下文
    ctx = execjs.compile(js_code)
    # 执行 JavaScript 代码以获取 expando 值
    expando_value = ctx.eval('generateExpando()')
    print(expando_value)  # 输出 expando 值
    return expando_value


def crawler(expando):
    headers = {
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9,zh;q=0.8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        # 'Cookie': 'qgqp_b_id=625dbb8b4141ccdc7443576664d69c77; websitepoptg_api_time=1703657016877; HAList=ty-0-300059-%u4E1C%u65B9%u8D22%u5BCC%2Cty-1-688195-%u817E%u666F%u79D1%u6280%2Cty-90-BK1002-%u6FC0%u5149%u96F7%u8FBE; st_si=79918139819272; p_origin=https%3A%2F%2Fpassport2.eastmoney.com; emshistory=%5B%22%E4%B8%9C%E6%96%B9%E8%B4%A2%E5%AF%8C%22%2C%22%E7%BB%B4%E8%BF%9C%E8%82%A1%E4%BB%BD%22%2C%22%E4%B9%85%E5%85%B6%E8%BD%AF%E4%BB%B6%22%2C%22%E6%B5%B7%20%E5%88%A9%20%E5%BE%97%22%2C%22%E9%A6%96%E5%88%9B%E8%AF%81%E5%88%B8%22%2C%22%E5%90%91%E6%97%A5%E8%91%B5%22%2C%22%E5%BE%AE%E7%94%B5%E7%94%9F%E7%90%86%22%2C%22%E5%BE%AE%E7%94%B5%E7%94%9F%E7%90%86-U%22%2C%22603863%22%2C%22%E8%AF%BA%E8%AF%9A%E5%81%A5%E5%8D%8E-U%22%5D; st_pvi=30794749421861; st_sp=2023-12-05%2019%3A24%3A38; st_inirUrl=https%3A%2F%2Fwww.bing.com%2F; st_sn=8; st_psi=20231228113507392-118000300905-6189528866; st_asi=20231228113507392-118000300905-6189528866-dfcfwss.ssh.ryq.nrdj-1',
        'Pragma': 'no-cache',
        'Referer': 'https://so.eastmoney.com/news/s?keyword=%E4%B8%9C%E6%96%B9%E8%B4%A2%E5%AF%8C&type=title',
        'Sec-Fetch-Dest': 'script',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Site': 'same-site',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
        'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Microsoft Edge";v="120"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
    }
    params = {
        'cb': f'{expando}_{round(time.time() * 1000)}',
        'param': '{"uid":"","keyword":"东方财富","type":["cmsArticleWebOld"],"client":"web","clientType":"web",'
                 '"clientVersion":"curr","param":{"cmsArticleWebOld":{"searchScope":"title","sort":"default",'
                 '"pageIndex":1,"pageSize":20,"preTag":"<em>","postTag":"</em>"}}}',
        '_': round(time.time() * 1000),
    }
    response = requests.get('https://search-api-web.eastmoney.com/search/jsonp', params=params,
                            headers=headers)

    print(response.status_code)
    # print(response.text)
    data = response.text
    # 移除 JSONP 外层包裹
    json_data = data[data.index('(') + 1: data.rindex(')')]
    # 解析 JSON 数据
    parsed_data = json.loads(json_data)
    # 提取新闻列表
    news_list = parsed_data['result']['cmsArticleWebOld']
    # 提取链接和发布时间
    for news in news_list:
        date = news.get('date')
        url = news.get('url')
        print(f"发布时间: {date}, 链接: {url}")


crawler(getexpando())
