// 引入jar包
crypto = require("crypto");
// function get_md5(message) {
//     const md5Hash = CryptoJS.MD5(message);
//     return md5Hash.toString()
// }

function w(e) {
    return crypto.createHash("md5").update(e.toString()).digest("hex")
}
/*
这段代码使用 Node.js 中的 crypto 模块来创建一个 MD5 哈希。
crypto.createHash("md5"): 这行代码创建了一个使用 MD5 算法的哈希对象。
.update(e.toString()): update() 方法用于向哈希对象中添加要被哈希化的数据。在这里，它将变量 e 转换为字符串，然后更新哈希对象。
.digest("hex"): digest() 方法以指定的格式输出哈希值。在这里，"hex" 表示输出为十六进制字符串形式。
所以，整个代码的作用是将变量 e 转换为 MD5 哈希值的十六进制字符串表示。
 */

// 传入时间戳和fsdsogkndfokasodnaso
function A(time_stamp) {
    let d = "fanyideskweb",
        u = "webfanyi",
        t = "fsdsogkndfokasodnaso";
    return w(`client=${d}&mysticTime=${time_stamp}&product=${u}&key=${t}`)
}

// o：时间戳 e = fsdsogkndfokasodnaso
// sign = A(o)
// console.log(sign);
