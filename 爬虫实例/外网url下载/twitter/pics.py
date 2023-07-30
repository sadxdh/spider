import requests
import os
import pandas as pd
import time


def producer():
    df = pd.read_excel('./@LAOLIU____user_tweets.xlsx')
    Media_URLs_df = df[(df['Media Type'] == 'photo')].loc[:, 'Media URLs':]
    # Media_URLs_df
    output_lst = list(Media_URLs_df['Media URLs']) + list(Media_URLs_df['Unnamed: 16'].dropna()) + list(
        Media_URLs_df['Unnamed: 17'].dropna()) + list(Media_URLs_df['Unnamed: 18'].dropna())
    print(len(output_lst))
    return output_lst


def consumer(output_lst):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.35'
    }
    dir_name = 'LAOLIU____user_tweets'
    if not os.path.exists(dir_name):
        os.mkdir(dir_name)
    for url in output_lst:
        time.sleep(0.5)
        url = f'https://proxy.chromiumer.com/dl?url={url}'
        resp = requests.get(url, headers=headers).json()['dlurl']
        files = os.listdir(dir_name)  # 读入文件夹
        num_video = len(files)  # 统计文件夹中的文件个数
        with open(f'{dir_name}/{num_video}.jpg', 'wb') as f:
            f.write(requests.get(resp, headers=headers).content)
        print(f'正在下载第{num_video}张')


if __name__ == '__main__':
    # print(producer().__len__())
    consumer(producer())
