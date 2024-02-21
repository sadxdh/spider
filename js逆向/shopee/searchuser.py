import time

import requests

cookies = {
    '__LOCALE__null': 'TW',
    'csrftoken': 'Ybcg8OwZXxorGIHefi2mCOiypDwHWoww',
    'REC_T_ID': '59d5342a-cfec-11ee-94c1-a2549380587c',
    'SPC_SI': 'C1PUZQAAAAAySGhjQ3NINFFgAwAAAAAAR2NVUTk5VTM=',
    'SPC_SEC_SI': 'v1-NTljZktObUpVcmZvQTZ5St8Getp/WI4QZadZ7iveESHZmb2s22CgLNd71KKfdsheCoK11vdbnOdhujbFIGua8VaPXHbh39BMKTYvfR+FxrM=',
    'SPC_F': 'z5eJMomMq4AvlkDNLIrBA6HOz7Y6UWC6',
    '_sapid': '1beb04c05877d0a5f423b62a9a35032766e34dfbb1fea6eebc727536',
    '_QPWSDCXHZQA': '439965fe-3742-49d5-8c52-e02576a68945',
    'REC7iLP4Q': 'a09484b6-36a1-4d65-85d5-03948fb04f9c',
    '_gcl_au': '1.1.1931633330.1708432452',
    '_med': 'refer',
    '_fbp': 'fb.1.1708432453227.2039340615',
    'SPWC_SI': 'utvmhhazrg20vom65ggqkolm8rwjtc13',
    'django_language': 'zh-hant',
    '__utma': '88845529.1090874408.1708432453.1708432488.1708432488.1',
    '__utmc': '88845529',
    '__utmz': '88845529.1708432488.1.1.utmcsr=bing|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided)',
    '__utmt': '1',
    '__utmb': '88845529.1.10.1708432488',
    'SPC_CLIENTID': 'ejVlSk1vbU1xNEF2gjxdgzjtcsylxxuo',
    'SPC_EC': '.RW01Sm1wNmo1eXZwSzh1cfkJdkioguoQ8pUgWctjCVB1NsbkVxT9q9gZj/j/9e9Oj7zBSUbDQwwMgOKskV1zMICoasULx1kJRVf2b5A8Ju8Q/Lgsw6QpIl0XhA4h6pnqH7DuCFPbVBZljHtbSwZe7LqeaD6zpQwzsFAKcoK2vmMthzvM4wJk5PNkLETf4CbO9fjA6OgdNkVAfyL2Qt6d/Q==',
    'SPC_ST': '.RW01Sm1wNmo1eXZwSzh1cfkJdkioguoQ8pUgWctjCVB1NsbkVxT9q9gZj/j/9e9Oj7zBSUbDQwwMgOKskV1zMICoasULx1kJRVf2b5A8Ju8Q/Lgsw6QpIl0XhA4h6pnqH7DuCFPbVBZljHtbSwZe7LqeaD6zpQwzsFAKcoK2vmMthzvM4wJk5PNkLETf4CbO9fjA6OgdNkVAfyL2Qt6d/Q==',
    'SPC_U': '1191354798',
    'SPC_R_T_ID': 'pXkCj6Ym6jkz2EleFIe106ZvzGXixTbTItsnU4vLCOVT396o9mDKSxkAxagwgiahb7Y5Ig1B6/KREjVJTYBRTGscgZfhTOBohMyEBEr2mjiuigl6bxhjW/NWYmIF11gkbRBFNY2mERqiFgydcRAq5U8A9lN8Dgm5IpRfRtn050A=',
    'SPC_R_T_IV': 'Z2cwZDB2RjREVEhTbVVPQw==',
    'SPC_T_ID': 'pXkCj6Ym6jkz2EleFIe106ZvzGXixTbTItsnU4vLCOVT396o9mDKSxkAxagwgiahb7Y5Ig1B6/KREjVJTYBRTGscgZfhTOBohMyEBEr2mjiuigl6bxhjW/NWYmIF11gkbRBFNY2mERqiFgydcRAq5U8A9lN8Dgm5IpRfRtn050A=',
    'SPC_T_IV': 'Z2cwZDB2RjREVEhTbVVPQw==',
    'shopee_webUnique_ccd': '5H9OkQgjY3yvReg7c5pw0A%3D%3D%7CXUXAcne1%2BlKsZKXAH0G3O2SMtQFjFH1c6Ubm45Pi2%2F1vvGFX83BgfaQJBGublcGhqqgsyGnTAWgqUVg%3D%7CFtcCUukpQ2CYPAzr%7C08%7C3',  # 更新
    'ds': '959506f33cc490a43bab62f5461fb686',  # 更新
    '_ga_E1H7XE0312': f'GS1.1.1708432452.1.1.{round(time.time())}.40.0.0',  # 更新
    'AMP_TOKEN': '%24ERROR',  # 新增
    '_ga': 'GA1.2.1090874408.1708432453',
    '_gid': 'GA1.2.1502696319.1708432556',
}

headers = {
    'authority': 'shopee.tw',
    'accept': 'application/json',
    'accept-language': 'en-US,en;q=0.9,zh;q=0.8',
    'af-ac-enc-dat': 'AAczLjQuMS0yAAABjcaDhUMAAA9dAzAAAAAAAAAAAv+Jk48fIk7lnuAgHi98+Yu/4TQFl/82EyfDx/bVRcPaaRvYm5f/NhMnw8f21UXD2mkb2Js8bjUvxLYmJgY+mbVAj/olTUhRAlazBR8lYFS7ckOiIzZlFhNJFXNRCasA/VnOZB9tDNtqq/e/6kR7vm7Wl9T+7yUNQxQ7T7I9patLrLeU5j43aP0L8xBL6fEXadMyzZRdHRcQenucx3/IrqMl83aa/jf2/OSetx2V5bonbpHxKcpTueEt2uBrL1ewhr2P5F42IFjoli/QeO4nQRAb1BjyXyTEz7HEfv20CQGYsOUYkmPyQUVHNx7bcVNQslZHdU/P3R0jS5oJBdX1h31rip/0McQo3NbeFO8jXq3wPalyUFRiZeaLJCVJU0SfG5dRLyVAJeipAs/hmQK1nkWd+if89qn7E4LLSp/oVx5gI1zUlEatt8la5FiUWn4nS1xSTq8R8xp4BPqaE439pXk566hh9qn7E4LLSp/oVx5gI1zUlEatt8la5FiUWn4nS1xSTq+Pfy1pV2zysqr5KYPbrMrP9ER21OriCz13p5bgS9egTAf9BJ5rmlzPMgc1VDQc2z5drtX9ZAYjtGQ7FxNJw3uZyj70wqXkO2cPp5DoE6xc8IdQjxzUmBpQPaxYlJDWsHV4Y4adePgPD6pv3Yu0pTVGSIou2zdPnpnSF4isK76te0lFSePdDT0+DD9YmCL5g2yztQNUfE4rKHv6OmkzclCBlElFCjYhhPBJv5SVHkvjx/kCfHNabLMH/pVBG9OhgJA2QNZFVzRuW5KhMgAiNnVL6iwC0+Uch8PakL2iKCIhB/Xwvf2lBcoNwk/3Zui3HlNjov8V9OKSdxSvgoH7jWKEJkLWEBVmOmm5Xh6qYGCxelzQpHdReJ110GB8qjQXx/SmN9GwwYk6fitZOqE//b95l/82EyfDx/bVRcPaaRvYm2KrKTngltOcCBXUwsfr2O8TeUAhbodJtmu4kLBVAN/IXXZVb6DSri1txdxM24th1gB/m9Uor7bl6quDm2g3T6s/UhPDtYtKpB4C8S0ZcqccCW0IpIyzcFtx0PLUjXj8lOJxr2xKHhHp4ojAuaycjYE=',
    'af-ac-enc-sz-token': '5H9OkQgjY3yvReg7c5pw0A==|XUXAcne1+lKsZKXAH0G3O2SMtQFjFH1c6Ubm45Pi2/1vvGFX83BgfaQJBGublcGhqqgsyGnTAWgqUVg=|FtcCUukpQ2CYPAzr|08|3',
    'content-type': 'application/json',
    # 'cookie': '__LOCALE__null=TW; csrftoken=Ybcg8OwZXxorGIHefi2mCOiypDwHWoww; REC_T_ID=59d5342a-cfec-11ee-94c1-a2549380587c; SPC_SI=C1PUZQAAAAAySGhjQ3NINFFgAwAAAAAAR2NVUTk5VTM=; SPC_SEC_SI=v1-NTljZktObUpVcmZvQTZ5St8Getp/WI4QZadZ7iveESHZmb2s22CgLNd71KKfdsheCoK11vdbnOdhujbFIGua8VaPXHbh39BMKTYvfR+FxrM=; SPC_F=z5eJMomMq4AvlkDNLIrBA6HOz7Y6UWC6; _sapid=1beb04c05877d0a5f423b62a9a35032766e34dfbb1fea6eebc727536; _QPWSDCXHZQA=439965fe-3742-49d5-8c52-e02576a68945; REC7iLP4Q=a09484b6-36a1-4d65-85d5-03948fb04f9c; _gcl_au=1.1.1931633330.1708432452; _med=refer; _fbp=fb.1.1708432453227.2039340615; SPWC_SI=utvmhhazrg20vom65ggqkolm8rwjtc13; django_language=zh-hant; __utma=88845529.1090874408.1708432453.1708432488.1708432488.1; __utmc=88845529; __utmz=88845529.1708432488.1.1.utmcsr=bing|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); __utmt=1; __utmb=88845529.1.10.1708432488; SPC_CLIENTID=ejVlSk1vbU1xNEF2gjxdgzjtcsylxxuo; SPC_EC=.RW01Sm1wNmo1eXZwSzh1cfkJdkioguoQ8pUgWctjCVB1NsbkVxT9q9gZj/j/9e9Oj7zBSUbDQwwMgOKskV1zMICoasULx1kJRVf2b5A8Ju8Q/Lgsw6QpIl0XhA4h6pnqH7DuCFPbVBZljHtbSwZe7LqeaD6zpQwzsFAKcoK2vmMthzvM4wJk5PNkLETf4CbO9fjA6OgdNkVAfyL2Qt6d/Q==; SPC_ST=.RW01Sm1wNmo1eXZwSzh1cfkJdkioguoQ8pUgWctjCVB1NsbkVxT9q9gZj/j/9e9Oj7zBSUbDQwwMgOKskV1zMICoasULx1kJRVf2b5A8Ju8Q/Lgsw6QpIl0XhA4h6pnqH7DuCFPbVBZljHtbSwZe7LqeaD6zpQwzsFAKcoK2vmMthzvM4wJk5PNkLETf4CbO9fjA6OgdNkVAfyL2Qt6d/Q==; SPC_U=1191354798; SPC_R_T_ID=pXkCj6Ym6jkz2EleFIe106ZvzGXixTbTItsnU4vLCOVT396o9mDKSxkAxagwgiahb7Y5Ig1B6/KREjVJTYBRTGscgZfhTOBohMyEBEr2mjiuigl6bxhjW/NWYmIF11gkbRBFNY2mERqiFgydcRAq5U8A9lN8Dgm5IpRfRtn050A=; SPC_R_T_IV=Z2cwZDB2RjREVEhTbVVPQw==; SPC_T_ID=pXkCj6Ym6jkz2EleFIe106ZvzGXixTbTItsnU4vLCOVT396o9mDKSxkAxagwgiahb7Y5Ig1B6/KREjVJTYBRTGscgZfhTOBohMyEBEr2mjiuigl6bxhjW/NWYmIF11gkbRBFNY2mERqiFgydcRAq5U8A9lN8Dgm5IpRfRtn050A=; SPC_T_IV=Z2cwZDB2RjREVEhTbVVPQw==; shopee_webUnique_ccd=5H9OkQgjY3yvReg7c5pw0A%3D%3D%7CXUXAcne1%2BlKsZKXAH0G3O2SMtQFjFH1c6Ubm45Pi2%2F1vvGFX83BgfaQJBGublcGhqqgsyGnTAWgqUVg%3D%7CFtcCUukpQ2CYPAzr%7C08%7C3; ds=959506f33cc490a43bab62f5461fb686; _ga_E1H7XE0312=GS1.1.1708432452.1.1.1708432543.40.0.0; AMP_TOKEN=%24ERROR; _ga=GA1.2.1090874408.1708432453; _gid=GA1.2.1502696319.1708432556; _dc_gtm_UA-61915057-6=1',
    'referer': 'https://shopee.tw/search?keyword=%E7%9A%AE%E5%B8%A6',
    'sec-ch-ua': '"Not A(Brand";v="99", "Microsoft Edge";v="121", "Chromium";v="121"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'sz-token': '5H9OkQgjY3yvReg7c5pw0A==|XUXAcne1+lKsZKXAH0G3O2SMtQFjFH1c6Ubm45Pi2/1vvGFX83BgfaQJBGublcGhqqgsyGnTAWgqUVg=|FtcCUukpQ2CYPAzr|08|3',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Edg/121.0.0.0',
    'x-api-source': 'pc',
    'x-csrftoken': 'Ybcg8OwZXxorGIHefi2mCOiypDwHWoww',
    'x-requested-with': 'XMLHttpRequest',
    'x-sap-access-f': '3.2.121.2.0|13|3.4.1-2_5.7.129_0_54|5d0805fc4034481eb8c96efe0386fbbdd1c8560708bf49|10900|100',
    'x-sap-access-s': '3J4ZkxvIGcuPFEAdzu_4wy_Js-rVtVC525QKENALlNQ=',
    'x-sap-access-t': '1708432556',
    'x-sap-ri': 'ac9cd465417565c49f5f363a0301aefe7666d4281a48ab117421',
    'x-sap-sec': 'OfNoTqeo2/ehK/ehLxePK/3hLxehK/3hK/eoK/eh3/PhKM3pK/eeK/ehKNYyAvUhK/HZKxehj/JhKM+/Z74UDMZy5r4cRn+P05rJayJDCyuwR7HHUzZcUiTcFrrL6L1MWBAajC8GWpuIp/WHSTpAYB85a6kxr+Xj1qQFnkUZio8PJ9WhgGNmksMjvOgMmzGg4/2SwfYJtI1P94HKrDgCE26TjSYaqRiwH5nM9fv9omSm2UDCXoxcJVXvPT+Hl/rnzKQWhzYiJkSEUYnosK/5dqQAkMnaaAdV84eRURBDMxbOfM8YdNaHbasUhzFH+5GoX9Ny7HUOWEkkts+5znQhjEeimZWidIMJ3RI/Uc9atS3HY94ikYZ7k2UQQUPLoZZeBvp9pcjVRfaYF6LjEjAAFimUsHt5HBjaSw6EaAgo2BXFVpvTXryXDeVhPsm8mwfGSYu/rrvePFwuBNhlCGhDzyB+LL6vYoAqrnSPIS1xkZpES4sp78GNQ92LheJdsTEkPw/0qIijzg8DWVPlWIIA8uAYwLhmLd461SZ+PrbuUfAewTUNK/CJ4lPcOR4+vYA7uxyg20NmOKoG8sPwLkWdrQEQGECxFOclMcwER7mgi28ELJMe+4N07iwzh0zGmmZ/OnpVl+70DzZpnOqllOjdz5db5pbRoh3NOLbnDAW5pD/ybyiOAZgs/Tu3pPDXUYMhStAVSCBWGhrM7OJITyjJVSMSC8WFPRZShE7toX7geNDCiuvAuWoLYeU1c1IHFC9Aw0Rnow/9H2Q2DPqZZg+CX+LFs3vVQfY47HcFThp30/DAJhGJDkGJZjyFRCYxmnI+I0MYPjPWHZm0W0Yi2m024N22+dfjzspq3+28MhuDGTDYi/jm9LLaqwXy5tRacJpaNf+llOtAyJ6mj3zWOapjyn5BXIB2GbqCXbfFq2kng9EEf93oe1e9F47KOeuawwH6NwRwzyw73dw0nAvM1tDUQAtQM8VYaEUhK/egQHvVcq/vOEehK/SJAXiy0/ehK3ZhK/e3K/eh+/DXLcMsP4DSo3Cnv2xADx1cSbgPK/ehcHhgcq3bOYPhK/eh0/eJK/UhL/ePK/eh0/ehK3ZhK/e3K/eh6yueScmMjDlGTQuyptK7QeJKlFPPK/ehcVnvQVvnOY3hK/eh',
    'x-shopee-language': 'zh-Hant',
    'x-sz-sdk-version': '3.4.1-2&1.6.16',
}

params = {
    'keyword': '皮带',
    'limit': '1',
    'offset': '0',
    'with_search_cover': 'true',
}

response = requests.get('https://shopee.tw/api/v4/search/search_user', params=params, cookies=cookies, headers=headers)

# print(response.json())
print(response.status_code)
print(response.cookies.get_dict())