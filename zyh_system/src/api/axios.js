import axios from 'axios'

import { Message } from 'element-ui';

export function axiosRequest(url, obj) {
    // axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    if (obj) {
        return axios.post(url, obj, { timeout: 10000 }).then(res => {
            if (res.data.errorCode === 0) {
                // console.log('访问成功')
                return res.data
            } else {
                // console.log('访问失败')
                if (res.data.errorCode != 90040006) {
                    Message({
                        showClose: true,
                        message: res.data.errMsg,
                        type: 'error'
                    })
                }
            }
        }).catch((res) => {
            if (res.response) {
                Message({
                    showClose: true,
                    message: res.response.data.errMsg,
                    type: 'error'
                })
            } else {
                Message({
                    showClose: true,
                    message: '请求失败',
                    type: 'error'
                })
            }
        })
    } else {
        return axios.post(url, { timeout: 10000 }).then(res => {
            if (res.data.errorCode === 0) {
                // console.log('访问成功')
                return res.data
            } else {
                // console.log('访问失败')
                if (res.data.errorCode != 90040006) {
                    Message({
                        showClose: true,
                        message: res.data.errMsg,
                        type: 'error'
                    })
                }
            }
        }).catch((res) => {
            if (res.response) {
                Message({
                    showClose: true,
                    message: res.response.data.errMsg,
                    type: 'error'
                })
            } else {
                Message({
                    showClose: true,
                    message: '请求失败',
                    type: 'error'
                })
            }
        })
    }
}