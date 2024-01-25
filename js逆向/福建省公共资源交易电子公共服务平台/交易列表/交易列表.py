import time
import execjs

import requests

with open('交易列表.js', 'r', encoding='utf-8') as f:
    decrptyjs = f.read()
jscode = execjs.compile(decrptyjs)

headers = {
    'Accept': "application/json, text/plain, */*",
    'Content-Type': "application/json;charset=UTF-8",
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
    'portal-sign': "58c8f7a0c35e3ebc283ee1e80249d0d8"
}

json_data = {
    'pageNo': 1,
    'pageSize': 20,
    'total': 0,
    'AREACODE': '',
    'M_PROJECT_TYPE': '',
    'KIND': 'GCJS',
    'GGTYPE': '1',
    'PROTYPE': '',
    'timeType': '6',
    'BeginTime': '2023-07-22 00:00:00',
    'EndTime': '2024-01-22 23:59:59',
    'createTime': [],
    'ts': round(time.time() * 1000),
}

response = requests.post('https://ggzyfw.fj.gov.cn/FwPortalApi/Article/PageList', headers=headers, json=json_data)

print(response.status_code)
print(response.text)
encrptydata = response.json()['Data']
print(encrptydata)

data = jscode.call('b', encrptydata)
print(data)
