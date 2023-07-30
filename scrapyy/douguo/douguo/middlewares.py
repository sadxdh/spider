# Define here the models for your spider middleware
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/spider-middleware.html
import random
from scrapy import signals
import requests
# useful for handling different item types with a single interface
from douguo.settings import USER_AGENTS_LIST# , PROXY_LIST
from itemadapter import is_item, ItemAdapter


class RandomUserAgent(object):
    def process_request(self, request, spider):
        # print(request.headers['User-Agent'])
        ua = random.choice(USER_AGENTS_LIST)
        request.headers['User-Agent'] = ua


class RandomProxy(object):
    def process_request(self, request, spider):
        # proxy = '182.253.192.226:8080'
        proxy = requests.get('http://192.168.0.102:5555/random').text.strip()
        # proxy = random.choice(PROXY_LIST)
        request.meta['proxy'] = proxy
