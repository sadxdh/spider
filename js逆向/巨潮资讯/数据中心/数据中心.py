import requests
import execjs

with open('decryptkey.js', mode='r', encoding='utf-8') as f:
    js_file = f.read()

js_code = execjs.compile(js_file)  # 编译js
EncKey = js_code.call('getResCode')
print('Accept-EncKey:', EncKey)

headers = {
    'Accept': "*/*",
    'Accept-EncKey': EncKey,  # Accept-EncKey
    'Accept-Language': 'en-US,en;q=0.9,zh;q=0.8',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    # 'Cookie': 'routeId=.uc1; SID=64dd3d5d-67bd-4e1e-8470-869e267c22fa; Hm_lvt_489bd07e99fbfc5f12cbb4145adb0a9b=1704007535,1704161621; MALLSSID=55454D34316E3653576C70586C4867574E665056785A6A7A68484E6F566B6E70506A2B6B34344763665931563438576E727373612F2F793161352B767A617667; Hm_lpvt_489bd07e99fbfc5f12cbb4145adb0a9b=1704163483',
    'Origin': 'https://webapi.cninfo.com.cn',
    'Pragma': 'no-cache',
    'Referer': 'https://webapi.cninfo.com.cn/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
    'X-Requested-With': 'XMLHttpRequest',
    'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Microsoft Edge";v="120"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
}

data = {
    'scode': '000001-SZE',
    'sdate': '2023-01-02',
    'edate': '2024-01-02',
    'ctype': '0',
}

response = requests.post('https://webapi.cninfo.com.cn/api/sysapi/p_sysapi1008', headers=headers, data=data)

print(response.status_code)
print(response.text)
