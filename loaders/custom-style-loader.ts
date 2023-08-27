/*
 * @Author: lzy-Jerry
 * @Date: 2023-08-26 15:20:21
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-08-26 16:18:22
 * @Description: 
 */
// NOTE loader的返回值可以是js代码字符串
module.exports = function(source) {
    const result = `const style = document.createElement("style");
    style.innerHTML = ${source};
    document.head.appendChild(style);`
    return result
}