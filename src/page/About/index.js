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
import Bind from '../../compontents/Bind'

class About extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            BindOff: false
        }
    }

    async componentDidMount() {
        if (browser.versions._weixin) {
            console.log('是微信呀')
        } else if (browser.versions.isxesApp) {
            AppApi.setTitle('h5_demo')
            AppApi.cancelLogin()
            AppApi.setShareContent('邀好友,领好礼', 'https://imgs.xrspy.com/old_new/share.jpg', '送好友9元学10课时名师直播课，15件礼物等你免费拿！', window.location.href)
            AppApi.navToFeShare(this.testFn)
            AppApi.guestLogin(this.appGetData)
            let res = await AppApi.getGuestMode()
            if (!res) return Toast.fail('AppApi报错,请稍后重试')
            if (res.state == 0) {
                await AppApi.openLoginVCOnGuestMode()
            } else {
                this.appGetData()
            }
        } else {
            console.log('哈哈哈，我是除微信和学而思APP之外的环境~')
        }
    }

    componentWillUnmount() { }

    testFn = () => {
        console.log('分享成功')
    }

    appGetData = async () => {
        let data = await AppApi.getUserInfo()
        console.log(data, '--data--')
        console.log(this.props.home.userdata, '--this.props.home.userdata--')
    }

    render() {
        const { BindOff } = this.state
        const { } = this
        return (
            <div id="About">
                <Bind
                    AlertShow={BindOff}
                    close={() => this.setState({ BindOff: false })}
                />
				H5_DEMO  666
                <div onClick={() => {
                    this.setState({ BindOff: true })
                }}>click Me</div>
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
export default connect(mapState, mapDispatchToProps)(About);