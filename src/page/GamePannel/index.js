import React, { Component } from 'react'
import './index.styl'
import { Phaser } from '../../type/index.d.ts'
import BootScene from './scenes/BootScene'
import StartScene from './scenes/StartScene'
export default class GamePannel extends Component {
    constructor(props) {
        super(props)
        this.GameMain = null
        this.state = {

        }
    }

    componentDidMount() {
        console.log(window, '---window---')
        this.GameMain = new Phaser.Game({
            type: Phaser.AUTO,
            scale: {
                mode: Phaser.Scale.FIT,
                parent: 'game-container',
                autoCenter: Phaser.Scale.CENTER_BOTH,
                width: 750,
                height: 1334,
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 300 },
                    debug: false
                }
            },
            scene: [
                BootScene,
                StartScene,
            ]
        })
    }


    render() {
        let { imgUrl, curIndex, imgArr, myImg, posterUrl, alertShow, imgEleArr, posImgEleWrap } = this.state
        return (
            <div id='GamePannel'>
                <div id="game-container"></div>
                <div className="popup J_popup">
                    <div className="ct">
                        <div className="tv">
                            <span className="wd"></span>
                        </div>
                        <span className="btn btn_recon"></span>
                        <span className="btn btn_retry"></span>
                        <span className="btn btn_iknow"></span>
                        <span className="close"></span>
                    </div>
                </div>
                <div className="finish J_finish" style={{ display: 'none' }}>
                    <img src="" alt="" className="result" />
                    <div className="btm">
                        <span className="sharetip"></span>
                        <div className="btn">
                            <span className="replay"></span>
                            <span className="share"></span>
                        </div>
                    </div>
                    <div className="load">
                        <img src="img/upload_loading.gif" alt="" />
                    </div>
                </div>
            </div >
        )
    }
}
