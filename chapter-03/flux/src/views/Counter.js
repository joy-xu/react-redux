import React, {Component} from 'react';
import * as Actions from '../Actions.js';
import CounterStore from '../stores/CounterStore.js';

import PropTypes from 'prop-types';

class Counter extends Component {

    constructor(props) {
        super(props);

        this.onClickIncrementButton = this.onClickIncrementButton.bind(this);
        this.onClickDecrementButton = this.onClickDecrementButton.bind(this);
        this.onChange= this.onChange.bind(this);

        this.state = {
            count: CounterStore.getCounterValues()[props.caption]
        }
    }

    componentWillMount() {
        console.log("enter componentWillMount " + this.props.caption);
    }

    componentDidMount() {
       CounterStore.addChangeListener(this.onChange)
    }

    componentWillUnmount() {
        CounterStore.removeChangeListener(this.onChange);
    }

    onClickIncrementButton() {
       Actions.increment(this.props.caption);
    }

    onClickDecrementButton() {
       Actions.decrement(this.props.caption);
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

    onChange() {
        const newCount = CounterStore.getCounterValues()[this.props.caption];
        this.setState({count: newCount});
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
    caption: PropTypes.string.isRequired
};

export default Counter;