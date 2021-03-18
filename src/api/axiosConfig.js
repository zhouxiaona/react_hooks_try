/*
 * @Author: tankswift
 * @Date: 2020-06-04 16:40:04
 * @LastEditors: tankswift
 * @LastEditTime: 2020-06-05 13:27:37
 * @Description: axiosConfig
 * @FilePath: \workSpace\h5_demo\src\api\axiosConfig.js
 */
import axios from 'axios'
import { Cookies } from '../type/index.d';
import { browser } from '../utils/index.js'
// 跨域 -- 关闭
// axios.defaults.withCredentials = true;

// request请求拦截器
axios.interceptors.request.use(config => {
    //过滤配置文件请求 
    // if (!(config.method === 'get' && config.responseType === 'json')) {
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    // config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    // }
    console.log(config, '--axios-request-config--')
    return config
}, error => {
    console.log(error, '--axios-request-failed--') // for debug
    Promise.reject(error)
})

// respone响应拦截器
axios.interceptors.response.use(
    (response) => {
        console.log(response, '--axios-response-success--')
        const { code } = response.data
        if (code === 0 && browser.versions._weixin) {
            Cookies.remove("userdata")
            window.location.href = 'https://wxapi.speiyou.com/usercenter/common/wxoauth?app_id=wx17745458a8a5358c&callback_url=' + window.location.origin
        } else {
            return Promise.resolve(response.data)
        }
    },
    error => {
        console.log(error, '--axios-response-failed--') // for debug
        return Promise.reject(error)
    }
)