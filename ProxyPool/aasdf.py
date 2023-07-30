import requests

headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
    'Cookie': 'JSESSIONID=0775FBC4509F95089DC2AAA1A20949C9; TS0197d085=01886fbf6eff80de96daf641e0770594af705996b5143db423ca2e5e66b9f7c7f6ca1a361e39a1625c9f9b7845a400fa7421f758d0e06af8734e7aae5c10e3e160e896e84e; aliyungf_tc=5ee20e5fa9126f9b0391976078518dbf9c61b868ab2d39141e97f690f7292140; acw_tc=76b20f4f16730774731525285e6de2c920a9c5edf56d7269c6aaa0f44d3484; CHSICC_CLIENTFLAGZSML=8129ee05d13c6db1979256b08d7772e9; TS01d9ac57=01886fbf6e07265008b96d9ee9a47879ff2584ec48143db423ca2e5e66b9f7c7f6ca1a361ecd997e853377d3598695b05cebada73015b9910fd3ce60f3210775ecf4baec2d',
    'Host': 'yz.chsi.com.cn',
    'sec-ch-ua': '"Chromium";v="106", "Microsoft Edge";v="106", "Not;A=Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36 Edg/106.0.1370.42',
}
proxy = requests.get('http://localhost:5555/random').text.strip()
print(proxy)
proxies = {
    'http': proxy,
    'https': proxy
}
print(requests.get('https://yz.chsi.com.cn/zsml/queryAction.do', headers=headers, proxies=proxies).text)
