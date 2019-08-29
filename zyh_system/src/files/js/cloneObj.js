export function cloneObj(obj) {
    // var result = Array.isArray(obj) ? [] : {};
    // for (var key in obj) {
    //     if (obj.hasOwnProperty(key)) {
    //         if (typeof obj[key] === 'object') {
    //             result[key] = cloneObj(obj[key]); //递归复制
    //         } else {
    //             result[key] = obj[key];
    //         }
    //     }
    // }
    // console.log(result)
    var result = Array.isArray(obj) ? [] : {};
    if (!Array.isArray(obj)) {
        for (let key in obj) {
            result[key] = obj[key]
        }
    } else {
        result = [...obj]
    }
    return result;
};