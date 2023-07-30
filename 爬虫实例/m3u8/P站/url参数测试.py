import requests
import re
import os

viewkey = 'ph5f9a9250c4f81'
headers = {
    'cookie': 'bs=el2y050nms1gdt9z4nwv4iumeodpfc2w; ss=849956381076449556; fg_0d2ec4cbd943df07ec161982a603817e=63323.100000; hasVisited=1; fg_f916a4d27adf4fc066cd2d778b4d388e=86985.100000; fg_fa3f0973fd973fca3dfabc86790b408b=7069.100000; __l=6426DBA5-42FE722901BB3533-6E20CEB; il=v1JcADsODlkMoDrB3sCFTqd9vE_B7HKcB1iV5Okc4U9V8xNjg4MDQ0MjA4R0lNOG4xdDhKRUYwNWJfMVg4MjJoZkR0b2dMaHBBUFE4V0RVRlc2TA..; expiredEnterModalShown=1; ua=a919388382c7d9925b84c2068482b90f; platform=pc; _gid=GA1.2.675847036.1681112268; __s=6433C691-42FE722901BB1615-E9CB81E; atatusScript=hide; fg_1f595a21748e9a93d04690b86a079a2a=25726.100000; _ga=GA1.1.1470033419.1680268200; _ga_B39RFFWGYY=GS1.1.1681112268.7.1.1681115875.0.0.0; _gat=1; etavt={"ph62bce4415a56a":"1_23_2_NA|3","641065f0e7353":"7_5_NA_NA|2","ph6179baac54e4b":"5_1_2_pornhub.video_recommendation.70|1","ph5f9a9250c4f81":"5_1_2_pornhub.video_recommendation.70|0"}',
    'referer': 'https://cn.pornhub.com/view_video.php?viewkey=ph6179baac54e4b',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.34',
}

resp = requests.get(f'https://cn.pornhub.com/view_video.php?viewkey={viewkey}', headers=headers).text
title = re.findall('"video_title":"(.*?)"', resp)[0]
print(title)

if not os.path.exists('videos'):
    os.mkdir('videos')
with open(f"videos/{title}.mp4", 'wb') as f:
    f.write(requests.get(f'https://cn.pornhub.com/embed/{viewkey}', headers=headers).content)
