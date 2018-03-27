import React, {Component} from 'react';
import * as Actions from '../Actions.js';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class Counter extends Component {

    render() {

        const {caption, onIncrement, onDecrement, count} = this.props;

        return (
            <div>
                <button onClick={onIncrement}>+</button>
                <button onClick={onDecrement}>-</button>
                <span>{caption} count: {count}</span>
            </div>
        )
    }

}

Counter.propTypes = {
    caption: PropTypes.string.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        count: state[ownProps.caption]
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onIncrement() {
            dispatch(Actions.increment(ownProps.caption));
        },
        onDecrement() {
            dispatch(Actions.decrement(ownProps.caption));
        }
    }
}

let CounterContainer = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default CounterContainer;