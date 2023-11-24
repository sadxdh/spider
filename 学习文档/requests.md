# requests

## post

postdata参数不支持中文字符串

`requests.post` 方法默认使用 Latin-1 编码，而 HTML 内容中可能包含非 Latin-1 字符。为了解决这个问题，可以将 HTML 内容编码为 UTF-8，然后将编码后的内容发送到服务器。代码中需要修改的部分是使用 `html.encode('utf-8')` 将 HTML 内容编码为 UTF-8 字节数据，并且在 `requests.post` 中使用这个编码后的数据。

以下是你可以尝试的修改：

```python
import hashlib

# 将文本编码为 UTF-8 字节
binary_data = html.encode('utf-8')
url = f'http://XXX.cn:9345/api/upload?'
try:
    headers = {'Content-Type': 'text/html; charset=utf-8'}  # 指定编码为 UTF-8
    rsp = requests.post(url, headers=headers, data=binary_data)  # 发送编码后的数据
    if rsp.status_code != 200:
        log_exception(f"HTTP Error: {rsp.status_code}")
    # 处理成功上传的响应...
except Exception as e:
    # 处理异常...
```

这里通过指定 `Content-Type` 头部为 `text/html; charset=utf-8` 来确保服务器能够正确解析 UTF-8 编码的内容。同时，在发送请求时使用了 `binary_data`，这是通过 `html.encode('utf-8')` 得到的 UTF-8 编码后的数据。