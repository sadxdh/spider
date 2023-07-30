import requests
import re
import threading
import time

urls = [
    f"https://www.kuaidaili.com/free/inha/{page}/"
    for page in range(1, 40)
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36 Edg/97.0.1072.69'
}


# 返回：ip_list, port_list
# 循环执行
def craw(url):
    response = requests.get(url, headers=headers)
    html = response.text
    '''<td data-title="IP">202.55.5.209</td>
                        <td data-title="PORT">8090</td>
                        <td data-title="匿名度">高匿名</td>
                        <td data-title="类型">HTTP</td>
                        <td data-title="位置">中国 香港 电信 </td>
                        <td data-title="响应速度">0.3秒</td>
                        <td data-title="最后验证时间">2022-03-31 20:31:01</td>'''

    ip_list = re.findall('<td data-title="IP">(.*?)</td>', html)
    port_list = re.findall('<td data-title="PORT">(.*?)</td>', html)
    # local_list = re.findall('<td data-title="位置">(.*?)</td>', html)
    # response_list = re.findall('<td data-title="响应速度">(.*?)</td>', html)
    # final_check_time_list = re.findall('<td data-title="最后验证时间">(.*?)</td>', html)
    return ip_list, port_list

    # print(ip_list)
    # print(port_list)
    # print(local_list)
    # print(response_list)
    # print(final_check_time_list)

    # for i in range(len(ip_list)):
    #     print(ip_list[i] + '\t' + port_list[i] + '\t' + local_list[i] + '\t' + response_list[i] + '\t' +
    #           final_check_time_list[i])


def parse(ip_list, port_list):
    for ip, port in zip(ip_list, port_list):
        ip_http = ip + ':' + port
        proxies_dict = {
            "http": "http://" + ip_http,
            "https": "https://" + ip_http
        }
        try:
            response_1 = requests.get('http://www.baidu.com', headers=headers, proxies=proxies_dict, timeout=3)
            if response_1.status_code == 200:
                print('IP代理可以使用', proxies_dict)
                lists.append(proxies_dict)
        except:
            # print(proxies_dict, "IP代理不可用。。。。")
            pass


for url in urls:
    print("正在查询可用代理，请稍等。。。。")
    ip_list, port_list = craw(url)
    parse(ip_list, port_list)
