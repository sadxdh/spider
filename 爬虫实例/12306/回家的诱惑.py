import time
from selenium import webdriver
from password import account, Password
from selenium.webdriver.common.keys import Keys


def get_train(num, from_station, to_station, date):
    # 如果你驱动放在你python环境安装目录里面 可以不用指定路径
    # driver = webdriver.Chrome(executable_path='驱动路径')
    driver = webdriver.Chrome()
    # 绕过selenium检测
    driver.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument",
                           {"source": """Object.defineProperty(navigator, 'webdriver', {get: () => undefined})"""})

    driver.get('https://kyfw.12306.cn/otn/resources/login.html')
    driver.find_element_by_css_selector('#J-userName').send_keys(account)  # 输入账号
    driver.find_element_by_css_selector('#J-password').send_keys(Password)  # 输入密码
    driver.find_element_by_css_selector('#J-login').click()  # 点击登陆
    driver.implicitly_wait(10)
    driver.find_element_by_css_selector('.modal-ft .btn ').click()
    driver.find_element_by_css_selector('#link_for_ticket').click()
    driver.implicitly_wait(10)
    driver.find_element_by_css_selector('#fromStationText').send_keys(Keys.ENTER)
    driver.find_element_by_css_selector('#fromStationText').clear()
    driver.find_element_by_css_selector('#fromStationText').click()
    driver.find_element_by_css_selector('#fromStationText').send_keys(from_station)
    driver.find_element_by_css_selector('#fromStationText').send_keys(Keys.ENTER)
    driver.find_element_by_css_selector('#toStationText').clear()
    driver.find_element_by_css_selector('#toStationText').click()
    driver.find_element_by_css_selector('#toStationText').send_keys(to_station)
    driver.find_element_by_css_selector('#toStationText').send_keys(Keys.ENTER)
    time.sleep(1)
    driver.find_element_by_css_selector('#train_date').clear()
    driver.find_element_by_css_selector('#train_date').click()
    driver.find_element_by_css_selector('#train_date').send_keys(date)
    driver.find_element_by_css_selector('#train_date').send_keys(Keys.ENTER)
    driver.find_element_by_css_selector('#query_ticket').click()
    if num%2 == 0:
        driver.find_element_by_css_selector(f'#queryLeftTable tr:nth-child({num+1}) .btn72').click()
    else:
        driver.find_element_by_css_selector(f'#queryLeftTable tr:nth-child({num}) .btn72').click()
    driver.find_element_by_css_selector('#normalPassenger_0').click()
    driver.find_element_by_css_selector('#submitOrder_id').click()
    driver.find_element_by_css_selector('#erdeng1 > ul:nth-child(4) li:nth-child(2) a').click()
