import requests

proxypool_url = 'http://127.0.0.1:5555/random'
# v26开头的视频url链接
target_url = 'https://v26-web.douyinvod.com/8523e7c31d6852ba92a08ad0301d477b/638f5732/video/tos/cn/tos-cn-ve-15/oAD4wwhUIAgx16wtj9fDF7WDrNooUAAQzBveQB/?a=6383&ch=26&cr=3&dr=0&lr=all&cd=0%7C0%7C0%7C3&cv=1&br=1696&bt=1696&cs=0&ds=3&ft=bvTKJbQQqUiSf_TZao0ORVTYA0pi.WUC~jKJG5jyx.0P3-A&mime_type=video_mp4&qs=0&rc=ZTU1NWdlOGk8NDozNztnOkBpamozOzQ6ZnR5aDMzNGkzM0BhYl4vNTEvNS4xNjNeMDQvYSNpNHE1cjRvNS9gLS1kLTBzcw%3D%3D&l=20221206215215010140197150321B019F&btag=10000'


def get_random_proxy():
    """
    get random proxy from proxypool
    :return: proxy
    """
    return requests.get(proxypool_url).text.strip()


def crawl(url, proxy):
    """
    use proxy to crawl page
    :param url: page url
    :param proxy: proxy, such as 8.8.8.8:8888
    :return: html
    """
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
                      'Chrome/102.0.5005.63 Safari/537.36 Edg/102.0.1245.33 '
    }
    proxies = {'http': 'http://' + proxy}
    print(proxies)
    resp = requests.get(url, proxies=proxies, headers=headers)
    content = resp.content
    title = url.split('/')[-2]
    with open(f'{title}.mp4', 'wb') as f:
        f.write(content)
    return resp.status_code


def main():
    """
    main method, entry point
    :return: none
    """
    proxy = get_random_proxy()
    print('get random proxy', proxy)
    status_code = crawl(target_url, proxy)
    print(status_code)


if __name__ == '__main__':
    main()
