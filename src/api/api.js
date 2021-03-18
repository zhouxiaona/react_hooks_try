import apiUtils from './apiUtils.js'
import { Cookies } from '../type/index.d.ts';
import qs from 'querystring';
import store from '../redux/store/Store'
import * as actionTypes from '../redux/constants/actionTypes';

//引入微信jssdk文件
let wx = require("weixin-js-sdk");
let dispatch = store.dispatch

// 根据openid获取个人信息
export async function getInfoByOpenId(openid) {
    return apiUtils.commonPost(`/auth/getInfoByOpenId`, { openid });
}

// 登录验证接口
export async function islogin() {
    let url = window.location.search.replace('?', '')
    let urlObj = qs.parse(url)   // 获取url里面参数
    let userdata = store.getState().home.userdata // 获取redux里面登录态
    if (userdata.openid) { // 检验redux里面登录态
        return true
    } else if (Cookies.get('userdata')) { // 检验cookie里面登录态
        let data_str = Cookies.get('userdata') // 获取cookie里面用户数据
        let data = JSON.parse(data_str)
        // 同步登陆态到redux
        dispatch(
            {
                type: actionTypes.SAVE_USERDATA,
                data: {
                    ...data
                }
            }
        )
    } else { // 检验url是否存在openid
        if (urlObj.open_id && urlObj.open_id.length > 20) {
            return new Promise((resolve, reject) => {
                // 通过openid去获取用户数据
                getInfoByOpenId(urlObj.open_id)
                    .then(logins => {
                        if (logins && logins.code === 1) {
                            let data = logins.data
                            // 同步用户数据到redux
                            dispatch(
                                {
                                    type: actionTypes.SAVE_USERDATA,
                                    data: {
                                        ...data
                                    }
                                }
                            )
                        }
                        delete urlObj.open_id
                        delete urlObj.union_id
                        let str = qs.stringify(urlObj) ? '?' + qs.stringify(urlObj) : ''
                        window.location.href = window.location.origin + window.location.pathname + str
                        resolve()
                    })
            })
        } else { // 跳转北京获取openid
            return new Promise((resolve, reject) => {
                window.location.href = 'https://wxapi.speiyou.com/usercenter/common/wxoauth?app_id=wx17745458a8a5358c&callback_url=' + window.location.href
            });
        }
    }
}

// 微信jssdk授权
export async function wxconfig() {
    // let url = store.getState().home.url ? store.getState().home.url : window.location.href
    let url = window.location.href
    return apiUtils.commonPost(`/auth/getSignature`, { url });
}

// 验证微信分享
export async function configShare() {
    let res = await wxconfig()
    if (!res) return
    let url = window.location.origin + '?ADTAG=pen'
    let url1 = window.location.origin + '?ADTAG=penq'
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: "wx079591e7e7783408", // 必填，公众号的唯一标识
        // appId: "wx59235dddb44934f3", // 必填，公众号的唯一标识
        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
        signature: res.data.signature,// 必填，签名
        jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'previewImage',
            'hideAllNonBaseMenuItem',
            'showMenuItems',
            'openAddress',
            'hideOptionMenu',
            'hideMenuItems',
        ] // 必填，需要使用的JS接口列表
    });
    wx.ready(() => {
        wx.hideAllNonBaseMenuItem();
        // wx.hideOptionMenu()
        // wx.hideMenuItems({ menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline'] })

        wx.showMenuItems({
            menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline'] // 要显示的菜单项，所有menu项见附录3
        });
        wx.onMenuShareTimeline({
            title: '上海学而思新高三课程体系震撼发布！', // 分享标题
            link: url1,// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'https://imgs.xrspy.com/high/highShare.png', // 分享图标
            success: function () {
                // 用户点击了分享后执行的回调函数
            }
        })
        wx.onMenuShareAppMessage({
            title: '上海学而思新高三课程体系震撼发布！', // 分享标题
            desc: '抢跑就现在，赢定新高三！学而思资深教师天团带孩子抢跑新高三', // 分享描述
            link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'https://imgs.xrspy.com/high/highShare.png', // 分享图标
            success: function () {
                // 用户点击了分享后执行的回调函数
            }
        });
    });
}

//  获取洞察手机验证码
export async function getPhoneCode(phone) {
    return apiUtils.commonPost(`/index/getPhoneCode`, { phone })
}

//  绑定洞察完善信息
export async function bindInfo(code, phone) {
    return apiUtils.commonPost(`/index/phoneLogin`, { code, phone })
}

//  完善用户信息
export async function completeUserInfo(name, grade, pUid) {
    return apiUtils.commonPost(`/index/completeUserInfo`, { name, grade, pUid })
}
