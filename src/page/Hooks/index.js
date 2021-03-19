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
import Child from './child'

function About(props) {
    const [BindEffectOff, setBindEffectOff] = useState(false)
    const domRef = useRef(1)
    const childRef = useRef(null)
    const timer = useRef(null)
    const [count, setCount] = useState(0)

    useEffect(() => {
        clearTimeout(timer.current)
        timer.current = setTimeout(() => {
            setCount(count + 1)
        }, 1000)
    }, [count])

    useEffect(() => {
        console.log("ref:deom-init", domRef, domRef.current);
        console.log("ref:child-init", childRef, childRef.current);
    }, []);

    const showChild = () => {
        console.log("ref:child", childRef, childRef.current);
        childRef.current.say();
    };

    return (
        <div style={{ margin: "100px", border: "2px dashed", padding: "20px" }}>
            <h2>这是外层组件</h2>
            <div
                onClick={() => {
                    console.log("ref:deom", domRef, domRef.current);
                    domRef.current.focus();
                    domRef.current.value = 'hh';
                    setBindEffectOff(!BindEffectOff)
                }}
            >
                <label>这是一个dom节点</label><input ref={domRef} />
            </div>
            <br />
            <p onClick={showChild} style={{ marginTop: "20px" }}>这是子组件</p>
            <div style={{ border: "1px solid", padding: "10px" }}>
                <Child ref={childRef} />
            </div>
            <br />
            <p>{count}</p>
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
export default connect(mapState, mapDispatchToProps)(About);