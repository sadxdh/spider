import scrapy
from yzw.items import YzwItem


class YanzhaowangSpider(scrapy.Spider):
    name = 'yanzhaowang'
    allowed_domains = ['yz.chsi.com.cn']
    start_urls = ['https://yz.chsi.com.cn']

    def parse(self, response):
        post_data_list = [
            # 上海 计算机科学与技术学硕 电子信息专硕
            {'ssdm': '31', 'dwmc': '', 'mldm': '08', 'mlmc': '', 'yjxkdm': '0812', 'zymc': '', 'xxfs': ''},
            {'ssdm': '31', 'dwmc': '', 'mldm': '08', 'mlmc': '', 'yjxkdm': '0854', 'zymc': '', 'xxfs': ''},
            # 江苏 计算机科学与技术学硕 电子信息专硕
            {'ssdm': '32', 'dwmc': '', 'mldm': '08', 'mlmc': '', 'yjxkdm': '0812', 'zymc': '', 'xxfs': ''},
            {'ssdm': '32', 'dwmc': '', 'mldm': '08', 'mlmc': '', 'yjxkdm': '0854', 'zymc': '', 'xxfs': ''},
            # 浙江 计算机科学与技术学硕 电子信息专硕
            {'ssdm': '33', 'dwmc': '', 'mldm': '08', 'mlmc': '', 'yjxkdm': '0812', 'zymc': '', 'xxfs': ''},
            {'ssdm': '33', 'dwmc': '', 'mldm': '08', 'mlmc': '', 'yjxkdm': '0854', 'zymc': '', 'xxfs': ''},
            # 安徽 计算机科学与技术学硕 电子信息专硕
            {'ssdm': '34', 'dwmc': '', 'mldm': '08', 'mlmc': '', 'yjxkdm': '0812', 'zymc': '', 'xxfs': ''},
            {'ssdm': '34', 'dwmc': '', 'mldm': '08', 'mlmc': '', 'yjxkdm': '0854', 'zymc': '', 'xxfs': ''},
            # 山东 计算机科学与技术学硕 电子信息专硕
            {'ssdm': '37', 'dwmc': '', 'mldm': '08', 'mlmc': '', 'yjxkdm': '0812', 'zymc': '', 'xxfs': ''},
            {'ssdm': '37', 'dwmc': '', 'mldm': '08', 'mlmc': '', 'yjxkdm': '0854', 'zymc': '', 'xxfs': ''},
            # Add more post_data dictionaries here
        ]

        for post_data in post_data_list:
            self.post_data = post_data  # Set the post_data attribute
            yield scrapy.FormRequest(
                url='https://yz.chsi.com.cn/zsml/queryAction.do',
                callback=self.query,
                formdata=post_data
            )

    def query(self, response):
        link_list = response.xpath('//*[@id="form3"]/a/@href').extract()
        for l in link_list:
            yield scrapy.Request(
                url=response.urljoin(l),
                callback=self.info_query
            )

    def info_query(self, response):
        pro_link = response.xpath('//*[@class="ch-table-center"]/a/@href').extract()
        for i in pro_link:
            yield scrapy.Request(
                url='https://yz.chsi.com.cn' + i,
                callback=self.info
            )

    def info(self, response):
        item = YzwItem()
        summary = response.xpath('//*[@class="zsml-summary"]/text()').extract()
        item['school'] = summary[0].strip()
        item['test'] = summary[1].strip()
        item['college'] = summary[2].strip()
        item['subject'] = summary[3].strip()
        item['style'] = summary[4].strip()
        item['direction'] = summary[5].strip()
        item['Remarks'] = response.xpath('//*[@class="zsml-bz"]/text()').extract()[-1]
        text = response.xpath('//*[@class="zsml-res-items"]/tr/td/text()').extract()
        item['polite'] = text[0].strip()
        item['language'] = text[2].strip()
        item['math'] = text[3].strip()
        item['project'] = text[4].strip()
        yield item
