import React from 'react';
import ReactDOM from 'react-dom';
import './index.styl'
class Loading extends React.Component {
    state = {
        off: false
    };
    open = () => {
        this.setState({
            off: true
        })
    }
    close() {
        this.setState({
            off: false
        })
    }

    render() {
        return (
            <div className="Loading_box" style={this.state.off ? { display: 'block' } : { display: 'none' }}>
                <div className="spinner">
                    <div className="rect1"></div>
                    <div className="rect2"></div>
                    <div className="rect3"></div>
                    <div className="rect4"></div>
                    <div className="rect5"></div>
                </div>
            </div>
        );
    }
}

let div = document.createElement('div');
document.body.appendChild(div);
let Box = ReactDOM.render(React.createElement(
    Loading,
), div);



export default Box;