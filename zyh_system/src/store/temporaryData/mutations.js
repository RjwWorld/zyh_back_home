export default {
    //保存企业参数临时id
    getCompanyId(state, params) {
        state.companyId = params
        try {
            sessionStorage.companyId = JSON.stringify(state.companyId)
        } catch (e) {}
    }
}