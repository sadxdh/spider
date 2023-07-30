# 导入数据请求模块
import requests
# 导入数据解析模块
import parsel
# 导入正则表达式
import re  # 内置模块
# 导入进度条模块
from tqdm import tqdm
import prettytable as pt


def get_response(html_url):
    """发送请求"""
    # 通过requests这个模块里面get请求方式 对于html_url发送请求, 最后用response变量接收返回数据
    headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'
    }
    response = requests.get(url=html_url, headers=headers)
    # <Response [200]> response响应对象, 200状态码表示请求成功
    return response


def get_list_url(html_url):
    """获取章节url地址"""
    response = get_response(html_url=html_url)  # 调用前面定义好的发送请求函数
    # 解析数据提取想要的内容 解析方式 re css xpath
    # print(response.text)
    # (.*?) 表示自己想要的 精确匹配
    list_url = re.findall('<dd><a href ="(.*?)">.*?</a></dd>', response.text)
    return list_url


def get_content(name, list_url):
    """获取小说内容"""
    response = get_response(html_url=list_url)  # 调用前面定义好的发送请求函数
    # 解析数据提取想要的内容 解析方式 re css xpath
    # print(response.text)
    selector = parsel.Selector(response.text)  # 把获取到response.text 数据 转换成 selector 对象
    # selector 就调用 css语法 或者 xpath 方法 从而去提取数据
    title = selector.css('.content h1::text').get()  # css选择器 根据标签属性内容提取数据
    # title_1 = selector.xpath('//*[@class="content"]/h1/text()').get()   # xpath 根据标签节点提取数据
    content_list = selector.css('#chaptercontent::text').getall()  # getall 获取所有 get 获取第一个
    # 把列表转成字符串 为什么要转成字符串? 为了保存数据  join 把列表元素以'\n'合并 变成字符串数据
    content = '\n'.join(content_list)
    # w 写入会覆盖
    with open(name + '.txt', mode='a', encoding='utf-8') as f:
        f.write(title)
        f.write('\n')
        f.write(content)
        f.write('\n')


def main(html_url):
    """
    主函数: 把前面封装好的代码块, 整合到一起
    """
    list_url = get_list_url(html_url)  # 调用返回所有章节的url地址
    html_data = get_response(html_url).text  # 调用发送请求的函数, 获取response响应数据 为了提取小说名字
    name = re.findall('<dt>(.*?)最新章节列表</dt>', html_data)[0]
    for link in tqdm(list_url):
        link_url = 'https://www.bige3.com' + link  # 章节的url地址
        get_content(name, link_url)  # 调用获取小说内容的函数


if __name__ == '__main__':
    while True:
        key_word = input('请输入你想要下载小说内容(输入0即可退出): ')
        if key_word == '0':
            break
        search_url = f'https://www.bige3.com/s?q={key_word}'
        html_data = get_response(html_url=search_url).text  # 调用发送请求函数, 获取response.text
        # print(html_data)
        selectors = parsel.Selector(html_data)  # 转换数据类型
        book_list = selectors.css('.bookbox')
        if book_list:
            num = 0
            lis = []
            tb = pt.PrettyTable()
            tb.field_names = ['序号', '书名', '作者', '书ID']
            for index in book_list:
                name = index.css('.bookname a::text').get()  # 小说名字
                href = index.css('.bookname a::attr(href)').get().split('/')[-2]  # 小说ID
                author = index.css('.author::text').get().replace('作者：', '')
                # print(name, href, author)
                dit = {
                    '书名': name,
                    '作者': author,
                    '书ID': href,
                }
                lis.append(dit)
                tb.add_row([num, name, author, href])
                num += 1
            print(f'你搜索到{len(lis)}条数据内容,结果如下: ')
            print(tb)
            word = input('请输入你想要下载的小说序号: ')
            novel_id = lis[int(word)]['书ID']
            url = f'https://www.bige3.com/book/{novel_id}/'
            main(url)
        else:
            print('请正确输入内容.....')
