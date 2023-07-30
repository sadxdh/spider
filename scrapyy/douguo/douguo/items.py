# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class DouguoItem(scrapy.Item):
    title = scrapy.Field()
    Material = scrapy.Field()
    steps = scrapy.Field()
    tips = scrapy.Field()

    image_urls = scrapy.Field()
    # 图片下载路径、url和校验码等信息（图片全部下载完成后将信息保存在images中）
    images = scrapy.Field()
    # 图片的本地保存地址
    image_paths = scrapy.Field()

