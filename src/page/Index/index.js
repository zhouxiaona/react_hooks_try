import React from 'react';
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

class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            numArr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            targetNumber: 532456,
            targetNumberArr: [],
            isAni: false,
        }
    }

    componentDidMount() {
        let { targetNumber, targetNumberArr } = this.state
        let arr = (targetNumber + '').split('')
        arr = arr.map(item => item = Number(item))
        this.setState({
            targetNumberArr: arr
        }, () => {
            console.log(this.state.targetNumberArr, '---targetNumberArr---')
            this.setState({
                isAni: true
            })
        })
    }

    componentWillUnmount() { }

    render() {
        const { targetNumberArr, numArr, isAni } = this.state
        return (
            <div id="Index">
                <div className="numberWrap">
                    {targetNumberArr.map((item, index) => {
                        return (<div className="numBox" key={index}>
                            <div className="numBoxInner"
                                style={isAni
                                    ? { top: `-${item * 8}vw`, transitionDelay: `${index * 0.3}s` } : { top: 0, transitionDelay: 0 }}>
                                {numArr.map((val, key) => {
                                    return (<div className="numItem" key={key}>{val}</div>)
                                })}
                            </div>
                        </div>)
                    })}
                </div>
            </div>
        );
    }
}

const mapState = (state) => ({
    home: state.home
});
const mapDispatchToProps = (dispatch) => {
    return {
        homeActions: bindActionCreators(homeActions, dispatch)
    }
}
export default connect(mapState, mapDispatchToProps)(Index);