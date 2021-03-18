import React, { useEffect, useState, useReducer, useRef } from 'react';
import * as Api from '../../api/api.js'
import AppApi from '../../api/AppApi.js'
import Store from '../../redux/store/Store';
import { Toast, Picker } from 'antd-mobile';
import { browser } from "../../utils/index.js"

import phoneImg from '../../image/Bind/phone.png'
import nameImg from '../../image/Bind/name.png'
import selectImg from '../../image/Bind/select.png'
import codeImg from '../../image/Bind/code.png'
import narrow from '../../image/Bind/narrow.png'
import Close from "../../image/Bind/close.png"

import 'antd-mobile/lib/toast/style/css';
import 'antd-mobile/lib/picker/style/css';

import './index.styl'
const gradeArr = [
    { "id": "1", "value": "-9", "label": "托班" },
    { "id": "2", "value": "-8", "label": "小班" },
    { "id": "3", "value": "-7", "label": "中班" },
    { "id": "4", "value": "-6", "label": "大班" },
    { "id": "5", "value": "1", "label": "一年级" },
    { "id": "6", "value": "2", "label": "二年级" },
    { "id": "7", "value": "3", "label": "三年级" },
    { "id": "8", "value": "4", "label": "四年级" },
    { "id": "9", "value": "5", "label": "五年级" },
    { "id": "10", "value": "6", "label": "六年级" },
    { "id": "11", "value": "7", "label": "七年级" },
    { "id": "12", "value": "8", "label": "八年级" },
    { "id": "13", "value": "9", "label": "九年级" },
    { "id": "14", "value": "10", "label": "高中一年级" },
    { "id": "15", "value": "11", "label": "高中二年级" },
    { "id": "16", "value": "12", "label": "高中三年级" },
    { "id": "17", "value": "17", "label": "已毕业" },
    { "id": "18", "value": "-20", "label": "无年级" },
    { "id": "19", "value": "-10", "label": "早教" },
]
function getGradeTextByGradeId(gradeList, gradeId) {
    let data = gradeList.filter(item => item.value === gradeId)
    return data.length === 0 ? "在读年级" : data[0].label
}

export default function BindEffect(props) {
    console.log(props, '--props--BindEffect--')
    const [type, setType] = useState(true); // 控制输入框显隐
    const [phoneNum, setPhoneNum] = useState(''); // 手机号
    const [codeNum, setCodeNum] = useState(''); // 验证码
    const [name, setName] = useState(''); // 姓名
    const [grade, setGrade] = useState(''); // 年级id
    const [gradeTxt, setGradeTxt] = useState('请选择在读年级'); // 年级名称
    const [codeTime, setCodeTime] = useState(60); // 倒计时时间
    const [Timer, setTimer] = useState(null); // 计时器
    const [pUid, setPuid] = useState(''); // 完善信息所需字段-有接口返回

    // 获取手机验证码
    const startTimer = async () => {
        if (!(/^1\d{10}$/.test(phoneNum))) return Toast.fail("手机号不正确", 1.5);
        if (codeTime !== 60) return;
        let { code, data, message } = await Api.getPhoneCode(phoneNum);
        if (code != 1) return Toast.fail(message, 2);
        Toast.success("验证码已发送", 1.5);
        setTimer(setInterval(() => {
            let codeTime = codeTime - 1
            if (codeTime <= 0) {
                clearInterval(Timer)
                setCodeTime(60)
                return;
            }
            setCodeTime(codeTime)
        }, 1000))
    }

    // 提交数据
    const submit = async () => {
        // setName('面条君')
        // console.log(name, '--name--BindEffect--')
        props.updateCount()
        return;
        if (!(/^1\d{10}$/.test(phoneNum))) return Toast.fail("手机号不正确", 1.5);
        if (!(/^\d{6}$/.test(codeNum))) return Toast.fail("验证码不正确", 1.5);
        let { code, data, message } = await Api.bindInfo(codeNum, phoneNum)
        if (code != 1) return Toast.fail(message, 2);
        clearInterval(Timer)
        // 验证完善信息
        if (data.is_edit == '0') {
            // 切换到完善信息页面
            setType(false)
            setPuid(data.pUid)
        } else {
            //登录成功关闭页面
            //改变完善状态
            Store.dispatch({
                type: 'UPDATA_USERINFO',
                data: {
                    stuNumber: data.stuNumber,
                    grade: data.grade,
                    name: data.name,
                    bind: 1,
                }
            })
            props.close()
        }
    }

    // 完善信息
    const complate = async () => {
        if (name === '') return Toast.fail("姓名不能为空", 1.5);
        if (name.length < 2) return Toast.fail("请填写至少2个字的姓名", 1.5);
        if (grade === "") return Toast.fail("请选择年级", 1.5);
        let { code, data, message } = await Api.completeUserInfo(name, grade, pUid)
        if (code != 1) return Toast.fail(message, 2);
        //信息完善成功，关闭完善信息页面,更改状态
        Store.dispatch({
            type: 'UPDATA_USERINFO',
            data: {
                stuNumber: data,
                grade: grade,
                name: name,
                bind: 1,
            }
        })
        props.close()
    }

    return (
        <div id="BindEffect" style={props.AlertShow ? { visibility: 'visible' } : { visibility: 'hidden' }}>
            <div className={props.AlertShow ? 'BindBox BindBoxActive' : 'BindBox'}>
                <div className="title">
                    {type ? (Store.getState().home.userdata.bind === 1 ? "切换账号" : "快速登录") : "完善信息"} <br />{props.count}
                </div>

                {type && <div className="inputBox">
                    <div className="input">
                        <img src={phoneImg} alt="phoneImg" className="phoneImg" />
                        <input
                            type="number"
                            className="inputFrom"
                            onChange={e => setPhoneNum(e.target.value)}
                            placeholder="请输入手机号码"
                            onBlur={() => {
                                setTimeout(function () {
                                    var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                                    window.scrollTo(0, Math.max(scrollHeight - 1, 0));
                                }, 100);
                            }}
                        />
                    </div>
                </div>}

                {!type && <div className="inputBox">
                    <div className="input">
                        <img src={nameImg} alt="nameImg" className="nameImg" />
                        <input
                            type="text"
                            className="inputFrom"
                            placeholder="请输入孩子姓名"
                            onChange={e => setName(e.target.value)}
                            onBlur={() => {
                                setTimeout(function () {
                                    var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                                    window.scrollTo(0, Math.max(scrollHeight - 1, 0));
                                }, 100);
                            }}
                        />
                    </div>
                </div>}

                {type && <div className="inputBox">
                    <div className="input">
                        <img src={codeImg} alt="phoneImg" className="codeImg" />
                        <input
                            type="tel"
                            className="inputFromCode"
                            onChange={e => setCodeNum(e.target.value)}
                            placeholder="填写验证码"
                            maxLength={6}
                            onBlur={() => {
                                setTimeout(function () {
                                    var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                                    window.scrollTo(0, Math.max(scrollHeight - 1, 0));
                                }, 100);
                            }}
                        />
                        <div className="codeBtn" onClick={startTimer}>
                            {codeTime === 60 ? "获取验证码" : codeTime + `s后重试`}
                        </div>
                    </div>
                </div>}

                {!type && <div className="inputBox">
                    <div className="input">
                        <img src={selectImg} className="nameImg" />
                        <Picker
                            title="请选择孩子年级"
                            cols={1}
                            data={gradeArr}
                            value={[grade]}
                            onPickerChange={v => {
                                setGrade(v[0] + "")
                            }}
                            onOk={v => {
                                setGrade(v[0] + "")
                                setGradeTxt(getGradeTextByGradeId(gradeArr, v[0]))
                            }}
                        >
                            <div className="inputFromPicker"  >
                                {gradeTxt}
                            </div>
                        </Picker>
                        <img src={narrow} className="narrow" />
                    </div>
                </div>}

                {type ?
                    <div className="submitBtn" onClick={submit}>
                        {Store.getState().home.userdata.bind === 1 ? "切换账号" : "立即登录"}
                    </div> :
                    <div className="submitBtn" onClick={complate}> 完  成</div>
                }
                <img src={Close} alt="" className="close" onClick={() => props.close()} />
            </div>
        </div>
    );
}
