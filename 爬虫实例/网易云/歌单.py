from bs4 import BeautifulSoup   # find("").find_all().get("")
from urllib import request  #  (负责打开浏览url内的html 文本)
import requests
import os


def get_song_list(response):
    main_page = BeautifulSoup(response.text, "html.parser")
    # print(main_page)
    song_list = main_page.find("ul", {"class": "f-hide"}).find_all("a")
    print(song_list)
    return song_list


def get_song(song_list):
    song_titles = []
    song_urls = []
    for song in song_list:
        song_titles.append(song.string)  # 提取标签中的文本
        # print(song_title)
        song_id = song.get("href").strip('/song?id=')
        song_urls.append('https://music.163.com/song/media/outer/url?id={}.mp3'.format(song_id))
        # print(song_url)
    return song_titles, song_urls


def save(song_titles, song_urls):
    dir_name = "我的喜欢"
    if not os.path.exists(dir_name):
        os.mkdir(dir_name)
    for song_title, song_url in zip(song_titles, song_urls):
        resp = requests.get(song_url, headers=headers, allow_redirects=False)  # get请求设置禁止网页跳转，即allow_redirects=False
        print(song_url + '\t' + song_title)
        song_url = resp.headers['Location']
        request.urlretrieve(song_url, dir_name + '/' + song_title + '.mp3')


headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36 Edg/100.0.1185.29',
    'referer': 'https://music.163.com/',
    'cookie': 'NMTID=00OWtaFHm2tlcLhtEuNmi9c0OAHMhMAAAF_2PzDOQ; _ntes_nnid=1f3bbb63e5890d0c330b5304708e668e,1649647358344; _ntes_nuid=1f3bbb63e5890d0c330b5304708e668e; WNMCID=njveqn.1649647359009.01.0; WEVNSM=1.0.0; WM_NI=LMZoI%2FAC8luC0syhvCLpSOkJxC%2FnZkGTsK3dnqSk7URcOfzVNxcMyc7Pa1y6iOoj6K1Af9zYO%2BNkXHsptFk9RSqfryLbqdtvfimFOxydZl4ficdULqbOPt%2Fk7oEXll%2BxRW4%3D; WM_NIKE=9ca17ae2e6ffcda170e2e6eeacf869a2b2ac94e66efc868fa7d55e939e9a83d45a9386c09bc652889caa8ad32af0fea7c3b92a90939690cc25839df88df849f4adb789f54990b09db0ea42bc9de18fd961858cbdacb270aeaf9d8cb65f92bd8187f95e8ea8adaefc69f590afd2fc3eab91a18bb541f39faadaf9538df5828cdb44b1b0bca7ea33928dbf87f17390bebf85f77ea6b7a3a7ce74bbbc968db76eabbdacb6cf7ba291a095ae61f5b18bb9ef68e9a89eb8b737e2a3; WM_TID=PM7Ktd8yb6lEQFUBUQLVBRNsyCMSXemK; __snaker__id=pJ6UnJMmFFcOHgTn; _9755xjdesxxd_=32; JSESSIONID-WYYY=RQRv0wBhWzyaVSOU0hnIMWJjizVpxSPR01hSIHAWzW5iPcrarhgAoxG6G2U2tvwarnrDNpZqWP%2BMFhIibxxk78jgyYIv8hfXy2X%2BUCvJuhXMmdbk0ZxKeJTmyZUx%2Bhd9%2BA65FP6MjBuOOOr6D9saGvmr%5CFSMD5oIAOPi2rVdf3ZgwXF1%3A1649677782582; _iuqxldmzr_=33; gdxidpyhxdE=0sC7a%2F7x8NuWX0a6n0Ci1WyWX%2BvqAMnAWObtswVwrR4T5%2Fho%2BcV2%2Br51CLIAGjpC5G7nvmb72VJKPJB%2F4z7Zek%5CqlD%2FVAx4%5CSxnxPk%2Bf99GcT2JtopkzcB5%2Bdu0aHasCeRO%5CkIHMpYVd%5C04jV1ab8dl2%2F0gM5p%5CqlCZUAROhXsL8%2BYzY%3A1649676889205; __remember_me=true; MUSIC_U=3b081c088aee024846fc0f4287fa2259abf84840b5752a19f794065133598a60519e07624a9f005368a6d9d5dce541bfdf269665d1eb4df046b14e3f0c3f8af929f5e126cc9926cbc3061cd18d77b7a0; __csrf=3457ffac8498a2848a57d5687380ff9c',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
}

url = 'https://music.163.com/playlist?id=6584579942'
response = requests.get(url, headers=headers)
song_list = get_song_list(response)
song_titles, song_urls = get_song(song_list)
save(song_titles, song_urls)
