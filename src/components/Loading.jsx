import React, {Component} from'react'
import PropTypes from 'prop-types'
import Animated from 'react-dom'


class Loader extends Component {
    
    constructor(props) {
        super(props);
        const animate = new Animated.Value(0);
        animate.addListener(this.changeOpacity.bind(this));
        this.state = {
            animate: animate,
            value: 0
        }
    }

    changeOpacity({value}) {
        if (value === 0) this.setState({value: 0});
    }

    componentDidUpdate(prevProps) {
        const {active} = this.props;
        if (!prevProps.active && active) {
            this.state.animate.setValue(0.58);
            this.setState({value: 0.58});
        } else if (prevProps.active && !active) {
            Animated.timing(this.state.animate, {toValue: 0}).start();
        }
    }

    render() {
        const {text} = this.props;
        if (this.state.value === 0) return false;
        return (
            <div>
                <Animated.div
                    className="page-block"
                    style={{opacity: this.state.animate}}
                />
                <div className="loading-text">{text}</div>
                <div className="loading-wrapper">
                    <div className="spinner">
                        <div className="double-bounce1"/>
                        <div className="double-bounce2"/>
                    </div>
                </div>
            </div>
        )
    }
}

Loader.propTypes = {
    // 加载的文本
    text: PropTypes.string.isRequired,
    // 是否激活状态
    active: PropTypes.bool.isRequired
};

Loader.defaultProps = {
    text: 'Loading',
    active: false
};

export default Loader