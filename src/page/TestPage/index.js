import React, { useEffect, useState, useReducer } from 'react';
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
import BindEffect from '../../compontents/BindEffect'

function TestPage(props) {
    console.log(props, '--props--')
    const [BindEffectOff, setBindEffectOff] = useState(true);
    const [count, setCount] = useState(0);
    const [obj, setObj] = useState({ name: 'aa', age: 18 })
    console.log(obj, '--obj--')

    useEffect(() => {
        obj.age = 21
        console.log(obj, '--effect-obj--')
    }, [obj])

    return (
        <div id="TestPage">
            <BindEffect
                AlertShow={BindEffectOff}
                count={count}
                // obj={obj}
                close={() => setBindEffectOff(false)}
                updateCount={() => setCount(count + 1)}
            />
            <button onClick={() => setCount(count + 1)}>click{count}</button>
            <button onClick={() => setCount(obj.name = 'bb')}>click obj{count}</button>
        </div>
    );
}

const mapState = (state) => ({
    home: state.home
});
const mapDispatchToProps = (dispatch) => {
    return {
        homeActions: bindActionCreators(homeActions, dispatch)
    }
}
export default connect(mapState, mapDispatchToProps)(TestPage);