import requests
from lxml import etree
import re
from Crypto.Cipher import AES
from Crypto.Hash import MD5
import base64

cookies = {
    '_ga': 'GA1.1.1186491235.1702717830',
    '_ga_GXTG7MZQ87': 'GS1.1.1703916710.2.1.1703918781.0.0.0',
}

headers = {
    'authority': 'www.tehaolook.com',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'accept-language': 'en-US,en;q=0.9,zh;q=0.8',
    'cache-control': 'no-cache',
    # 'cookie': '_ga=GA1.1.1186491235.1702717830; _ga_GXTG7MZQ87=GS1.1.1703916710.2.1.1703918781.0.0.0',
    'pragma': 'no-cache',
    'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Microsoft Edge";v="120"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'none',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
}


def getlist():
    response = requests.get('https://www.tehaolook.com/book/258018574614597/catalog/', cookies=cookies, headers=headers)
    print(response.status_code)
    response.encoding = 'utf-8'
    # print(response.text)
    htmlpage = response.text
    page = etree.HTML(htmlpage)
    a_list = page.xpath('//a[@class = "g"]')
    page_list = []
    for a in range(len(a_list)):
        href = "https://www.tehaolook.com" + a_list[a].xpath('./@href')[0]
        title = a_list[a].xpath('./text()')[0]
        # filename = index+title
        # print(a + 1, href, title)
        page_list.append((a + 1, href, title))
    return page_list


def eachpage(href):
    response = requests.get(href, cookies=cookies, headers=headers)
    print(response.status_code)
    response.encoding = 'utf-8'
    # print(response.text)
    htmlpage = response.text
    # page = etree.HTML(htmlpage)
    result = re.findall('\.html\(d\("(.*?)"\)\);', htmlpage)[0].split('", "')
    encrypted_data, key = str(result[0]), str(result[1])
    print(encrypted_data)
    # print(type(encrypted_data))
    print(key)
    return encrypted_data, key


# 加密函数
def decrypt_aes(ciphertext, key):
    key_hash = MD5.new(key.encode()).hexdigest()
    iv = key_hash[:16].encode()
    key = key_hash[16:].encode()
    cipher = AES.new(key, AES.MODE_CBC, iv)
    decrypted = cipher.decrypt(base64.b64decode(ciphertext)).decode('utf-8').rstrip('\0')
    return decrypted


if __name__ == '__main__':
    page_list = getlist()
    for page in page_list:
        pagenum = page[0]
        href = page[1]
        title = page[2]
        encrypted_data, key = eachpage(href)  # 替换为你的密钥
        decrypted_result = decrypt_aes(encrypted_data, key)
        print("解密结果：", decrypted_result)
        # 将解密结果保存到文件
        with open(f'{pagenum}.txt', 'w', encoding='utf-8') as file:
            file.write(decrypted_result)
            # print("解密结果已保存到 decrypted_output.txt 文件中")
