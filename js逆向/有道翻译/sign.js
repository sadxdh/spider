// 引入jar包
crypto = require("crypto");
// function get_md5(message) {
//     const md5Hash = CryptoJS.MD5(message);
//     return md5Hash.toString()
// }

function w(e) {
    return crypto.createHash("md5").update(e.toString()).digest("hex")
}

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
