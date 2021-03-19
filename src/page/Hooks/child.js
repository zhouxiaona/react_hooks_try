import React, {
    useState,
    useEffect,
    useRef,
    useImperativeHandle,
    forwardRef,
} from 'react';
import { connect } from 'react-redux'
import * as homeActions from '../../redux/actions/home'
import { bindActionCreators } from 'redux'
import qs from 'querystring'
import Jsbridge from "xesjsbridge/dist";
import AppApi from '../../api/AppApi.js'
import * as Api from '../../api/api.js'
import { Cookies } from "../../type/index.d.ts"
import { browser } from '../../utils/index.js'
import { Toast } from 'antd-mobile'
import 'antd-mobile/lib/toast/style/css'
import './index.styl'

const Child = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        say: sayHello,
    }));
    const sayHello = () => {
        alert("hello,我是子组件");
    };
    return <h3>子组件</h3>;
});
export default Child