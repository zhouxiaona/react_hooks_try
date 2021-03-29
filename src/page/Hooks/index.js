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
import Child1 from './child1'

function About(props) {
    const [BindEffectOff, setBindEffectOff] = useState(false)
    const domRef = useRef(1)
    const childRef = useRef(null)
    const timer = useRef(null)
    const [count, setCount] = useState(0)
    const [selfObj, setSelfObj] = useState({ name: '11', age: 18 })

    const [count1, setCount1] = useState(0)
    const [count2, setCount2] = useState(0)
    // useEffect(() => {
    //     clearTimeout(timer.current)
    //     timer.current = setTimeout(() => {
    //         setCount(count + 1)
    //     }, 1000)
    // }, [count])

    useEffect(() => {
        // console.log("ref:deom-init", domRef, domRef.current);
        // console.log("ref:child-init", childRef, childRef.current);
        // console.log(window.location, '--location--')
        // console.log(window.location.search, '--search--')

        // Object.prototype.a = "jing1";
        // Function.prototype.a = "jing2";
        // function Preson() { };
        // var p = new Preson();
        // console.log(p.a); // jing1
        // console.log(p.constructor); // ƒ function Preson() { };
        // console.log(p.__proto__.__proto__.constructor); // ƒ Object() { [native code] }

        // console.log('1');
        // setTimeout(function () {
        //     console.log('2');
        //     new Promise(function (resolve) {
        //         console.log('3');
        //         resolve();
        //     }).then(function () {
        //         console.log('4')
        //     })
        // })
        // new Promise(function (resolve) {
        //     console.log('5');
        //     resolve();
        // }).then(function () {
        //     console.log('6')
        // })
        // console.log('7')

        // setTimeout(function () {
        //     console.log('1');
        // })
        // new Promise(function (resolve) {
        //     console.log('2');
        //     for (var i = 0; i < 1000; i++) {
        //         i == 99 && resolve();
        //     }
        //     console.log('3');
        // }).then(function () {
        //     console.log('4');
        // })
        // console.log('5')

        // console.log('start')
        // setTimeout(() => {
        //     console.log('setTimeout')
        // }, 0)
        // new Promise((resolve) => {
        //     console.log('promise')
        //     resolve()
        // })
        //     .then(() => {
        //         console.log('then1')
        //     })
        //     .then(() => {
        //         console.log('then2')
        //     })
        // console.log('end')

        // console.log('start')
        // setTimeout(() => {
        //     console.log('timer1')
        //     Promise.resolve().then(function () {
        //         console.log('promise1')
        //     })
        // }, 0)
        // setTimeout(() => {
        //     console.log('timer2')
        //     Promise.resolve().then(function () {
        //         console.log('promise2')
        //     })
        // }, 0)
        // Promise.resolve().then(function () {
        //     console.log('promise3')
        // })
        // console.log('end')

        // setTimeout(function () {
        //     console.log('定时器开始啦')
        // });
        // new Promise(function (resolve) {
        //     console.log('马上执行for循环啦');
        //     for (var i = 0; i < 10000; i++) {
        //         i == 99 && resolve();
        //     }
        // }).then(function () {
        //     console.log('执行then函数啦')
        // });
        // console.log('代码执行结束');

        // console.log('script start')
        // async function async1() {
        //     await async2()
        //     console.log('async1 end')
        // }
        // async function async2() {
        //     console.log('async2 end')
        // }
        // async1()
        // setTimeout(function () {
        //     console.log('setTimeout')
        // }, 0)
        // new Promise(resolve => {
        //     console.log('Promise')
        //     resolve()
        // }).then(function () {
        //     console.log('promise1')
        // }).then(function () {
        //     console.log('promise2')
        // })
        // console.log('script end')
        // script start  async2 end  Promise  script end   async1 end  promise1 promise2 setTimeout
        // 旧版输出如下，但是请继续看完本文下面的注意那里，新版有改动
        // script start => async2 end => Promise => script end => promise1 => promise2 => async1 end => setTimeout


        // console.log('script start')
        // async function async1() {
        //     await async2()
        //     console.log('async1 end')
        // }
        // async function async2() {
        //     console.log('async2 end')
        //     return Promise.resolve().then(() => {
        //         console.log('async2 end1')
        //     })
        // }
        // async1()
        // setTimeout(function () {
        //     console.log('setTimeout')
        // }, 0)
        // new Promise(resolve => {
        //     console.log('Promise')
        //     resolve()
        // }).then(function () {
        //     console.log('promise1')
        // }).then(function () {
        //     console.log('promise2')
        // })
        // console.log('script end')
        // script start  async2 end    Promise   script end   async2 end1    promise1  promise2  async1 end  setTimeout

        // setImmediate(() => {
        //     console.log(1)
        //     setTimeout(() => {
        //         console.log(2)
        //     }, 100)
        //     setImmediate(() => {
        //         console.log(3)
        //     })
        //     process.nextTick(() => {
        //         console.log(4)
        //     })
        // })
        // process.nextTick(() => {
        //     console.log(5)
        //     setTimeout(() => {
        //         console.log(6)
        //     }, 100)
        //     setImmediate(() => {
        //         console.log(7)
        //     })
        //     process.nextTick(() => {
        //         console.log(8)
        //     })
        // })
        // console.log(9)
        // 9 5 8 1 4 7 3 6 2

        console.log('1');
        setTimeout(function () {
            console.log('2');
            process.nextTick(function () {
                console.log('3');
            })
            new Promise(function (resolve) {
                console.log('4');
                resolve();
            }).then(function () {
                console.log('5')
            })
        })
        process.nextTick(function () {
            console.log('6');
        })
        new Promise(function (resolve) {
            console.log('7');
            resolve();
        }).then(function () {
            console.log('8')
        })
        setTimeout(function () {
            console.log('9');
            process.nextTick(function () {
                console.log('10');
            })
            new Promise(function (resolve) {
                console.log('11');
                resolve();
            }).then(function () {
                console.log('12')
            })
        })
        // 1 7 6 8 2 4 3 5 9 11 10 12 

    }, []);

    const showChild = () => {
        console.log("ref:child", childRef, childRef.current);
        childRef.current.say();
    };

    return (
        <div className='container'>
            {/* <h2>这是外层组件</h2>
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
                <Child1 />
            </div>
            <br />
            <p>{count}</p>
            <p onClick={() => {
                setCount1(count1 + 1)
            }}>click me1</p>
            <p onClick={() => {
                setCount2(count2 + 1)
            }}>click me</p> */}

            <nav>nav</nav>
            <main>main</main>
            <aside>aside</aside>
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