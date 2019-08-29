export default function cloneObj(obj) {
    var result = Array.isArray(obj) ? [] : {};
    if (!Array.isArray(obj)) {
        for (let key in obj) {
            result[key] = obj[key]
        }
    } else {
        result = [...obj]
    }
    return result;
}