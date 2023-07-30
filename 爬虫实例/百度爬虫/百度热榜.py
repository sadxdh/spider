# 百度热榜
import requests
import parsel


url = 'https://top.baidu.com/board?platform=pc&sa=pcindex_a_right'


def get_html():
    resp = requests.get(url)
    if resp.status_code == 200:
        print("成功获取到页面")
        resp.encoding = 'utf-8'
        content = resp.text
        # print(resp.text)
    else:
        print("获取页面失败，错误码为:", resp.status_code)
        content = None
    return content


def parse_html(content):
    selector = parsel.Selector(content)
    title = selector.css('div .list_1EDla div .c-single-text-ellipsis::text').getall()[::2]
    print(title)
    print("共{}条".format(len(title)))


if __name__ == '__main__':
    content = get_html()
    parse_html(content)
