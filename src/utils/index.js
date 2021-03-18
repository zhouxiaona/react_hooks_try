// 判断当前终端环境
export const browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || u.indexOf('Linux') > -1, //android终端
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web程序，没有头部与底部
            qq: u.match(/\sQQ/i) == " qq", //是否QQ
            _weixin: u.toLowerCase().indexOf("micromessenger") > -1,// 微信
            isxesApp: u.indexOf('XesApp') > -1, //是否是学而思APP
        };
    }(),
}

// 判断路由中是否含有某个参数
export function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}

/**
 * 时间格式化
  * @param time
 * @param cFormat
 * @returns {*}
 */
export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if (('' + time).length === 10) time = parseInt(time) * 1000
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}

// 计数格式处理函数
export function handleNumber(number) {
    if (number < 10000) {
        return number
    } else {
        return (number / 10000).toFixed(1) + 'w'
    }
}

// 处理链接中的含参码
export function handleParams(arr) {
    let obj = {}
    arr.map(item => {
        obj[item.split('=')[0]] = item.split('=')[1]
    })
    return obj
}

// 处理姓名隐藏
export function handleNameHIdden(str) {
    if (str.length === 2) {
        return str[0] + '*'
    } else if (str.length >= 3) {
        var xing = '**';
        return str.substring(0, 1) + xing + str.substring(3);
    } else {
        return str;
    }
}

// 手机号隐藏中间四位
export function handlePhoneNumber(phoneNum) {
    return phoneNum.substring(0, 4) + '****' + phoneNum.substring(8)
}

/*
 * 隐藏用户手机号中间四位
 */
export function hidePhone(phone) {
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

// 匹配区间图片
export function handleHigher(arr, num) {
    for (let i = 0; i < arr.length; i++) {
        if (num >= arr[i][0] && num <= arr[i][1]) {
            // console.log(i, '----下标0----')
            return i
        }
        if (num > arr[arr.length - 1][1]) {
            // console.log(arr.length - 1, '----下标1----')
            return arr.length - 1
        }
    }
}