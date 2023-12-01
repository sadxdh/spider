const fs = require('fs');
const {VM} = require('vm2');
const axios = require('axios');

async function crawlAndExecuteScripts(url) {
    try {
        const headers = {
            'cache-control': 'max-age=0',
            'sec-ch-ua': '"Microsoft Edge";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'upgrade-insecure-requests': '1',
            'dnt': '1',
            'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36 EdgA/119.0.0.0',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'sec-fetch-site': 'cross-site',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-user': '?1',
            'sec-fetch-dest': 'document',
            'referer': 'https://www.tinghaolook.com/book/258018574614597/catalog/',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
            'if-none-match': '"65170ec3-4ee1"',
            'if-modified-since': 'Fri, 29 Sep 2023 17:52:03 GMT',
        };

        const response = await axios.get(url, {headers});
        const html = response.data;

        // 输出网页文本
        console.log('网页文本:');
        console.log(html);

        // 创建一个新的 VM 实例
        const vm = new VM();

        // 读取 script1.js 和 script2.js 的内容
        const script2Content = fs.readFileSync('d3.2.js', 'utf8');
        const script4Content = fs.readFileSync('getgtm.js', 'utf8');

        // 执行 script2.js 中的代码
        vm.run(script2Content);
        console.log('第二个脚本执行完成');
        // 执行 script4.js 中的代码
        vm.run(script4Content);
        console.log('第四个脚本执行完成');

        // 其他爬取逻辑...

    } catch (error) {
        console.error('发生错误:', error);
    }
}

// 执行爬虫程序并加载执行本地 JavaScript 文件
crawlAndExecuteScripts('https://www.tinghaolook.com/book/258018574614597/258018579501126.html');
