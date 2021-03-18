
import Jsbridge from "xesjsbridge/dist";
import store from '../redux/store/Store'
import * as actionTypes from '../redux/constants/actionTypes';
import { browser } from '../utils/index.js'
const AppApi = {
    // 判断当前用户是否是游客状态 res.state:0-游客  1-正常 
    getGuestMode: () => {
        return new Promise((resolve, reject) => {
            try {
                Jsbridge.ready(function () {
                    Jsbridge.invoke("getGuestMode", {}, function (res) {
                        if (browser.versions.android) {
                            resolve(JSON.parse(res))
                        } else {
                            resolve(res)
                        }
                    })
                })
            } catch (err) {
                reject(false)
            }
        })
    },
    // 打开新页面
    openNativeView: (title, name, url, data) => {
        return new Promise((resolve, reject) => {
            try {
                Jsbridge.ready(function () {
                    Jsbridge.invoke("openNativeView", {
                        title: title, // 设置页面标题
                        name: name, // 设置跳转页面标识（来自服务端约定值） 
                        url: url,// 设置跳转页面URL 
                        data: data, // 设置额外参数（来自同客户端约定)
                    })
                    Jsbridge.invoke("cannotGoBack")
                    resolve(true)
                })
            } catch (err) {
                reject(false)
            }
        })
    },
    /**
     * 登陆后回调
     * fn: 登陆后的回调函数处理
     */
    guestLogin: (fn) => {
        return new Promise((resolve, reject) => {
            try {
                Jsbridge.ready(function () {
                    Jsbridge.registerHandler("guestLogin", async (data, res) => {
                        console.log(data, res, '--登陆后结果')
                        fn && fn()
                        resolve(true)
                    })
                })
            } catch (err) {
                reject(false)
            }
        })
    },
    // 游客调用登录弹窗
    openLoginVCOnGuestMode: () => {
        return new Promise((resolve, reject) => {
            try {
                Jsbridge.ready(function () {
                    Jsbridge.invoke("openLoginVCOnGuestMode", {}, function (res) {
                        console.log('--调用登录弹框回调--', res)
                        resolve(true)
                    });
                })
            } catch (err) {
                reject(false)
            }
        })
    },
    // 关闭登录弹框回调-现统一关闭登陆弹窗关闭当前h5页面回到APP首页
    cancelLogin: () => {
        return new Promise((resolve, reject) => {
            try {
                Jsbridge.ready(function () {
                    Jsbridge.registerHandler("cancelLogin", function (res) {
                        // console.log('--关闭登录弹框回调--', res)
                        Jsbridge.invoke("closeWindow")
                        resolve(true)
                    });
                })
            } catch (err) {
                reject(false)
            }
        })
    },
    /**
     * 获取用户信息,头像字段可根据项目自定义处理（例如APP端全部使用默认头像）
     * 返回参数-参考:
     *  avatar: "",
        city: "021",
        cityName: "上海",
        event_initiated_obj_value: "da036baf428a47a38bead0afbf9a949d",
        grade: "12",
        gradeName: "高三",
        islogin: true,
        local_city: "上海",
        local_city_id: "021",
        seq_id: "193",
        session_id: "2",
        sex: "2",
        stu_id: "da036baf428a47a38bead0afbf9a949d",
        uid: "10864776",
        user_card_id: "202021537017", ***andriod端-学员编号字段***
        card: "202021537017", ***ios端-学员编号字段***
        user_name: "周娜"
     */
    getUserInfo: () => {
        return new Promise((resolve, reject) => {
            try {
                Jsbridge.ready(function () {
                    Jsbridge.invoke("getUserInfo", {}, function (res) {
                        let resData = JSON.parse(res)
                        resData = { ...resData, cardId: browser.versions.ios ? resData.card : resData.user_card_id }
                        console.log(resData, '--getUserInfo--')
                        // if (resData.avatar == '') {
                        resData.avatar = 'https://imgs.xrspy.com/old_new/avatar.png'
                        // }
                        //  else {
                        //     resData.avatar = resData.avatar.replace('http://jiazhanghuifile.speiyou.com', 'https://xrstest.xrspy.com/jiazhanghuifile')
                        // }
                        store.dispatch( // 同步用户数据到redux
                            {
                                type: actionTypes.SAVE_USERDATA,
                                data: {
                                    ...resData,
                                    imgUrl: resData.avatar,
                                    name: resData.user_name,
                                    stuNumber: resData.cardId
                                }
                            }
                        )
                        resolve(resData)
                    });
                })
            } catch (err) {
                reject(false)
            }
        })
    },
    // APP分享-通用-链接形式
    setShareContent: (shareTitle, shareImage, shareContent, shareLink) => {
        return new Promise((resolve, reject) => {
            try {
                Jsbridge.ready(function () {
                    Jsbridge.invoke("setShareContent", {
                        state: 1, //0-不显示 1-显示  -required
                        shareTitle: shareTitle, // 标题 
                        shareImage: shareImage, // 图片 
                        shareContent: shareContent, // 分享内容文案
                        shareURL: shareLink, // 分享链接
                        shareTypes: [1, 2], // 分享类型 Array: QQ 1：微信好友 2：微信朋友圈 3：复制 4：保存
                    });
                    resolve(true)
                })
            } catch (err) {
                reject(false)
            }
        })
    },
    // 显示分享弹窗
    // showShareView: () => {
    //     return new Promise((resolve, reject) => {
    //         try {
    //             Jsbridge.ready(function () {
    //                 Jsbridge.invoke("showShareView", {}, function () {
    //                     console.log('--显示分享弹窗回调 --')
    //                     resolve(true)
    //                 });
    //             })
    //         } catch (err) {
    //             reject(false)
    //         }
    //     })
    // },
    //  分享保存图片后状态回调
    navToFeShare: (fn) => {
        return new Promise((resolve, reject) => {
            try {
                Jsbridge.ready(function () {
                    Jsbridge.registerHandler("navToFeShare", function (data) {
                        // console.log('--分享后状态回调 --')
                        // let resObj = JSON.parse(data.handlerResult)
                        // console.log(resObj, '--分享后回调数据--')
                        fn && fn()
                        resolve(true)
                    });
                })
            } catch (err) {
                reject(false)
            }
        })
    },
    // APP分享-卡片形式-分享至朋友圈等;***注意：类型只能选一个
    setShareImg: (imgUrl, title = '') => {
        return new Promise((resolve, reject) => {
            try {
                Jsbridge.ready(function () {
                    Jsbridge.invoke("setShareImg", {
                        shareTitle: title, // 分享标题 
                        shareImage: imgUrl, // 分享图片-线上链接（如为canvas海报图片，需上传至七牛云获取链接）
                        shareTypes: [2], // 分享类型(只能填一个值) Array: QQ 1：微信好友 2：微信朋友圈 3：复制 4：保存
                    })
                    resolve(true)
                })
            } catch (err) {
                reject(false)
            }
        })
    },
    // 设置H5页面标题
    setTitle: (title) => {
        return new Promise((resolve, reject) => {
            try {
                Jsbridge.ready(function () {
                    Jsbridge.invoke("setTitle", title)
                    resolve(true)
                })
            } catch (err) {
                reject(false)
            }
        })
    },
}
export default AppApi