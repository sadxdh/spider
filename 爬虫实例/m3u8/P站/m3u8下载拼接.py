# 设计目的：实现m3u8文件自动解析、下载、合并       # 几种类型：短视频类型（短，可大批量操作）、长视频类型（单视频操作）、电视剧类型（重复操作）
import asyncio
import os
import re
import subprocess
# from Crypto.Cipher import AES
import aiofiles
import aiohttp
# 异常：不能保存在特定文件夹，路径问题，只能保存在本地，但非常容易导致pycharm卡顿（建立索引）
import requests


def join_ts1(video_name):
    title_list = []  # title:00000,00001,00002 line.split('.')[1]
    with open(f"{video_name}.m3u8", "r", encoding='utf-8') as f:
        for line in f:
            if line.startswith("#"):
                continue
            line = line.strip('\n')
            title_list.append(line.split('/')[-1])
    title_list = [f"{t}" for t in title_list]
    # title_list = [f"{i}" for i in range(1, 15 + 1)]
    print(len(title_list))
    s = "+".join(title_list)
    print(f"copy /b {s} {video_name}.mp4")
    # os.system(f"copy /b {s} {video_name}.mp4")
    COMMAND = f"copy /b {s} {video_name}.mp4"
    subprocess.run(COMMAND, shell=True)
    # for r in title_list:
    #     os.remove(r)
    print(f"{video_name}.mp4拼接完成")


'''# 获取密钥
def get_key(url):
    resp = requests.get(url)
    return resp.text


async def dec_ts(name, key):
    aes = AES.new(key=key, IV=b"0000000000000000", mode=AES.MODE_CBC)
    async with aiofiles.open(f"{name}", mode="rb") as f1, \
            aiofiles.open(f"temp_{name}", mode="wb") as f2:
        bs = await f1.read()
        await f2.write(aes.decrypt(bs))
    print(f"{name}处理完毕")


# 解密
async def aio_dec(key):
    tasks = []
    async with aiofiles.open(f"{video_name}", 'r', encoding='utf-8') as f:
        async for line in f:
            if line.startswith("#"):
                continue
            line = line.strip
            task = asyncio.create_task(dec_ts(line, key))
            tasks.append(task)
        await asyncio.wait(tasks)
'''


async def download_ts(url, title, session):
    async with session.get(url) as resp3:
        async with aiofiles.open(f"{title}", 'wb') as f:
            print(f)
            await f.write(await resp3.content.read())
    print(f"{title}下载完成")


# ****** m3u8文件要断尾  #EXT-X-ENDLIST\n 后面的全部去掉******
async def get_title(video_name, up_url):
    tasks = []  # download_ts(ts_url, title, session)
    async with aiohttp.ClientSession() as session:  # ***括号***
        async with aiofiles.open(video_name + ".m3u8", "r", encoding='utf-8') as f:
            async for line in f:
                if line.startswith("#"):  # ****** m3u8文件要断尾  #EXT-X-ENDLIST\n 后面的全部去掉******
                    continue
                title = line.strip('\n').split('/')[-1]
                # print(title)
                ts_url = up_url + line
                print(ts_url)
                task = asyncio.create_task(download_ts(ts_url, title, session))
                tasks.append(task)
            await asyncio.wait(tasks)


# m3u8文件断尾
def m3u8_srtip():
    with open(f"{video_name}.m3u8", "r", encoding='utf-8') as f:
        f = f.read().strip()
    with open(f"{video_name}.m3u8", "w", encoding='utf-8') as fp:
        fp.write(f)


# 方法逆序执行
# video_name = '蓝 色 战 衣 -【只是长胖】有蕉易抽奖噢~~~'
# up_url = "https://tx-safety-video.acfun.cn/mediacloud/acfun/acfun_video/hls/"+ts_url
if __name__ == '__main__':
    video_name = '天行九歌第二部第十一集'  # .m3u8         # 影片名
    video_name = re.sub(r'[\\\/\:\*\?\"\<\>\|\n\s\[\]【】]', '', video_name)  # 是否操作文件名格式化    # 影片名格式化
    # print(video_name)  # 使用前先调试名称
    # os.rename('QUkMNxMW031mADydcsGFh86xa-QAFpklixXMGuLBxLez3fEIpfB6EXQQ-uLhfS_w.m3u8', f'{video_name}.m3u8')  # 影片名重命名
    m3u8_srtip()  # 调试m3u8文件：去尾
    up_url = ""  # ts的url通用前缀 需要绝对路径
    # asyncio.run(get_title(video_name, up_url))  # ****启动异步协程**** 异常：RuntimeError: Event loop is closed
    loop = asyncio.get_event_loop()
    loop.run_until_complete(get_title(video_name, up_url))
    # 解密
    # with open(f"{video_name}.m3u8", "r", encoding='utf-8') as f:
    #     for line in f:
    #         if line.startswith("#EXT-X-KEY"):
    #             key_url = up_url + re.findall('URI="(.*?)"', line)[0]
    # key = get_key(key_url)
    # loop = asyncio.get_event_loop()
    # loop.run_until_complete(aio_dec(key))
    # 合并
    join_ts1(video_name)
