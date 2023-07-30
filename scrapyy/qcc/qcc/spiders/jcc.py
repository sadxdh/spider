import scrapy


class JccSpider(scrapy.Spider):
    name = 'jcc'
    allowed_domains = ['qcc.com']
    start_urls = ['https://www.qcc.com/web/search?key=%E6%AF%94%E4%BA%9A%E8%BF%AA']

    def parse(self, response):
        # print(response.text)
        pass
        # return item
