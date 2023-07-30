import pprint

import requests

url = 'https://weibo.com/ajax/feed/hottimeline?since_id=0&refresh=0&group_id=102803&containerid=102803&extparam=discover%7Cnew_feed&max_id=0&count=10'

resp = requests.get(url)
resp.encoding='utf-8'
json_data = resp.json()
# pprint.pprint(json_data)
statuses = json_data['statuses']
print(len(statuses))
print(statuses)
# for s in statuses:
#     # page_info = s['page_info']
#     pprint.pprint(s)

# 'page_info''content1''content2'