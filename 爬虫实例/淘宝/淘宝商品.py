import csv
import json
import time
import random
import requests
import re
import pprint
import pymysql


def save_sql(title, pic_url, detail_url, view_price, item_loc, view_sales, nick):
    count = pymysql.connect(
        host='192.168.29.131',
        port=3306,
        user='root',
        password='123456',
        db='test'
    )
    db = count.cursor()
    sql = f'insert into goods(title, pic_url, detail_url, view_price, item_loc, view_sales, nick) values ("{title}", "{pic_url}", "{detail_url}", "{view_price}", "{item_loc}", "{view_sales}", "{nick}")'
    db.execute(sql)
    count.commit()
    db.close()


headers = {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'zh-CN,zh;q=0.9',
    'cache-control': 'max-age=0',
    'cookie': 'miid=6333719121419742999; t=cdcc451ec8ba9c54d4773bdb254ee958; cna=i6HhGnv/qCYCAToRPG64956c; sgcookie=E100DnFDgyVUvLEiCMfjEiYYD%2Bdzmusftekkg53R0zjmkfgii9rWigFL8qAJtzVOgWt6uKNfwFCf72JeJTFShdMnPz968qVG067qqtS8N%2Bda8xlWjVLC2ZCLRTm50w2Eo2QC; '
              'uc3=id2=UUphwoF1oLHkmisHkA%3D%3D&vt3=F8dCvChz0vrrEWSAXoU%3D&nk2=F5REN02EKv26oiY%3D&lg2=V32FPkk%2Fw0dUvg%3D%3D; lgc=tb199494477; uc4=nk4=0%40FY4PZd%2B9azn5fhia4uHMpQF6Alst0A%3D%3D&id4=0%40U2grGRlJSkTYUuCrw4rmbORlZEoxTT3V; tracknick=tb199494477; _cc_=Vq8l%2BKCLiw%3D%3D; thw=cn; '
              'enc=kyPHw7WVwmJxs9%2BmMYxNE5zEHwLYgc9IZDwzX4Jp9Sd7CBc7iMmN56rjWwtgugtKLnbh%2BzoE2NM4R2fihgxBt9NPIl2dDvccsTDmb6mUx1E%3D; mt=ci=-1_0; xlly_s=1; _m_h5_tk=195b28771f6ae362b1126511c78ce455_1650374485365; _m_h5_tk_enc=196c71dfb60b1d57ed95013bdf3f2f14; uc1=cookie14=UoexMn8x0o1HZw%3D%3D; '
              '_tb_token_=5db38d71e5e8; JSESSIONID=A3F8FA6550500EA202392648DC620E90; alitrackid=www.taobao.com; lastalitrackid=www.taobao.com; l=eBTNJjbgLuETDsVbBOfwourza77tjIRAguPzaNbMiOCP_85p5MMAW62e_NY9CnGVh6bDR3Jfz-pJBeYBqIv4n5U62j-lasMmn; '
              'tfstk=c6HCB32GPwbCpURPLDtwUBF8JCe5ZCY_jBaKAF95qhYVSriCiFW4lrTSZN2z2l1..; isg=BGJi2KNHdOPcEWi927nXooeGs-jEs2bNtNBlMqz7h1WAfwL5lEDa3Wz9q7uD795l',
    'referer': 'https://www.taobao.com/',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36'
}

url = 'https://s.taobao.com/search?q=%E5%B7%B4%E9%BB%8E%E4%B8%96%E5%AE%B6%E4%B8%9D%E8%A2%9C&suggest=history_1&commend=all&ssid=s5-e&search_type=item&sourceId=tb.index&spm=a21bo.jianhua.201856-taobao-item.2&ie=utf8&initiative_id=tbindexz_20170306&_input_charset=utf-8&wq=%E5%B7%B4%E9%BB%8E%E4%B8%96' \
      '%E5%AE%B6&suggest_query=%E5%B7%B4%E9%BB%8E%E4%B8%96%E5%AE%B6&source=suggest '
response = requests.get(url, headers=headers)
# print(response.text)
html_data = response.text
# print(html_data)
json_data = re.findall('g_page_config = (.*);', html_data)[0]
# print(json_data)
json_dict = json.loads(json_data)
# print(json_dict)
auctions = json_dict['mods']['itemlist']['data']['auctions']
# print(auctions)

for auction in auctions:
    raw_title = auction['raw_title']
    pic_url = auction['pic_url']
    detail_url = auction['detail_url']
    view_price = auction['view_price']
    item_loc = auction['item_loc']
    view_sales = auction['view_sales']
    nick = auction['nick']
    print(raw_title, pic_url, detail_url, view_price, item_loc, view_sales, nick, sep='\t')
    # 4. 保存数据
    save_sql(raw_title, pic_url, detail_url, view_price, item_loc, view_sales, nick)
    with open('淘宝.csv', mode='a', newline='', encoding='utf-8') as f:
        csv_writer = csv.writer(f)
        csv_writer.writerow([raw_title, pic_url, detail_url, view_price, item_loc, view_sales, nick])
time.sleep(random.randint(3, 5))
