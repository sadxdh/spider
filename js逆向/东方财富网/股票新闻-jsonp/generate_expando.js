const f = "3.5.1";

function generateExpando() {
    return "jQuery" + (f + Math.random()).replace(/\D/g, "");
}

const expandoValue = generateExpando(); // 获取生成的 expando 值
console.log(expandoValue)