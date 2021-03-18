import Mock from 'mockjs'

Mock.mock('/index/getPhoneCode', 'post', {
    "msg": "成功",
    "code": 1,
    "data": true
})

Mock.mock('/index/addAddress', 'post', {
    "msg": "成功",
    "code": 1,
    "data": true
})

Mock.mock('/index/phoneLogin', 'post', {
    "msg": "成功",
    "code": 1,
    "data": {
        "pUid": "6778427",
        "stuNumber": "192021784555",
        "grade": "10",
        "name": "面条君",
        "is_edit": "0",
    },
})

Mock.mock('/index/completeUserInfo', 'post', {
    "msg": "成功",
    "code": 1,
    "data": "192021784555",
})

Mock.mock('/auth/getInfoByOpenId', 'post', {
    "msg": "成功",
    "code": 1,
    "data": {
        "stuNumber": "192021784555",
        "bind": 1,
        "name": "面条君",
    }
})

Mock.mock('/auth/getSignature', 'post', {
    "msg": "成功",
    "code": 1,
    "data": {
        "signature": "34b2214ab0c2a60e95411730f5664a352cdb92c5",
        "nonceStr": "ccca656c-bcd5-491e-a013-3c98f1a89c54",
        "timestamp": "1586338123"
    }
})


