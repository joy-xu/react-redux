import React, {Component} from 'react';
import * as Actions from '../Actions.js';
import store from '../Store.js';

import PropTypes from 'prop-types';

class Counter extends Component {

    constructor(props) {
        super(props);

        this.onClickIncrementButton = this.onClickIncrementButton.bind(this);
        this.onClickDecrementButton = this.onClickDecrementButton.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getOwnState = this.getOwnState.bind(this);

        this.state = this.getOwnState();

    }

    getOwnState() {
        return {
            count: store.getState()[this.props.caption]
    }
    }

    componentWillMount() {
        console.log("enter componentWillMount " + this.props.caption);
    }

    componentDidMount() {
        store.subscribe(this.onChange);
    }

    componentWillUnmount() {
        store.unsubscribe(this.onChange);
    }

    onClickIncrementButton() {
        store.dispatch(Actions.increment(this.props.caption));
    }

    onClickDecrementButton() {
        store.dispatch(Actions.decrement(this.props.caption));
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
        this.setState(this.getOwnState());
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