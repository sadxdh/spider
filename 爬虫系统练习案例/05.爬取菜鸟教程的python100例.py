import requests
from lxml import etree

resp = requests.get('https://www.runoob.com/python3/python3-tutorial.html')
html = resp.text
# print(html)
main_page = etree.HTML(html)
a_s = main_page.xpath('//*[@id="leftcolumn"]/a')
# print(a_s)
for a in a_s:
    atitle = a.xpath('./@title')[0]
    ahref = 'https://www.runoob.com/python3/'+a.xpath('./@href')[0]
    print(atitle, ahref)
