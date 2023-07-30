# 用户UA池
import requests

agent = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.35',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.42'
]


class Utils(object):
    def getHeaders(self):
        """
        构造头部
        """
        headers = {
            'User-Agent': random.sample(agent, 1)[0]
        }
        return headers

    ...


if __name__ == "__main__":
    url = "https://www.baidu.com"
    utils = Utils()
    request = requests.get(url, headers=utils.getHeaders())
