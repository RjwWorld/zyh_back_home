//添加企业参数 临时ID
let companyId = ""

try {
    if (sessionStorage.companyId) {
        companyId = JSON.parse(sessionStorage.companyId)
    }
} catch (e) {}

export default {
    companyId
}