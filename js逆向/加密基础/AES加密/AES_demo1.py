from Crypto.Cipher import AES
import base64


def aes_encrypt(key, data):
    iv = key[:16]  # 初始向量
    pad = 16 - len(data) % 16  # 计算需要填充的长度，加密你内容需要保证为16的倍数
    print("需要填充的长度:", pad)
    data += chr(pad) * pad  # chr( {需要转换的Unicode编码} )，返回值是对应的字符
    print("填充后的数据:", data)
    cipher = AES.new(key.encode(), AES.MODE_CBC, iv.encode())  # 创建一个AES对象
    encryed_data = cipher.encrypt(data.encode('utf-8'))  # 执行加密操作
    print("加密后的数据:", encryed_data)
    return base64.b64encode(encryed_data).decode('utf-8')  # 使用base64转为二进制，再使用utf-8解码


def aes_decrypt(key, data):
    iv = key[:16]
    cipher = AES.new(key.encode(), AES.MODE_CBC, iv.encode())
    decrtpy_data = cipher.decrypt(base64.b64decode(data)).decode()  # 先使用base64转为二进制
    pad = ord(decrtpy_data[-1])  # ord( {需要转换的字符} )，返回值是对应的Unicode编码
    return decrtpy_data[:-pad]


if __name__ == '__main__':
    key = '0123456789abdcef'  # 随机写16位
    data = 'hello world'  # 需要加密的内容
    print('加密前数据:', data)
    enerypt_data = aes_encrypt(key, data)
    print('utf-8格式字符串:', enerypt_data)
    decrtpy_data = aes_decrypt(key, enerypt_data)
    print('解密后的字符串:', decrtpy_data)
