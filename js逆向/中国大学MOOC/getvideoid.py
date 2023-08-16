import requests
import pprint
import time

videoId = '1217754807'


def get_videos(signature):

    # signature =
    # '654a6c30474e547a6b72674d70366469684d47664d41754b4e52334d4262514e356d47546751794d32394f54756450446e4b36354b7a324d4f4d346f3634684632327857792f55394f2f6f36467a65543570576c6d30787176564947386c563159373459306c7a625a6e5a7251714a3473384f4b30525a614d337373696a4a614761717132374b786d4734517a4b64416653684957344b46627a5371417436784c7a325475397a4e7161633d',

    params = {
        'signature': f'{signature}',
    }

    url = f"https://vod.study.163.com/eds/api/v1/vod/video?videoId={videoId}&signature={params['signature']}&clientType=1"

    headers = {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9,zh;q=0.8',
        'Content-Type': 'application/x-www-form-urlencoded',
        # 'Cookie': 'STUDY_SESS="63yMhaB8a8K0zY'
        #           '+ss0Rjye8yGRwHB3dPTjE8lWIg1kQziIgXgTreEYHlomlVOvqkt4VbiZQftiZAXedmfpQGPORMCFbFTV8vlWljtjcbF90KME1JDEDk8d4gHgVqkY2T5ThPP2ndxWUf1Muv017Bedi8p/w5wgAmSwfhEk03iPcLhur2Nm2wEb9HcEikV+3FTI8'
        #           '+lZKyHhiycNQo+g+/oA==";'
        #           ' STUDY_INFO="yd.83d437bf4fd34c1d8@163.com|8|1464005036|1692182451263";'
        #           ' DICT_SESS=v2|8OsYUYQKxOm64JLnMwBRqyO4wFhHez0OWnLTunL64RO5kfwS646y0OlhHOGkLOfRTyPMUMhfJL0lA0fJBhLTZ0guOfQzOfeuR;'
        #           ' DICT_LOGIN=1||1692182451331',
        'Cookie': {
            "STUDY_SESS": "\"63yMhaB8a8K0zY+ss0Rjye8yGRwHB3dPTjE8lWIg1kQziIgXgTreEYHlomlVOvqkt4VbiZQftiZAXedmfpQGPORMCFbFTV8vlWljtjcbF90KME1JDEDk8d4gHgVqkY2T5ThPP2ndxWUf1Muv017Bedi8p/w5wgAmSwfhEk03iPcLhur2Nm2wEb9HcEikV+3FTI8+lZKyHhiycNQo+g+/oA==\"",
            "STUDY_INFO": "\"yd.83d437bf4fd34c1d8@163.com|8|1464005036|1692182451263\"",
            "DICT_SESS": "v2|8OsYUYQKxOm64JLnMwBRqyO4wFhHez0OWnLTunL64RO5kfwS646y0OlhHOGkLOfRTyPMUMhfJL0lA0fJBhLTZ0guOfQzOfeuR",
            "DICT_LOGIN": "1||1692182451331"
        },
        'Origin': 'https://www.icourse163.org',
        'Referer': 'https://www.icourse163.org/',
        'Sec-Ch-Ua': '"Not/A)Brand";v="99", "Microsoft Edge";v="115", "Chromium";v="115"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'cross-site',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
    }

    resp = requests.get(url, headers).json()
    name = resp['result']['name']  # 视频名称
    videos = resp['result']['videos'][1]  # 视频信息 e,format,k,quality,secondaryEncrypt,size,v,videoUrl
    pprint.pprint(videos)
    return name, videos


def get_encrypt_m3u8(token):
    # headers比get_videos少了Content-Type和cookie
    headers = {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9,zh;q=0.8',
        'Origin': 'https://www.icourse163.org',
        'Referer': 'https://www.icourse163.org/',
        'Sec-Ch-Ua': '"Not/A)Brand";v="99", "Microsoft Edge";v="115", "Chromium";v="115"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'cross-site',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
    }

    # token = 'c77c054adf378151a42b591158c28ad345f3a5bf4bdc2a403797d25fb14a6e2b1006a45b7ed6fbdb3a20fc012fee3a05'

    params = {
        'quality': '2',
        'isNative': 'false',
        'type': '1',
        'token': f'https://vod.study.163.com/eds/api/v1/vod/hls/key?id={videoId}&token={token}',
        't': int(time.time() * 1000)
    }

    url = f'https://vod.study.163.com/video/{videoId}/hls/m3u8?quality={params["quality"]}&isNative={params["quality"]}&type={params["type"]}&token={params["quality"]}&t={params["t"]}'

    encrypt_m3u8 = requests.get(url, headers).text
    # print(encrypt_m3u8)  # 加密m3u8
    return encrypt_m3u8


def get_encrypt_key(token):
    url = f'https://vod.study.163.com/video/{videoId}/hls/key?token={token}'
    decrypt_key = requests.get(url, headers).text
    # print(decrypt_key)  # 解密key 6a42505733754a7645393030315a736b396b387339563172686639507a347a7948304f65465837656d42504f5934727568482b4a7430535449774431597557332f50384d3946634c36346743655531536a4f355733513d3d
    return decrypt_key

'''
videoData: 
    clientEncryptKeyVersion: 3
    cluPointData: null
    flvCaption: undefined
    isEncrypt: undefined
    segmentListData: []
    signature: "45574752356c34675576447751777a354d33786c44555a515a616c4d7546374d384971414a315a5865436d7574374c54636c456b7451426b574d532f4448716e7032436a345645386875423445476a6957656d3758506d4452756a6551744a334f4a6433446d5a4d49647a334e4b784c6a58703158526d4c61466364683758684430774870346f30546b797a32776f4e7959744263626a6f5947774c395833326a507562553857646a324d3d"
    start: 27
    videoDecryptData: "Y2dGZWNmOFpuMkhhN21WTPK2qoJ54q31xnqtIA645wqS1am2/iVxWNJePc02VZMte/3ZmL5IsL/M1qomBXQAYQCTZtJ1eSdKam0Oiqyq3+YIFRX3+4gREKEX0/bN4oGI80Y2us1+OS6Jk0e7KmtNQI8Eb/dSmm78CPzBkHRer4irTdtkpbysMWITrcYNJM+co7x0FFr2izW2iicXs/8oaDReN+rHciB5ZAGY9eSRRwU="
    videoId: 1217754807
    videoImgUrl: null
'''