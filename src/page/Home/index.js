/*
 * @Author: lei
 * @Date: 2020-12-16 17:47:56
 * @LastEditors: lei
 * @LastEditTime: 2020-12-17 19:36:26
 * @Description: 文件描述
 * @FilePath: \仓库\christmas-activities\src\page\Home\index.js
 */
import React, { Component } from 'react'
import './index.styl'
import temp1 from '../../image/temp1.png'
import temp2 from '../../image/temp2.png'
import temp3 from '../../image/temp3.png'
import html2canvas from 'html2canvas/dist/html2canvas.min.js'
import Canvas2Image from "./canvas2image.js";
import Exif from 'exif-js'
export default class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            curIndex: 0,
            imgArr: [
                temp1, temp2, temp3
            ],
            imgUrl: '',
            initTouchX: 0,
            initTouchY: 0,
            changeTouchX: 0,
            changeTouchY: 0,
            reviewImgDom: '',
            lastTouchX: 0,
            lastTouchY: 0,
            previewImg: '',
            myImg: {
                position: {
                    x: 0,
                    y: 0
                },
                scale: 1,
                lastScale: 1
            },
            posterUrl: '',

            imgEleArr: [
                'https://pupupula.net/spring/res/raw-assets/resources/PNG/Furniture/02.38f6c.png',
                'https://pupupula.net/spring/res/raw-assets/resources/PNG/Furniture/01.eccf0.png',
                'https://pupupula.net/spring/res/raw-assets/resources/PNG2/Furniture/01.8e65f.png',
                'https://pupupula.net/spring/res/raw-assets/resources/PNG/Kid/08.011ae.png',
            ],
        }
    }
    componentWillMount() {
        // this.previewImg = document.querySelector('#preview-img')
        document.addEventListener('touchstart', function (event) {
            if (event.touches.length > 1) {
                event.preventDefault();
            }
        })
        var lastTouchEnd = 0;
        document.addEventListener('touchend', function (event) {
            var now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false)
    }

    getPhoto = () => {
        var that = this
        let file = document.getElementById('image-input')
        let reads = new FileReader()
        reads.readAsDataURL(file.files[0])
        reads.onload = e => {
            this.setState({
                imgUrl: e.target.result,
            })
            var orientation
            let previewImg = document.getElementById('preview-img')
            console.log(previewImg, '---previewImg--')
            previewImg.onload = function () {
                Exif.getData(previewImg, function () { // 获取图像的数据
                    Exif.getAllTags(previewImg); // 获取图像的全部数据，值以对象的方式返回
                    orientation = Exif.getTag(previewImg, "Orientation"); // 获取图像的拍摄方向
                    var rotateCanvas = document.createElement("canvas"),
                        rotateCtx = rotateCanvas.getContext("2d");
                    // 针对图像方向进行处理
                    switch (orientation) {
                        case 1:
                            rotateCanvas.width = previewImg.width;
                            rotateCanvas.height = previewImg.height;
                            rotateCtx.drawImage(previewImg, 0, 0, previewImg.width, previewImg.height);
                            break;
                        case 6: // 顺时针 90 度
                            rotateCanvas.width = previewImg.height;
                            rotateCanvas.height = previewImg.width;
                            rotateCtx.translate(0, 0);
                            rotateCtx.rotate(90 * Math.PI / 180);
                            rotateCtx.drawImage(previewImg, 0, -previewImg.height, previewImg.width, previewImg.height);
                            break;
                        case 8:
                            rotateCanvas.width = previewImg.height;
                            rotateCanvas.height = previewImg.width;
                            rotateCtx.translate(0, 0);
                            rotateCtx.rotate(-90 * Math.PI / 180);
                            rotateCtx.drawImage(previewImg, -previewImg.width, 0, previewImg.width, previewImg.height);
                            break;
                        case 3: // 180 度
                            rotateCanvas.width = previewImg.width;
                            rotateCanvas.height = previewImg.height;
                            rotateCtx.translate(0, 0);
                            rotateCtx.rotate(Math.PI);
                            rotateCtx.drawImage(previewImg, -previewImg.width, -previewImg.height, previewImg.width, previewImg.height);
                            break;
                        default:
                            rotateCanvas.width = previewImg.width;
                            rotateCanvas.height = previewImg.height;
                            rotateCtx.drawImage(previewImg, 0, 0, previewImg.width, previewImg.height);
                    }
                    var rotateBase64 = rotateCanvas.toDataURL("image/jpeg", 0.5);
                    // console.log()
                });
            }
        }
    }
    changeIndex = (index) => {
        this.setState({
            curIndex: index
        })
    }
    getInitPosition = (e) => {
        window.event.preventDefault()
        console.log(e, '--e--')
        if (this.state.imgUrl) {
            var length = e.touches.length
            if (length > 1) {
                let pointOne = e.touches[0]
                let pointTwo = e.touches[1]
                this.setState({
                    initTouchX: pointOne.clientX - pointTwo.clientX,
                    initTouchY: pointOne.clientY - pointTwo.clientY
                })
            } else {
                let touches = e.touches[0]
                this.setState({
                    initTouchX: touches.clientX,
                    initTouchY: touches.clientY
                })
            }
        }
    }
    getMovePosition = (e) => {
        window.event.preventDefault()
        if (this.state.imgUrl) {
            var length = e.touches.length
            if (length > 1) {
                let pointOne = e.touches[0]
                let pointTwo = e.touches[1]
                let changeTouchX = pointOne.clientX - pointTwo.clientX
                let changeTouchY = pointOne.clientY - pointTwo.clientY
                var scale = (changeTouchX - this.state.initTouchX) > (changeTouchY - this.state.initTouchY) ? (changeTouchX / this.state.initTouchX) : (changeTouchY / this.state.initTouchY)
                scale *= this.state.myImg.lastScale
                this.setState({
                    myImg: {
                        ...this.state.myImg,
                        scale: scale > 3 ? 3 : (scale < 0.5 ? 0.5 : scale)
                    }
                })
            } else {
                var touches = e.touches[0]
                let changeTouchX = touches.clientX - this.state.initTouchX
                let changeTouchY = touches.clientY - this.state.initTouchY
                this.setState({
                    myImg: {
                        ...this.state.myImg,
                        position: {
                            x: this.state.lastTouchX + (changeTouchX / this.state.myImg.scale),
                            y: this.state.lastTouchY + (changeTouchY / this.state.myImg.scale)
                        }
                    }
                })
            }
        }
    }

    getLeavePosition = (e) => {
        this.setState({
            myImg: {
                ...this.state.myImg,
                lastScale: this.state.myImg.scale
            }
        })
        if (e.touches.length > 0) {
            var touches = e.touches[0]
            this.setState({
                initTouchX: touches.clientX,
                initTouchY: touches.clientY
            })
        }
        this.setState({
            lastTouchX: this.state.myImg.position.x,
            lastTouchY: this.state.myImg.position.y
        })
    }

    //绘制海报方法
    createPoster = (post) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                window.scrollTo(0, 0)
                let shareContent = post;
                // console.log(shareContent.getBoundingClientRect(), '--getBoundingClientRect()--')
                // let width = shareContent.getBoundingClientRect().width;
                // let height = shareContent.getBoundingClientRect().height;
                let width = shareContent.offsetWidth;
                let height = shareContent.offsetHeight;
                let canvas = document.createElement("canvas");
                let scale = 1.5;
                canvas.width = width * scale;
                canvas.height = height * scale;
                canvas.getContext("2d").scale(scale, scale);
                window.html2canvas || html2canvas(shareContent, {
                    useCORS: true,
                    // allowTaint: true,
                    // proxy: 'https://father.xrspy.com/jiazhanghuifile',
                    width: width - 2,
                    height: height - 2,
                }).then((canvas) => {
                    let context = canvas.getContext("2d");
                    // 【重要】关闭抗锯齿
                    context.imageSmoothingEnabled = false;
                    var img = Canvas2Image.convertToImage(
                        canvas,
                        canvas.width,
                        canvas.height
                    );
                    resolve(img.src)
                }).catch(() => {
                    reject('海报生成失败~')
                })
            }, 100)
        })
    }

    // 生成海报
    handlePost = () => {
        console.log(this.imgRef, '--imgRef--')
        Promise.all([this.createPoster(document.querySelector('.photo-box'))]).then((result) => {
            this.setState({
                posterUrl: result
            })
        }).catch((error) => {
            console.log(error, '=error==')
        })
    }

    createPhoto = () => {
        if (this.state.imgUrl) {
            let photoBox = document.querySelector('.photo-box')
            let newImgWidth = photoBox.style.offsetWidth
            let newImgHeight = photoBox.style.offsetHeight
            let scale = window.devicePixelRatio
            let that = this
            html2canvas(photoBox, {
                width: newImgWidth,
                height: newImgHeight,
                scale: scale,
                useCORS: true
            }).then(function (canvas) {
                var dataUrl = canvas.toDataURL('image/jpg')
                localStorage.imgData = dataUrl
                that.$router.push({
                    name: 'share',
                    params: {
                        storage: 'imgData'
                    }
                })
            })
        } else {
            alert('请上传图片')
        }

    }
    render() {
        let { imgUrl, curIndex, imgArr, myImg, posterUrl } = this.state
        return (
            <div id='Home'>
                <div className="posterOuter">
                    <img src="https://pupupula.net/spring/res/raw-assets/resources/PNG2/Room/Room.adb50.png" className="bg" />
                </div>

            </div >
        )
    }
}
