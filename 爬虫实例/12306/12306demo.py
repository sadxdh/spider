import requests  # 数据请求模块 第三方模块 需要安装 pip install requests
# import prettytable as pt  # 表格格式的输出  第三方模块 需要安装 pip install prettytable
import json
# import 回家的诱惑

f = open('city.json', encoding='utf-8')
txt = f.read()
json_data = json.loads(txt)  # 转成字典数据类型
from_station = input('请输入你出发的城市: ')
to_station = input('请输入你目的城市: ')
# print(txt)
date = input('请输入你要出发的日期(格式: 2022-05-04):')
# print(json_data[from_station])
# print(json_data[to_station])
"""
发送请求, 对于刚刚分析得到url地址发送请求
    python爬虫发送请求: 模拟浏览器对于url地址发送请求
请求头: 伪装python代码, 让它伪装一个浏览器去发送请求
    字典的数据类型, 构建完整键值对形式
    User-Agent: 用户代理 浏览器基本身份标识
    Cookie: 用户信息, 常用于检测是否登陆账号
当你请求数据之后, 虽然返回 <Response [200]> 但是不一定得到你想要数据内容 得到的数据不是你想要, 说明你被反爬了
"""
url = f'https://kyfw.12306.cn/otn/leftTicket/query?leftTicketDTO.train_date={date}&leftTicketDTO.from_station={json_data[from_station]}&leftTicketDTO.to_station={json_data[to_station]}&purpose_codes=ADULT'
headers = {
    'Cookie': '_uab_collina=164560170606767104255119; JSESSIONID=FF0815861E927C16239D17FB558BEEB4; _jc_save_wfdc_flag=dc; BIGipServerotn=552075530.64545.0000; highContrastMode=defaltMode; guidesStatus=off; cursorStatus=off; BIGipServerpassport=770179338.50215.0000; RAIL_EXPIRATION=1651647477597; RAIL_DEVICEID=QFCYUNkm1nWxSSA0rSuVEXoMVPaWIGgX9w8FH8Yu7ay4-ChisEAYp_J9XqNHcXUDFIKPtGQHQEksjci_7olyH-f-CJqAS5G6-CcwgEd2u3tgVdfMz78HS5ismPQinORISLNIuLU-x4LvAoVG-5NZZwm836HyEgQn; route=6f50b51faa11b987e576cdb301e545c4; _jc_save_fromStation=%u957F%u6C99%2CCSQ; _jc_save_toStation=%u5CB3%u9633%2CYYQ; _jc_save_fromDate=2022-05-04; _jc_save_toDate=2022-04-30',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Safari/537.36'
}
# 通过requests数据请求模块里面get请求方法, 对于url地址发送请求, 并且携带上headers请求头伪装, 最后用response变量接收返回数据
response = requests.get(url=url, headers=headers)
# 2. 获取数据
print(response.json())  #  <Response [200]>  请求成功 返回响应对象  不是完整json数据格式
# 3. 解析数据, 提取我们想要数据内容
tb = pt.PrettyTable()
tb.field_names = [
    '序号',
    '车次',
    '出发时间',
    '到达时间',
    '耗时',
    '特等座',
    '一等',
    '二等',
    '软卧',
    '硬卧',
    '硬座',
    '无座',
]
page = 1
for index in response.json()['data']['result']:  # 把列表里面元素 一个一个提取出来, 用for循环遍历
    # index.split('|') # 字符串分割, 以|进行分割, 返回列表
    info = index.split('|')
    num = info[3]  # 车次
    start_time = info[8]  # 出发时间
    end_time = info[9]  # 到达时间
    use_time = info[10]  # 耗时
    topGrade = info[32]  # 特等座
    first_class = info[31]  # 一等
    second_class = info[30]  # 二等
    soft_sleeper = info[23]  # 软卧
    hard_sleeper = info[28]  # 硬卧
    hard_seat = info[29]  # 硬座
    no_seat = info[26]  # 无座
    dit = {
        '车次': num,
        '出发时间': start_time,
        '到达时间': end_time,
        '耗时': use_time,
        '特等座': topGrade,
        '一等': first_class,
        '二等': second_class,
        '软卧': soft_sleeper,
        '硬卧': hard_sleeper,
        '硬座': hard_seat,
        '无座': no_seat,
    }
    tb.add_row([
        page,
        num,
        start_time,
        end_time,
        use_time,
        topGrade,
        first_class,
        second_class,
        soft_sleeper,
        hard_sleeper,
        hard_seat,
        no_seat,
    ])
    page += 1
print(tb)
word = input('请输入你想要购买车票: ')
回家的诱惑.get_train(int(word), from_station, to_station, date)
