import scrapy
from douguo.items import DouguoItem
# ----1.导入分布式爬虫类
from scrapy_redis.spiders import RedisSpider


# ----2.继承分布式爬虫类
class DgSpider(RedisSpider):
    name = 'dg'
    # ----3.注销允许的域和start_urls
    # allowed_domains = ['douguo.com']
    # start_urls = ['https://www.douguo.com/jingxuan/0']

    # ----4.设置redis_key
    redis_key = 'py21'

    # ----5.设置__init__
    def __init__(self, *args, **kwargs):
        domain = kwargs.pop('demain', '')
        self.allowed_domains = filter(None, domain.split(','))
        super(DgSpider, self).__init__(*args, **kwargs)

    def parse(self, response):
        urls = [f'https://www.douguo.com/jingxuan/{i}' for i in range(0, 240, 24)]
        temp = 'https_waf_cookie=2eb2b99f-6d95-4c7d8bc929263342b5baa0a19314b1fe5fff; ' \
               'XSRF-TOKEN=eyJpdiI6IlRaMHdIRW9jMWlxMFRISHRmUWFpN1E9PSIsInZhbHVlIjoiUG9qSjVkTnJDMDhRVGt1MlYybjNsNTBWQTRLZUpcL2twdTFOdWgzWVNxeU9vRlhqRFdoVlo3VEl1Y242NkhtZUQiLCJtYWMiOiIzZjdmNjZkN2EyNmYwNzk4MGE2NGEyMmUwZmM1ZGUzMGQ2MTc5NzljYzZiMWM0ZGZkZjNiYTRlMmMwOWFiMzY5In0%3D; ' \
               'laravel_session=1vLzAzT3HoA0PI71FczY6h0hHE6s9i87RtJRwv0h '
        cookies = {data.split('=')[0]: data.split('=')[-1] for data in temp.strip('; ')}
        for url in urls:
            print(url)
            yield scrapy.Request(
                url=url,
                callback=self.getPerRecipe,
                cookies=cookies
            )
            break

    def getPerRecipe(self, response):
        # print(response.request.url)
        recipe_list = response.xpath('//*[@id="jxlist"]/li/a/@href').extract()
        temp = 'https_waf_cookie=2eb2b99f-6d95-4c7d8bc929263342b5baa0a19314b1fe5fff; ' \
               'XSRF-TOKEN=eyJpdiI6IlRaMHdIRW9jMWlxMFRISHRmUWFpN1E9PSIsInZhbHVlIjoiUG9qSjVkTnJDMDhRVGt1MlYybjNsNTBWQTRLZUpcL2twdTFOdWgzWVNxeU9vRlhqRFdoVlo3VEl1Y242NkhtZUQiLCJtYWMiOiIzZjdmNjZkN2EyNmYwNzk4MGE2NGEyMmUwZmM1ZGUzMGQ2MTc5NzljYzZiMWM0ZGZkZjNiYTRlMmMwOWFiMzY5In0%3D; ' \
               'laravel_session=1vLzAzT3HoA0PI71FczY6h0hHE6s9i87RtJRwv0h '
        cookies = {data.split('=')[0]: data.split('=')[-1] for data in temp.strip('; ')}
        for recipe in recipe_list:
            url = response.urljoin(recipe)
            yield scrapy.Request(
                url=url,
                callback=self.getContent,
                cookies=cookies
            )

    def getContent(self, response):
        # print(response.request.url)
        item = DouguoItem()
        item['title'] = response.xpath('/html/head/title/text()').extract_first().strip()
        item['Material'] = ' '.join([data.strip() for data in response.xpath('//*[@class="metarial"]//text()').extract()])
        item['steps'] = ';'.join([data.strip() for data in response.xpath('//*[@id="left"]/div[4]/div/div/text()').extract()])
        item['tips'] = response.xpath('//*[@id="left"]/div[5]/p/text()').extract_first()
        item['image_urls'] = response.xpath('//*[@id="left"]/div[4]/div/a/img/@src').extract()
        item['image_paths'] = 'douguowang/' + item['title']
        print(item)
        return item
