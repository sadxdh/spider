// 引入Node.js内置的crypto模块
const crypto = require("crypto");

function y(e) {
    return crypto.createHash("md5").update(e).digest();
}

function decrypt(t) {
    let _key = "ydsecret://query/key/B*RGygVywfNBwpmBaZg*WT7SIOUP2T0C9WHMZN39j^DAdaZhAnxvGcCY6VYFwnHl";
    let _iv = "ydsecret://query/iv/C@lZe2YzHtZ2CYgaXKSVfsb7Y4QWHjITPPZ0nQp87fBeJ!Iv6v^6fvi2WN@bYpJ4";
    const a = y(_key), c = y(_iv);
    const i = crypto.createDecipheriv('aes-128-cbc', a, c);
    return i.update(t.toString(), 'base64', 'utf-8');
}

// 获取命令行参数，其中第一个参数是文件名，第二个参数开始是传递的参数
const args = process.argv.slice(2);

// 解密参数并输出结果
const decryptedText = decrypt(args[0]);
console.log(decryptedText);
