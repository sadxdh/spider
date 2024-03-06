# https://bbs.kanxue.com/article-23462.htm
import hashlib
import uuid
import platform


def get_device_fingerprint():
    # 获取Android设备ID
    android_id = "YOUR_ANDROID_ID"
    # 获取设备序列号
    serial = platform.system() + platform.node()
    # 获取硬盘信息
    hardware = platform.machine()
    # 获取设备生产商和模式
    manufacturer = platform.system()
    model = platform.machine()
    # 获取设备的唯一标识符
    unique_id = get_unique_id()
    # 连接所有信息以形成指纹
    fingerprint = f"{android_id}{serial}{hardware}{manufacturer}{model}{unique_id}"
    # 使用HA-256计算hash
    hashed_fingerprint = hash_string(fingerprint)
    return hashed_fingerprint


def get_unique_id():
    # 生成随机ID (you may replace this with your logic)
    unique_id = str(uuid.uuid4())
    print(unique_id)
    return unique_id


def hash_string(input_string):
    # Hash the input string using SHA-256
    hashed_bytes = hashlib.sha256(input_string.encode()).digest()
    # 将散列字节转换为十六进制表示法
    hashed_string = ''.join(format(byte, '02x') for byte in hashed_bytes)
    return hashed_string


# Example usage
device_fingerprint = get_device_fingerprint()
print(device_fingerprint)
