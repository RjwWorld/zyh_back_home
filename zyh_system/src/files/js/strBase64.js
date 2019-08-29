//         //console.log(encodeURI(str));
//         //console.log(btoa(encodeURI(str)));

//         //console.log(atob(btoa(encodeURI(str))));
//         //console.log(decodeURI(atob(btoa(encodeURI(str)))));


//         //字符串转base64
//         function encode(str) {
//             // 对字符串进行编码
//             var encode = encodeURI(str);
//             // 对编码的字符串转化base64
//             var base64 = btoa(encode);
//             return base64;
//         }

//         // base64转字符串
//         function decode(base64) {
//             // 对base64转编码
//             var decode = atob(base64);
//             // 编码转字符串
//             var str = decodeURI(decode);
//             return str;
//         }

//字符串转base64
export function base64Code(str) {
    // 对字符串进行编码
    var encode = encodeURI(str);
    // 对编码的字符串转化base64
    var base64 = btoa(encode);
    return base64;
}

//base64转字符串
export function strCode(base64) {
    // 对base64转编码
    var decode = atob(base64);
    // 编码转字符串
    var str = decodeURI(decode);
    return str;
}