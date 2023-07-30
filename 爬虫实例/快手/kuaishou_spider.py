import json
import pprint
import re
import requests
import os
# requests json
headers = {
    'content-type': 'application/json',
    'Cookie': 'kpf=PC_WEB; kpn=KUAISHOU_VISION; clientid=3; did=web_4b0d18fa943b3574824031deec5fb7ec; didv=1650082705501; userId=2160551559; '
              'kuaishou.server.web_st=ChZrdWFpc2hvdS5zZXJ2ZXIud2ViLnN0EqABSMVLiqkEU84985KF1bypSDyuZIbJX23fdGd9QlAJieu5jI3OIB5QDhPk_aZ5nziigccD9UDHm71NbWZv5F4GDAUQCBG43Ky73ROyGlrM'
              '-neqPIHWz68daUzt9etbFT1tuBzYP9eLCd6IktPkyihkhsfftCNg0wgbKfWumNZDb_Sx952e7zVSniN3OKolsZLhDATF9pHohZZSGXXfgsxedxoSS2UWrTnDahVDKzRYjzjLpJM-IiDwSH1qDUwuKPQ0PF_Pgrbha28Uasoy71eP_GAmdkaehSgFMAE; kuaishou.server.web_ph=6a7258cafc9df554d4a2500d3e438c0d0b3c',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36 Edg/100.0.1185.29'
}
data = {
    'operationName': "visionProfilePhotoList",
    'query': "query visionProfilePhotoList($pcursor: String, $userId: String, $page: String, $webPageArea: String) {\n  visionProfilePhotoList(pcursor: $pcursor, userId: $userId, page: $page, webPageArea: $webPageArea) {\n    result\n    llsid\n    webPageArea\n    feeds {\n      type\n      "
             "author {\n        id\n        name\n        following\n        headerUrl\n        headerUrls {\n          cdn\n          url\n          __typename\n        }\n        __typename\n      }\n      tags {\n        type\n        name\n        __typename\n      }\n      photo {\n        "
             "id\n        duration\n        caption\n        likeCount\n        realLikeCount\n        coverUrl\n        coverUrls {\n          cdn\n          url\n          __typename\n        }\n        photoUrls {\n          cdn\n          url\n          __typename\n        }\n        "
             "photoUrl\n        liked\n        timestamp\n        expTag\n        animatedCoverUrl\n        stereoType\n        videoRatio\n        profileUserTopPhoto\n        __typename\n      }\n      canAddComment\n      currentPcursor\n      llsid\n      status\n      __typename\n    }\n    "
             "hostName\n    pcursor\n    __typename\n  }\n}\n",
    'variables': {'userId': "3xp7g97xvgcib6m", 'pcursor': "", 'page': "profile"}
}
data = json.dumps(data)
response = requests.post('https://www.kuaishou.com/graphql', headers=headers, data=data)
# pprint.pprint(response.json())
json_data = response.json()
data_list = json_data['data']['visionProfilePhotoList']['feeds']
if not os.path.exists("视频"):
    os.mkdir("视频")
for data in data_list:
    caption = data['photo']['caption']
    caption = re.sub(r'[\\\/\:\*\?\"\<\>\|\n\s]', '_', caption)
    author = data['author']['name']
    photoUrl = data['photo']['photoUrl']
    print(caption + ',' + author + ',' + photoUrl)
    resp = requests.get(photoUrl).content
    if not os.path.exists("视频/" + author):
        os.mkdir("视频/" + author)
    with open("视频/" + author + '/' + caption + ".mp4", 'wb') as f:
        f.write(resp)
