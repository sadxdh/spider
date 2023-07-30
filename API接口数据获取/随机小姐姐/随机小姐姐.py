import requests
import os


def get_json(url, headers):
    resp = requests.get(url, headers=headers, verify=False).text
    return resp


def parse_video(resp):
    video_url = "https:" + resp.split('\n')[-1]
    return video_url


def download_video(video_url):
    dir_name = "小姐姐"
    if not os.path.exists(dir_name):
        os.mkdir(dir_name)
    files = os.listdir(dir_name)  # 读入文件夹
    num_video = len(files)  # 统计文件夹中的文件个数
    # print(num_png)  # 打印文件个数
    with open(f'{dir_name}/{num_video}.mp4', 'wb') as f:
        f.write(requests.get(video_url, verify=False).content)


def main():
    headers = {
        'Host': 'tucdn.wpon.cn',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.35'
    }
    url = 'http://tucdn.wpon.cn/api-girl/index.php?wpon=url'
    html = get_json(url, headers)
    video_url = parse_video(html)
    download_video(video_url)
    # print(parse_video(html))


if __name__ == '__main__':
    for i in range(20):
        main()
