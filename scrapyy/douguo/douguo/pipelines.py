# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import os
from scrapy.pipelines.images import ImagesPipeline
from scrapy.exceptions import DropItem
from scrapy.http import Request
import urllib.request


class DouguoPipeline:
    def process_item(self, item, spider):
        item = dict(item)
        if not os.path.exists('douguowang'):
            os.mkdir('douguowang')
        if not os.path.exists('douguowang' + item['title']):
            os.mkdir('douguowang/' + item['title'])
        with open('douguowang/' + item['title'] + '/' + item['title'] + '.txt', 'w', encoding='utf-8') as f:
            f.write('Material:' + item['Material'] + '\n' +
                    'steps:' + item['steps'] + '\n' +
                    'Tips:' + item['tips'] + '\n'
                    )
        for url in item['image_urls']:
            urllib.request.urlretrieve(url, 'douguowang/' + item['title'] + '/' + url.split('/')[-1])
        return item


class ImgPipline(ImagesPipeline):
    # 返回图片名称即可
    def file_path(self, request, item, response=None, info=None):
        image_guid = request.url.split('/')[-1]
        return 'full/%s' % image_guid

    def get_media_requests(self, item, info):
        for url in item['image_urls']:
            yield Request(url)

    def item_completed(self, results, item, info):
        image_paths = [x['path'] for ok, x in results if ok]
        if not image_paths:
            raise DropItem("Item contains no images")
        return item
