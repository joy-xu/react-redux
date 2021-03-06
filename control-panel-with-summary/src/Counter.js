import React, {Component} from 'react';

import PropTypes from 'prop-types';

class Counter extends Component {

    constructor(props) {
        console.log("enter constructor " + props.caption);
        super(props);

        this.onClickIncrementButton = this.onClickIncrementButton.bind(this);
        this.onClickDecrementButton = this.onClickDecrementButton.bind(this);
        this.updateCount = this.updateCount.bind(this);

        this.state = {
            count: props.initialValue
        }
    }

    componentWillMount() {
        console.log("enter componentWillMount " + this.props.caption);
    }

    componentDidMount() {
        console.log('enter componentDidMount ' + this.props.caption);
    }

    onClickIncrementButton() {
        this.updateCount(true);
    }

    onClickDecrementButton() {
        this.updateCount(false);
    }

    componentWillReceiveProps(nextProps) {
        //只要父组件的render函数被调用，在render函数里面被渲染的子组件就会经历更新过程，
        //不管父组件传给子组件的props有没有改变，都会触发子组件的componentWillReceiveProps函数
        //this.setState不会引发componentWillReceiveProps被调用
        console.log("enter componentWillReceiveProps, " + this.props.caption);
    }

    shouldComponentUpdate(nextProps, nextState) {
        // return true;
        return (nextProps.caption !== this.props.caption) || (nextState.count !== this.state.count);
    }

    updateCount(isIncrement) {
        const previousValue = this.state.count;
        const newValue = isIncrement ? previousValue + 1 : previousValue - 1;

        this.setState({count: newValue});

        this.props.onUpdate(newValue, previousValue);
    }

    render() {

        console.log("enter render, " + this.props.caption);

        const {caption} = this.props;

        return (
            <div>
                <button onClick={this.onClickIncrementButton}>+</button>
                <button onClick={this.onClickDecrementButton}>-</button>
                <span>{caption} count: {this.state.count}</span>
            </div>
        )
    }

}

Counter.propTypes = {
    caption: PropTypes.string.isRequired,
    initialValue: PropTypes.number,
    onUpdate: PropTypes.func
};

Counter.defaultProps = {
    initialValue: 0,
    //默认upUpdate是一个什么都不做的函数
    onUpdate: f => f
};

export default Counter;