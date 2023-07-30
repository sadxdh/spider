from selenium import webdriver
import time
import requests
from ftfy import fix_text
import os
import re
from selenium.webdriver.common.by import By
import concurrent.futures

# selenium xpath requests re
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36 Edg/97.0.1072.69',
    'cookie': 'douyin.com; __ac_nonce=0624e6d7300ba1cd5c4cd; __ac_signature=_02B4Z6wo00f01OvahqwAAIDAa9h874hUrDjr.oIAAFi-Vl8hZAiYIkmcGgEPUx61SUg0ya9Jjp8z1JjkmiOBp6AjxU87ldZE2DK03y7eqV8CWv.5.vaKL3dHCF-r2pXCsQHeECk0rvjRNoWm11; '
              'ttwid=1|Y0yMzX0LKs2Af5ryp_DnIbbPJVRkdRuS-cgQTEVyxzE|1649306996|ba4f181c05cefbe0256a02bf6284b4f7211ec25f7699badaddfac303e77792c2; _tea_utm_cache_6383=undefined; douyin.com; strategyABtestKey=1649306998.443; passport_csrf_token=f9df022875d18d9e4cb2699427100e99; '
              'passport_csrf_token_default=f9df022875d18d9e4cb2699427100e99; AB_LOGIN_GUIDE_TIMESTAMP=1649306998315; _tea_utm_cache_1300=undefined; s_v_web_id=verify_l1oisydn_UAIiCEa7_DzDP_4IWb_Adrl_KbBIbUtDBdC0; _tea_utm_cache_2285=undefined; pwa_guide_count=3; THEME_STAY_TIME=299791; '
              'IS_HIDE_THEME_CHANGE=1; n_mh=4eUUE7atD9IdSVhI2EJ5paWv1TYcWVFfkaLHA_eghkQ; sso_uid_tt=4e08135d4dfd31f89e1538c3ce4a912d; sso_uid_tt_ss=4e08135d4dfd31f89e1538c3ce4a912d; toutiao_sso_user=ba54ed49401762e5d594b67c346960cf; toutiao_sso_user_ss=ba54ed49401762e5d594b67c346960cf; '
              'sid_ucp_sso_v1=1.0.0-KDE5YTE4OTYyMDc1NDNiNTM0MjQ5NGU0ZTkwMjg5NDgyNGQyZGRhZTcKHwibkdCgk_T2AhDh37mSBhjvMSAMMLCEzegFOAZA9AcaAmxmIiBiYTU0ZWQ0OTQwMTc2MmU1ZDU5NGI2N2MzNDY5NjBjZg; '
              'ssid_ucp_sso_v1=1.0.0-KDE5YTE4OTYyMDc1NDNiNTM0MjQ5NGU0ZTkwMjg5NDgyNGQyZGRhZTcKHwibkdCgk_T2AhDh37mSBhjvMSAMMLCEzegFOAZA9AcaAmxmIiBiYTU0ZWQ0OTQwMTc2MmU1ZDU5NGI2N2MzNDY5NjBjZg; '
              'msToken=wc3mvX8zL4d8JPCU3wo7IBKdwe36w_tgxzSF5TugFYjJ04ACNtZsMB2zb7t-FlRB038C06vJGR-c9kA65_nezaPm8cEq_cW2NPqPWMJjx5tBZEFWT4n_EkJDOSkQaB3P; odin_tt=74f4629fbbaf03e2c8ab13af3909907d30232e7776da94149217ce90a083fdf3146cbac895892599e7475a22197c5ba9698ff8b004e09cc685bd86e3cbd46e62; '
              'sid_guard=ba54ed49401762e5d594b67c346960cf|1649307618|5184000|Mon,+06-Jun-2022+05:00:18+GMT; uid_tt=4e08135d4dfd31f89e1538c3ce4a912d; uid_tt_ss=4e08135d4dfd31f89e1538c3ce4a912d; sid_tt=ba54ed49401762e5d594b67c346960cf; sessionid=ba54ed49401762e5d594b67c346960cf; '
              'sessionid_ss=ba54ed49401762e5d594b67c346960cf; sid_ucp_v1=1.0.0-KGRlYTM3YWU1ODIzZDgwZmU0YjBkNjFlZjA2YzA4NTFjNGIyODAyNDAKHwibkdCgk_T2AhDi37mSBhjvMSAMMLCEzegFOAZA9AcaAmhsIiBiYTU0ZWQ0OTQwMTc2MmU1ZDU5NGI2N2MzNDY5NjBjZg; '
              'ssid_ucp_v1=1.0.0-KGRlYTM3YWU1ODIzZDgwZmU0YjBkNjFlZjA2YzA4NTFjNGIyODAyNDAKHwibkdCgk_T2AhDi37mSBhjvMSAMMLCEzegFOAZA9AcaAmhsIiBiYTU0ZWQ0OTQwMTc2MmU1ZDU5NGI2N2MzNDY5NjBjZg; '
              'msToken=ZUeH2TSmhhYnOFZW7m7jaWAl_6mU58DShZW4osAuscm-tTPaGuPflxIgB2WzZvwHOFy1LifmL_dl3wRmKV1-qPHvwe7-ow_SIiCOBc8nBcc8GSiVImknkzU=; home_can_add_dy_2_desktop=1; tt_scid=EXLgHgW0BR4gA1LOtjxE2tr06nu3R2GmWkHKHwGDLSki8vgWRU8yMGIWWHSVa5CJ1565 '
}


# 实现自动下拉，滚动页面效果
def drop_down(length, driver):
    for x in range(1, length, 4):  # 下拉的过程中，页面高度也会变化
        time.sleep(1)
        j = x / 9
        # document.documentElement.scrollTop 指定滚动条的位置
        # document.documentElement.scrollHeight 指定浏览器页面的最大高度
        js = 'document.documentElement.scrollTop = document.documentElement.scrollHeight * %f' % j
        driver.execute_script(js)


def driver_url():
    driver = webdriver.Chrome()
    # https://www.douyin.com/user/MS4wLjABAAAAcbi45z4Caoke1tojaXhNbn6nia_VfvgbU5xRD2ZT5lj-MD2FN7wNuUR2imwf4l3M
    # https://www.douyin.com/user/MS4wLjABAAAAgFEQJ5kAsZGWpRJivOsCy3JSGszp6gaM40C3TjhT8kw  134   穗岁同学    js滚动范围
    driver.get('https://www.douyin.com/user/MS4wLjABAAAAgFEQJ5kAsZGWpRJivOsCy3JSGszp6gaM40C3TjhT8kw')
    time.sleep(3)
    video_count = driver.find_element(By.XPATH,
                                      '//*[@id="root"]/div/div[2]/div/div/div[4]/div[1]/div[1]/div[1]/span').text
    print(video_count)
    drop_down(round(int(video_count) / 2), driver)
    time.sleep(10)
    href_lst = []
    for i in range(1, int(video_count) + 1):
        x_path = f'//*[@id="root"]/div/div[2]/div/div/div[4]/div[1]/div[2]/ul/li[{i}]/a'
        href_lst.append(driver.find_element(By.XPATH, x_path).get_attribute('href'))
    print("有效链接为：", len(href_lst), "个")
    return href_lst


def asi_url(href):
    resp = requests.get(href, headers=headers)  # <Response [200]> <>表示对象 200是状态码
    resp.encoding = resp.apparent_encoding  # 自动识别编码
    # print(resp.text)
    html = fix_text(resp.text)
    title = re.findall('<title data-react-helmet="true">(.*?) - 抖音</title>', html, re.DOTALL)[0]
    # print(title)
    title = re.sub(r'[\\\/\:\*\?\"\<\>\|\n\s]', '_', title)
    print(title)
    video_date = re.findall('playAddr%22%3A%5B%7B%22src%22%3A%22(.*?)%22%7D%2C%7B%22src', html)[0]
    # print(video_date)
    video_author = re.findall('"name": "(.*?)",', html)[1]
    # print(video_author)
    video_author = re.sub(r'[\\\/\:\*\?\"\<\>\|]', '_', video_author)
    print(video_author)
    video_url = "https:" + requests.utils.unquote(video_date)  # 解码
    print(video_url)
    #  print(title + '\t' + video_author)
    root_dir = '抖音'
    file_local = root_dir + '/' + video_author
    if not os.path.exists(file_local):
        os.mkdir(file_local)

    video_content = requests.get(video_url, headers=headers).content
    with open(file_local + '/' + title + '.mp4', mode='wb') as f:
        f.write(video_content)
        print(title, "保存成功")


if __name__ == '__main__':
    href_lst = driver_url()
    # 线程池 map模式、简洁、返回有序、较慢
    for href in href_lst:
        asi_url(href)
    start_time_3 = time.time()
    with concurrent.futures.ThreadPoolExecutor() as pool:  # 63秒
        pool.map(asi_url, href_lst)  # 参数为列表形式，适合所有参数一次传入
    print("进程池计算的时间：" + str(time.time() - start_time_3), "秒")
    print("全部爬取完毕")
