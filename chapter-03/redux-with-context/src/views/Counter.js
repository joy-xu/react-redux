import React, {Component} from 'react';
import * as Actions from '../Actions.js';

import PropTypes from 'prop-types';

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

class CounterContainer extends Component {

    constructor(props, context) {
        super(props, context);

        this.onIncrement = this.onIncrement.bind(this);
        this.onDecrement = this.onDecrement.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getOwnState = this.getOwnState.bind(this);

        this.state = this.getOwnState();
    }

    getOwnState() {
        return {
            count: this.context.store.getState()[this.props.caption]
        };
    }

    onIncrement() {
        this.context.store.dispatch(Actions.increment(this.props.caption));
    }

    onDecrement() {
        this.context.store.dispatch(Actions.decrement(this.props.caption));
    }

    onChange() {
        this.setState(this.getOwnState());
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.caption !== this.props.caption) ||
            (nextState.count !== this.state.count);
    }

    componentDidMount() {
        this.context.store.subscribe(this.onChange);
    }

    componentWillUnmount() {
        this.context.store.unsubscribe(this.onChange);
    }

    render() {
        return <Counter caption={this.props.caption}
                        onIncrement={this.onIncrement}
                        onDecrement={this.onDecrement}
                        count={this.state.count}/>
    }
}

CounterContainer.contextTypes = {
  store: PropTypes.object
};

export default CounterContainer;