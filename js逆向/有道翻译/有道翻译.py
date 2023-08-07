# -*- coding: utf-8 -*-
import requests
import time
import execjs
import pprint
import subprocess
from functools import partial

subprocess.Popen = partial(subprocess.Popen, encoding="utf-8")

headers = {
    'Cookie': 'OUTFOX_SEARCH_USER_ID=-1987562068@10.105.253.24; OUTFOX_SEARCH_USER_ID_NCOO=2074437648.2384825',
    'Host': 'dict.youdao.com',
    'Origin': 'https://fanyi.youdao.com',
    'Referer': 'https://fanyi.youdao.com/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
}

with open('sign.js', mode='r', encoding='utf-8') as f:
    js_file = f.read()

js_code = execjs.compile(js_file)  # 编译js
time_stamp = int(time.time()*1000)
sign = js_code.call('A', time_stamp)  # 传入time_stamp
print('sign ==>', sign)

# buf = input('请输入要翻译的字符串：')
# buf = 'hello'

data = {
    'i': 'hello',                   # i: cat
    'from': 'auto',                 # from: auto
    'to': '',                   # to:
    'domain': '0',                  # domain: 0
    'dictResult': 'true',                   # dictResult: true
    'keyid': 'webfanyi',                    # keyid: webfanyi
    'sign': sign,                 # sign: 3b209d928c5cba956e4f05a2bd89d037        # 变化
    'client': 'fanyideskweb',                   # client: fanyideskweb
    'product': 'webfanyi',                  # product: webfanyi
    'appVersion': '1.0.0',                  # appVersion: 1.0.0
    'vendor': 'web',                    # vendor: web
    'pointParam': 'client,mysticTime,product',                  # pointParam: client,mysticTime,product
    'mysticTime': time_stamp,                  # mysticTime: 1691385514882           1691385646.601255    # 变化
    'keyfrom': 'fanyi.web',                 # keyfrom: fanyi.web
    'mid': '1',                 # mid: 1
    'screen': '1',                  # screen: 1
    'model': '1',                   # model: 1
    'network': 'wifi',                  # network: wifi
    'abtest': '0',                  # abtest: 0
    'yduuid': 'abcdefg',                    # yduuid: abcdefg
}

url = 'https://dict.youdao.com/webtranslate'

resp = requests.post(url=url, headers=headers, params=data).text

print(resp)

# "Z21kD9ZK1ke6ugku2ccWuz4Ip5f4PLCoxWstZf_6UUyBoy8dpWc3NOXFRrnPMya7BtuJ8Ct1abSinvMDhulKPJxO0onH1jyfKrUkSADpRWBLdT-upjc8cNCd77ZZDI_GlyN6ZLcrRVl_vZ_RJDO2p6jigcq__3DAQZ0hLNN6rKZ02H2vV1VIJGrW_cjHpJLGZIl7cqavQf3wbDJX7F4Dhw-rBO94TpU4KwJFxeMZZFKNJoRJIHLiPwCIlKE522BbX4-8S4XlFGqLAxnj8ynLK7IXlY1ZUiZUSReDY-XW1IZQShlN5LM4QTBy28-0d03P3Dz-gyj9Kw_x6dP_d67x7h0IUht1hO7YrS3oiT1xRkIL5_7JTwaBXnN-FotokIzvk8-jdO3gBTR2XED9tjWRmutVikgOR52HFBP7KSySqHeyS2IN7-M3kxzQdmwQvVqLKcFdmcHGw9dNanCnwXLKNbI2cO2FVvnAVu1x1NQE97ju_k9YnvVQZ-CKohGBCzdKD6Beaan7YbFp2OAvLgb_8x5DjdJy5QU61AA6o4wJlLrx6FVJtPK7kp9g4wp5IdtCQFK8G6JR75KPFU-AjA0dSerR5lVW4CThJFdiA2SiZoz-lgD208Z7fV6Ieh6n8NXNTQJnLxbLRtRePi1soAx5KLQdnlPJ06d9GBmeNhPWRmfYDskfffHDuDFI7ctJXOIeOqooV1B-h1jO8k3dp7P-sYsR6uVl1CYeWb-WpsNEY44=""Z21kD9ZK1ke6ugku2ccWuz4Ip5f4PLCoxWstZf_6UUyBoy8dpWc3NOXFRrnPMya7BtuJ8Ct1abSinvMDhulKPJxO0onH1jyfKrUkSADpRWBLdT-upjc8cNCd77ZZDI_GlyN6ZLcrRVl_vZ_RJDO2p6jigcq__3DAQZ0hLNN6rKZ02H2vV1VIJGrW_cjHpJLGZIl7cqavQf3wbDJX7F4Dhw-rBO94TpU4KwJFxeMZZFKNJoRJIHLiPwCIlKE522BbX4-8S4XlFGqLAxnj8ynLK7IXlY1ZUiZUSReDY-XW1IZQShlN5LM4QTBy28-0d03P3Dz-gyj9Kw_x6dP_d67x7h0IUht1hO7YrS3oiT1xRkIL5_7JTwaBXnN-FotokIzvk8-jdO3gBTR2XED9tjWRmutVikgOR52HFBP7KSySqHeyS2IN7-M3kxzQdmwQvVqLKcFdmcHGw9dNanCnwXLKNbI2cO2FVvnAVu1x1NQE97ju_k9YnvVQZ-CKohGBCzdKD6Beaan7YbFp2OAvLgb_8x5DjdJy5QU61AA6o4wJlLrx6FVJtPK7kp9g4wp5IdtCQFK8G6JR75KPFU-AjA0dSerR5lVW4CThJFdiA2SiZoz-lgD208Z7fV6Ieh6n8NXNTQJnLxbLRtRePi1soAx5KLQdnlPJ06d9GBmeNhPWRmfYDskfffHDuDFI7ctJXOIeOqooV1B-h1jO8k3dp7P-sYsR6uVl1CYeWb-WpsNEY44="
# "Z21kD9ZK1ke6ugku2ccWu-MeDWh3z252xRTQv-wZ6jddVo3tJLe7gIXz4PyxGl73nSfLAADyElSjjvrYdCvEP4pfohVVEX1DxoI0yhm36ytQNvu-WLU94qULZQ72aml6Jh8cIaWfLDqe22fTIyUU338TLmtutRx9thoVTDvyqjRe9c9k1kGoI1cHkCVEuYP-wpbIm0ROJO6-PveLLLs0UnHfdrEZ_xb-m7iyN6vLy1WBc_tnyKFL3cbR3NVNMuu3kLqFVl-iNZjHZHRUPZiABdcmSQwvC1ItEgcxe50pSO1onEZ6YworWuGIeVhJx1IL87ZO_kr-P2u30FTUiHlLrabyw5onmWOFK4xsjlVpuiN0oV__QC7FfhVr5C5BsxdXGjYBytECfksdak6OoZ0_3Rmuh8XKMrgnzEUfzD3sSLxk_grt1GLuRjC-vBdvectE4tUrBcBDbubFHEZwdG-Nde9PBUY4b5TFi6p4477UxIIA06TMt1lIjLrjYyomfV5QSm1WO2-I3VB78go32ELCpTVpE4DADAxkoATqAj4vOBo-Wpdni0Fbkh2DlIEaqUQNKyZext-RIY4G9Snmi8gx5e4H6iOLe5Ynk7SZ1qQ2YbsCcKrF2iZIULVWKFDeigMGTLaa4_JkVTPQa1YeTm7OJThbPV-_CjG8lZNjs7xos6xAjdLPMfZeJ2QlNspNt7iAOhyh6XvLmq5yjovXyCOwb52iGcCDrTr-8NpYB2pITmfVCKa5DtFaFndCiT0B7phq0t7-MUj5cEcVlvVZGVdUK2CfCR3mtS50o44CFm0qFpNDuFGodrbSv5aWAJRodkFObw-DA9R7RxhwxT0oxVdJOcEhlZHZmMO8sJMZDXj2gCq9gbkmyEQ0SAFh_0Mm9BB8Oo_uFHUcM72xAbovUqxyMd97fRyp66LDtR9BwUX0REruT4mC2un6LPoJhGmo5ZhIaqIy8ACNqF6YQ_TsRHxVKoCf3I1pukVFuOPIJZj_elM-ao4LqtFWL6Yfoy4ujx0I901fFPdVWyWvipw_lPbahI2LA4Uect1GkjH_V6Ok2xFVMyr5-Kimc2dk4I9Pz3LDc4pgcSSMHix7He7T0t4dovyCfUzV-8Q3lsjYmIc5pXreW0xSZhoX-P7a0X7sRWlMQCxfKyBaPc_urpt9Nj-kK2cXoM8orh2hhfQLxrQs9WGQ971qvc4X5zsUypARDi2n2umlqIuE7odQWCfS9LZfIhmui4GJYk-GF-ewvpGpp3nWfskpJU7XvNhZTP-N3eKjwk2aY80WZG8TwVlWxz7pqTd0ahvJowMExOxEkDEJ72Y="
# "Z21kD9ZK1ke6ugku2ccWu-MeDWh3z252xRTQv-wZ6jddVo3tJLe7gIXz4PyxGl73nSfLAADyElSjjvrYdCvEP4pfohVVEX1DxoI0yhm36ytQNvu-WLU94qULZQ72aml6Jh8cIaWfLDqe22fTIyUU338TLmtutRx9thoVTDvyqjRe9c9k1kGoI1cHkCVEuYP-wpbIm0ROJO6-PveLLLs0UnHfdrEZ_xb-m7iyN6vLy1WBc_tnyKFL3cbR3NVNMuu3kLqFVl-iNZjHZHRUPZiABdcmSQwvC1ItEgcxe50pSO1onEZ6YworWuGIeVhJx1IL87ZO_kr-P2u30FTUiHlLrabyw5onmWOFK4xsjlVpuiN0oV__QC7FfhVr5C5BsxdXGjYBytECfksdak6OoZ0_3Rmuh8XKMrgnzEUfzD3sSLxk_grt1GLuRjC-vBdvectE4tUrBcBDbubFHEZwdG-Nde9PBUY4b5TFi6p4477UxIIA06TMt1lIjLrjYyomfV5QSm1WO2-I3VB78go32ELCpTVpE4DADAxkoATqAj4vOBo-Wpdni0Fbkh2DlIEaqUQNKyZext-RIY4G9Snmi8gx5e4H6iOLe5Ynk7SZ1qQ2YbsCcKrF2iZIULVWKFDeigMGTLaa4_JkVTPQa1YeTm7OJThbPV-_CjG8lZNjs7xos6xAjdLPMfZeJ2QlNspNt7iAOhyh6XvLmq5yjovXyCOwb52iGcCDrTr-8NpYB2pITmfVCKa5DtFaFndCiT0B7phq0t7-MUj5cEcVlvVZGVdUK2CfCR3mtS50o44CFm0qFpNDuFGodrbSv5aWAJRodkFObw-DA9R7RxhwxT0oxVdJOcEhlZHZmMO8sJMZDXj2gCq9gbkmyEQ0SAFh_0Mm9BB8Oo_uFHUcM72xAbovUqxyMd97fRyp66LDtR9BwUX0REruT4mC2un6LPoJhGmo5ZhIaqIy8ACNqF6YQ_TsRHxVKoCf3I1pukVFuOPIJZj_elM-ao4LqtFWL6Yfoy4ujx0I901fFPdVWyWvipw_lPbahI2LA4Uect1GkjH_V6Ok2xFVMyr5-Kimc2dk4I9Pz3LDc4pgcSSMHix7He7T0t4dovyCfUzV-8Q3lsjYmIc5pXreW0xSZhoX-P7a0X7sRWlMQCxfKyBaPc_urpt9Nj-kK2cXoM8orh2hhfQLxrQs9WGQ971qvc4X5zsUypARDi2n2umlqIuE7odQWCfS9LZfIhmui4GJYk-GF-ewvpGpp3nWfskpJU7XvNhZTP-N3eKjwk2aY80WZG8TwVlWxz7pqTd0ahvJowMExOxEkDEJ72Y="

def call_node_script(script_path, args):
    try:
        result = subprocess.check_output(["node", script_path] + args, stderr=subprocess.STDOUT, text=True)
        return result.strip()
    except subprocess.CalledProcessError as e:
        print("Error:", e.output)


decrypted_text = call_node_script("decrypt.js", [resp])
print("Decrypted Text:", decrypted_text)

