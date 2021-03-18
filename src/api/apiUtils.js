
/**
 * @description 数据请求模块，轻度封装fetch
 * @author raziel
 * @since 19/05/23
 */
import axios from 'axios'
import { Toast } from 'antd-mobile'
import 'antd-mobile/lib/toast/style/css'
// 接口baseUrl
let baseUrlConfig = {
    "development": '',
    "production": 'http://xxx.com/api',
}

const baseUrl = baseUrlConfig[process.env.NODE_ENV]

const apiUtils = {
    /**
    * 公用post---表单格式参数
    * @param url-请求链接
    * @param params-请求参数
    * @param type-default:'Load' 显示loading, 'noLoad'-不显示loading
    * @returns {Promise.<TResult>}
    */
    commonPost: (url, params, type = 'Load') => {
        let time = new Date().getTime()
        if (type !== 'noLoad') {
            Toast.loading('正在加载...', 0, null);
        }
        if (Object.prototype.toString.call(params) !== '[object Object]') {
            params = {}
        }
        return axios({
            url: baseUrl + url,
            method: 'post',
            data: params,
            timeout: 6000,
            responseType: 'json',
            transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }]
        }).then(res => {
            let time1 = new Date().getTime()
            console.log(url + '接口耗时---' + (time1 - time) / 1000 + '秒')
            if (type !== 'noLoad') {
                Toast.hide();
            }
            return res
        }).catch(error => {
            if (error.response) {
                Toast.info(`网络连接失败${error.response.status}，请检查您的网络设置并稍后再试`, 2, null, false)
            } else if (error.request) {
                Toast.info('网络连接失败，请检查您的网络设置并稍后再试', 2, null, false)
            } else {
                Toast.info('网络连接失败，请检查您的网络设置并稍后再试', 2, null, false)
            }
            console.log(error, '---post-error---')
        })
    },
    /**
   * 公用post---JSON格式参数
   * @param url-请求链接
   * @param params-请求参数
   * @param type-default:'Load' 显示loading, 'noLoad'-不显示loading
   * @returns {Promise.<TResult>}
   */
    commonPostJson: (url, params, type = 'Load') => {
        let time = new Date().getTime()
        if (type !== 'noLoad') {
            Toast.loading('正在加载...', 0, null);
        }
        if (Object.prototype.toString.call(params) !== '[object Object]') {
            params = {}
        }
        return axios({
            url: baseUrl + url,
            method: 'post',
            data: params,
            timeout: 60000,
            responseType: 'json',
            // transformRequest: [function (data) {
            //     let ret = ''
            //     for (let it in data) {
            //         ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            //     }
            //     return ret
            // }]
        }).then(res => {
            let time1 = new Date().getTime()
            console.log(url + '接口耗时---' + (time1 - time) / 1000 + '秒')
            if (type !== 'noLoad') {
                Toast.hide();
            }
            return res
        }).catch(error => {
            if (error.response) {
                Toast.info(`网络连接失败${error.response.status}，请检查您的网络设置并稍后再试`, 2, null, false)
            } else if (error.request) {
                Toast.info('网络连接失败，请检查您的网络设置并稍后再试', 2, null, false)
            } else {
                Toast.info('网络连接失败，请检查您的网络设置并稍后再试', 2, null, false)
            }
            console.log(error, '---post-error---')
        })
    },

    /**
   * 公用get请求
   * @param url-请求链接
   * @param params-请求参数
   * @param type-default:'Load' 显示loading, 'noLoad'-不显示loading
   * @returns {Promise.<TResult>}
   */
    commonGet: (url, params, type = 'Load') => {
        let time = new Date().getTime()
        if (type !== 'noLoad') {
            Toast.loading('正在加载...', 0, null);
        }
        return axios({
            url: baseUrl + url,
            responseType: 'json',
            params: params,
            timeout: 6000,
        }).then(res => {
            let time1 = new Date().getTime()
            console.log(url + '接口耗时---' + (time1 - time) / 1000 + '秒')
            if (type !== 'noLoad') {
                Toast.hide();
            }
            return res
        }).catch(error => {
            Toast.info('网络连接失败，请检查您的网络设置并稍后再试', 2, null, false)
            console.log(error, '---get-error---')
        })
    },
}
export default apiUtils
