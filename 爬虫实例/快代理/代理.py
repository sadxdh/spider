"""
[课程内容]: Python采集网站免费ip代理, 检测IP代理是否可用

[授课老师]: 青灯教育 - 自游  上课时间: 14:35

[开发环境]:
    Python 3.8
    Pycharm

[模块使用]:
    requests >>> pip install requests
    parsel >>> pip install parsel

先听一下歌 等一下后面进来的同学, 14:35正式开始讲课 [有什么喜欢听得歌曲 也可以在公屏发一下]
相对应的安装包/安装教程/激活码/使用教程/学习资料/工具插件 可以加木子老师微信: python10010
---------------------------------------------------------------------------------------------------
听课建议:
    1. 对于本节课讲解的内容, 有什么不明白的地方 可以直接在公屏上面提问, 具体哪行代码不清楚 具体那个操作不明白
    2. 不要跟着敲代码, 先听懂思路, 课后找木子老师领取录播, 然后再写代码
    3. 不要进进出出, 课后会发送签到, 早退不仅没有资料, 你还会思路中断
---------------------------------------------------------------------------------------------------
模块安装问题:
    - 如果安装python第三方模块:
        1. win + R 输入 cmd 点击确定, 输入安装命令 pip install 模块名 (pip install requests) 回车
        2. 在pycharm中点击Terminal(终端) 输入安装命令
    - 安装失败原因:
        - 失败一: pip 不是内部命令
            解决方法: 设置环境变量

        - 失败二: 出现大量报红 (read time out) [vs c++ 14.0]
            解决方法: 因为是网络链接超时,  需要切换镜像源
                清华：https://pypi.tuna.tsinghua.edu.cn/simple
                阿里云：http://mirrors.aliyun.com/pypi/simple/
                中国科技大学 https://pypi.mirrors.ustc.edu.cn/simple/
                华中理工大学：http://pypi.hustunique.com/
                山东理工大学：http://pypi.sdutlinux.org/
                豆瓣：http://pypi.douban.com/simple/
                例如：pip3 install -i https://pypi.doubanio.com/simple/ 模块名

        - 失败三: cmd里面显示已经安装过了, 或者安装成功了, 但是在pycharm里面还是无法导入
            解决方法: 可能安装了多个python版本 (anaconda 或者 python 安装一个即可) 卸载一个就好
                    或者你pycharm里面python解释器没有设置好
---------------------------------------------------------------------------------------------------
如何配置pycharm里面的python解释器?
    1. 选择file(文件) >>> setting(设置) >>> Project(项目) >>> python interpreter(python解释器)
    2. 点击齿轮, 选择add
    3. 添加python安装路径
---------------------------------------------------------------------------------------------------
pycharm如何安装插件?
    1. 选择file(文件) >>> setting(设置) >>> Plugins(插件)
    2. 点击 Marketplace  输入想要安装的插件名字 比如:翻译插件 输入 translation / 汉化插件 输入 Chinese
    3. 选择相应的插件点击 install(安装) 即可
    4. 安装成功之后 是会弹出 重启pycharm的选项 点击确定, 重启即可生效
---------------------------------------------------------------------------------------------------


代理ip结构
proxies_dict = {
    "http": "http://" + ip:端口,
    "https": "http://" + ip:端口,
}

爬虫最基本思路流程:

一. 数据来源分析
    1. 明确自己需求
    2. 通过开发者工具进行抓包分析, 分析数据 是可以请求那个网址 可以得到数据

二. 代码实现步骤过程: [发送请求 >>> 获取数据 >>> 解析数据 >>> 保存数据]
    1. 发送请求, 对于刚刚分析得到url地址发送请求get请求
    2. 获取数据, 获取服务器返回response响应数据
    3. 解析数据, 提取我们想要的内容 IP 端口
    4. 保存数据, 检测IP代理是否可用, 可用IP代理 可用进行保存 保存到文本或者json文件

某个店子有免费试吃(免费领取东西) 需要微信关注一下 >>> 张三 免费试吃
"""
# 导入数据请求模块
import requests  # pip install requests
# 导入正则表达式模块
import re
# 导入数据解析模块
import parsel
lis = []
lis_1 = []
for page in range(1, 21):
    # 1. 发送请求, 对于刚刚分析得到url地址发送请求get请求
    url = f'https://www.kuaidaili.com/free/inha/{page}/'
    # 爬虫模拟客户端发送请求, 用headers 进行伪装 请求头参数  User-Agent 用户代理 表示浏览器基本身份标识 字典数据类型
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36'
    }
    response = requests.get(url=url, headers=headers, verify=False)  # 请求返回响应对象
    # 2. 获取数据, 获取服务器返回response响应数据 获取response.text 文本数据 字符串的数据类型
    # print(response.text)
    # 3. 解析数据, 提取我们想要的内容 IP 端口
    """
    解析的方式: 可以根据解析的数据, 来选择
        1. 正则       >>>  对于字符串数据直接进行提取
            () 精确匹配, 括号内的东西, 是我们想要的
            \d+ : 匹配一个或者多个数字
            .*? : 通配符, 可以匹配任意字符(除了\n)  . 任意字符(除了\n) * 匹配前一个字符0个或者多个 ? 非贪婪匹配模式
        2. xpath      >>> 根据标签节点提取数据
        3. css        >>> 根据标签属性提取数据
        4. json       >>> 字典取值

    代理ip结构
    proxies_dict = {
        "http": "http://" + ip:端口,
        "https": "https://" + ip:端口,
    }
    ip_list = re.findall('<td data-title="IP">(.*?)</td>', response.text)
    port_list = re.findall('<td data-title="PORT">(\d+)</td>', response.text)
    """
    selector = parsel.Selector(response.text)
    # ip_list = selector.css('.layui-table tbody tr td:nth-child(1)::text').getall()
    # port_list = selector.css('.layui-table tbody tr td:nth-child(2)::text').getall()
    ip_list = re.findall('<td data-title="IP">(.*?)</td>', response.text)
    port_list = re.findall('<td data-title="PORT">(\d+)</td>', response.text)
    # print(ip_list)
    # print(port_list)
    for ip, port in zip(ip_list, port_list):
        # print(ip, port)
        ip_http = ip.strip() + ':' + port.strip()
        proxies_dict = {
            "http": "http://" + ip_http,
            "https": "https://" + ip_http,
        }
        # print(proxies_dict)
        lis.append(proxies_dict)
        try:
            response_1 = requests.get(url='https://www.baidu.com/', headers=headers, proxies=proxies_dict, timeout=1)
            print(response_1.status_code)
            if response_1.status_code == 200:
                print('IP代理可以使用: ', proxies_dict)
                lis_1.append(proxies_dict)
        except Exception as e:
            print(e)
            print(proxies_dict, 'ip代理检测不可用.....')

print('-*-*-'*20)
print(f'总共获取了{len(lis)}')
print('-*-*-'*20)
print(f'可以用的IP代理{len(lis_1)}')
print('-*-*-'*20)
print(lis_1)

#
# url = 'http://tiqu.pyhttp.taolop.com/getip?count=1&neek=15790&type=2&yys=0&port=1&sb=&mr=1&sep=0&time=4'
# json_data = requests.get(url=url).json()
# ip = json_data['data'][0]['ip']
# port = str(json_data['data'][0]['port'])
# ip_http = ip + ':' + port
# proxies_dict = {
#     "http": 'http://' + '47.106.105.236' + ':' + '80',
#     "https": 'http://' + '47.106.105.236' + ':' + '80',
# }
# print(proxies_dict)
# # headers = {
# #     'Host': 'www.kuaidaili.com',
# #     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)2. Chrome/98.0.4758.102 Safari/537.36'
# # }
# response_1 = requests.get(url='https://www.baidu.com/', proxies=proxies_dict, verify=False)
# print(response_1.status_code)
