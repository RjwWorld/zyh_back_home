export function findCode(arr, code) {
    if (code || code === 0) {
        for (let item of arr) {
            if (item.code == code) {
                return item.name
            }
        }
    } else {
        return code;
    }
}

export function findCodeArr(arr, codeArr) {
    if (!codeArr && codeArr.length === 0) {
        return
    }
    let nameArr = [];
    for (let i of codeArr) {
        if (i == 5) {
            nameArr.push('个人认证')
            continue
        }
        if (i == 6) {
            nameArr.push('企业认证')
            continue
        }
        if (i == 7) {
            nameArr.push('授权证书')
            continue
        }
        for (let item of arr) {
            if (i == item.code) {
                nameArr.push(item.name)
            }
        }
    }
    return nameArr
}

export function sortArr(arr) {
    if (!arr && arr.length === 0) {
        return
    }
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (Number(arr[i]) > Number(arr[j])) {
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
}
