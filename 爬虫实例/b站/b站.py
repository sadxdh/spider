import os
import requests
import pprint
import shutil
import re
import json
import subprocess


def get_resp(url):
    print(url)
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36 Edg/100.0.1185.29',
        'referer': 'https://www.bilibili.com/'
    }
    resp = requests.get(url, headers=headers, timeout=120)
    # print(resp.text)
    return resp


def get_video_info(html_url):
    resp = get_resp(html_url)
    title = re.findall('name="title" content="(.*?)>', resp.text)[0]
    print(title)
    title = re.sub(r'[\/\:\*\?\"\<\>\|\n\s]', '_', title)
    title = title.strip("_哔哩哔哩_bilibili_")
    html_data = re.findall('<script>window.__playinfo__=(.*?)</script>', resp.text)[0]
    json_data = json.loads(html_data)
    # print(json_data)
    pprint.pprint(json_data)
    audio_url = json_data['data']['dash']['audio'][0]['baseUrl']
    video_url = json_data['data']['dash']['video'][0]['baseUrl']
    video_info = [title, audio_url, video_url]
    print(video_info)
    return video_info


def save(title, audio_url, video_url):
    audio_content = get_resp(audio_url).content
    video_content = get_resp(video_url).content
    with open(title + '.mp3', mode='wb')as f:
        f.write(audio_content)
    with open(title + '.mp4', mode='wb')as f:
        f.write(video_content)
    print("下载完成")


def merge_data(video_name):
    print('开始拼接', video_name)
    COMMAND = f'C:\\Users\\24613\\PycharmProjects\\spider\\爬虫实例\\b站\\ffmpeg-master-latest-win64-gpl-shared\\bin\\ffmpeg.exe -i {video_name}.mp4 -i {video_name}.mp3 -c:v copy -c:a aac -strict experimental {video_name}output.mp4'
    subprocess.run(COMMAND, shell=True)
    print('拼接完成', video_name)


if __name__ == '__main__':
    url_list = [f'https://www.bilibili.com/video/BV1e7421K7HF?p={p}' for p in range(18,28)]
    for url in url_list:
        video_info = get_video_info(url)
        save(video_info[0], video_info[1], video_info[2])
        merge_data(video_info[0])
        os.remove(video_info[0]+'.mp3')
        os.remove(video_info[0]+'.mp4')
        # shutil.move(video_info[0]+'output.mp4', f'./b站视频/{video_info[0]}.mp4')
        shutil.move(video_info[0]+'output.mp4', f'./SD保姆级教程/{video_info[0]}.mp4')
