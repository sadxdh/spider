# 处理Accept-Enckey

![image-20240102104327849](pic/%E5%A4%84%E7%90%86Accept-Enckey/image-20240102104327849.png)

发现都是indexcode.getResCode()生成得，直接点击找到某一处，找到indexcode.getResCode()方法

![image-20240102104737920](pic/%E5%A4%84%E7%90%86Accept-Enckey/image-20240102104737920.png)

找到了加密代码

```js
            'getResCode': function() {
                var _0x363f5f = _0x46396c
                  , _0x57da4f = _0x33f7fa[_0x363f5f(0x6cd)][_0x363f5f(0x4a2)](_0x33f7fa[_0x363f5f(0x3f9)][_0x363f5f(0x2a5)][_0x363f5f(0x36c)](Math[_0x363f5f(0x417)](_0x32775a[_0x363f5f(0x23a)](new Date()[_0x363f5f(0x1d9)](), -0x23b0 + -0x1bda + 0x4372))), _0x33f7fa[_0x363f5f(0x3f9)][_0x363f5f(0x2a5)][_0x363f5f(0x36c)](localStorage[_0x363f5f(0x173)](_0x32775a[_0x363f5f(0x527)]) || _0x32775a[_0x363f5f(0x2a9)]), {
                    'iv': _0x33f7fa[_0x363f5f(0x3f9)][_0x363f5f(0x2a5)][_0x363f5f(0x36c)](_0x32775a[_0x363f5f(0x2a9)]),
                    'mode': _0x33f7fa[_0x363f5f(0x127)][_0x363f5f(0x447)],
                    'padding': _0x33f7fa[_0x363f5f(0xfe)][_0x363f5f(0x195)]
                });
                return _0x33f7fa[_0x363f5f(0x3f9)][_0x363f5f(0x41b)][_0x363f5f(0x35b)](_0x57da4f[_0x363f5f(0x52e)]);
            }
```



将能填充得变量填充

```js
const CryptoJS = require('crypto-js');

/*
由于代码被混淆（使用了类似 _0x363f5f 这样的变量名），很难直接理解其具体的功能。但是从代码的结构来看：
它使用了一些变量 _0x363f5f, _0x57da4f, _0x33f7fa 和 _0x32775a。这些变量可能在其他地方被定义或者传入函数中。
在函数内部，有一些复杂的操作，包括使用了 Math.random()、new Date()、localStorage 等方法，似乎是在生成一个复杂的字符串或者值。
最后，它返回了 _0x57da4f[_0x363f5f(0x52e)]，这个值可能是之前复杂操作的结果的一部分。
总体来说，这段代码的目的似乎是为了计算并返回一个特定的结果码

这段代码看起来是用来生成一个结果码的函数，这个结果码似乎是基于当前时间和本地存储数据的加密结果。
var _0x363f5f = _0x46396c: 这里的 _0x363f5f 可能是用于混淆变量名的占位符，真实含义需要上下文来确认。
_0x57da4f = _0x33f7fa['AES']['encrypt'](...)：这行代码使用了一个 AES 加密算法（很可能是 CryptoJS 库中的功能），对一些数据进行加密操作。
Math['floor'](new Date()['getTime']()): 获取当前时间戳并向下取整。
localStorage['getItem'](_0x32775a['ejKUj']) || _0x32775a['dgrNz']：获取本地存储中键名为 _0x32775a['ejKUj'] 的数据，如果不存在则使用 _0x32775a['dgrNz']。
这些数据经过一系列编码（例如使用了 Utf8 编码等），作为 AES 加密算法的输入。
return _0x33f7fa['enc']['Base64']['stringify'](_0x57da4f['ciphertext']): 返回对加密结果的密文进行 Base64 编码后的字符串表示。
总体来说，这段代码使用了 AES 加密算法，对当前时间戳和本地存储中的数据进行加密，并返回了加密后的结果的 Base64 编码字符串。
 */
function getResCode() {
    var _0x57da4f = CryptoJS['AES']['encrypt'](CryptoJS['enc']['Utf8']['parse'](Math['floor'](_0x32775a['rBJcW'](new Date()['getTime'](), 1000))), CryptoJS['enc']['Utf8']['parse'](localStorage['getItem']("tempenc") || "1234567887654321"), {
        'iv': CryptoJS['enc']['Utf8']['parse']("1234567887654321"),
        'mode': CryptoJS['mode']['CBC'],
        'padding': CryptoJS['pad']['Pkcs7']
    });
    return CryptoJS['enc']['Base64']['stringify'](_0x57da4f['ciphertext']);
}
```

