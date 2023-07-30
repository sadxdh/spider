from selenium import webdriver  # 导入模块 webdriver可以操作各种浏览器的驱动
import csv  # 保存数据的工具

with open('boss.csv', mode='a', encoding='utf-8', newline='') as f:
    csv_writer = csv.writer(f)
    csv_writer.writerow(['职位名称', '职位地址', '薪资', '学历经验要求', '公司名称', '公司信息', '公司福利', '详情页链接'])

city_list = [101010100, 101280600, 101020100, 101280100, 101210100, 101030100, 101110100, 101230200, 101160100]
# 1. 打开谷歌浏览器
driver = webdriver.Chrome()


def get_next():
    # 什么是标签 <div></div>  <p></p>  <a></a>  <img />
    # class 标签别名: 指定标签有一些相同的数据
    # .job-primary
    # 列表 所有的招聘信息
    lis = driver.find_elements_by_css_selector('.job-primary')
    # 3. 提取数据
    for li in lis:
        # 每一个岗位的招聘信息(代码)
        # css_selector 类选择器
        # 命名规则
        job_name = li.find_element_by_css_selector('.job-name a').text
        job_area = li.find_element_by_css_selector('.job-area').text
        job_salary = li.find_element_by_css_selector('.job-limit.clearfix span').text
        job_empirical = li.find_element_by_css_selector('.job-limit.clearfix p').text
        company_name = li.find_element_by_css_selector('.company-text h3').text
        job_info = li.find_element_by_css_selector('.company-text p').text
        desc = li.find_element_by_css_selector('.info-desc').text
        href = li.find_element_by_css_selector('.job-name a').get_attribute('href')
        print(job_name, job_area, job_salary, job_empirical, company_name, job_info, desc, href)
        # 4. 保存数据
        with open('boss.csv', mode='a', encoding='utf-8', newline='') as f:
            csv_writer = csv.writer(f)
            csv_writer.writerow([job_name, job_area, job_salary, job_empirical, company_name, job_info, desc, href])


for city in city_list:
    driver.get(f'https://www.zhipin.com/c{city}/?query=python&ka=sel-city-{city}')
    for page in range(1, 10):
        get_next()
        driver.find_element_by_css_selector('.next').click()
