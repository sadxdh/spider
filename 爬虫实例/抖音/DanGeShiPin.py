import requests

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
                  'Chrome/102.0.5005.63 Safari/537.36 Edg/102.0.1245.33 '
}

url = 'https://www.douyin.com/aweme/v1/play/?video_id=v0300f1d0000c1etcrb3q6cvpftf6dv0'
content = requests.get(url, headers=headers).content
title = url.split('/')[-2]
with open(f'{title}.mp4', 'wb') as f:
    f.write(content)
# https://www.douyin.com/video/7232190723569880354