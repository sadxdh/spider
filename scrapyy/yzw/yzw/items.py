# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class YzwItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    # 招生单位
    school = scrapy.Field()
    # 考试方式
    test = scrapy.Field()
    # 院系所
    college = scrapy.Field()
    # 专业
    subject = scrapy.Field()
    # 学习方式
    style = scrapy.Field()
    # 研究方向
    direction = scrapy.Field()
    # 备注
    Remarks = scrapy.Field()
    # 考试科目 政治 外语 业务课一 业务课二
    polite = scrapy.Field()
    language = scrapy.Field()
    math = scrapy.Field()
    project = scrapy.Field()
